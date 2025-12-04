import { useState } from 'react'
import AgeVerification from './components/AgeVerification'
import IntroAnimation from './components/IntroAnimation'
import NeonLogo from './components/NeonLogo'
import Navbar from './components/Navbar'
import GamesCarousel from './components/GamesCarousel'
import ClamFightArena from './components/ClamFightArena'
import NotificationPopup from './components/NotificationPopup'
import LiveStreamButton from './components/LiveStreamButton'
import OceanBackground from './components/OceanBackground'
import Footer from './components/Footer'
import './styles/globals.css'

function App() {
    const [ageVerified, setAgeVerified] = useState(false)
    const [introCompleted, setIntroCompleted] = useState(false)

    if (!ageVerified) {
        return <AgeVerification onVerify={() => setAgeVerified(true)} />
    }

    if (!introCompleted) {
        return <IntroAnimation onComplete={() => setIntroCompleted(true)} />
    }

    return (
        <>
            <OceanBackground />
            <NotificationPopup />
            <LiveStreamButton />

            <div className="min-h-screen relative z-10">
                <Navbar />

                <main className="container mx-auto px-4 py-8">
                    {/* Header principal */}
                    <header className="text-center mb-12">
                        <NeonLogo size="large" />
                        <p className="text-xl text-azul-turquesa mt-4 animate-pulse">
                            Donde las almejas más duras se enfrentan por la gloria... y tus apuestas
                        </p>
                    </header>

                    {/* Sección de juegos destacados */}
                    <section className="mb-16">
                        <GamesCarousel />
                    </section>

                    {/* Arena de peleas principal */}
                    <section className="mb-16">
                        <h2 className="text-4xl font-bold text-center text-dorado mb-8">
                            ⚔️ ARENA DE COMBATE SUBMARINO ⚔️
                        </h2>
                        <ClamFightArena />
                    </section>

                    {/* Otros juegos */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-center text-azul-turquesa mb-8">
                            🎲 MÁS FORMAS DE APOSTAR 🎲
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Aquí van los otros juegos */}
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-dorado transition-colors">
                                <div className="text-4xl mb-4">🃏</div>
                                <h3 className="text-xl font-bold text-white mb-2">Póker de Cangrejos</h3>
                                <p className="text-gray-400">Mesas VIP disponibles</p>
                            </div>
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-dorado transition-colors">
                                <div className="text-4xl mb-4">🎰</div>
                                <h3 className="text-xl font-bold text-white mb-2">Bingo Marino</h3>
                                <p className="text-gray-400">Jackpot acumulado: 50,000</p>
                            </div>
                            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-dorado transition-colors">
                                <div className="text-4xl mb-4">🐎</div>
                                <h3 className="text-xl font-bold text-white mb-2">Carreras</h3>
                                <p className="text-gray-400">Caballitos de mar pura sangre</p>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    )
}

export default App
