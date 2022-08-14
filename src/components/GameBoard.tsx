import React, { useState } from 'react'
import { findIndex } from 'lodash'

import Square from './Square'
import { getRandomNumber } from './utils'
import { HitSquare, Ship, ShipSquare } from './types'

import classes from './GameBoard.module.css'
import { isDebuggerStatement } from 'typescript'

const ship1: Ship = {
  locations: [
    {
      row: 1,
      column: 3,
    },
  ],
}

const isSquareOccupied = (
  ships: Ship[],
  row: number,
  column: number
): boolean => {
  for (const ship of ships) {
    if (
      findIndex(ship.locations, (shipSquare: ShipSquare) => {
        return shipSquare.row === row && shipSquare.column === column
      }) >= 0
    ) {
      return true
    }
  }

  return false
}

const ships: Ship[] = []
const shipLengths = [5, 4, 4]

const findLocationForShip = (shipLength: number): Ship | undefined => {
  const startingRow = getRandomNumber(10 - shipLength)
  const startingColumn = getRandomNumber(10 - shipLength)

  // try along the row
  const locationsAlongRow: ShipSquare[] = []
  let fitsAlongRow = true
  for (let i = startingRow; i < startingRow + shipLength; i++) {
    if (isSquareOccupied(ships, i, startingColumn)) {
      fitsAlongRow = false
      break
    }
    locationsAlongRow.push({ row: i, column: startingColumn })
  }

  // try to fit it along the column
  const locationsAlongColumn: ShipSquare[] = []
  let fitsAlongColumn = true
  for (let j = startingColumn; j < startingColumn + shipLength; j++) {
    if (isSquareOccupied(ships, startingRow, j)) {
      fitsAlongColumn = false
      break
    }
    locationsAlongColumn.push({ row: startingRow, column: j })
  }

  debugger

  if (!fitsAlongRow && !fitsAlongColumn) {
    return undefined
  }

  const possibleLocations: ShipSquare[][] = []
  if (fitsAlongRow) {
    possibleLocations.push(locationsAlongRow)
  }

  if (fitsAlongColumn) {
    possibleLocations.push(locationsAlongColumn)
  }

  const randomIndex = getRandomNumber(possibleLocations.length)

  return {
    locations: possibleLocations[randomIndex],
  }
}

for (const shipLength of shipLengths) {
  while (true) {
    const ship = findLocationForShip(shipLength)
    if (ship) {
      ships.push(ship)
      break
    }
  }
}

const GameBoard = () => {
  const [squareState, setSquareState] = useState<HitSquare[]>([])

  const columns: string[] = []
  const rows: string[] = []

  for (let c = 0; c < 10; c++) {
    columns.push(String.fromCharCode(c + 65))
    rows.push(c.toString())
  }

  const onSquareClicked = (row: number, column: number) => {
    if (isSquareHit(row, column)) {
      return
    }

    const hitSquares: HitSquare[] = [...squareState]
    hitSquares.push({ row, column })
    setSquareState(hitSquares)
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
          isOccupied={isSquareOccupied(ships, i, j)}
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
