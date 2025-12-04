import NeonLogo from './NeonLogo'

const Navbar = () => {
    return (
        <nav className="bg-black/50 backdrop-blur-md border-b border-azul-turquesa/20 sticky top-0 z-30">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="scale-50 origin-left">
                    <NeonLogo size="small" />
                </div>

                <div className="flex items-center space-x-6">
                    <button className="text-gray-300 hover:text-white transition-colors">Juegos</button>
                    <button className="text-gray-300 hover:text-white transition-colors">Torneos</button>
                    <button className="text-gray-300 hover:text-white transition-colors">VIP</button>

                    <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full border border-dorado/50">
                        <span>💰</span>
                        <span className="text-dorado font-bold">1,000</span>
                    </div>

                    <button className="bg-gradient-to-r from-azul-marino to-azul-turquesa text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">
                        Conectar
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
