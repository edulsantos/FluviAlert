import React, { useState, useRef, useEffect } from 'react'
import { Search, Bell, Menu, User, LogOut, AlertTriangle, LogIn } from 'lucide-react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Button from '../ui/Button'

import { getFloodRanking } from '../../services/api'

interface HeaderProps {
  onMenuClick: () => void
}

const typeStyles: Record<string, string> = {
  critical: 'text-brand-critical bg-brand-critical/10',
  warning:  'text-brand-warning  bg-brand-warning/10',
  info:     'text-brand-primary  bg-brand-primary/10',
  safe:     'text-brand-safe     bg-brand-safe/10',
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<any[]>([])

  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef   = useRef<HTMLDivElement>(null)

  const hideSearch = location.pathname === '/alerts' || location.pathname === '/about' || location.pathname === '/login' || location.pathname === '/register'

  useEffect(() => {
    setUserName(localStorage.getItem('user_name'))
    
    // Gerar notificações reais baseadas no ranking
    const loadNotifications = async () => {
      try {
        const ranking = await getFloodRanking()
        const criticalCities = ranking.filter(c => c.risk_level === 'alto' || c.risk_level === 'moderado')
        
        const newNotifs = criticalCities.slice(0, 5).map(c => ({
          id: c.city_name,
          type: c.risk_level === 'alto' ? 'critical' : 'warning',
          title: `${c.risk_level === 'alto' ? 'Nível Crítico' : 'Atenção'} — ${c.city_name}`,
          desc: `Risco de inundação detectado. Vazão projetada: ${c.max_discharge.toFixed(0)}m³/s`,
          time: 'Atualizado agora',
          icon: <AlertTriangle size={14} />,
        }))
        setNotifications(newNotifs)
      } catch (err) {
        console.error('Erro ao carregar notificações:', err)
      }
    }

    loadNotifications()

    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false)
      if (notifRef.current  && !notifRef.current.contains(e.target  as Node)) setIsNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    localStorage.removeItem('token')
    setUserName(null)
    setIsProfileOpen(false)
    navigate('/login')
  }

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
              <div className="px-4 py-3 border-b border-brand-border flex items-center justify-between">
                <p className="text-sm font-bold text-white">Notificações</p>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                  {notifications.length} novas
                </span>
              </div>
              <div className="divide-y divide-brand-border/50 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-brand-bg/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${typeStyles[n.type]}`}>
                        {n.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-brand-text leading-snug">{n.title}</p>
                        <p className="text-xs text-brand-muted mt-0.5 leading-snug">{n.desc}</p>
                        <p className="text-xs text-brand-muted/60 mt-1 font-medium">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-brand-border" />

        {/* Perfil / Login */}
        <div className="relative" ref={profileRef}>
          {userName ? (
            <button
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false) }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-brand-text group-hover:text-brand-primary transition-colors leading-tight">
                  {userName}
                </p>
                <p className="text-xs text-brand-muted uppercase tracking-wider font-semibold">
                  Usuário Ativo
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-brand-border group-hover:border-brand-primary transition-colors flex items-center justify-center bg-brand-primary/10 text-brand-primary">
                <User size={20} />
              </div>
            </button>
          ) : (
            <Link to="/login">
              <Button size="sm" variant="primary" icon={<LogIn size={16} />} className="font-bold">
                Entrar
              </Button>
            </Link>
          )}

          {isProfileOpen && userName && (
            <div className="absolute right-0 mt-2 w-48 bg-brand-card border border-brand-border rounded-xl shadow-2xl py-2 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary transition-colors flex items-center gap-2">
                <User size={15} /> Editar Perfil
              </button>
              <div className="h-px bg-brand-border/50 my-1" />
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-brand-critical hover:bg-brand-critical/10 transition-colors flex items-center gap-2">
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
