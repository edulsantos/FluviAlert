import React, { useState, useEffect } from 'react'
import { getAlerts, createAlert, deleteAlert } from '../services/api'
import type { CityAlert } from '../services/api'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {
  Mail,
  User,
  MapPin,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  Zap,
  AlertTriangle,
  Shield,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AlertRegistration: React.FC = () => {
  const [alerts, setAlerts] = useState<CityAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form states
  const [cityName, setCityName] = useState('')
  const [alertEmail, setAlertEmail] = useState('')
  const [userName, setUserName] = useState('')

  const navigate = useNavigate()
  const userId = localStorage.getItem('user_id')

  useEffect(() => {
    if (!userId) {
      navigate('/login')
      return
    }

    setUserName(localStorage.getItem('user_name') || 'Usuário')
    fetchAlerts()
  }, [userId, navigate])

  const fetchAlerts = async () => {
    if (!userId) return
    setLoading(true)
    try {
      const data = await getAlerts(userId)
      setAlerts(data)
    } catch (err) {
      console.error(err)
      setError('Erro ao carregar seus alertas.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddAlert = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cityName || !alertEmail || !userId) return

    setActionLoading(true)
    setError('')
    try {
      await createAlert(userId, {
        city_name: cityName,
        alert_email: alertEmail
      })
      setCityName('')
      fetchAlerts() // Recarrega a lista
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao cadastrar alerta.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleRemoveAlert = async (alertId: number) => {
    if (!userId) return
    
    setActionLoading(true)
    try {
      await deleteAlert(userId, alertId)
      fetchAlerts()
    } catch (err) {
      setError('Erro ao remover alerta.')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          Configuração de Alertas
        </h2>
        <p className="text-brand-muted max-w-2xl font-medium leading-relaxed text-sm md:text-base">
          Personalize como e onde você deseja receber notificações críticas. Nossa sentinela monitora os níveis fluviais 24/7 para garantir sua segurança.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <Card
            title="Cadastrar Novo Alerta"
            icon={<Shield size={18} />}
            className="shadow-2xl shadow-brand-primary/5"
          >
            <form onSubmit={handleAddAlert} className="space-y-6 mt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Seu Nome"
                  value={userName}
                  disabled
                  icon={<User size={16} />}
                />
                <Input
                  label="E-mail para Alerta"
                  placeholder="exemplo@email.com"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  icon={<Mail size={16} />}
                  required
                />
              </div>

              <div className="">
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2 block">
                  Nome da Cidade
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar cidade (Ex: Petrópolis)"
                      value={cityName}
                      onChange={(e) => setCityName(e.target.value)}
                      icon={<MapPin size={16} />}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    icon={actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                    className="shadow-lg shadow-brand-cyan/20 bg-brand-cyan hover:bg-cyan-600 flex-shrink-0 font-bold"
                    disabled={actionLoading}
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-brand-critical/10 border border-brand-critical/20 rounded-lg text-brand-critical text-xs font-bold flex items-center gap-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
          </Card>

          <div>
            <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-muted mb-5">
              <MapPin size={14} className="text-brand-primary" />
              Cidades Monitoradas
            </h3>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 size={32} className="animate-spin text-brand-primary" />
              </div>
            ) : alerts.length === 0 ? (
              <div className="brand-card p-10 text-center text-brand-muted opacity-50">
                <p className="text-sm font-bold uppercase tracking-widest">Nenhuma cidade cadastrada</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="brand-card p-4 flex items-center justify-between group hover:border-brand-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-brand-bg rounded-xl text-brand-primary group-hover:bg-brand-primary/10 transition-colors">
                        <Zap size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{alert.city_name}, {alert.state_code}</p>
                        <p className="text-[10px] text-brand-safe font-bold uppercase tracking-tight">
                          {alert.is_active ? 'Monitoramento Ativo' : 'Inativo'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveAlert(alert.id)}
                      disabled={actionLoading}
                      className="p-2 text-brand-muted hover:text-brand-critical hover:bg-brand-critical/10 rounded-lg transition-all disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="xl:w-80 space-y-6 flex-shrink-0">
          <Card title="Status do Sistema" icon={<Clock size={18} />}>
            <div className="space-y-4 mt-3">
              <div className="p-4 rounded-xl bg-brand-bg border border-brand-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">E-mail de Alerta</span>
                  <CheckCircle2 size={16} className="text-brand-primary" />
                </div>
                <p className="text-[10px] text-brand-muted leading-relaxed font-medium">
                  {alertEmail || 'Aguardando definição...'}
                </p>
              </div>

              <div className="p-3 bg-brand-critical/5 border border-brand-critical/10 rounded-xl flex gap-3">
                <AlertTriangle className="text-brand-warning flex-shrink-0 mt-0.5" size={16} />
                <p className="text-[9px] text-brand-muted font-bold leading-tight uppercase tracking-wide">
                  Alertas críticos são enviados instantaneamente para o e-mail cadastrado.
                </p>
              </div>
            </div>
          </Card>

          <div className="rounded-xl border border-brand-border overflow-hidden bg-brand-card">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Shield size={20} className="text-brand-primary" />
                </div>
                <h4 className="text-base font-black text-white leading-tight">
                  Segurança em Tempo Real
                </h4>
              </div>
              <p className="text-xs text-brand-muted font-medium leading-relaxed">
                Utilizamos sensores IoT e dados meteorológicos globais para prever riscos antes que eles aconteçam. Sistema ativo 24/7.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-safe shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-semibold text-brand-safe">1.248 estações ativas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertRegistration
