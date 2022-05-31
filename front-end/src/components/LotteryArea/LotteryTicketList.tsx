import React from 'react'
import LotteryTicketItem from 'components/LotteryArea/LotteryTicketItem'
import { lotteryTicketsState } from 'recoils/lottery'
import { useRecoilState } from 'recoil'

const LotteryTicketList = () => {
  const [lotteryTickets, setLotteryTickets] =
    useRecoilState(lotteryTicketsState)

  const removeTicketHandler = (id: string) => {
    const updatedLotteryTickets = lotteryTickets.filter(
      (ticket) => id !== ticket.id
    )
    setLotteryTickets(updatedLotteryTickets)
  }

  return (
    <div className=''>
      <div className='flex flex-col bg-gray-50 w-full items-center justify-center px-16'>
        <div className='relative w-full max-w-xl '>
          <div className='absolute top-32 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob '></div>
          <div className='absolute top-32 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
          <div className='absolute -bottom-44 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
          <div className='m-8 relative space-y-4'>
            {lotteryTickets.length > 0 && (
              <span>{`${lotteryTickets.length} ticket(s)`}</span>
            )}
            {lotteryTickets.map((ticket) => (
              <LotteryTicketItem
                key={ticket.id}
                ticket={ticket}
                removeTicketHandler={() => removeTicketHandler(ticket.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LotteryTicketList
