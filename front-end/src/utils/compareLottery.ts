import { lotteryType } from 'types/lotteryTypes'

const compareLotteryTicket = (arr1: number[], arr2: number[]) => {
  return arr1.filter((item) => arr2.includes(item))
}

const matchNumberLottery = (
  playerLottery: lotteryType,
  resultLottery: lotteryType
) => {
  const { number: numberSelectedbyUser } =
    // const { number: numberSelectedbyUser, pairNumber: pairNumberSelectedbyUser } =
    playerLottery
  const { number: numberSelectedResult } =
    // const { number: numberSelectedResult, pairNumber: pairNumberSelectedResult } =
    resultLottery

  const matchNumber = compareLotteryTicket(
    numberSelectedbyUser,
    numberSelectedResult
  )
  // const matchPairNumber = compareLotteryTicket(
  //   pairNumberSelectedbyUser,
  //   pairNumberSelectedResult
  // )

  // return { matchNumber, matchPairNumber }
  return { matchNumber }
}

export default matchNumberLottery
