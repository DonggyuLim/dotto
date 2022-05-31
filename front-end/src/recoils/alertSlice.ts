// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import alertType from 'types/alertTypes'

// interface AlertState {
//   alert: alertType[]
// }

// const initialState: AlertState = {
//   alert: [],
// }

// export const alertSlice = createSlice({
//   name: 'alert',
//   initialState,
//   reducers: {
//     setAlert: (state, action: PayloadAction<alertType>) => {
//       state.alert.push(action.payload)
//     },
//     removeAlert: (state, action: PayloadAction<string>) => {
//       state.alert = state.alert.filter((alert) => alert.id !== action.payload)
//     },
//   },
// })

// export const { setAlert, removeAlert } = alertSlice.actions

// export default alertSlice.reducer
