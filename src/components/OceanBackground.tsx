const OceanBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-fondo overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-azul-marino/20 to-fondo"></div>

            {/* Rayos de luz */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-azul-turquesa/10 to-transparent transform -skew-y-6"></div>

            {/* Burbujas de fondo */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-azul-turquesa/10 animate-float"
                    style={{
                        width: Math.random() * 50 + 10 + 'px',
                        height: Math.random() * 50 + 10 + 'px',
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        animationDuration: Math.random() * 10 + 5 + 's',
                        animationDelay: Math.random() * 5 + 's'
                    }}
                ></div>
            ))}
        </div>
    )
}

export default OceanBackground
