import { useState, useEffect } from 'react'
import { useSound } from '../hooks/useSound'

const LiveStreamButton = () => {
    const [isLive, setIsLive] = useState(true)
    const [viewers, setViewers] = useState(1247)
    const [showStream, setShowStream] = useState(false)
    const playSound = useSound()

    // Simular cambios en viewers
    useEffect(() => {
        const interval = setInterval(() => {
            setViewers(prev => {
                const change = Math.floor(Math.random() * 10) - 3
                return Math.max(1000, prev + change)
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const toggleStream = () => {
        playSound('camera.mp3')
        setShowStream(!showStream)
    }

    return (
        <>
            {/* Botón flotante de LIVE */}
            <button
                onClick={toggleStream}
                className="fixed bottom-8 right-8 z-30 group"
            >
                <div className="relative">
                    {/* Indicador LIVE animado */}
                    <div className="absolute -top-2 -right-2">
                        <div className="relative">
                            <span className="flex h-6 w-6">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rojo opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-6 w-6 bg-rojo justify-center items-center">
                                    <span className="text-xs font-bold text-white">LIVE</span>
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Botón principal */}
                    <div className="bg-gradient-to-r from-rojo to-dorado p-4 rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">📹</div>
                            <div className="text-left">
                                <p className="font-bold text-white">DIRECTO</p>
                                <p className="text-xs text-white opacity-80">{viewers.toLocaleString()} espectadores</p>
                            </div>
                        </div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap">
                            ¡Mira las peleas en vivo!
                        </div>
                        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                </div>
            </button>

            {/* Ventana del stream */}
            {showStream && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-90 flex items-center justify-center p-4">
                    <div className="relative bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full">
                        {/* Header del stream */}
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-rojo rounded-full animate-pulse"></div>
                                    <span className="text-white font-bold">EN VIVO</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">👁️</span>
                                    <span className="text-white font-bold">{viewers.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowStream(false)}
                                className="text-white hover:text-gray-300 text-2xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Video del stream */}
                        <div className="aspect-video bg-black relative">
                            {/* Placeholder del video */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-9xl mb-4 animate-pulse">🎥</div>
                                    <p className="text-2xl text-white">STREAM EN DIRECTO</p>
                                    <p className="text-gray-400 mt-2">Peleas de almejas 24/7</p>

                                    {/* Simulación de comentaristas */}
                                    <div className="mt-8 bg-gray-800 p-4 rounded-lg max-w-md mx-auto">
                                        <div className="flex items-start space-x-3">
                                            <div className="text-3xl">🐙</div>
                                            <div>
                                                <p className="text-white font-bold">Comentarista Octopus:</p>
                                                <p className="text-gray-300 italic">
                                                    "¡Almejandro Magno está arrasando! ¡Qué contundencia de concha!"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Overlay de información */}
                            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-3 rounded-lg">
                                <p className="text-white font-bold">⚔️ PELEA ACTUAL ⚔️</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">🐚</span>
                                        <span className="text-white">Almejandro Magno</span>
                                    </div>
                                    <span className="text-dorado font-bold">VS</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">⚡</span>
                                        <span className="text-white">Pearl Harbor</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat del stream */}
                        <div className="bg-gray-800 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold">💬 CHAT EN VIVO</h3>
                                <button className="text-sm text-azul-turquesa hover:text-azul-turquesa/80">
                                    Conectar chat
                                </button>
                            </div>

                            <div className="space-y-3 max-h-48 overflow-y-auto">
                                {[
                                    { user: "CangrejoLoco", message: "¡Vamos Almejandro!", color: "text-dorado" },
                                    { user: "PulpoApostador", message: "Pearl va a ganar, lo siento", color: "text-azul-turquesa" },
                                    { user: "TiburónVIP", message: "Aposté 5000 conchas", color: "text-rojo" },
                                    { user: "MedusaFeliz", message: "¡Qué emoción! 🎉", color: "text-purple-400" },
                                    { user: "Caballito69", message: "Alguien más apuesta por el empate?", color: "text-green-400" }
                                ].map((msg, i) => (
                                    <div key={i} className="flex items-start space-x-2 animate-fade-in">
                                        <span className={`font-bold ${msg.color}`}>{msg.user}:</span>
                                        <span className="text-gray-300">{msg.message}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Input del chat */}
                            <div className="mt-4 flex">
                                <input
                                    type="text"
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
                                />
                                <button className="bg-dorado text-white px-4 py-2 rounded-r-lg font-bold hover:bg-dorado/90 transition">
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LiveStreamButton
