import React from 'react'

type PropsType = {
  gameOver: boolean
  onResetClick: (e: React.MouseEvent) => void
}
const Status = ({ gameOver, onResetClick }: PropsType) => {
  return (
    <>
      {!gameOver && <p>Keep Playing!</p>}
      {gameOver && <p>Game Over! You won!</p>}
      <button onClick={onResetClick}>Reset</button>
    </>
  )
}

export default Status
