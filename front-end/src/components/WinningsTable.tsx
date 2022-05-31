import { useRecoilValue } from 'recoil'
import { lotteryRoundState } from 'recoils/lottery'

const WinningsTable = ({ type }: { type: string }) => {
  const lotteryRound = useRecoilValue(lotteryRoundState)
  const {
    roundId,
    ticketCounts,
    userCounts,
    winningNumber,
    prizesByRank,
    jackpotCount,
    winners,
  } = lotteryRound[0]

  const winningTableData = [
    {
      prizeTier: '1st (6 digits match)',
      winnings: '1 in 95,344,20',
      averagePrize: `${prizesByRank?.first} TORRI`,
    },
    {
      prizeTier: '2nd (5 digits match)',
      winnings: '1 in 5,959,013',
      averagePrize: `${prizesByRank?.second} TORRI`,
    },
    {
      prizeTier: '3rd (4 digits match)',
      winnings: '1 in 3,405,150',
      averagePrize: `${prizesByRank?.third} TORRI`,
    },
    {
      prizeTier: '4th (3 digits match)',
      winnings: '1 in 423,752',
      averagePrize: `${prizesByRank?.fourth} TORRI`,
    },
    {
      prizeTier: '5th (2 digits match)',
      winnings: '1 in 15,134',
      averagePrize: `${prizesByRank?.fifth} TORRI`,
    },
  ]

  return (
    <div className='relative z-40'>
      <h1 className='text-3xl pb-6 text-white font-semibold'>Prize Table</h1>
      <div className='relative overflow-x-auto md:w-10/12 mx-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-center text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Prize Tier
              </th>
              <th scope='col' className='px-6 py-3'>
                Winnings
              </th>
              <th scope='col' className='px-6 py-3'>
                Average Prize
              </th>
              {/* <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {winningTableData?.map((data, index) => (
              <tr
                key={index}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 
                ${
                  type === 'day' && index == 0
                    ? 'bg-cyan-100 text-lg'
                    : type === 'sunset' && index == 1
                    ? 'bg-cyan-100 text-lg'
                    : type === 'dusk' && index == 2
                    ? 'bg-cyan-100 text-lg '
                    : type === 'night' && index == 3
                    ? 'bg-cyan-100 text-lg'
                    : ''
                }`}
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                >
                  {data.prizeTier}
                </th>
                <td className='px-6 py-4'>{data.winnings}</td>
                <td className='px-6 py-4'>{data.averagePrize}</td>
                {/* <td className='px-6 py-4 text-right'>
              <a
                href='#'
                className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
              >
                Edit
              </a>
            </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WinningsTable
