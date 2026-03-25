import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'dark' | 'darker' | 'gray' | 'gradient'
  id?: string
}

const Section = ({ 
  children, 
  className = '', 
  background = 'dark',
  id 
}: SectionProps) => {
  const backgrounds = {
    dark: 'bg-dark-950',
    darker: 'bg-dark-900',
    gray: 'bg-dark-900',
    gradient: 'bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950',
  }

  return (
    <section 
      id={id}
      className={`relative ${backgrounds[background]} ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

export default Section
