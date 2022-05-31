import { useState, MouseEvent, useEffect } from 'react'
import { Coin } from '@cosmjs/amino'
import { calculateFee, GasPrice } from '@cosmjs/stargate'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import { convertFromMicroDenom } from 'utils/conversion'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { lotteryTicketsState } from 'recoils/lottery'

interface SendToriiProps {
  setSuccess: React.Dispatch<React.SetStateAction<string>>
  setError: React.Dispatch<React.SetStateAction<string>>
}

const SendTorii = ({ setSuccess, setError }: SendToriiProps) => {
  const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || 'utorii'
  const PUBLIC_CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
    'archway1ngcd86tzyxws4yacw3nahrgmn07c6rzrc2jmdehgy65np9wcv35shffh5f'
  const PUBLIC_RECIPIENT_ADDRESS =
    process.env.NEXT_PUBLIC_RECIPIENT_ADDRESS ||
    'archway158q2d9kj7dx0waap4fjk0u27hda3tztapyc7fp'
  const { walletAddress, signingClient } = useSigningClient()
  const [loadedAt, setLoadedAt] = useState(new Date())
  const [loading, setLoading] = useState(false)

  const lotteryTickets = useRecoilValue(lotteryTicketsState)
  const resetlotteryTickets = useResetRecoilState(lotteryTicketsState)

  const lotteryTicketsToSend = Object.values(lotteryTickets).map((el) =>
    el.number.join('')
  )
  const lottery_id = 3;
  useEffect(() => {
    const qeury_msg1: Record<string, unknown> = {
      combination: {
        lottery_id: lottery_id,
        address: walletAddress,
      },
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg1)
      .then((response: any) => {
        console.log('--------- 유저 구매 로또 번호들 ---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('--------- 유저 구매 로또 번호들 ---------')
        console.log(error)
      })
    // Balance (회차당 총상금)
    const qeury_msg2: Record<string, unknown> = {
      balance: {
        lottery_id: lottery_id,
      },
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg2)
      .then((response: any) => {
        console.log('---------회차당 총상금 ---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('---------회차당 총상금 ---------')
        console.log(error)
      })
    // Winner (해당 회차 당첨자)
    const qeury_msg3: Record<string, unknown> = {
      winner: {
        lottery_id: lottery_id,
      },
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg3)
      .then((response: any) => {
        console.log('--------- 해당 회차 당첨자 ---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('--------- 해당 회차 당첨자 ---------')
        console.log(error)
      })
    // Jackpot Balance (해당 회차 등수별 받아야할 액수)
    const qeury_msg4: Record<string, unknown> = {
      jackpot_balance: {
        lottery_id: lottery_id,
      },
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg4)
      .then((response: any) => {
        console.log('--------- 회차당 등수별 받아야할 액수 ---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('--------- 회차당 등수별 받아야할 액수 ---------')
        console.log(error)
      })

    // Count Ticket (해당회차 누적 티켓수)
    const qeury_msg6: Record<string, unknown> = {
      count_ticket: {
        lottery_id: lottery_id,
      },
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg6)
      .then((response: any) => {
        console.log('--------- 참여 티켓수 ---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('--------- 참여 티켓수 ---------')
        console.log(error)
      })
    // Count User (해당회차 참여자수)
    const qeury_msg7: Record<string, unknown> = {
      count_user: {
        lottery_id: lottery_id,
      },
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg7)
      .then((response: any) => {
        console.log('-----------참여유저수-------------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('-----------참여유저수-------------')
        console.log(error)
      })

    //컨트랙트 구성요소
    const qeury_msg8: Record<string, unknown> = {
      config: {}
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg8)
      .then((response: any) => {
        console.log('--------- 계약 정보 ---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('--------- 계약 정보 ---------')
        console.log(error)
      })

    //회차당 당첨번호
    const qeury_msg9: Record<string, unknown> = {

      get_jackpot: { lottery_id: lottery_id }
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg9)
      .then((response: any) => {
        console.log('--------회차당 당첨번호---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)

        console.log('--------회차당 당첨번호---------')
        console.log(error)
      })
    // Jackpot Count (해당회차 랭킹별 당첨자수)
    const qeury_msg5: Record<string, unknown> = {
      jackpot_count: {
        lottery_id: lottery_id,
      },
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg5)
      .then((response: any) => {
        console.log('--------- 해당 회차 랭킹별 당첨자 수 ---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('--------- 해당 회차 랭킹별 당첨자 수 ---------')
        console.log(error)
      })

    //회차당 랭킹별 당첨금액
    const qeury_msg10: Record<string, unknown> = {

      jackpot_balance: { lottery_id: lottery_id }
    }
    signingClient
      ?.queryContractSmart(PUBLIC_CONTRACT_ADDRESS, qeury_msg10)
      .then((response: any) => {
        console.log('--------회차당 랭킹별 당첨금액---------')
        console.log(response)
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
        console.log('--------회차당 랭킹별 당첨금액---------')

        console.log(error)
      })

  }, [])


  const handleSend = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setSuccess('')
    setError('')
    setLoading(true)
    // const entrypoint = {
    //   safe_lock: {}
    // }
    // const entrypoint = {
    //   seed_generation: {
    //     seed: "ahhhh1231241asdfash112312152352345asefasedfasefasefasefzzsdfzsdfzz123`1455azzzz"
    //   }
    // }
    // const entrypoint = {
    //   draw: {}
    // }

    // const entrypoint = {
    //   collect_counter: {}
    // }
    // const entrypoint = {
    //   collect_balance: {}
    // }
    const entrypoint = {
      claim: { address: walletAddress, lottery_id: lottery_id }
    }
    // const entrypoint = {
    //   register: {
    //     address: walletAddress,
    //     combination: lotteryTicketsToSend,
    //   },
    // }
    // const sendAmount: string = (
    //   entrypoint.register.combination.length * 10000
    // ).toString()


    // const amount: Coin[] = [
    //   {
    //     denom: PUBLIC_STAKING_DENOM,
    //     amount: sendAmount,
    //   },
    // ]
    const gasPrice = GasPrice.fromString('0.1utorii')
    const txFee = calculateFee(1300000, gasPrice)
    await signingClient
      // ?.execute(walletAddress, PUBLIC_CONTRACT_ADDRESS, entrypoint, txFee, '', amount)
      ?.execute(
        walletAddress,
        PUBLIC_CONTRACT_ADDRESS,
        entrypoint,
        txFee,
      )

      .then((res) => {
        console.log('res', res)
        window.alert("success")
        // const message = `Success! Sent ${sendAmount}  ${convertFromMicroDenom(
        //   PUBLIC_STAKING_DENOM
        // )} to ${PUBLIC_RECIPIENT_ADDRESS}.`

        setLoadedAt(new Date())
        setLoading(false)
        // setSuccess(message)
        resetlotteryTickets()
      })
      .catch((error) => {
        window.alert("fail")
        setLoading(false)
        setError(`Error! ${error.message}`)
        console.log('Error: signingClient.execute(): ', error)
      })
  }

  return (
    <WalletLoader loading={loading}>
      {lotteryTickets.length > 0 && (
        <button
          type='button'
          className='btn-payment w-60 mx-auto relative z-30'
          onClick={handleSend}
        >
          <img src={'/archway-logo.png'} width={32} className={'pr-2'} />
          Pay with Archway
        </button>
      )}
    </WalletLoader>
  )
}

export default SendTorii
