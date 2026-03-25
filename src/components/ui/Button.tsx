import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ev' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'
    
    const variants = {
      primary: 'bg-white text-dark-950 hover:bg-dark-100 uppercase tracking-wider',
      secondary: 'bg-transparent text-white border border-white/50 hover:bg-white/10 hover:border-white uppercase tracking-wider',
      outline: 'bg-transparent text-white border border-white/30 hover:bg-white/5 hover:border-white/50',
      ev: 'bg-gradient-to-r from-primary-500 to-primary-600 text-dark-950 hover:from-primary-400 hover:to-primary-500 shadow-lg shadow-primary-500/25 rounded-lg',
      ghost: 'bg-transparent text-dark-400 hover:text-white hover:bg-white/5',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-sm',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
