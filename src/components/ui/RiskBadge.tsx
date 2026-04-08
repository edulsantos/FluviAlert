import React from 'react'
import type { RiskLevel } from '../../types'
import { riskConfig } from '../../utils/riskUtils'

interface RiskBadgeProps {
  level: RiskLevel
  className?: string
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '' }) => {
  const config = riskConfig[level]
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${config.color} ${config.bgColor} border border-current opacity-80 ${className}`}>
      {config.label}
    </span>
  )
}

export default RiskBadge
