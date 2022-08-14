import React, { useState } from 'react'

import Square from './Square'

import classes from './GameBoard.module.css'

const squaresInitialState = new Map<string, boolean>()
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    squaresInitialState.set(`i,j`, false)
  }
}

const GameBoard = () => {
  const [squareState, setSquareState] = useState(squaresInitialState)

  const columns: string[] = []
  const rows: string[] = []

  for (let c = 0; c < 10; c++) {
    columns.push(String.fromCharCode(c + 65))
    rows.push(c.toString())
  }

  const onSquareClicked = (iIndex: number, jIndex: number) => {}

  const divRows: React.ReactNode[] = []
  for (let i = -1; i < 10; i++) {
    const divChildren = []
    for (let j = -1; j < 10; j++) {
      if (i === -1 && j === -1) {
        divChildren.push(<div key={`${i} . ${j}`} />)
        continue
      }
      if (j === -1) {
        // Render the left row
        divChildren.push(
          <div className={` ${classes.leftRow}`} key={`${i} + ${j}`}>
            {rows[i]}
          </div>
        )
        continue
      }
      if (i === -1) {
        // Render the top row
        divChildren.push(
          <div className={` ${classes.topRow}`} key={`${i} - ${j}`}>
            {columns[j]}
          </div>
        )
        continue
      }
      divChildren.push(
        <Square
          column={j}
          row={i}
          isHit={squaresInitialState.get(`i,j`)!}
          onClick={onSquareClicked.bind(null, i, j)}
        />
      )
    }
    divRows.push(divChildren)
  }

  return (
    <div className={classes.grid} key='something'>
      {divRows}
    </div>
  )
}

export default GameBoard
