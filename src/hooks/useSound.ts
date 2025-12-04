import { useCallback } from 'react'

export const useSound = () => {
    return useCallback((soundName: string) => {
        // En un entorno real, aquí cargaríamos el audio
        // const audio = new Audio(`/assets/sounds/${soundName}`)
        // audio.volume = 0.3
        // audio.play().catch(() => {})
        console.log(`Playing sound: ${soundName}`)
    }, [])
}
