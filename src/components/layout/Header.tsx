import React, { useState, useRef, useEffect } from 'react'
import { Search, Bell, Menu, User, Settings, LogOut, AlertTriangle, Info, CheckCircle2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
  onMenuClick: () => void
}

const notifications = [
  {
    id: 1,
    type: 'critical',
    title: 'Nível Crítico — Petrópolis',
    desc: 'Rio Quitandinha atingiu cota de emergência (4.2m)',
    time: '5 min atrás',
    icon: <AlertTriangle size={14} />,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Atenção — Blumenau',
    desc: 'Precipitação acumulada acima de 200mm em 24h',
    time: '32 min atrás',
    icon: <AlertTriangle size={14} />,
  },
  {
    id: 3,
    type: 'info',
    title: 'Atualização do Sistema',
    desc: 'Modelos meteorológicos atualizados com dados INMET',
    time: '2h atrás',
    icon: <Info size={14} />,
  },
  {
    id: 4,
    type: 'safe',
    title: 'Situação Normalizada — Manaus',
    desc: 'Nível do rio recuou para zona de atenção',
    time: '3h atrás',
    icon: <CheckCircle2 size={14} />,
  },
]

const typeStyles: Record<string, string> = {
  critical: 'text-brand-critical bg-brand-critical/10',
  warning:  'text-brand-warning  bg-brand-warning/10',
  info:     'text-brand-primary  bg-brand-primary/10',
  safe:     'text-brand-safe     bg-brand-safe/10',
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)

  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef   = useRef<HTMLDivElement>(null)

  const hideSearch = location.pathname === '/alerts' || location.pathname === '/about'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false)
      if (notifRef.current  && !notifRef.current.contains(e.target  as Node)) setIsNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-16 border-b border-brand-border bg-brand-bg/90 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between gap-4">
      {/* Left side */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-brand-muted hover:text-brand-text transition-colors flex-shrink-0"
        >
          <Menu size={22} />
        </button>

        {!hideSearch && (
          <div className="relative w-full max-w-sm hidden sm:block group">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
            <input
              type="text"
              placeholder="Pesquise por cidades em risco..."
              className="w-full bg-brand-sidebar border border-transparent hover:border-brand-border focus:border-brand-primary py-2 pl-9 pr-4 rounded-lg text-xs text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-primary/50 transition-all"
            />
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* Notificações */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false) }}
            className="relative p-2 text-brand-muted hover:text-brand-text transition-colors"
          >
            <Bell size={20} className={isNotifOpen ? 'text-brand-primary' : ''} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-brand-bg shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden">
              {/* Header do painel */}
              <div className="px-4 py-3 border-b border-brand-border flex items-center justify-between">
                <p className="text-sm font-bold text-white">Notificações</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                  {notifications.length} novas
                </span>
              </div>

              {/* Lista */}
              <div className="divide-y divide-brand-border/50 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 hover:bg-brand-bg/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${typeStyles[n.type]}`}>
                        {n.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-brand-text leading-snug">{n.title}</p>
                        <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">{n.desc}</p>
                        <p className="text-[10px] text-brand-muted/60 mt-1 font-medium">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-brand-border bg-brand-bg/30">
                <button className="text-xs font-semibold text-brand-primary hover:text-blue-400 transition-colors w-full text-center">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Separador */}
        <div className="w-px h-6 bg-brand-border" />

        {/* Perfil */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false) }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-brand-text group-hover:text-brand-primary transition-colors leading-tight">
                Gabriel Silva
              </p>
              <p className="text-[10px] text-brand-muted uppercase tracking-wider font-bold">
                Monitor de Nível
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-brand-border group-hover:border-brand-primary transition-colors">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel"
                alt="Avatar"
                className="w-full h-full object-cover bg-brand-card"
              />
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-brand-card border border-brand-border rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-brand-border/50 mb-1 sm:hidden">
                <p className="text-sm font-semibold text-brand-text">Gabriel Silva</p>
                <p className="text-[10px] text-brand-muted uppercase tracking-wider">Monitor de Nível</p>
              </div>
              <button onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary transition-colors flex items-center gap-2">
                <User size={15} /> Editar Perfil
              </button>
              <button onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary transition-colors flex items-center gap-2">
                <Settings size={15} /> Configurações
              </button>
              <div className="h-px bg-brand-border/50 my-1" />
              <button onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-brand-critical hover:bg-brand-critical/10 transition-colors flex items-center gap-2">
                <LogOut size={15} /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
