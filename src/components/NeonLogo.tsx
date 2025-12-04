import { useEffect, useState } from 'react'

const NeonLogo = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
    const [glow, setGlow] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setGlow(prev => !prev)
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    const sizes = {
        small: 'text-3xl',
        medium: 'text-5xl',
        large: 'text-7xl'
    }

    return (
        <div className="relative inline-block">
            <div className={`${sizes[size]} font-bold`}>
                <span className={`
          relative
          ${glow ? 'text-dorado' : 'text-azul-turquesa'}
          transition-all duration-1000
        `}>
                    🐚 LA OSTRA DURA
                </span>
            </div>

            {/* Efecto de neón */}
            <div className={`
        absolute inset-0 blur-lg opacity-60
        ${glow ? 'bg-dorado' : 'bg-azul-turquesa'}
        transition-all duration-1000
        -z-10
      `}></div>

            {/* Tubo de neón animado */}
            <div className="absolute -inset-2 border-4 border-dorado rounded-full animate-ping opacity-20"></div>

            {/* Eslogan */}
            <div className="text-center mt-2">
                <p className="text-sm italic text-rojo animate-pulse">
                    "Apuesta y Reza (que gane tu almeja)"
                </p>
            </div>
        </div>
    )
}

export default NeonLogo
