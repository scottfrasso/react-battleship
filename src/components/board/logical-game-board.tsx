import { findIndex } from 'lodash'

import { getRandomNumber } from '../utils'
import { ShipSquare } from '../types'
import Ship from './ship'

class LogicalGameBoard {
  private ships: Ship[]
  private shipLengths: number[]

  public constructor(shipLengths: number[] = [5, 4, 4]) {
    this.ships = []
    this.shipLengths = shipLengths

    for (const shipLength of this.shipLengths) {
      while (true) {
        const ship = this.findLocationForShip(shipLength)
        if (ship) {
          this.ships.push(ship)
          break
        }
      }
    }
  }

  public isGameOver(): boolean {
    for (const ship of this.ships) {
      if (!ship.isShipSunk()) {
        return false
      }
    }

    return true
  }

  public hitSquare(row: number, column: number): void {
    const shipInSquare = this.getShipInSquare(row, column)
    if (!shipInSquare) {
      return
    }
    shipInSquare.hitShip(row, column)
  }

  private getShipInSquare(row: number, column: number): Ship | null {
    for (const ship of this.ships) {
      if (
        findIndex(ship.getLocations(), (shipSquare: ShipSquare) => {
          return shipSquare.row === row && shipSquare.column === column
        }) >= 0
      ) {
        return ship
      }
    }

    return null
  }

  public isSquareOccupied(row: number, column: number): boolean {
    return this.getShipInSquare(row, column) !== null
  }

  private findLocationForShip(shipLength: number): Ship | undefined {
    const startingRow = getRandomNumber(10 - shipLength)
    const startingColumn = getRandomNumber(10 - shipLength)

    // try along the row
    const locationsAlongRow: ShipSquare[] = []
    let fitsAlongRow = true
    for (let i = startingRow; i < startingRow + shipLength; i++) {
      if (this.isSquareOccupied(i, startingColumn)) {
        fitsAlongRow = false
        break
      }
      locationsAlongRow.push({ row: i, column: startingColumn, isHit: false })
    }

    // try to fit it along the column
    const locationsAlongColumn: ShipSquare[] = []
    let fitsAlongColumn = true
    for (let j = startingColumn; j < startingColumn + shipLength; j++) {
      if (this.isSquareOccupied(startingRow, j)) {
        fitsAlongColumn = false
        break
      }
      locationsAlongColumn.push({ row: startingRow, column: j, isHit: false })
    }

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

    return new Ship(possibleLocations[randomIndex])
  }
}

export default LogicalGameBoard
