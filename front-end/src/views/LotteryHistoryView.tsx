// import React, { useEffect } from 'react'

// // import { useSelector, useDispatch } from 'react-redux'

// import { RootState } from 'store/store'
// import { getLotteryHistory } from 'actions/lotteryAction'
// import LotteryHistory from 'components/LotteryHistory/LotteryHistory'

// // import { Typography } from '@mui/material'
// // import { Box } from '@mui/material'
// // import CircularProgress from '@mui/material/CircularProgress'

// const LotteryHistoryView = () => {
//   const dispatch = useDispatch()
//   const { lotteryHistory, loading } = useSelector(
//     (state: RootState) => state.lottery
//   )

//   useEffect(() => {
//     dispatch(getLotteryHistory())
//   }, [dispatch])

//   return (
//     <>
//       {/* <Typography component={'h1'} variant={'h1'}> */}
//       Game History
//       {/* </Typography>
//       <Box sx={{ marginTop: '1rem' }}> */}
//       {loading &&
//         // <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         //   <CircularProgress />
//         // </Box>
//         'aa'}
//       {!loading &&
//         lotteryHistory.length === 0 &&
//         // <Typography component={'h3'} variant={'h6'}>
//         //   You haven't play any game
//         // </Typography>
//         'aa'}
//       {!loading && lotteryHistory.length !== 0 && (
//         <LotteryHistory lotteryHistory={lotteryHistory} />
//       )}
//       {/* </Box> */}
//     </>
//   )
// }

// export default LotteryHistoryView
