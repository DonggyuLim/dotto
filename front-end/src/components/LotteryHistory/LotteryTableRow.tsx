import React from 'react'
import { lotteryType } from 'types/lotteryTypes'
// import TableCell from '@mui/material/TableCell'
// import TableRow from '@mui/material/TableRow'
// import { Box } from '@mui/material'
// import StarIcon from '@mui/icons-material/Star'
import compareLottery from 'utils/compareLottery'

interface LotteryTableRowProps {
  index: number
  lottery: lotteryType
  resultLottery: lotteryType
}

const LotteryTableRow = ({
  lottery,
  index,
  resultLottery,
}: LotteryTableRowProps) => {
  const hitNumbersArray = compareLottery(lottery, resultLottery)

  const { matchNumber } = hitNumbersArray
  // const { matchNumber, matchPairNumber } = hitNumbersArray

  const numberHit = (numberInput: number) => {
    return matchNumber.includes(numberInput)
  }
  // const pairNumberHit = (numberInput: number) => {
  //   return matchPairNumber.includes(numberInput)
  // }

  const hitsAmount = matchNumber.length
  // const hitsAmount =
  //   matchPairNumber.length === 0
  //     ? matchNumber.length
  //     : `${matchNumber.length} + ${matchPairNumber.length}`

  return (
    // <TableRow>
    //   <TableCell>{index + 1}</TableCell>
    //   <TableCell>
    //     <Box
    //       component='ol'
    //       sx={{
    //         listStyle: 'none',
    //         display: 'flex',
    //         alignItems: 'center',
    //         flexDirection: 'row',
    //         gap: '1rem',
    //         alignContent: 'flex-end',
    //       }}
    //     >
    //       {lottery.number.map((number) => (
    //         <Box
    //           key={`${number}`}
    //           component='li'
    //           sx={
    //             numberHit(number)
    //               ? {
    //                   alignItems: 'center',
    //                   backgroundColor: '#72008c',
    //                   border: '2px solid transparent',
    //                   borderRadius: '100%',
    //                   display: 'flex',
    //                   height: '2rem',
    //                   justifyContent: 'center',
    //                   width: '2rem',
    //                   color: '#fff',
    //                   fontWeight: 500,
    //                   borderColor: '#72008c',
    //                 }
    //               : {
    //                   alignItems: 'center',
    //                   border: '2px solid transparent',
    //                   borderRadius: '100%',
    //                   display: 'flex',
    //                   height: '2rem',
    //                   justifyContent: 'center',
    //                   width: '2rem',
    //                   fontWeight: 500,
    //                 }
    //           }
    //         >
    //           {number}
    //         </Box>
    //       ))}
    //       <StarIcon></StarIcon>
    {
      /* {lottery.pairNumber.map((number) => (
            <Box
              key={`${number}_star`}
              sx={
                pairNumberHit(number)
                  ? {
                      alignItems: 'center',
                      backgroundColor: 'rgb(255, 207, 18)',
                      border: '2px solid transparent',
                      borderRadius: '100%',
                      display: 'flex',
                      height: '2rem',
                      justifyContent: 'center',
                      width: '2rem',
                      color: 'black',
                      fontWeight: 500,
                      borderColor: 'rgb(255, 207, 18)',
                    }
                  : {
                      alignItems: 'center',
                      border: '2px solid transparent',
                      borderRadius: '100%',
                      display: 'flex',
                      height: '2rem',
                      justifyContent: 'center',

                      width: '2rem',
                      fontWeight: 500,
                    }
              }
              component='li'
            >
              {number}
            </Box> 
          {/* ))} */
    }
    //     </Box>
    //   </TableCell>
    //   <TableCell>{hitsAmount}</TableCell>
    // </TableRow>
  )
}

export default LotteryTableRow
