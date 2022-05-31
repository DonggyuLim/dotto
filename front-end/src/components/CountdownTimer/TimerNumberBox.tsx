import React from 'react'

interface numProp {
  num: string | number
  unit: string
  flip: boolean
}

const TimerNumberBox = ({ num, unit, flip }: numProp) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative bg-transparent flex flex-col items-center justify-center rounded-lg w-10 h-10 text-xl md:w-12 md:h-12 md:text-2xl mt-1'>
        <div className='rounded-t-lg rounded-b-lg bg-[#343650] w-full h-full'></div>
        <div className='md:text-xl absolute text-white z-10 font-bold'>
          {num}
        </div>
        <div className='rounded-b-lg rounded-t-lg -mt-3 bg-[#2c2e3f] w-full h-full'></div>
        <div
          className={`absolute w-full h-1/2 top-0 rounded-t-lg z-5 
          ${flip ? 'animate-flip bg-[#383b5a]' : 'bg-transparent'}
          `}
        ></div>
        {/* // 양쪽 점 두개 */}
        {/* <div className='absolute -right-1 top-[60px] rounded-full w-[12px] h-[12px] bg-[#1e1f29]'></div>
        <div className='absolute -left-1 top-[60px] rounded-full w-[12px] h-[12px] bg-[#1e1f29]'></div> */}
      </div>
      <p className='text-[#576272] text-xs font-semibold tracking-tighter'>
        {unit}
      </p>
    </div>
  )
}

export default TimerNumberBox
