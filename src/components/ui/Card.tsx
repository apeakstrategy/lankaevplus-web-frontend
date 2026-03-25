import { ReactNode, forwardRef, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'glass' | 'bordered' | 'hover'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className = '', 
    variant = 'default',
    padding = 'md',
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-dark-900 border border-white/5',
      glass: 'bg-dark-800/50 backdrop-blur-xl border border-white/10',
      bordered: 'bg-dark-900/50 border border-white/10',
      hover: 'bg-dark-900 border border-white/5 hover:border-primary-500/30 transition-colors cursor-pointer',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={`rounded-lg ${variants[variant]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
