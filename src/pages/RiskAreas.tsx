import React from 'react'
import { mockCities } from '../mocks/cities'
import Card from '../components/ui/Card'
import RiskBadge from '../components/ui/RiskBadge'
import { AlertCircle, ShieldAlert, CheckCircle2, Info } from 'lucide-react'

const RiskAreas: React.FC = () => {
  const sortedCities = [...mockCities].sort((a, b) => {
    const riskOrder = { CRITICO: 0, ALTO: 1, MODERADO: 2, MINIMO: 3 }
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
  })

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black text-white tracking-tighter">Áreas de Risco</h2>
        <p className="text-brand-muted max-w-2xl font-medium">
          Relatório dinâmico das zonas urbanas com maior vulnerabilidade a inundações e deslizamentos, processado em tempo real pelo Sentinel.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <Card className="bg-brand-critical/5 border-brand-critical/20 group hover:border-brand-critical/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-brand-critical/10 rounded-lg text-brand-critical">
              <AlertCircle size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Atenção Máxima</span>
          </div>
          <div className="mt-6">
            <h4 className="text-5xl font-black text-white leading-none">04</h4>
            <p className="text-brand-critical font-bold mt-2 uppercase tracking-wide">Estado Crítico</p>
          </div>
        </Card>

        <Card className="bg-brand-warning/5 border-brand-warning/20 group hover:border-brand-warning/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-brand-warning/10 rounded-lg text-brand-warning">
              <ShieldAlert size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Monitoramento Intensivo</span>
          </div>
          <div className="mt-6">
            <h4 className="text-5xl font-black text-white leading-none">12</h4>
            <p className="text-brand-warning font-bold mt-2 uppercase tracking-wide">Risco Alto</p>
          </div>
        </Card>

        <Card className="bg-brand-safe/5 border-brand-safe/20 group hover:border-brand-safe/40 transition-all">
          <div className="flex items-start justify-between">
            <div className="p-3 bg-brand-safe/10 rounded-lg text-brand-safe">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Operação Normal</span>
          </div>
          <div className="mt-6">
            <h4 className="text-5xl font-black text-white leading-none">254</h4>
            <p className="text-brand-safe font-bold mt-2 uppercase tracking-wide">Áreas Estáveis</p>
          </div>
        </Card>
      </div>

      <div className="brand-card overflow-hidden">
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Ranking de Vulnerabilidade</h3>
            <p className="text-xs text-brand-muted mt-1 font-medium">Top 20 cidades brasileiras sob vigilância meteorológica</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-brand-bg rounded-lg text-[10px] font-bold text-brand-muted border border-brand-border flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-critical"></div> Risco Elevado
            </span>
            <span className="px-3 py-1 bg-brand-bg rounded-lg text-[10px] font-bold text-brand-muted border border-brand-border flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div> Estável
            </span>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase font-bold tracking-widest text-brand-muted border-b border-brand-border bg-brand-bg/30">
              <th className="py-4 px-6">Posição</th>
              <th className="py-4 px-6">Cidade / Estado</th>
              <th className="py-4 px-6 text-center">Nível de Risco</th>
              <th className="py-4 px-6 text-center">Pop. Exposta</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50">
            {sortedCities.map((city, idx) => (
              <tr key={city.id} className="group hover:bg-brand-card/80 transition-colors">
                <td className="py-5 px-6 text-brand-muted font-bold tracking-tighter">#{String(idx + 1).padStart(2, '0')}</td>
                <td className="py-5 px-6">
                  <div>
                    <p className="text-sm font-bold text-brand-text group-hover:text-brand-primary transition-colors">{city.name}</p>
                    <p className="text-[10px] text-brand-muted font-medium">{city.state}</p>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <RiskBadge level={city.riskLevel} />
                </td>
                <td className="py-5 px-6 text-center font-mono text-xs text-brand-muted">
                  {city.population.toLocaleString('pt-BR')}
                </td>
                <td className="py-5 px-6 text-right">
                  <span className={`p-2 inline-flex rounded-lg ${city.riskLevel === 'CRITICO' ? 'bg-brand-critical/10 text-brand-critical' : city.riskLevel === 'ALTO' ? 'bg-brand-warning/10 text-brand-warning' : 'bg-brand-safe/10 text-brand-safe opacity-50'}`}>
                    {city.riskLevel === 'CRITICO' ? <AlertCircle size={16} /> : city.riskLevel === 'ALTO' ? <ShieldAlert size={16} /> : <Info size={16} />}
                  </span>
                </td>
              </tr>
            ))}
            {/* Mocked extra rows */}
            <tr className="text-brand-muted italic opacity-50 bg-brand-bg/10">
              <td className="py-5 px-6 font-bold tracking-tighter">#06-10</td>
              <td className="py-5 px-6 text-xs">Várias Localidades (SC, SP, ES)</td>
              <td className="py-5 px-6 text-center"><span className="text-[10px] uppercase font-bold border border-brand-border px-2 py-0.5 rounded-sm">Risco Médio</span></td>
              <td className="py-5 px-6 text-center text-xs">~1.2M total</td>
              <td className="py-5 px-6 text-right"><Info size={16} className="ml-auto" /></td>
            </tr>
            <tr className="text-brand-muted italic opacity-50">
              <td className="py-5 px-6 font-bold tracking-tighter">#11-20</td>
              <td className="py-5 px-6 text-xs">Cidades Sob Monitoramento Preventivo</td>
              <td className="py-5 px-6 text-center"><span className="text-[10px] uppercase font-bold border border-brand-border px-2 py-0.5 rounded-sm">Baixo Risco</span></td>
              <td className="py-5 px-6 text-center text-xs">~2.5M total</td>
              <td className="py-5 px-6 text-right text-brand-safe"><CheckCircle2 size={16} className="ml-auto" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RiskAreas
