import { useState } from 'react'
import NeonLogo from './NeonLogo'

const AgeVerification = ({ onVerify }: { onVerify: () => void }) => {
    const [ageVerified, setAgeVerified] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    const verifyAge = () => {
        setAgeVerified(true)
        onVerify()
    }

    const decline = () => {
        setShowWarning(true)
    }

    if (ageVerified) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-dorado rounded-2xl p-8 max-w-2xl w-full relative overflow-hidden">

                {/* Efecto neon en bordes */}
                <div className="absolute inset-0 border-4 border-azul-turquesa opacity-30 rounded-2xl animate-pulse"></div>

                <div className="relative z-10 text-center">
                    <NeonLogo size="large" />

                    <div className="my-8">
                        <h1 className="text-4xl font-bold text-dorado mb-4 animate-pulse">
                            🐚 ¡ALTO AHÍ, JOVEN GAMBA! 🐚
                        </h1>

                        <div className="bg-black bg-opacity-50 p-6 rounded-xl mb-6">
                            <p className="text-xl text-azul-turquesa mb-4">
                                <span className="text-rojo font-bold">"APUESTA Y REZA"</span> es solo para almejas adultas
                            </p>

                            <div className="space-y-3 text-lg text-gray-300">
                                <p>• Debes tener al menos <span className="text-dorado font-bold">18 conchas</span> de edad</p>
                                <p>• Juega responsablemente, como una almeja sabia</p>
                                <p>• Las apuestas son en conchas de oro virtuales</p>
                                <p>• Si pierdes, no culpes a las corrientes marinas</p>
                            </div>

                            <div className="mt-6 p-4 bg-rojo bg-opacity-20 border border-rodo rounded-lg">
                                <p className="text-sm italic">
                                    "El mar es traicionero, y las apuestas más.
                                    Solo los cangrejos con pinzas maduras pueden jugar aquí."
                                </p>
                            </div>
                        </div>

                        {showWarning && (
                            <div className="mb-6 p-4 bg-rojo bg-opacity-30 border border-rojo rounded-lg animate-shake">
                                <p className="text-xl text-white">
                                    🚫 ¡Vuelve cuando tengas más perlas en tu collar!
                                </p>
                                <p className="text-sm mt-2">
                                    Mientras tanto, puedes jugar con caracoles en la orilla.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={verifyAge}
                                className="bg-gradient-to-r from-azul-marino to-azul-turquesa hover:from-azul-turquesa hover:to-azul-marino text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-azul-turquesa/50"
                            >
                                🎲 SOY UNA ALMEJA ADULTA 🎲
                            </button>

                            <button
                                onClick={decline}
                                className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-gray-300 font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 border border-gray-600"
                            >
                                🐡 SOY UN PECECITO JOVEN 🐡
                            </button>
                        </div>

                        <p className="mt-6 text-sm text-gray-400">
                            Al confirmar, juras que eres mayor de edad y aceptas que
                            las almejas pueden ser impredecibles en sus decisiones.
                        </p>
                    </div>
                </div>

                {/* Elementos decorativos submarinos */}
                <div className="absolute bottom-4 left-4 text-3xl">🐚</div>
                <div className="absolute top-4 right-4 text-3xl">🦀</div>
                <div className="absolute top-1/2 left-10 text-2xl">🦐</div>
                <div className="absolute bottom-10 right-10 text-2xl">🐙</div>
            </div>
        </div>
    )
}

export default AgeVerification
