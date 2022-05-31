import { atom } from 'recoil'
import {
  lotteryType,
  lotteryRoundType,
  lotteryRoundContractType,
  lotteryDrawType,
} from 'types/lotteryTypes'

// import {
//   updateLotteryTickets,
//   updateLotteryHistory,
//   lotteryRequestStart,
//   lotteryRequestFinish,
//   resetLotteryTickets,
// } from 'recoils/lotterySlice'
// import { userPopupAccount } from 'recoils/userSlice'
// import { createAlert } from 'recoils/alert'

// import axios from 'axios'

export const lotteryTicketsState = atom<lotteryType[]>({
  key: `lotteryTicketsState/${Math.random().toString(36).substring(2, 11)}`,
  default: [],
})

export const lotteryRoundState = atom<lotteryRoundType[]>({
  key: `lotteryRoundState/${Math.random().toString(36).substring(2, 11)}`,
  default: [
    {
      roundId: 3,
      ticketCounts: '',
      userCounts: '',
      winningNumber: '',
      prizesByRank: {},
      jackpotCount: [],
      winners: [],
    },
    {
      roundId: 4,
      ticketCounts: '',
      userCounts: '',
      winningNumber: '',
      prizesByRank: {},
      jackpotCount: [],
      winners: [],
    },
    {
      roundId: 5,
      ticketCounts: '',
      userCounts: '',
      winningNumber: '',
      prizesByRank: {},
      jackpotCount: [],
      winners: [],
    },
  ],
})
export const lotteryRoundStateFromContract = atom<lotteryRoundContractType[]>({
  key: `lotteryRoundStateFromContract/${Math.random()
    .toString(36)
    .substring(2, 11)}`,
  default: [
    {
      roundId: 3,
      ticketCounts: '',
      userCounts: '',
      winningNumber: '',
      prizesByRank: {},
      winnerCountsByRank: [],
      totalPrizes: 0,
      jackpotCount: [],
      winners: [],
      contractConfig: {},
    },
    {
      roundId: 4,
      ticketCounts: '',
      userCounts: '',
      winningNumber: '',
      prizesByRank: {},
      winnerCountsByRank: [],
      totalPrizes: 0,
      jackpotCount: [],
      winners: [],
      contractConfig: {},
    },
    {
      roundId: 5,
      ticketCounts: '',
      userCounts: '',
      winningNumber: '',
      totalPrizes: 0,
      prizesByRank: {},
      winnerCountsByRank: [],
      jackpotCount: [],
      winners: [],
      contractConfig: {},
    },
  ],
})

export const lotteryDrawState = atom<lotteryDrawType>({
  key: `lotteryDrawState/${Math.random().toString(36).substring(2, 11)}`,
  default: { lotteryDrawDate: null },
})

// export const getLotteryHistory = () => async (dispatch: any, getState: any) => {
//   try {
//     dispatch(lotteryRequestStart())

//     const token = getState().user.token

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }

// const { data } = await axios.get('/api/lottery/history', config)

// dispatch(updateLotteryHistory(data))
// } catch (error: any) {
//   dispatch(lotteryRequestFinish())
//   dispatch(createAlert(error.response.data.message))
// }
// }

// export const playLottery = () => async (dispatch: any, getState: any) => {
//   try {
//     dispatch(lotteryRequestStart())

//     const token = getState().user.token
//     const user = getState().user.userInfo
//     const { lotteryInput } = getState().lottery
//     const body = {
//       playLottery: lotteryInput,
//     }
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }

// const { data } = await axios.post('/api/lottery/play', body, config)

// const updateBankAccount = data.account

// dispatch(userPopupAccount(updateBankAccount))

//     localStorage.setItem(
//       'userInfo',
//       JSON.stringify({
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         // account: updateBankAccount,
//         account: '3wqdj1231j1jla',
//         avatar: user.avatar ? user.avatar : '',
//       })
//     )
//     dispatch(resetLotteryTickets())
//     dispatch(lotteryRequestFinish())
//     // return data.gameHistory[0]
//   } catch (error: any) {
//     dispatch(lotteryRequestFinish())
//     dispatch(createAlert(error.response.data.message))
//   }
// }
