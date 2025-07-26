import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import relojSfx from '../sounds/reloj.mp3'

export default function Timer({ onEnd, className }) {
  const [timeLeft, setTimeLeft] = useState(15)
  const [exploding, setExploding] = useState(false)
  const [playTick] = useSound(relojSfx, { volume: 0.4 })

  useEffect(() => {
    if (timeLeft === 0) {
      setExploding(true)
      setTimeout(() => {
        setExploding(false)
        onEnd()
        setTimeLeft(15) // reset para próxima vez
      }, 500)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1)
      playTick()
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, onEnd, playTick])

  return (
    <div className={`${className} timer ${exploding ? 'explode' : ''}`}>
      {timeLeft}
    </div>
  )
}
