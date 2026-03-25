interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }
  
  return (
    <div 
      className={`inline-block animate-spin rounded-full border-b-2 border-green-600 ${sizes[size]} ${className}`} 
      role="status" 
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner

