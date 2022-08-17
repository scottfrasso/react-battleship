import React, { useState, useEffect } from 'react'
import { findIndex } from 'lodash'

import Square from './Square'

import { HitSquare } from './types'
import Status from './Status'
import LogicalGameBoard from './board/logical-game-board'

import classes from './GameBoard.module.css'

/** Initialize the gameboard and the rows/columns
 * If this were a real product this could probably
 * live inside another package outside of this react project.
 */
let logicalGameBoard = new LogicalGameBoard()

const columns: string[] = []
const rows: string[] = []

for (let c = 0; c < 10; c++) {
  // Set the columns A-J
  columns.push(String.fromCharCode(c + 65))
  // Add 1 so the rows are 1-10
  rows.push((c + 1).toString())
}

const GameBoard = () => {
  const [squareState, setSquareState] = useState<HitSquare[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const onGameReset = () => {
    setSquareState([])
    logicalGameBoard = new LogicalGameBoard()
    setGameOver(false)
  }

  const onSquareClicked = (row: number, column: number) => {
    setGameStarted(true)

    if (gameOver) {
      return
    }
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

  // Setup all the squares of the Gameboard
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
      // Render a playable square
      divChildren.push(
        <Square
          column={j}
          row={i}
          isHit={isSquareHit(i, j)}
          isOccupied={logicalGameBoard.isSquareOccupied(i, j)}
          onClick={onSquareClicked.bind(null, i, j)}
          gameOver={gameOver}
        />
      )
    }
    divRows.push(divChildren)
  }

  return (
    <>
      <div>
        <Status
          gameStarted={gameStarted}
          gameOver={gameOver}
          onResetClick={onGameReset}
        />
      </div>
      <div className={classes.grid}>{divRows}</div>
    </>
  )
}

export default GameBoard
