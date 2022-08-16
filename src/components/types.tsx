export type HitSquare = {
  row: number
  column: number
}

export type ShipSquare = HitSquare & {
  isHit: boolean
}
