import React from 'react'

import Modal from './Modal'

type PropsType = {
  gameOver: boolean
  onResetClick: (e: React.MouseEvent) => void
}
const Status = ({ gameOver, onResetClick }: PropsType) => {
  const modalContent = (
    <>
      <h1>You won!</h1>
      <button onClick={onResetClick}>Reset</button>
    </>
  )

  return (
    <>
      {gameOver && <Modal onClose={onResetClick}>{modalContent}</Modal>}
      <button onClick={onResetClick}>Reset</button>
    </>
  )
}

export default Status
