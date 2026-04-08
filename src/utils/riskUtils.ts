import type { RiskLevel } from '../types'

export const riskConfig: Record<RiskLevel, { label: string; color: string; bgColor: string }> = {
  MINIMO:   { label: 'Mínimo',         color: 'text-green-400', bgColor: 'bg-green-400/10' },
  MODERADO: { label: 'Moderado',       color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
  ALTO:     { label: 'Risco Alto',     color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  CRITICO:  { label: 'Estado Crítico', color: 'text-red-500', bgColor: 'bg-red-500/10' },
}
