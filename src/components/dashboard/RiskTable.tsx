import type { RankingCity } from '../../services/api'
import RiskBadge from '../ui/RiskBadge'
import { MapPin, Calendar, Waves } from 'lucide-react'

interface RiskTableProps {
  cities: RankingCity[]
}

const RiskTable: React.FC<RiskTableProps> = ({ cities }) => {

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-brand-muted font-semibold border-b border-brand-border">
            <th className="py-4 px-6">Posição</th>
            <th className="py-4 px-6">Cidade / UF</th>
            <th className="py-4 px-6 text-center">Nível de Risco</th>
            <th className="py-4 px-6 text-center">Vazão Máx. do Rio (m³/s)</th>
            <th className="py-4 px-6 text-right">Data do Pico</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border/50">
          {cities.map((city, index) => (
            <tr key={`${city.city_name}-${city.state_code}`} className="group hover:bg-brand-card/50 transition-colors">
              <td className="py-4 px-6 text-brand-muted font-mono text-xs">
                #{String(index + 1).padStart(2, '0')}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-brand-primary" />
                  <div>
                    <span className="text-sm font-semibold text-brand-text block">{city.city_name}</span>
                    <span className="text-xs text-brand-muted uppercase font-semibold">{city.state_code}</span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-center">
                <RiskBadge level={city.risk_level} />
              </td>
              <td className="py-4 px-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Waves size={14} className="text-brand-cyan" />
                  <span className="text-sm font-medium text-brand-text">
                    {city.max_discharge.toLocaleString('pt-BR')}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2 text-xs font-semibold">
                  <Calendar size={14} className="text-brand-muted" />
                  <span className="text-brand-text/90">
                    {new Date(city.peak_date).toLocaleDateString('pt-BR')}
                  </span>
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
