import { ReactNode, useEffect } from 'react'
import { useSigningClient } from 'contexts/cosmwasm'
import Loader from 'components/Loader'
import { useSetRecoilState } from 'recoil'
import { signingCosmWasmClientState } from 'recoils/cosmWasm'

const WalletLoader = ({
  children,
  loading = false,
}: {
  children: ReactNode
  loading?: boolean
}) => {
  // const setsigningCosmWasmClient = useSetRecoilState(signingCosmWasmClientState)
  const {
    walletAddress,
    signingClient,
    loading: clientLoading,
    error,
    connectWallet,
    disconnect,
  } = useSigningClient()
  // useEffect(() => {
  //   setsigningCosmWasmClient({
  //     walletAddress,
  //     signingClient,
  //     loading,
  //     error,
  //     connectWallet,
  //     disconnect,
  //   })
  // }, [walletAddress, signingClient, loading, error, connectWallet, disconnect])

  if (loading || clientLoading) {
    return (
      <div className='flex justify-center'>
        <Loader />
      </div>
    )
  }

  // console.log('---------walletloader---------')
  // console.log(walletAddress)
  // console.log(signingClient)
  // console.log(loading)
  // console.log(error)
  // console.log(connectWallet)

  if (walletAddress === '') {
    return (
      <div className='hidden lg:block max-w-full relative z-30'>
        <div className='flex flex-wrap items-center justify-around md:max-w-4xl mt-6 sm:w-full'>
          <button
            className='p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus'
            onClick={connectWallet}
          >
            <h3 className='text-2xl font-bold text-center'>
              Connect your wallet
            </h3>
          </button>
        </div>

        <p className='mt-3 text-lg tracking-normal'>
          Get started by installing{' '}
          <a
            className='underline text-orange-400 hover:text-orange-600 visited:text-purple-600'
            href='https://keplr.app/'
          >
            Keplr wallet
          </a>
        </p>
      </div>
    )
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>
  }

  return <>{children}</>
}

export default WalletLoader
