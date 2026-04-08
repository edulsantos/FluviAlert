import type { UserSubscription } from '../types'

export const mockSubscriptions: UserSubscription[] = [
  {
    cityId: '1',
    cityName: 'Porto Alegre',
    state: 'RS',
    status: 'Risco Moderado'
  },
  {
    cityId: '2',
    cityName: 'Blumenau',
    state: 'SC',
    status: 'Monitoramento Ativo'
  },
  {
    cityId: '3',
    cityName: 'Petrópolis',
    state: 'RJ',
    status: 'Monitoramento Ativo'
  }
]
