import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'ghost'
  className?: string
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'ghost', 
  className = '' 
}) => {
  const variants = {
    primary: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
    success: 'bg-brand-safe/10 text-brand-safe border border-brand-safe/20',
    warning: 'bg-brand-warning/10 text-brand-warning border border-brand-warning/20',
    danger: 'bg-brand-critical/10 text-brand-critical border border-brand-critical/20',
    ghost: 'bg-brand-border text-brand-muted border border-brand-border',
  }

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1.5 ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
