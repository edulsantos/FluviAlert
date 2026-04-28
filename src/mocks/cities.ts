import type { City } from '../types'

export const mockCities: City[] = [
  {
    id: '1',
    name: 'Petrópolis',
    state: 'Rio de Janeiro',
    riskLevel: 'alto',
    precipitation15d: 12,
    alertStatus: 'Alerta Máximo',
    trend: 'up',
    population: 142000
  },
  {
    id: '2',
    name: 'Belo Horizonte',
    state: 'Minas Gerais',
    riskLevel: 'moderado',
    precipitation15d: 85,
    alertStatus: 'Atenção Redobrada',
    trend: 'up',
    population: 310500
  },
  {
    id: '3',
    name: 'Blumenau',
    state: 'Santa Catarina',
    riskLevel: 'alto',
    precipitation15d: 240,
    alertStatus: 'Monitoramento Intensivo',
    trend: 'up',
    population: 225800
  },
  {
    id: '4',
    name: 'São Paulo',
    state: 'São Paulo',
    riskLevel: 'baixo',
    precipitation15d: 42,
    alertStatus: 'Monitoramento Normal',
    trend: 'stable',
    population: 485000
  },
  {
    id: '5',
    name: 'Manaus',
    state: 'Amazonas',
    riskLevel: 'moderado',
    precipitation15d: 112,
    alertStatus: 'Observação Ativa',
    trend: 'stable',
    population: 310500
  },
  {
    id: '6',
    name: 'Salvador',
    state: 'Bahia',
    riskLevel: 'alto',
    precipitation15d: 150,
    alertStatus: 'Estado Crítico',
    trend: 'up',
    population: 485000
  },
  {
    id: '7',
    name: 'Angra dos Reis',
    state: 'Rio de Janeiro',
    riskLevel: 'alto',
    precipitation15d: 180,
    alertStatus: 'Monitoramento Intensivo',
    trend: 'up',
    population: 85300
  }
]
