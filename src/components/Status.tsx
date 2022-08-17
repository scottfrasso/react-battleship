import React from 'react'

import Modal from './Modal'

import classes from './Status.module.css'

type PropsType = {
  gameOver: boolean
  gameStarted: boolean
  onResetClick: (e: React.MouseEvent) => void
}
const Status = ({ gameStarted, gameOver, onResetClick }: PropsType) => {
  const modalContent = (
    <>
      <h1>You won!</h1>
      <button onClick={onResetClick}>Reset</button>
    </>
  )

  return (
    <div className={classes.center}>
      {gameOver && <Modal onClose={onResetClick}>{modalContent}</Modal>}
      <p className={classes.title}>One-sided Battleship</p>
      <button
        disabled={!gameStarted}
        className={classes.resetButton}
        onClick={onResetClick}
      >
        Reset
      </button>
    </div>
  )
}

export default Status
