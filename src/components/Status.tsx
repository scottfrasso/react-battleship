type PropsType = {
  gameOver: boolean
}
const Status = ({ gameOver }: PropsType) => {
  return (
    <>
      {!gameOver && <p>Keep Playing!</p>}
      {gameOver && <p>Game Over! You won!</p>}
    </>
  )
}

export default Status
