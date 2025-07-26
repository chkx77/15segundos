import { useState, useEffect } from 'react'
import { challenges } from '../data/Challenges'
import Timer from './Timer'
import useSound from 'use-sound'
import startSfx from '../sounds/start.mp3'
import failSfx from '../sounds/fail.mp3'
import clickSfx from '../sounds/click.mp3'

export default function Game({ players, onRestart }) {
  const [playing, setPlaying] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState('')
  const [playerTurn, setPlayerTurn] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [animate, setAnimate] = useState(false)

  const [playStart] = useSound(startSfx, { volume: 0.5 })
  const [playFail] = useSound(failSfx, { volume: 0.5 })
  const [playClick] = useSound(clickSfx, { volume: 0.5 })

  const startChallenge = () => {
    playStart()
    const random = challenges[Math.floor(Math.random() * challenges.length)]
    setCurrentChallenge(random)
    setPlaying(true)
    setShowResult(false)
    setAnimate(true)
  }

  useEffect(() => {
    if (!playing) setAnimate(false)
  }, [playing])

  const handleTimerEnd = () => {
    playFail()
    setPlaying(false)
    setShowResult(true)
  }

  const nextPlayer = () => {
    playClick()
    setPlayerTurn((prev) => (prev + 1) % players.length)
    setCurrentChallenge('')
    setShowResult(false)
  }

  return (
    <div className="game-container">
      <h2>Turno de {players[playerTurn]}</h2>

      {!playing && !currentChallenge && (
        <button onClick={startChallenge}>¿Estás listo?</button>
      )}

      {currentChallenge && (
        <>
          <p className={`challenge-text ${animate ? 'zoomIn' : ''}`}>
            {currentChallenge}
          </p>
          {playing && <Timer onEnd={handleTimerEnd} className={animate ? 'zoomIn' : ''} />}
          {showResult && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1.5rem',
              }}
            >
              <button onClick={nextPlayer} style={{ flex: 1, maxWidth: 180 }}>
                Siguiente jugador
              </button>
              <button onClick={onRestart} style={{ flex: 1, maxWidth: 180 }}>
                Reiniciar juego
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
