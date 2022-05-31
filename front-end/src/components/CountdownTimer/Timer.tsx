import { useEffect, useState } from 'react'
import TimerContainer from 'components/CountdownTimer/TimerContainer'
import TimerInput from 'components/CountdownTimer/TimerInput'
import lotteryDrawDate from 'utils/lotteryDrawDate'
import { useSetRecoilState } from 'recoil'
import { lotteryDrawState } from 'recoils/lottery'

const Timer = () => {
  const [time, setTime] = useState<number>(0)
  const [newTime, setNewTime] = useState<number>(0)
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [message, setMessage] = useState<string>('')

  const setLotteryDrawState = useSetRecoilState(lotteryDrawState)

  // const timeToDays = time + 60 * 60 * 9 * 1000
  // let a = new

  // EVERY DAY 9PM
  let countDownDate = lotteryDrawDate()

  const displayDate = lotteryDrawDate()
    .toUTCString()
    .substring(5, countDownDate.toUTCString().length)

  useEffect(() => {
    let updateTime = setInterval(() => {
      setLotteryDrawState({ lotteryDrawDate: countDownDate })

      let now = new Date().getTime()
      let difference = countDownDate.getTime() - now

      let newDays = Math.floor(difference / (1000 * 60 * 60 * 24))
      let newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      let newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      let newSeconds = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(newDays)
      setHours(newHours)
      setMinutes(newMinutes)
      setSeconds(newSeconds)

      if (difference <= 0) {
        clearInterval(updateTime)
        setMessage('The Launch Has Started')
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    })

    return () => {
      clearInterval(updateTime)
    }
  }, [time])

  const handleClick = () => {
    setTime(newTime)
    console.log(time)
    setNewTime(0)
  }

  const handleChange = (e: any) => {
    let inputTime = e.target.value
    setNewTime(inputTime)
  }

  return (
    <div className='mt-2'>
      <span className='text-[#576272] font-black text-xs md:text-sm'>
        JOIN LOTTERY {displayDate}
      </span>
      <TimerContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
      <TimerInput
        // value={1}
        value={newTime}
        handleClick={handleClick}
        handleChange={handleChange}
      />
    </div>
  )
}

export default Timer
