import { Grid } from '@mui/material'

import GameBoard from './components/GameBoard'

function App() {
  return (
    <Grid sx={{ maxWidth: '10rem' }}>
      <GameBoard />
    </Grid>
  )
}

export default App
