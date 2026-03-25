interface AvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
  className?: string
}

const Avatar = ({ src, alt, size = 'md', name, className = '' }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }
  
  if (src) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    )
  }
  
  // Fallback to initials
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
  return (
    <div className={`${sizes[size]} rounded-full bg-green-600 text-white flex items-center justify-center font-semibold ${className}`}>
      {initials}
    </div>
  )
}

export default Avatar

