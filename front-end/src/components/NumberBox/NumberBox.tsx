import React, { useEffect } from 'react'

const numberArray10 = Array.from({ length: 10 }, (_, i) => i)

interface NumberBoxProps {
  lotteryNumber: number[]
  setLotteryNumber: React.Dispatch<React.SetStateAction<number[]>>
  validMaxNumber: boolean
  setValidMaxNumber: React.Dispatch<React.SetStateAction<boolean>>
  maxTickets: boolean
}

const NumberBox = ({
  lotteryNumber,
  setLotteryNumber,
  validMaxNumber,
  setValidMaxNumber,
  maxTickets,
}: NumberBoxProps) => {
  const selectNumberHandler = (numberInput: number) => {
    const currentNumber = [...lotteryNumber]
    const emptyNumberIndex = currentNumber.indexOf(-1)
    let updatedNumber: number[]
    if (emptyNumberIndex >= 0) {
      currentNumber.splice(emptyNumberIndex, 1, numberInput)
      setLotteryNumber(currentNumber)
    } else {
      updatedNumber = [...currentNumber]
      setLotteryNumber(updatedNumber)
    }
  }
  useEffect(() => {
    if (lotteryNumber.length === 6 && !lotteryNumber.includes(-1)) {
      setValidMaxNumber(true)
    } else {
      setValidMaxNumber(false)
    }
    if (maxTickets) {
      setValidMaxNumber(true)
    }
  }, [lotteryNumber, maxTickets, setValidMaxNumber])

  return (
    <div className='p-4 relative z-30'>
      <div className='flex w-full justify-center cursor-pointer'>
        {/* <div className='flex items-center mr-4 text-[#576272] font-black text-sm md:text-base'>
          choose <br />
          number
        </div> */}
        <div className='grid grid-cols-5 gap-2 w-64 md:w-1/2 content-center bg-transparent rounded-lg'>
          {numberArray10.map((number, index) => (
            <div
              key={index}
              onClick={() => selectNumberHandler(number)}
              className={`transform transition duration-500 bg-white h-10 md:h-16 rounded-lg shadow-xl text-[#222222] text-xl md:text-3xl font-bold flex justify-center items-center
                ${
                  number === 0
                    ? 'origin-right hover:rotate-45' // 시계 들어올려짐
                    : number === 1
                    ? 'hover:rotate-90 hover:scale-75' // 시계 회전 후 축소
                    : number === 2
                    ? 'hover:scale-75' // 축소
                    : number === 3
                    ? 'hover:-rotate-45' // 반시계 회전
                    : number === 4
                    ? 'hover:-translate-x-10' // 왼쪽 이동
                    : number === 5
                    ? 'hover:rotate-45' // 시계 방향 회전
                    : number === 6
                    ? 'hover:skew-x-12 hover:scale-110' // 좀 커지고 x 비스듬히
                    : number === 7
                    ? 'hover:rotate-90 hover:translate-x-5 hover:scale-130' // 시계 회전 후 확대
                    : number === 8
                    ? 'hover:skew-y-12 hover:scale-110' // 좀 커지고 y 비스듬히
                    : number === 9
                    ? 'origin-left hover:-rotate-45' //  반시계 들어올려짐
                    : 'hover:rotate-90 hover:scale-75' // 시계 회전 후 축소
                }`}
            >
              {number}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NumberBox
