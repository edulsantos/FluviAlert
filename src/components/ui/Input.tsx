import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
  error?: string
}

const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-brand-sidebar border border-brand-border rounded-lg py-2.5 ${icon ? 'pl-10' : 'pl-4'} pr-4 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-brand-critical mt-1">{error}</span>}
    </div>
  )
}

export default Input
