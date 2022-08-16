import React, { useState } from 'react'
import { findIndex } from 'lodash'

import Square from './Square'

import { HitSquare } from './types'
import Status from './Status'
import LogicalGameBoard from './board/logical-game-board'

import classes from './GameBoard.module.css'

let logicalGameBoard = new LogicalGameBoard()

const GameBoard = () => {
  const [squareState, setSquareState] = useState<HitSquare[]>([])
  const [gameOver, setGameOver] = useState(false)

  const columns: string[] = []
  const rows: string[] = []

  for (let c = 0; c < 10; c++) {
    columns.push(String.fromCharCode(c + 65))
    rows.push(c.toString())
  }

  const onGameReset = () => {
    setSquareState([])
    logicalGameBoard = new LogicalGameBoard()
    setGameOver(false)
  }

  const onSquareClicked = (row: number, column: number) => {
    if (isSquareHit(row, column)) {
      return
    }

    const hitSquares: HitSquare[] = [...squareState]
    hitSquares.push({ row, column })
    setSquareState(hitSquares)

    logicalGameBoard.hitSquare(row, column)
    if (logicalGameBoard.isGameOver()) {
      setGameOver(true)
    }
  }

  const isSquareHit = (row: number, column: number): boolean => {
    return (
      findIndex(squareState, (square: HitSquare) => {
        return square.row === row && square.column === column
      }) >= 0
    )
  }

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
          isHit={isSquareHit(i, j)}
          isOccupied={logicalGameBoard.isSquareOccupied(i, j)}
          onClick={onSquareClicked.bind(null, i, j)}
        />
      )
    }
    divRows.push(divChildren)
  }

  return (
    <>
      <div>
        <Status gameOver={gameOver} onResetClick={onGameReset} />
      </div>
      <div className={classes.grid} key='something'>
        {divRows}
      </div>
    </>
  )
}

export default GameBoard
