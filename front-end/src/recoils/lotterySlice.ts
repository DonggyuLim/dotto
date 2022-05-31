// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import lotteryType from 'types/lotteryTypes'
// import lotteryGameType from 'types/lotteryGameTypes'
// export interface LotteryState {
//   lotteryInput: lotteryType[]
//   lotteryHistory: lotteryGameType[]
//   loading: boolean
// }

// const initialState: LotteryState = {
//   lotteryInput: [],
//   lotteryHistory: [],
//   loading: false,
// }

// export const lotterySlice = createSlice({
//   name: 'lottery',
//   initialState,
//   reducers: {
//     updateLotteryTickets: (state, action: PayloadAction<lotteryType[]>) => {
//       state.lotteryInput = action.payload
//     },
//     resetLotteryTickets: (state) => {
//       state.lotteryInput = []
//     },
//     updateLotteryHistory: (state, action: PayloadAction<lotteryGameType[]>) => {
//       state.lotteryHistory = action.payload
//       state.loading = false
//     },
//     lotteryRequestStart: (state) => {
//       state.loading = true
//     },
//     lotteryRequestFinish: (state) => {
//       state.loading = false
//     },
//   },
// })

// export const {
//   updateLotteryTickets,
//   updateLotteryHistory,
//   lotteryRequestStart,
//   lotteryRequestFinish,
//   resetLotteryTickets,
// } = lotterySlice.actions

// export default lotterySlice.reducer
