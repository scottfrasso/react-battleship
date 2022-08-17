import { findIndex } from 'lodash'

import { ShipSquare } from '../types'

/**
 * Holds all the logic for operating a ship in a game of battleship
 */
export class Ship {
  private locations: ShipSquare[]

  public constructor(shipLocations: ShipSquare[]) {
    this.locations = shipLocations
  }

  /**
   * Checks to see if all the spaces a ship occupies is hit.
   *
   * @returns {boolean} True if the ship is sunk, if all spaces are hit
   */
  public isShipSunk(): boolean {
    for (const location of this.locations) {
      if (!location.isHit) {
        return false
      }
    }

    return true
  }

  /**
   * Returns all the locations that a ship occupies.
   *
   * @returns {ShipSquare[]} An array of locations the ship occupies
   */
  public getLocations(): ShipSquare[] {
    return this.locations
  }

  /**
   * Checks to see if this ship occupies the given square.
   *
   * @param row
   * @param column
   * @returns {boolean} True if this ship occupies the given square
   */
  public isShipInSquare(row: number, column: number): boolean {
    return this.getLocationInSquare(row, column) !== null
  }

  /**
   * Gets the {ShipSquare} location of the ship given the row/column.
   *
   * @param row
   * @param column
   * @returns {ShipSquare | null} Returns the location the ship occupies
   * of the given square. Returns null if the ship does not occupy the
   * given location.
   */
  private getLocationInSquare(row: number, column: number): ShipSquare | null {
    const index = findIndex(this.locations, (shipSquare: ShipSquare) => {
      return shipSquare.row === row && shipSquare.column === column
    })
    if (index < 0) {
      return null
    }

    return this.getLocations()[index]
  }

  /**
   * Marks a location {ShipSquare} of a ship as hit given the row/column
   *
   * @param row
   * @param column
   * @returns
   */
  public hitShip(row: number, column: number): void {
    const location = this.getLocationInSquare(row, column)
    if (!location) {
      return
    }

    location.isHit = true
  }
}

export default Ship
