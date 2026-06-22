import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { applyTheme, getStoredTheme, saveTheme } from '../../utils/theme'
import type { Theme } from '../../utils/theme'

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())
  const isLight = theme === 'light'
  const label = isLight ? 'Ativar modo escuro' : 'Ativar modo claro'

  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border bg-brand-card text-brand-muted shadow-sm transition-all hover:border-brand-primary/50 hover:bg-brand-primary/10 hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 ${className}`}
      aria-label={label}
      title={label}
    >
      {isLight ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}

export default ThemeToggle
