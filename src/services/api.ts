import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Tipos
export type RiskLevel = 'baixo' | 'moderado' | 'alto' | 'desconhecido';

export interface User {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface ForecastDay {
  date: string;
  discharge: number | null;
  discharge_max: number | null;
  risk_level: RiskLevel;
}

export interface CitySearch {
  city_name: string;
  state_code: string;
  latitude: number;
  longitude: number;
  forecast: ForecastDay[];
}

export interface RankingCity {
  city_name: string;
  state_code: string;
  latitude: number;
  longitude: number;
  max_discharge: number;
  peak_date: string;
  risk_level: RiskLevel;
}

export interface CityAlert {
  id: string;
  city_name: string;
  state_code: string;
  latitude: number;
  longitude: number;
  alert_email: string;
  is_active: boolean;
  created_at: string;
}

export interface FloodStats {
  safety_percentage: number;
  monitored_cities: number;
  cities_analyzed: number;
  safe_count: number;
  moderate_count: number;
  critical_alerts_count: number;
}

export interface LoginResponse {
  message:      string;
  access_token: string;
  token_type:   string;
  user:         User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type UpdateUserPayload = Partial<{
  name: string;
  email: string;
  password: string;
  is_active: boolean;
}>;

export type UpdateAlertPayload = Partial<{
  city_name: string;
  alert_email: string;
  is_active: boolean;
}>;

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções de Usuário
export const registerUser = async (data: RegisterPayload): Promise<User> => {
  const response = await api.post('/users/register', data);
  return response.data;
};

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post('/users/login', data);
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user_id', response.data.user.id.toString());
    localStorage.setItem('user_name', response.data.user.name);
  }
  return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId: string, data: UpdateUserPayload): Promise<User> => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/${userId}`);
};

// Funções de Enchentes
export const searchFlood = async (city: string): Promise<CitySearch> => {
  const response = await api.get(`/flood/search`, { params: { city } });
  return response.data;
};

export const getFloodRanking = async (): Promise<RankingCity[]> => {
  const response = await api.get('/flood/ranking');
  return response.data;
};

export const getFloodStats = async (): Promise<FloodStats> => {
  const response = await api.get('/flood/stats');
  return response.data;
};

// Funções de Alertas
export const createAlert = async (userId: string, data: { city_name: string; alert_email: string }): Promise<CityAlert> => {
  const response = await api.post(`/alerts/${userId}`, data);
  return response.data;
};

export const getAlerts = async (userId: string): Promise<CityAlert[]> => {
  const response = await api.get(`/alerts/${userId}`);
  return response.data;
};

export const updateAlert = async (userId: string, alertId: string, data: UpdateAlertPayload): Promise<CityAlert> => {
  const response = await api.put(`/alerts/${userId}/${alertId}`, data);
  return response.data;
};

export const deleteAlert = async (userId: string, alertId: string): Promise<void> => {
  await api.delete(`/alerts/${userId}/${alertId}`);
};

export default api;
