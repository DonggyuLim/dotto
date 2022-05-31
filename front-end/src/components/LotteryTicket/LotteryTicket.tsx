import { lotteryType } from 'types/lotteryTypes'

interface LotteryTicketProps {
  ticket: lotteryType
}

const LotteryTicket = ({ ticket }: LotteryTicketProps) => {
  return (
    <div className='flex flex-row justify-center items-center space-x-4 font-bold bg-gray-50 bg-auto text-slate-700 text-xl'>
      {ticket.number.map((number, index) => (
        <div
          key={index}
          className={`flex items-center justify-center bg-white rounded-full border-0 outline outline-offset-2 outline-3 w-4 h-4 md:w-12 md:h-5 hover:scale-110 transition relative z-30      
           ${
             index === 0
               ? 'border-pink-300 outline-pink-500'
               : index === 1
               ? 'border-orange-300 outline-orange-500'
               : index === 2
               ? 'border-lime-300 outline-lime-500'
               : index === 3
               ? 'border-green-300 outline-green-500'
               : index === 4
               ? 'border-blue-300 outline-blue-500'
               : index === 5
               ? 'border-cyan-300 outline-cyan-500'
               : ''
           }`}
        >
          {number}
        </div>
      ))}
    </div>
  )
}

export default LotteryTicket
