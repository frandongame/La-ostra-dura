import { useState, useEffect } from 'react'
import { useSound } from '../hooks/useSound'

interface Notification {
    id: number
    type: 'win' | 'loss' | 'info' | 'warning'
    title: string
    message: string
    emoji: string
    duration: number
}

const NotificationPopup = () => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const playSound = useSound()

    // Notificaciones predefinidas
    const predefinedNotifications = [
        {
            id: 1,
            type: 'win' as const,
            title: '¡GRAN VICTORIA!',
            message: 'CangrejoDorado ganó 5,000 conchas en la Ruleta',
            emoji: '🎉',
            duration: 5000
        },
        {
            id: 2,
            type: 'info' as const,
            title: 'NUEVO TORNEO',
            message: 'Torneo de Almejas Gigantes comienza en 1 hora',
            emoji: '🏆',
            duration: 4000
        },
        {
            id: 3,
            type: 'warning' as const,
            title: 'APUESTA RÉCORD',
            message: 'Alguien acaba de apostar 10,000 conchas',
            emoji: '💰',
            duration: 3000
        },
        {
            id: 4,
            type: 'win' as const,
            title: 'RACHA CALIENTE',
            message: 'PulpoLoco lleva 8 victorias seguidas',
            emoji: '🔥',
            duration: 3500
        }
    ]

    // Mostrar notificaciones aleatorias
    useEffect(() => {
        const showRandomNotification = () => {
            const randomNotif = predefinedNotifications[
                Math.floor(Math.random() * predefinedNotifications.length)
            ]

            const newNotification = {
                ...randomNotif,
                id: Date.now()
            }

            setNotifications(prev => [...prev, newNotification])
            playSound('notification.mp3')

            // Eliminar después de la duración
            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
            }, newNotification.duration)
        }

        // Intervalo aleatorio entre 10-30 segundos
        const interval = setInterval(() => {
            if (Math.random() > 0.3) { // 70% de probabilidad
                showRandomNotification()
            }
        }, 10000 + Math.random() * 20000)

        return () => clearInterval(interval)
    }, [])

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'win': return 'border-green-500 bg-green-900 bg-opacity-30'
            case 'loss': return 'border-red-500 bg-red-900 bg-opacity-30'
            case 'warning': return 'border-dorado bg-yellow-900 bg-opacity-30'
            case 'info': return 'border-azul-turquesa bg-blue-900 bg-opacity-30'
            default: return 'border-gray-500 bg-gray-900 bg-opacity-30'
        }
    }

    const getIconColor = (type: Notification['type']) => {
        switch (type) {
            case 'win': return 'text-green-400'
            case 'loss': return 'text-red-400'
            case 'warning': return 'text-dorado'
            case 'info': return 'text-azul-turquesa'
            default: return 'text-gray-400'
        }
    }

    return (
        <div className="fixed top-4 right-4 z-20 space-y-4">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`
            animate-slide-in-right
            ${getNotificationColor(notification.type)}
            border-l-4 p-4 rounded-r-lg shadow-2xl 
            min-w-80 max-w-md transform transition-all duration-300
            hover:scale-105 cursor-pointer
          `}
                    onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                >
                    <div className="flex items-start space-x-3">
                        <div className={`text-3xl ${getIconColor(notification.type)}`}>
                            {notification.emoji}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-white">{notification.title}</h3>
                                <button className="text-gray-400 hover:text-white">
                                    ✕
                                </button>
                            </div>

                            <p className="text-gray-300 mt-1">{notification.message}</p>

                            {/* Progress bar */}
                            <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white animate-progress"
                                    style={{
                                        animationDuration: `${notification.duration}ms`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NotificationPopup
