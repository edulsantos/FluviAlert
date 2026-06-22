import React, { useState, useRef, useEffect } from 'react'
import { Bell, Menu, User, LogOut, AlertTriangle, LogIn, Save, X, Loader2 } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

import { getFloodRanking, updateUser } from '../../services/api'

interface HeaderProps {
  onMenuClick: () => void
}

const typeStyles: Record<string, string> = {
  critical: 'text-brand-critical bg-brand-critical/10',
  warning:  'text-brand-warning  bg-brand-warning/10',
  info:     'text-brand-primary  bg-brand-primary/10',
  safe:     'text-brand-safe     bg-brand-safe/10',
}

interface HeaderNotification {
  id: string
  type: keyof typeof typeStyles
  title: string
  desc: string
  time: string
  icon: React.ReactNode
}

interface ApiErrorResponse {
  response?: {
    data?: {
      detail?: unknown
    }
  }
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [profileName, setProfileName] = useState('')
  const [profileError, setProfileError] = useState('')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [notifications, setNotifications] = useState<HeaderNotification[]>([])

  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUserName(localStorage.getItem('user_name'))
    
    // Gerar notificações reais baseadas no ranking
    const loadNotifications = async () => {
      try {
        const ranking = await getFloodRanking()
        const criticalCities = ranking.filter(c => c.risk_level === 'alto' || c.risk_level === 'moderado')
        
        const newNotifs: HeaderNotification[] = criticalCities.slice(0, 5).map(c => ({
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
  }, [])

  const openProfileEditor = () => {
    setProfileName(userName || '')
    setProfileError('')
    setIsProfileOpen(false)
    setIsEditProfileOpen(true)
  }

  const closeProfileEditor = () => {
    if (isSavingProfile) return
    setIsEditProfileOpen(false)
    setProfileError('')
  }

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedName = profileName.trim()
    if (!trimmedName) {
      setProfileError('Informe um nome para salvar.')
      return
    }

    if (trimmedName === userName) {
      setIsEditProfileOpen(false)
      return
    }

    const userId = localStorage.getItem('user_id')
    if (!userId) {
      setProfileError('Faça login novamente para editar o perfil.')
      return
    }

    setIsSavingProfile(true)
    setProfileError('')
    try {
      const updatedUser = await updateUser(userId, { name: trimmedName })
      const nextName = updatedUser.name || trimmedName
      localStorage.setItem('user_name', nextName)
      setUserName(nextName)
      setIsEditProfileOpen(false)
    } catch (err: unknown) {
      const detail = (err as ApiErrorResponse).response?.data?.detail
      setProfileError(typeof detail === 'string' ? detail : 'Não foi possível atualizar o perfil.')
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    localStorage.removeItem('token')
    setUserName(null)
    setIsProfileOpen(false)
    navigate('/login')
  }

  const trimmedProfileName = profileName.trim()
  const canSaveProfile = trimmedProfileName.length > 0 && trimmedProfileName !== (userName || '').trim()

  return (
    <>
      <header className="h-16 border-b border-brand-border bg-brand-bg/90 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 text-brand-muted hover:text-brand-text transition-colors flex-shrink-0"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle className="flex-shrink-0" />

          {/* Notificações */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false) }}
              className="relative p-2 text-brand-muted hover:text-brand-text transition-colors"
            >
              <Bell size={20} className={isNotifOpen ? 'text-brand-primary' : ''} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-brand-bg shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-brand-card border border-brand-border rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-brand-border flex items-center justify-between">
                  <p className="text-sm font-bold text-brand-text">Notificações</p>
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
                type="button"
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
                <button
                  type="button"
                  onClick={openProfileEditor}
                  className="w-full text-left px-4 py-2 text-sm text-brand-text hover:bg-brand-primary/10 hover:text-brand-primary transition-colors flex items-center gap-2"
                >
                  <User size={15} /> Editar Cliente
                </button>
                <div className="h-px bg-brand-border/50 my-1" />
                <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-brand-critical hover:bg-brand-critical/10 transition-colors flex items-center gap-2">
                  <LogOut size={15} /> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {isEditProfileOpen && userName && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          onMouseDown={closeProfileEditor}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-brand-border bg-brand-card shadow-2xl shadow-slate-950/25"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-editor-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-brand-border bg-brand-sidebar/60 px-5 py-5 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-primary/10 text-brand-primary">
                  <User size={22} />
                </div>
                <div className="min-w-0">
                  <p id="profile-editor-title" className="text-base font-bold text-brand-text">Editar Cliente</p>
                  <p className="mt-1 truncate text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    {userName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeProfileEditor}
                disabled={isSavingProfile}
                className="rounded-lg p-2 text-brand-muted transition-colors hover:bg-brand-border hover:text-brand-text disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Fechar edição de perfil"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-5 p-5 sm:p-6">
              <div className="space-y-2">
                <label htmlFor="profile-name" className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Nome do cliente
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    id="profile-name"
                    type="text"
                    value={profileName}
                    onChange={(event) => {
                      setProfileName(event.target.value)
                      if (profileError) setProfileError('')
                    }}
                    className="w-full rounded-lg border border-brand-border bg-brand-sidebar py-3 pl-10 pr-4 text-sm font-semibold text-brand-text placeholder:text-brand-muted transition-all focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                    placeholder="Ex: Maria Silva"
                    autoComplete="name"
                    autoFocus
                    maxLength={80}
                    disabled={isSavingProfile}
                  />
                </div>
              </div>

              {profileError && (
                <div className="flex items-start gap-2 rounded-lg border border-brand-critical/20 bg-brand-critical/10 p-3 text-xs font-bold text-brand-critical">
                  <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              <div className="flex flex-col-reverse gap-2 border-t border-brand-border pt-5 sm:flex-row sm:justify-end">
                <Button type="button" variant="ghost" size="sm" onClick={closeProfileEditor} disabled={isSavingProfile} className="w-full sm:w-auto">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  icon={isSavingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  disabled={isSavingProfile || !canSaveProfile}
                  className="w-full font-bold sm:w-auto"
                >
                  {isSavingProfile ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
