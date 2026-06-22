import React, { useState } from 'react'
import { searchFlood } from '../services/api'
import type { CitySearch } from '../services/api'
import Card from '../components/ui/Card'
import RiskBadge from '../components/ui/RiskBadge'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { getApiErrorMessage } from '../utils/errors'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Waves, 
  Loader2, 
  AlertCircle, 
  Info
} from 'lucide-react'

const RiskAreas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [cityData, setCityData] = useState<CitySearch | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    setError('')
    try {
      const data = await searchFlood(searchTerm)
      setCityData(data)
    } catch (err: unknown) {
      console.error(err)
      setError(getApiErrorMessage(err, 'Cidade não encontrada ou erro na busca.'))
      setCityData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-brand-text tracking-tight">Consulta por Região</h2>
        <p className="text-sm text-brand-muted max-w-2xl font-medium">
          Busque por uma cidade para visualizar a projeção hidrológica detalhada para os próximos 7 dias.
          <span className="text-brand-muted/70 ml-1">Os dados referem-se à vazão fluvial (m³/s), não à precipitação.</span>
        </p>
      </div>

      <Card className="p-6 bg-brand-card/50 border-brand-border">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Digite o nome da cidade (ex: Petrópolis)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            className="px-8 font-black"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Analisar'}
          </Button>
        </form>
      </Card>

      {error && (
        <div className="p-4 bg-brand-critical/10 border border-brand-critical/20 rounded-xl text-brand-critical flex items-center gap-3">
          <AlertCircle size={20} />
          <span className="font-bold text-sm">{error}</span>
        </div>
      )}

      {cityData && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-text leading-none">
                  {cityData.city_name}
                </h3>
                <p className="text-brand-muted font-semibold uppercase tracking-wider text-xs mt-1">
                  {cityData.state_code} • Lat: {cityData.latitude} Long: {cityData.longitude}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">Status Geral</p>
              <RiskBadge level={cityData.forecast[0]?.risk_level || 'desconhecido'} className="text-sm px-4 py-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {cityData.forecast.map((day, idx) => (
              <div 
                key={day.date}
                className="brand-card p-4 flex flex-col items-center text-center group hover:border-brand-primary/40 transition-all hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3">
                  {idx === 0 ? 'Hoje' : new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                </p>
                <div className="p-3 bg-brand-bg rounded-xl mb-4 text-brand-text">
                  <Calendar size={20} className="group-hover:text-brand-primary transition-colors" />
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-brand-text">{day.discharge != null ? day.discharge.toFixed(0) : '—'}</p>
                  <p className="text-[10px] font-medium text-brand-muted uppercase tracking-tight">m³/s vazão do rio</p>
                </div>
                <RiskBadge level={day.risk_level} className="w-full text-center" />
                <div className="mt-4 pt-4 border-t border-brand-border w-full">
                  <p className="text-[10px] font-medium text-brand-muted uppercase mb-1">Máx Esperada</p>
                  <p className="text-xs font-semibold text-brand-text">{day.discharge_max != null ? day.discharge_max.toFixed(0) : '—'} m³/s</p>
                </div>
              </div>
            ))}
          </div>

          <div className="brand-card p-6 bg-gradient-to-br from-brand-card to-brand-bg">
            <h4 className="flex items-center gap-2 text-sm font-bold text-brand-text uppercase tracking-wider mb-4">
              <Info size={16} className="text-brand-cyan" />
              Análise Preditiva
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-xs text-brand-muted font-medium">Vazão Pico do Rio</p>
                <p className="text-2xl font-bold text-brand-text">
                  {Math.max(...cityData.forecast.filter(d => d.discharge_max != null).map(d => d.discharge_max!)).toFixed(1)} <span className="text-sm text-brand-muted">m³/s</span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-brand-muted font-medium">Risco Predominante</p>
                <p className={`text-2xl font-bold uppercase tracking-tight ${
                  cityData.forecast.some(d => d.risk_level === 'alto') ? 'text-brand-critical' :
                  cityData.forecast.some(d => d.risk_level === 'moderado') ? 'text-brand-warning' :
                  'text-brand-safe'
                }`}>
                  {cityData.forecast.some(d => d.risk_level === 'alto') ? 'CRÍTICO' :
                   cityData.forecast.some(d => d.risk_level === 'moderado') ? 'ALERTA' :
                   'ESTÁVEL'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-brand-muted font-medium">Período Analisado</p>
                <p className="text-2xl font-bold text-brand-cyan">7 dias</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!cityData && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-brand-muted opacity-40">
          <Waves size={64} className="mb-4" />
          <p className="font-semibold uppercase tracking-widest text-xs">Aguardando consulta...</p>
        </div>
      )}
    </div>
  )
}

export default RiskAreas
