import React from 'react'

import classes from './Square.module.css'

type PropsType = {
  column: number
  row: number
  isHit: boolean
  isOccupied: boolean
  onClick: (e: React.MouseEvent) => void
}

const Square = ({ column, row, isHit, isOccupied, onClick }: PropsType) => {
  let classNames = `${classes.square} `

  if (isHit) {
    if (isOccupied) {
      classNames += ` ${classes.occupiedSquare}`
    } else {
      classNames += ` ${classes.hitSquare}`
    }
  } else {
    classNames += ` ${classes.activeSquare}`
  }

  return (
    <div
      className={classNames}
      key={`${row}, ${column}`}
      onClick={onClick}
    >{`${row}, ${column}`}</div>
  )
}

export default Square
