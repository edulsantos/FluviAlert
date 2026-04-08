import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  icon?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`brand-card p-6 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <span className="text-brand-primary">{icon}</span>}
          {title && <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-muted">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
