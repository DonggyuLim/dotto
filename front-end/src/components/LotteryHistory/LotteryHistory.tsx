import React, { useState } from 'react'
import { lotteryGameType } from 'types/lotteryTypes'
import LotteryDetails from 'components/LotteryHistory/LotteryDetails'

interface LotteryHistoryProps {
  lotteryHistory: lotteryGameType[]
}

const LotteryHistory = ({ lotteryHistory }: LotteryHistoryProps) => {
  let sortedLottery: lotteryGameType[] = []

  const [sortBy, setSortBy] = useState('new')

  // const handleChange = (event: SelectChangeEvent) => {
  //   setSortBy(event.target.value as string)
  // }

  if (sortBy === 'old') {
    sortedLottery = [...lotteryHistory].sort(function (a, b) {
      return +new Date(a.createdAt) - +new Date(b.createdAt)
    })
  }
  if (sortBy === 'new') {
    sortedLottery = [...lotteryHistory].sort(function (a, b) {
      return +new Date(b.createdAt) - +new Date(a.createdAt)
    })
  }

  return (
    <div>
      <h2>Your Game Hisotry</h2>
      {/* <Paper
        elevation={16}
        sx={{
          backgroundColor: 'rgb(231, 235, 240)',
          padding: '2rem',
          marginTop: '1rem',
        }}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='sortBy'>Sort By</InputLabel>
            <Select
              labelId='sortBySelect'
              id='sortBySelect'
              value={sortBy}
              label='Sort By'
              onChange={handleChange}
            >
              <MenuItem value={'new'}>Newest</MenuItem>
              <MenuItem value={'old'}>Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {sortedLottery.map((lotteryGame) => (
          <LotteryDetails
            key={lotteryGame.createdAt.toString()}
            lotteryGame={lotteryGame}
          />
        ))}
      </Paper> */}
    </div>
  )
}

export default LotteryHistory
