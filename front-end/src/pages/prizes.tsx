import TimeOfDay from 'components/TimeOfDay'
import WinningsTable from 'components/WinningsTable'
import { useState } from 'react'

const prizes = () => {
  const [type, setType] = useState('day')

  return (
    <div className='flex flex-col justify-center items-center space-y-1 pt-4 bg-black-500'>
      <div className='flex-col justify-center items-center rounded-md pt-4 space-y-24 w-full'>
        <WinningsTable type={type} />
        <TimeOfDay type={type} setType={setType} />
      </div>
    </div>
  )
}

export default prizes
