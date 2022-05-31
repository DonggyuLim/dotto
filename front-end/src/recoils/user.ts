// import {
//   userRequestStart,
//   userRequestFinish,
//   userPopupAccount,
//   userPopupHistory,
// } from 'recoils/userSlice'
// import { createAlert } from './alert'

// import axios from 'axios'

// // type severity = 'error' | 'success' | 'warning'

// export const popupAccount =
//   (amountInput: number) => async (dispatch: any, getState: any) => {
//     try {
//       dispatch(userRequestStart())

//       const token = getState().user.token
//       const user = getState().user.userInfo
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       }

//       const body = {
//         amount: amountInput,
//       }

//       const { data } = await axios.post('/api/users/transaction', body, config)

//       const updateBankAccount = data.account

//       dispatch(userPopupAccount(updateBankAccount))

//       localStorage.setItem(
//         'userInfo',
//         JSON.stringify({
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           account: updateBankAccount,
//           avatar: user.avatar ? user.avatar : null,
//         })
//       )
//       dispatch(
//         createAlert('Your Account has been successfuly popup!', 'success')
//       )
//     } catch (error: any) {
//       dispatch(userRequestFinish())
//       dispatch(createAlert(error.response.data.message))
//     }
//   }

// export const getPopupHistory = () => async (dispatch: any, getState: any) => {
//   try {
//     dispatch(userRequestStart())

//     const token = getState().user.token

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }

//     const { data } = await axios.get('/api/users/transaction', config)

//     dispatch(userPopupHistory(data))
//   } catch (error: any) {
//     dispatch(userRequestFinish())
//     dispatch(createAlert(error.response.data.message))
//   }
// }
