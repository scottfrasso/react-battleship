import React from 'react'

import classes from './Square.module.css'

type PropsType = {
  column: number
  row: number
  isHit: boolean
  isOccupied: boolean
  gameOver: boolean
  onClick: (e: React.MouseEvent) => void
}

const Square = ({
  column,
  row,
  isHit,
  isOccupied,
  gameOver,
  onClick,
}: PropsType) => {
  let classNames = `${classes.square} `

  if (isHit) {
    if (isOccupied) {
      classNames += ` ${classes.occupiedSquare}`
    } else {
      classNames += ` ${classes.hitSquare}`
    }
  } else {
    if (!gameOver) {
      classNames += ` ${classes.activeSquare}`
    }
  }

  return (
    <div className={classNames} key={`${row}, ${column}`} onClick={onClick} />
  )
}

export default Square
