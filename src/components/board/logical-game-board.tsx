import { findIndex } from 'lodash'

import { getRandomNumber } from '../utils'
import { ShipSquare } from '../types'
import Ship from './ship'

/**
 * Holds all the logic for operating a one sided version of battleship.
 */
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

  /**
   * Checks if all the ships have been sunk yet.
   *
   * @returns {boolean} True if all ships have been sunk
   */
  public isGameOver(): boolean {
    for (const ship of this.ships) {
      if (!ship.isShipSunk()) {
        return false
      }
    }

    return true
  }

  /**
   * Place a hit on the square. If there is a ship in that
   * square mark that part of the ship as being "hit".
   *
   * @param row The row number of the square
   * @param column The row number of the square
   * @returns
   */
  public hitSquare(row: number, column: number): void {
    const shipInSquare = this.getShipInSquare(row, column)
    if (!shipInSquare) {
      return
    }
    shipInSquare.hitShip(row, column)
  }

  /**
   * Gets a ship that occupies the given square.
   *
   * @param row The row number of the square
   * @param column The row number of the square
   * @returns {Ship | null} Returns a ship if one exists in that square, null if not
   */
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

  /**
   * Checks to see if a ship exists in a given square.
   *
   * @param row
   * @param column
   * @returns {boolean} True if a ship occupies the given square
   */
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
