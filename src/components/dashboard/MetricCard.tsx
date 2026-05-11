import React from 'react'

interface MetricCardProps {
  label: string
  value: string
  unit?: string
  icon: React.ReactNode
  className?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  unit, 
  icon, 
  className = '' 
}) => {
  return (
    <div className={`p-6 bg-brand-card border border-brand-border rounded-xl flex items-center gap-4 hover:border-brand-primary/50 transition-colors group ${className}`}>
      <div className="p-3 bg-brand-bg rounded-lg text-brand-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-1">{label}</h4>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-white">{value}</span>
          {unit && <span className="text-xs font-semibold text-brand-muted">{unit}</span>}
        </div>
      </div>
    </div>
  )
}

export default MetricCard
