import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, MapPin, BellRing, Info, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard',           icon: <LayoutDashboard size={18} />, path: '/' },
    { name: 'Áreas de Risco',      icon: <MapPin size={18} />,          path: '/risk-areas' },
    { name: 'Cadastro para Alertas', icon: <BellRing size={18} />,      path: '/alerts' },
    { name: 'Sobre Nós',           icon: <Info size={18} />,            path: '/about' },
  ]

  return (
    <>
      {/* Backdrop – mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar – sempre fixed, largura fixa w-64 */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64
          flex flex-col
          bg-brand-sidebar border-r border-brand-border
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex-shrink-0 px-6 py-8 flex items-center gap-4 justify-between border-b border-brand-border/30 mb-2">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="FA Logo" className="w-10 h-10 rounded-xl shadow-md" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-brand-muted bg-clip-text text-transparent leading-none">
                FluviAlert
              </h1>
              <p className="text-xs uppercase tracking-wider text-brand-muted font-semibold mt-1">
                Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 -mr-2 text-brand-muted hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav – rola se necessário */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary pl-[14px]'
                  : 'text-brand-muted hover:bg-brand-card hover:text-brand-text'}`
              }
            >
              <span className={location.pathname === item.path ? 'text-brand-primary' : 'text-brand-muted'}>
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Status do sistema */}
        <div className="flex-shrink-0 p-4">
          <div className="rounded-xl border border-brand-border/50 bg-brand-bg/50 p-4">
            <p className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-2">
              Status do Sistema
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-safe shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-xs font-semibold text-brand-safe">Operacional</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
