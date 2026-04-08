export type RiskLevel = 'MINIMO' | 'MODERADO' | 'ALTO' | 'CRITICO'

export interface City {
  id: string
  name: string
  state: string
  riskLevel: RiskLevel
  precipitation15d: number
  alertStatus: string
  trend: 'up' | 'down' | 'stable'
  population: number
}

export interface UserSubscription {
  cityId: string
  cityName: string
  state: string
  status: string
}
