import type { RiskLevel } from '../types'

export const riskConfig: Record<RiskLevel, { label: string; color: string; bgColor: string }> = {
  baixo:        { label: 'Baixo',       color: 'text-green-600',  bgColor: 'bg-green-100' },
  moderado:     { label: 'Moderado',    color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  alto:         { label: 'Alto',        color: 'text-red-600',    bgColor: 'bg-red-100' },
  desconhecido: { label: 'Desconhecido', color: 'text-gray-500',   bgColor: 'bg-gray-100' },
}
