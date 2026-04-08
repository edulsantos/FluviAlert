import React, { useState } from 'react'
import { mockSubscriptions } from '../mocks/subscriptions'
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
  Shield
} from 'lucide-react'

const AlertRegistration: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)
  const [frequency, setFrequency] = useState<'immediate' | 'daily'>('immediate')

  const removeCity = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.cityId !== id))
  }

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
          Configuração de Alertas
        </h2>
        <p className="text-brand-muted max-w-2xl font-medium leading-relaxed text-sm md:text-base">
          Personalize como e onde você deseja receber notificações críticas. Nossa sentinela monitora os níveis fluviais 24/7 para garantir sua segurança.
        </p>
      </div>

      {/* Layout principal */}
      <div className="flex flex-col xl:flex-row gap-8">

        {/* Coluna esquerda */}
        <div className="flex-1 space-y-8">
          {/* Configurações de Registro */}
          <Card
            title="Configurações de Registro"
            icon={<User size={18} />}
            className="shadow-2xl shadow-brand-primary/5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
              <Input
                label="Nome Completo"
                placeholder="Ex: Gabriel Silva"
                icon={<User size={16} />}
              />
              <Input
                label="E-mail para Alerta"
                placeholder="seu@email.com"
                icon={<Mail size={16} />}
              />
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2 block">
                Adicionar Cidade
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar cidade (Ex: Petrópolis, RJ)"
                    icon={<MapPin size={16} />}
                  />
                </div>
                <Button
                  size="lg"
                  icon={<Plus size={18} />}
                  className="shadow-lg shadow-brand-cyan/20 bg-brand-cyan hover:bg-cyan-600 flex-shrink-0"
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </Card>

          {/* Cidades Selecionadas */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-muted mb-5">
              <MapPin size={14} className="text-brand-primary" />
              Cidades Selecionadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.cityId}
                  className="brand-card p-4 flex items-center justify-between group hover:border-brand-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-bg rounded-xl text-brand-primary group-hover:bg-brand-primary/10 transition-colors">
                      <Zap size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{sub.cityName}, {sub.state}</p>
                      <p className="text-[10px] text-brand-safe font-bold uppercase tracking-tight">{sub.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCity(sub.cityId)}
                    className="p-2 text-brand-muted hover:text-brand-critical hover:bg-brand-critical/10 rounded-lg transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Finalizar */}
          <div className="flex justify-end pt-2">
            <Button variant="primary" size="lg" className="px-10 py-4 text-base font-black shadow-xl shadow-brand-primary/20">
              Finalizar Cadastro
            </Button>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="xl:w-80 space-y-6 flex-shrink-0">
          {/* Frequência */}
          <Card title="Frequência de Alerta" icon={<Clock size={18} />}>
            <div className="space-y-3 mt-3">
              <button
                onClick={() => setFrequency('immediate')}
                className={`w-full p-4 rounded-xl border flex flex-col gap-1 text-left transition-all relative overflow-hidden
                  ${frequency === 'immediate'
                    ? 'bg-brand-bg border-brand-primary'
                    : 'bg-brand-card/30 border-transparent hover:border-brand-border'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Imediato</span>
                  {frequency === 'immediate' && <CheckCircle2 size={16} className="text-brand-primary" />}
                </div>
                <p className="text-[10px] text-brand-muted leading-relaxed font-medium">
                  Notificações instantâneas assim que o nível crítico for atingido.
                </p>
              </button>

              <button
                onClick={() => setFrequency('daily')}
                className={`w-full p-4 rounded-xl border flex flex-col gap-1 text-left transition-all relative overflow-hidden
                  ${frequency === 'daily'
                    ? 'bg-brand-bg border-brand-primary'
                    : 'bg-brand-card/30 border-transparent hover:border-brand-border'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Resumo Diário</span>
                  {frequency === 'daily' && <CheckCircle2 size={16} className="text-brand-primary" />}
                </div>
                <p className="text-[10px] text-brand-muted leading-relaxed font-medium">
                  Um boletim consolidado às 18h com todas as atualizações do dia.
                </p>
              </button>
            </div>

            <div className="mt-6 p-3 bg-brand-critical/5 border border-brand-critical/10 rounded-xl flex gap-3">
              <AlertTriangle className="text-brand-warning flex-shrink-0 mt-0.5" size={16} />
              <p className="text-[9px] text-brand-muted font-bold leading-tight uppercase tracking-wide">
                Alertas de inundação crítica ignoram a frequência e são enviados imediatamente.
              </p>
            </div>

            <Button className="w-full mt-5 bg-blue-600 hover:bg-blue-500 py-3 font-black text-sm">
              Salvar Configurações de Frequência
            </Button>
          </Card>

          {/* Banner de segurança */}
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
