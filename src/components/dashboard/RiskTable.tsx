import type { City } from '../../types'
import RiskBadge from '../ui/RiskBadge'
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, Eye } from 'lucide-react'

interface RiskTableProps {
  cities: City[]
}

const RiskTable: React.FC<RiskTableProps> = ({ cities }) => {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-brand-critical" />
      case 'down': return <TrendingDown size={16} className="text-brand-safe" />
      case 'stable': return <Minus size={16} className="text-brand-muted" />
    }
  }

  const getStatusIcon = (status: string) => {
    if (status.includes('Normal') || status.includes('Regular')) return <CheckCircle size={14} className="text-brand-safe" />
    if (status.includes('Atenção') || status.includes('Intensivo')) return <AlertTriangle size={14} className="text-brand-warning" />
    if (status.includes('Máximo') || status.includes('Crítico')) return <AlertTriangle size={14} className="text-brand-critical" />
    return <Eye size={14} className="text-brand-muted" />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest text-brand-muted font-bold border-b border-brand-border">
            <th className="py-4 px-6">Cidade</th>
            <th className="py-4 px-6 text-center">Nível de Risco</th>
            <th className="py-4 px-6">Precipitação Total (15d)</th>
            <th className="py-4 px-6">Status Alerta</th>
            <th className="py-4 px-6 text-right">Tendência</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border/50">
          {cities.map((city) => (
            <tr key={city.id} className="group hover:bg-brand-card/50 transition-colors">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${city.riskLevel === 'CRITICO' ? 'bg-brand-critical' : city.riskLevel === 'ALTO' ? 'bg-brand-warning' : city.riskLevel === 'MODERADO' ? 'bg-orange-400' : 'bg-brand-safe'}`}></div>
                  <span className="text-sm font-semibold">{city.name}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-center">
                <RiskBadge level={city.riskLevel} />
              </td>
              <td className="py-4 px-6 text-sm font-medium text-brand-muted">
                {city.precipitation15d}mm
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  {getStatusIcon(city.alertStatus)}
                  <span className="text-brand-text/90">{city.alertStatus}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="inline-flex items-center justify-center">
                   {getTrendIcon(city.trend)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RiskTable
