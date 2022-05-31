import React, { useCallback, useEffect, useState } from 'react'
import { lotteryGameType } from 'types/lotteryTypes'
import LotteryDetails from 'components/LotteryHistory/LotteryDetails'
import LotterySelect from 'components/NumberBox/LotterySelect'
import Banner from 'components/Layout/Banner'
import Timer from 'components/CountdownTimer/Timer'
import LotteryTicketList from 'components/LotteryArea/LotteryTicketList'
import SendTorii from 'components/SendTorii'
import FetchContract from 'components/FetchContract'
import fetchGraphQL from 'utils/fetchGraphQL'
import { lotteryRoundState } from 'recoils/lottery'
import { useSetRecoilState } from 'recoil'

const lottery = ({ data }: any) => {
  const [open, setOpen] = useState<boolean>(false)
  const [gameResult, setGameResult] = useState<lotteryGameType | null>(null)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  // console.log(data)
  const setLotteryRound = useSetRecoilState(lotteryRoundState)
  // useEffect(() => {
  //   setLotteryRound((lotteryRound) =>
  //     lotteryRound.map((item) =>
  //       item.roundId === data.round.lottery_id
  //         ? {
  //           ...item,
  //           ticketCounts: data.round.count_ticket,
  //           userCounts: data.round.count_user,
  //           winningNumber: data.round.get_jackpot.round,
  //           prizesByRank: data.round.jackpot_balance[0],
  //           jackpotCount: data.round.jackpot_count,
  //           winners: data.round.winner,
  //         }
  //         : item
  //     )
  //   )
  // }, [data])

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <div className='flex-col justify-center items-center rounded-md pt-4 w-full'>
        <Banner />
        <Timer />
      </div>
      <h1 className='text-3xl md:text-5xl bg-clip-text text-transparent font-semibold leading-tight bg-gradient-to-r from-teal-400 to-blue-500 my-2 mb-6'>
        Guess you're in luck today. <br />
        Just pick it!
      </h1>
      <LotterySelect />
      {/* <Toast success={success} error={error} /> */}
      <LotteryTicketList />
      <SendTorii setSuccess={setSuccess} setError={setError} />
      <FetchContract />
      {/* {loading} */}
      {/* {!loading && gameResult && <LotteryDetails lotteryGame={gameResult!} />} */}
      {/* {gameResult && <LotteryDetails lotteryGame={gameResult!} />} */}
      {/* <button onClick={handleClose}>close icon</button> */}
    </div>
  )
}

export default lottery

// export async function getStaticProps() {
//   const query = `
//   query{
//     round(lottery_id: 3){
//      lottery_id
//      winner{
//        addr
//        rank
//        ticket
//        claim
//      }
//      get_jackpot{
//        worker
//        round
//      }
//      count_ticket
//      count_user
//      jackpot_balance{
//        first
//        second
//        third
//        fourth
//        fifth
//    }
//      jackpot_count
//    }
//    }
//    `
//   const { data } = await fetchGraphQL(query)

//   return {
//     props: {
//       data,
//     },
//   }
// }
