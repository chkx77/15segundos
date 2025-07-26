import { useState } from 'react'

export default function Setup({ onStart }) {
  const [step, setStep] = useState('intro') // 'intro', 'numPlayers', 'names'
  const [numPlayers, setNumPlayers] = useState(2)
  const [names, setNames] = useState([])
  const [currentName, setCurrentName] = useState('')

  const handleNumChange = (e) => {
    let val = parseInt(e.target.value)
    if (val < 2) val = 2
    if (val > 8) val = 8
    setNumPlayers(val)
    setNames([])
    setCurrentName('')
  }

  const startNameInput = () => {
    setNames([])
    setCurrentName('')
    setStep('names')
  }

  const handleNameSubmit = () => {
    if (currentName.trim() === '') return
    setNames((prev) => [...prev, currentName.trim()])
    setCurrentName('')
  }

  const onNextName = () => {
    if (currentName.trim() === '') return
    handleNameSubmit()

    if (names.length + 1 === numPlayers) {
      // último nombre cargado, pasamos a empezar el juego
      onStart([...names, currentName.trim()])
    }
  }

  if (step === 'intro') {
    return (
      <div className="game-container" style={{textAlign: 'center'}}>
        <h2>Bienvenido a 15 Segundos</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem', lineHeight: '1.4' }}>
          <strong>Instrucciones:</strong><br />
          - El juego es por turnos. Cada jugador tendrá 15 segundos para responder.<br />
          - Se mostrará un desafío que deberá cumplir rápido.<br />
          - Si no responde a tiempo, pierde el turno.<br />
          - Al finalizar, se pasa al siguiente jugador.<br />
          <br />
          ¡Prepará la lengua y la cabeza para pensar rápido!
        </p>
        <button onClick={() => setStep('numPlayers')}>Empezar</button>
      </div>
    )
  }

  if (step === 'numPlayers') {
    return (
      <div className="game-container">
        <h2>Configuración</h2>
        <label>
          Cantidad de jugadores (2-8):
          <input
            type="number"
            min="2"
            max="8"
            value={numPlayers}
            onChange={handleNumChange}
            className="input-number"
          />
        </label>
        <button onClick={startNameInput} style={{ marginTop: '1.2rem' }}>
          Siguiente
        </button>
      </div>
    )
  }

  if (step === 'names') {
    return (
      <div className="game-container">
        <h2>Nombre jugador {names.length + 1} de {numPlayers}</h2>
        <input
          type="text"
          placeholder={`Nombre jugador ${names.length + 1}`}
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          className="input-text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') onNextName()
          }}
          autoFocus
        />
        <button
          disabled={currentName.trim() === ''}
          onClick={onNextName}
          style={{ marginTop: '1rem' }}
        >
          {names.length + 1 === numPlayers ? 'Empezar juego' : 'Siguiente'}
        </button>
      </div>
    )
  }

  return null
}
