interface NumberBallProps {
  lotteryNumber: number[]
  deleteLotteryNumber(number: number): void
}

const PUBLIC_SITE_ICON_URL = process.env.NEXT_PUBLIC_SITE_ICON_URL || ''

const NumberBall = ({
  lotteryNumber,
  deleteLotteryNumber,
}: NumberBallProps) => {
  return (
    <div className='flex flex-row justify-center items-center space-x-6 font-bold text-slate-700 text-3xl'>
      {lotteryNumber?.map((value, index) => (
        <div
          key={index}
          className={`flex items-center justify-center rounded-full border-2 outline outline-offset-2 outline-4 w-12 h-12 md:w-16 md:h-16 hover:scale-110 hover:cursor-pointer transition      
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
          onClick={() => deleteLotteryNumber(index)}
        >
          {value === -1 ? (
            <img
              src={PUBLIC_SITE_ICON_URL}
              className={'bg-transparent bg-cover w-5 hover:scale-150'}
            />
          ) : (
            value
          )}
        </div>
      ))}
    </div>
  )
}
export default NumberBall
