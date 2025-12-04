const Footer = () => {
    return (
        <footer className="bg-black/80 border-t border-azul-turquesa/20 mt-20 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-dorado font-bold text-xl mb-4">La Ostra Dura</h3>
                        <p className="text-gray-400">
                            El casino submarino más exclusivo de los siete mares.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Juegos</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Pelea de Conchas</li>
                            <li>Ruleta de Perlas</li>
                            <li>Póker de Cangrejos</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Términos y Condiciones</li>
                            <li>Juego Responsable</li>
                            <li>Política de Privacidad</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Contacto</h4>
                        <p className="text-gray-400">soporte@laostradura.sea</p>
                        <div className="flex space-x-4 mt-4 text-2xl">
                            <span>🐦</span>
                            <span>📸</span>
                            <span>💬</span>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500">
                    <p>© 2025 La Ostra Dura. Todos los derechos reservados bajo el mar.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
