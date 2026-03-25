import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: ReactNode
}

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = '' 
}: BadgeProps) => {
  const variants = {
    primary: 'bg-green-100 text-green-700 border border-green-200',
    secondary: 'bg-gray-100 text-gray-700 border border-gray-200',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/25',
    warning: 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 shadow-md shadow-amber-500/25',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md shadow-red-500/25',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 
      rounded-xl font-semibold 
      ${variants[variant]} 
      ${sizes[size]} 
      ${className}
    `}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
