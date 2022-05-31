const lotteryDrawDate = (): Date => {
  const drawYear = new Date().getUTCFullYear()
  const drawMonth = new Date().getUTCMonth()
  const drawDate = new Date().getUTCDate() + 1
  const drawHour = 6 //?

  // Test
  // const drawHour = 5
  // const drawMinute = new Date().getUTCMinutes() - 59
  // let date = new Date(drawYear, drawMonth, drawDate, drawHour, drawMinute)

  // EVERY DAY 9PM (UTC)
  let date = new Date(drawYear, drawMonth, drawDate, drawHour)
  let check9pm = new Date().getUTCHours()
  if (check9pm >= 21 && check9pm <= 24) {
    date = new Date(drawYear, drawMonth, drawDate + 1, drawHour)
  }
  return date
}

export default lotteryDrawDate
