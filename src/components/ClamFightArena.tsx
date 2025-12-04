import { useState } from 'react'
import { clamNames } from '../utils/clamNames'

const ClamFightArena = () => {
    const [fighter1] = useState(clamNames.fighters[0])
    const [fighter2] = useState(clamNames.fighters[1])

    return (
        <div className="bg-black/40 border border-azul-turquesa/30 rounded-3xl p-8 max-w-5xl mx-auto backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Luchador 1 */}
                <div className="text-center flex-1">
                    <div className="text-6xl mb-4 animate-float">🐚</div>
                    <h3 className="text-2xl font-bold text-dorado">{fighter1}</h3>
                    <p className="text-gray-400">"El Triturador"</p>
                    <div className="mt-4 bg-red-900/50 rounded-full h-4 overflow-hidden">
                        <div className="bg-red-500 h-full w-[80%]"></div>
                    </div>
                </div>

                {/* VS */}
                <div className="text-center">
                    <div className="text-4xl font-bold text-rojo animate-pulse">VS</div>
                    <div className="mt-2 text-dorado font-bold">EN VIVO</div>
                </div>

                {/* Luchador 2 */}
                <div className="text-center flex-1">
                    <div className="text-6xl mb-4 animate-float" style={{ animationDelay: '1s' }}>🦪</div>
                    <h3 className="text-2xl font-bold text-dorado">{fighter2}</h3>
                    <p className="text-gray-400">"La Perla Negra"</p>
                    <div className="mt-4 bg-red-900/50 rounded-full h-4 overflow-hidden">
                        <div className="bg-red-500 h-full w-[90%]"></div>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <button className="bg-rojo hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors shadow-lg shadow-red-900/50">
                    APOSTAR AHORA
                </button>
            </div>
        </div>
    )
}

export default ClamFightArena
