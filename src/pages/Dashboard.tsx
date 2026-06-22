import React, { useEffect, useState } from 'react'
import { getFloodRanking, getFloodStats } from '../services/api'
import type { RankingCity, FloodStats } from '../services/api'
import SafetyGauge from '../components/dashboard/SafetyGauge'
import RiskTable from '../components/dashboard/RiskTable'
import MetricCard from '../components/dashboard/MetricCard'
import Button from '../components/ui/Button'
import { Waves, Zap, BarChart3, Download, Loader2 } from 'lucide-react'

const Dashboard: React.FC = () => {
  const [ranking, setRanking] = useState<RankingCity[]>([])
  const [stats, setStats] = useState<FloodStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const criticalAlertsCount = stats?.critical_alerts_count ?? 0
  const safetyPercentage = stats?.safety_percentage ?? 100

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rankingData, statsData] = await Promise.all([
          getFloodRanking(),
          getFloodStats()
        ])
        setRanking(rankingData.slice(0, 20))
        setStats(statsData)
      } catch (err) {
        console.error(err)
        setError('Falha ao carregar os dados de monitoramento.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const escapeCsvValue = (value: string | number) => {
    const text = String(value)
    return `"${text.replace(/"/g, '""')}"`
  }

  const handleExportRanking = () => {
    if (!ranking.length) return

    const headers = [
      'Posição',
      'Cidade',
      'UF',
      'Nível de Risco',
      'Vazão Máx. do Rio (m³/s)',
      'Data do Pico',
    ]

    const rows = ranking.map((city, index) => [
      index + 1,
      city.city_name,
      city.state_code,
      city.risk_level,
      city.max_discharge.toLocaleString('pt-BR'),
      new Date(city.peak_date).toLocaleDateString('pt-BR'),
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(';'))
      .join('\n')

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `ranking-risco-fluvial-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-80">
        {/* Hero Card */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden group min-h-[300px]">
          <img 
            src="/hero.png" 
            alt="Flood monitoring" 
            className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-6 lg:p-10 flex flex-col justify-end">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider w-fit mb-4 border ${
              criticalAlertsCount > 0 
                ? 'bg-brand-critical/20 text-brand-critical border-brand-critical' 
                : 'bg-brand-safe/20 text-brand-safe border-brand-safe'
            }`}>
              {criticalAlertsCount > 0 ? 'Alerta Crítico Ativo' : 'Monitoramento Estável'}
            </span>
            <h2 className="text-2xl lg:text-4xl font-bold text-white tracking-tight mb-4 max-w-md">
              {criticalAlertsCount > 0 ? 'Risco Identificado' : 'Sistema Operacional'}
            </h2>
            <p className="text-slate-200 text-sm lg:text-base max-w-xl font-medium">
              {criticalAlertsCount > 0 
                ? `Atenção: ${criticalAlertsCount} zonas monitoradas apresentam níveis de vazão acima da média de segurança.`
                : `As condições hidrológicas atuais permanecem dentro dos parâmetros de segurança em ${safetyPercentage}% das zonas.`
              }
            </p>
          </div>
        </div>

        {/* Safety Gauge */}
        <div className="lg:col-span-4 h-full">
          <SafetyGauge 
            percentage={safetyPercentage} 
            trend={safetyPercentage > 90 ? "+1.2% estabilidade" : "Risco em análise"} 
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-brand-text">Ranking de Risco (Top 20 Cidades)</h3>
          <p className="text-xs lg:text-sm text-brand-muted font-medium mt-1">Análise baseada na vazão máxima do rio projetada para o período — dados hidrológicos, não pluviométricos.</p>
        </div>
        <div className="flex gap-2 lg:gap-4">
          <Button
            variant="outline"
            size="sm"
            icon={<Download size={16} />}
            onClick={handleExportRanking}
            disabled={loading || ranking.length === 0}
          >
            Exportar
          </Button>
        </div>
      </div>

      <div className="brand-card p-2 min-h-[400px] flex flex-col overflow-hidden">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-brand-muted gap-4 py-20">
            <Loader2 size={48} className="animate-spin text-brand-primary" />
            <p className="font-semibold uppercase tracking-wider text-xs">Sincronizando com satélites...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-brand-critical gap-2 p-8 text-center">
            <p className="font-bold">{error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Tentar Novamente</Button>
          </div>
        ) : (
          <RiskTable cities={ranking} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <MetricCard 
          label="Cidades Monitoradas" 
          value={stats?.monitored_cities?.toString() || '---'} 
          icon={<Waves size={24} />} 
        />
        <MetricCard 
          label="Cidades Seguras" 
          value={stats?.safe_count?.toString() || '---'} 
          icon={<Zap size={24} />} 
        />
        <MetricCard 
          label="Alertas Moderados" 
          value={stats?.moderate_count?.toString() || '---'} 
          icon={<BarChart3 size={24} />} 
        />
      </div>

      <footer className="pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-brand-muted">
        <div>© 2026 FluviAlert Intelligence Systems</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-text transition-colors">Privacidade</a>
          <a href="#" className="hover:text-brand-text transition-colors">Termos</a>
          <a href="#" className="hover:text-brand-text transition-colors">API</a>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
