import { atom } from 'recoil'
import { ISigningCosmWasmClientContext } from 'hooks/cosmwasm'

// export const signingCosmWasmClientState = atom<ISigningCosmWasmClientContext>({
//   key: `signingCosmWasmClientState/${Math.random()
//     .toString(36)
//     .substring(2, 11)}`,
//   default: {
//     walletAddress: '',
//     signingClient: null,
//     loading: false,
//     error: null,
//     connectWallet: () => {},
//     disconnect: () => {},
//   },
// })

export const walletBalanceState = atom<string>({
  key: `walletBalanceState/${Math.random().toString(36).substring(2, 11)}`,
  default: 'TORII',
})

export const contractBalanceState = atom<string>({
  key: `contractBalanceState/${Math.random().toString(36).substring(2, 11)}`,
  default: 'TORII',
})

export const cosmWasmErrorState = atom<string>({
  key: `cosmWasmErrorState/${Math.random().toString(36).substring(2, 11)}`,
  default: '',
})
