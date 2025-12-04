import { useEffect, useState } from 'react'
import { useSound } from '../hooks/useSound'

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState(0)
    const [showOcean, setShowOcean] = useState(false)
    const [showTitle, setShowTitle] = useState(false)
    const [showSubtitle, setShowSubtitle] = useState(false)
    const playSound = useSound()

    useEffect(() => {
        const sequence = async () => {
            // Paso 1: Aparece el océano
            await new Promise(resolve => setTimeout(resolve, 500))
            setShowOcean(true)
            playSound('ocean-waves.mp3')

            // Paso 2: Burbujas
            await new Promise(resolve => setTimeout(resolve, 1000))
            setStep(1)

            // Paso 3: Título
            await new Promise(resolve => setTimeout(resolve, 800))
            setShowTitle(true)
            playSound('trumpet.mp3')

            // Paso 4: Subtítulo
            await new Promise(resolve => setTimeout(resolve, 600))
            setShowSubtitle(true)

            // Paso 5: Almejas nadando
            await new Promise(resolve => setTimeout(resolve, 1200))
            setStep(2)

            // Paso 6: Finalizar
            await new Promise(resolve => setTimeout(resolve, 1500))
            onComplete()
        }

        sequence()
    }, [])

    return (
        <div className="fixed inset-0 bg-fondo z-40 flex items-center justify-center overflow-hidden">

            {/* Fondo oceánico animado */}
            <div className={`absolute inset-0 transition-opacity duration-2000 ${showOcean ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-azul-marino to-fondo"></div>

                {/* Olas animadas */}
                <div className="absolute bottom-0 w-full h-32 bg-azul-turquesa opacity-20 animate-wave"></div>
                <div className="absolute bottom-4 w-full h-24 bg-azul-turquesa opacity-15 animate-wave-slow"></div>
            </div>

            {/* Burbujas */}
            {step >= 1 && (
                <>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-4 h-4 rounded-full bg-azul-turquesa opacity-40 animate-bubble"
                            style={{
                                left: `${Math.random() * 100}%`,
                                bottom: '-20px',
                                animationDelay: `${i * 0.2}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </>
            )}

            {/* Contenido central */}
            <div className="relative z-10 text-center">

                {/* Logo con animación */}
                <div className="mb-12">
                    <div className={`transform transition-all duration-1000 ${showTitle ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                        <h1 className="text-8xl font-bold mb-4">
                            <span className="text-dorado animate-glow">🐚</span>
                            <span className="bg-gradient-to-r from-dorado via-rojo to-azul-turquesa bg-clip-text text-transparent animate-gradient">
                                LA OSTRA DURA
                            </span>
                            <span className="text-azul-turquesa animate-glow-slow">🐚</span>
                        </h1>
                    </div>

                    <div className={`transform transition-all duration-1000 delay-300 ${showSubtitle ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="text-3xl italic text-rojo animate-pulse">
                            "Apuesta y Reza (que gane tu almeja)"
                        </p>
                    </div>
                </div>

                {/* Almejas nadando */}
                {step >= 2 && (
                    <div className="flex justify-center space-x-12 mb-12">
                        {['🐚', '🦪', '🐌', '🦐', '🦀'].map((emoji, i) => (
                            <div
                                key={i}
                                className="text-5xl animate-swim"
                                style={{ animationDelay: `${i * 0.3}s` }}
                            >
                                {emoji}
                            </div>
                        ))}
                    </div>
                )}

                {/* Mensaje de carga */}
                <div className="mt-12">
                    <div className="inline-flex items-center space-x-4 bg-black bg-opacity-50 px-8 py-4 rounded-full">
                        <div className="w-4 h-4 bg-dorado rounded-full animate-pulse"></div>
                        <p className="text-xl text-azul-turquesa">
                            Sumergiéndose en las profundidades del azar...
                        </p>
                        <div className="w-4 h-4 bg-azul-turquesa rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-4 h-4 bg-rojo rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>

            {/* Efectos de partículas */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-azul-turquesa rounded-full animate-twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default IntroAnimation
