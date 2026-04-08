import React from 'react'
import { TrendingUp } from 'lucide-react'

interface SafetyGaugeProps {
  percentage: number
  trend: string
}

const SafetyGauge: React.FC<SafetyGaugeProps> = ({ percentage, trend }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-brand-card border border-brand-border rounded-xl h-full relative overflow-hidden group">
      <div className="absolute top-4 left-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Nível Global de Segurança</h3>
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90 transform">
          <circle
            className="text-brand-border"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="70"
            cx="96"
            cy="96"
          />
          <circle
            className="text-brand-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={2 * Math.PI * 70 * (1 - percentage / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="70"
            cx="96"
            cy="96"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-white tracking-tighter">{percentage}%</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-brand-safe font-bold text-xs">
        <TrendingUp size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        {trend}
      </div>
    </div>
  )
}

export default SafetyGauge
