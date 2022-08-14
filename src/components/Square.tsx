import React from 'react'

import classes from './Square.module.css'

type PropsType = {
  column: number
  row: number
  isHit: boolean
  onClick: (e: React.MouseEvent) => void
}

const Square = ({ column, row, isHit, onClick }: PropsType) => {
  const classNames = `${classes.square} ${
    isHit ? classes.hitSquare : classes.activeSquare
  }`

  return (
    <div
      className={classNames}
      key={`${row}, ${column}`}
      onClick={onClick}
    >{`${row}, ${column}`}</div>
  )
}

export default Square
