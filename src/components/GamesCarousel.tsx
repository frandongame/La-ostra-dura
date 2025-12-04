import { useState, useEffect, useRef } from 'react'
import { useSound } from '../hooks/useSound'

const GamesCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [autoScroll, setAutoScroll] = useState(true)
    const carouselRef = useRef<HTMLDivElement>(null)
    const playSound = useSound()

    const games = [
        {
            id: 1,
            name: "Pelea de Conchas",
            description: "Almejas gladiadoras en combate mortal",
            emoji: "⚔️",
            color: "from-dorado to-rojo",
            players: "2 almejas, 1 ganador",
            minBet: 50
        },
        {
            id: 2,
            name: "Ruleta de Perlas",
            description: "Gira la concha y gana perlas preciosas",
            emoji: "🎡",
            color: "from-azul-turquesa to-azul-marino",
            players: "Multijugador",
            minBet: 10
        },
        {
            id: 3,
            name: "Póker de Cangrejos",
            description: "Bluffea como un cangrejo ermitaño",
            emoji: "🃏",
            color: "from-rojo to-dorado",
            players: "4-8 jugadores",
            minBet: 100
        },
        {
            id: 4,
            name: "Carreras de Caballitos",
            description: "Apostá al caballito de mar más rápido",
            emoji: "🐎",
            color: "from-azul-marino to-azul-turquesa",
            players: "6 corredores",
            minBet: 20
        },
        {
            id: 5,
            name: "Blackjack del Abismo",
            description: "21 con tentáculos incluidos",
            emoji: "🐙",
            color: "from-purple-600 to-pink-600",
            players: "Contra la casa",
            minBet: 25
        },
        {
            id: 6,
            name: "Bingo Marino",
            description: "Cantá bingo con peces de colores",
            emoji: "🎰",
            color: "from-green-500 to-emerald-600",
            players: "Sala completa",
            minBet: 5
        }
    ]

    useEffect(() => {
        if (!autoScroll) return

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % games.length)
            playSound('slide.mp3')
        }, 4000)

        return () => clearInterval(interval)
    }, [autoScroll])

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % games.length)
        playSound('click.mp3')
    }

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + games.length) % games.length)
        playSound('click.mp3')
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
        playSound('click.mp3')
    }

    return (
        <div
            className="relative max-w-6xl mx-auto"
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
        >
            {/* Título del carrusel */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-dorado mb-2">
                    🎮 ARSENAL DE JUEGOS SUBMARINOS
                </h2>
                <p className="text-xl text-azul-turquesa">
                    Elige tu veneno marino
                </p>
            </div>

            {/* Carrusel principal */}
            <div ref={carouselRef} className="overflow-hidden rounded-3xl">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {games.map((game, index) => (
                        <div
                            key={game.id}
                            className="w-full flex-shrink-0 p-4"
                        >
                            <div className={`bg-gradient-to-br ${game.color} p-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105`}>
                                <div className="text-center">
                                    {/* Emoji gigante */}
                                    <div className="text-9xl mb-6 animate-float">{game.emoji}</div>

                                    {/* Información del juego */}
                                    <h3 className="text-5xl font-bold mb-4 text-white">{game.name}</h3>
                                    <p className="text-2xl mb-6 text-gray-200">{game.description}</p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-black bg-opacity-40 p-4 rounded-xl">
                                            <p className="text-sm text-gray-300">Jugadores</p>
                                            <p className="text-2xl font-bold text-white">{game.players}</p>
                                        </div>
                                        <div className="bg-black bg-opacity-40 p-4 rounded-xl">
                                            <p className="text-sm text-gray-300">Apuesta Mínima</p>
                                            <p className="text-2xl font-bold text-dorado">${game.minBet}</p>
                                        </div>
                                    </div>

                                    {/* Botón de jugar */}
                                    <button className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white font-bold py-4 px-12 rounded-full text-2xl transition-all duration-300 border-2 border-white border-opacity-30 hover:border-opacity-100">
                                        🐚 JUGAR AHORA
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controles del carrusel */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-10 transition-all duration-300 hover:scale-110"
            >
                ◀
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-10 transition-all duration-300 hover:scale-110"
            >
                ▶
            </button>

            {/* Indicadores */}
            <div className="flex justify-center mt-8 space-x-3">
                {games.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-dorado scale-125'
                                : 'bg-gray-600 hover:bg-gray-400'
                            }`}
                        aria-label={`Ir al juego ${index + 1}`}
                    />
                ))}
            </div>

            {/* Miniaturas de juegos */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-8">
                {games.map((game, index) => (
                    <button
                        key={game.id}
                        onClick={() => goToSlide(index)}
                        className={`p-4 rounded-xl transition-all duration-300 ${index === currentIndex
                                ? 'ring-4 ring-dorado scale-105'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                    >
                        <div className="text-center">
                            <div className="text-3xl mb-2">{game.emoji}</div>
                            <p className="text-sm font-bold truncate">{game.name}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default GamesCarousel
