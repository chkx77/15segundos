import { useState } from 'react'
import Setup from './components/Setup'
import Game from './components/Game'
import './index.css'

function App() {
  const [players, setPlayers] = useState(null)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {!players ? (
        <Setup onStart={setPlayers} />
      ) : (
        <Game players={players} onRestart={() => setPlayers(null)} />
      )}
    </div>
  )
}

export default App
