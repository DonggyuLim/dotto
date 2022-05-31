// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import userInfoType from 'types/userInfoTypes'
// import popupHistoryType from 'types/popupHistoryTypes'

// interface UserState {
//   isLogin: boolean | null
//   userInfo: userInfoType | null
//   token: string | null
//   loading: boolean
//   popupHistory: popupHistoryType[]
// }

// // const userInfoFromStorage = localStorage.getItem('userInfo')
// // const userInfoFromStorage = localStorage.getItem('userInfo')

// const userInfoFromStorage = {
//   name: 'chan',
//   email: 'asdadas@asdasd.com',
//   account: '3wqdj1231j1jla',
//   isAdmin: true,
//   token: 'LPtoken',
//   avatar: 'chanavatar',
// }

// //   ? JSON.parse(localStorage.getItem('userInfo')!)
// //   : null

// // const isLogin = userInfoFromStorage ? true : false
// const isLogin = true

// // const tokenFromStorage = localStorage.getItem('token')
// //   ? JSON.parse(localStorage.getItem('token')!)
// //   : null

// const initialState: UserState = {
//   isLogin: isLogin,
//   userInfo: {
//     // name: 'chan',
//     // email: 'asdadas@asdasd.com',
//     account: 1231231123132,
//     // isAdmin: true,
//     token: 'LPtoken',
//     avatar: 'chanavatar',
//   },
//   // token: tokenFromStorage,
//   token: null,
//   loading: false,
//   popupHistory: [],
// }

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     userLogin: (state, action: PayloadAction<userInfoType>) => {
//       state.userInfo = {
//         // name: action.payload.name,
//         // email: action.payload.email,
//         account: action.payload.account,
//         // isAdmin: action.payload.isAdmin,
//         avatar: action.payload.avatar,
//       }
//       state.isLogin = true
//       state.token = action.payload.token!
//       state.loading = false
//     },
//     userLogout: (state) => {
//       state.token = null
//       state.userInfo = null
//       state.isLogin = false
//     },
//     userRequestStart: (state) => {
//       state.loading = true
//     },
//     userRequestFinish: (state) => {
//       state.loading = false
//     },
//     userPopupAccount: (state, action: PayloadAction<number>) => {
//       state.userInfo!.account = action.payload
//       state.loading = false
//     },
//     userPopupHistory: (state, action: PayloadAction<popupHistoryType[]>) => {
//       state.popupHistory = action.payload
//       state.loading = false
//     },
//   },
// })

// export const {
//   userLogin,
//   userLogout,
//   userRequestStart,
//   userRequestFinish,
//   userPopupAccount,
//   userPopupHistory,
// } = userSlice.actions

// export default userSlice.reducer
