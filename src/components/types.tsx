export type HitSquare = {
  row: number
  column: number
}

export type ShipSquare = HitSquare

export type Ship = {
  locations: ShipSquare[]
}
