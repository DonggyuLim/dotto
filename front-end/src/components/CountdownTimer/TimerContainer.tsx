import React from 'react'
import TimerNumberBox from 'components/CountdownTimer/TimerNumberBox'

interface timeProps {
  days: number | string
  hours: number | string
  minutes: number | string
  seconds: number | string
}

const TimerContainer = ({ days, hours, minutes, seconds }: timeProps) => {
  let daysFlip = false
  let hoursFlip = false
  let minutesFlip = false
  let secondsFlip = true

  if (seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0) {
    daysFlip = false
    hoursFlip = false
    minutesFlip = false
    secondsFlip = false
  }

  if (seconds == 0) {
    if (minutes != 0) {
      seconds = 59
    }

    secondsFlip = false
    minutesFlip = true
  }
  if (minutes == 0) {
    if (hours != 0) {
      minutes = 59
    }

    minutesFlip = false
    hoursFlip = true
  }

  if (hours == 0) {
    hoursFlip = false
    if (days != 0) {
      daysFlip = true
    }
  }

  if (days < 10) {
    days = '0' + days
  }

  if (hours < 10) {
    hours = '0' + hours
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  if (seconds < 10) {
    seconds = '0' + seconds
  }

  return (
    <div className='flex items-center justify-center rounded-xl'>
      <TimerNumberBox num={days} unit='Days' flip={daysFlip} />
      <span className='text-lg w-2 h-10 font-normal text-[#222222]'>:</span>
      <TimerNumberBox num={hours} unit='Hours' flip={hoursFlip} />
      <span className='text-lg w-2 h-10 font-normal text-[#222222]'>:</span>
      <TimerNumberBox num={minutes} unit='Minutes' flip={minutesFlip} />
      <span className='text-lg w-2 h-10 font-normal text-[#222222]'>:</span>
      <TimerNumberBox num={seconds} unit='Seconds' flip={secondsFlip} />
    </div>
  )
}
export default TimerContainer
