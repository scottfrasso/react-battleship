import { findIndex } from 'lodash'

import { ShipSquare } from '../types'

export class Ship {
  private locations: ShipSquare[]

  public constructor(shipLocations: ShipSquare[]) {
    this.locations = shipLocations
  }

  public isShipSunk(): boolean {
    for (const location of this.locations) {
      if (!location.isHit) {
        return false
      }
    }

    return true
  }

  public getLocations(): ShipSquare[] {
    return this.locations
  }

  public isShipInSquare(row: number, column: number): boolean {
    return this.getLocationInSquare(row, column) !== null
  }

  private getLocationInSquare(row: number, column: number): ShipSquare | null {
    const index = findIndex(this.locations, (shipSquare: ShipSquare) => {
      return shipSquare.row === row && shipSquare.column === column
    })
    if (index < 0) {
      return null
    }

    return this.getLocations()[index]
  }

  public hitShip(row: number, column: number): void {
    const location = this.getLocationInSquare(row, column)
    if (!location) {
      return
    }

    location.isHit = true
  }
}

export default Ship
