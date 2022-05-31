export interface lotteryType {
  number: number[]
  // pairNumber: number[]
  id: string
}

export interface lotteryGameType {
  playLottery?: lotteryType[]
  resultLottery?: lotteryType
  win?: number
  lotteryCost?: number
  createdAt?: Date
}

export interface lotteryRoundType {
  roundId: number
  ticketCounts: string
  userCounts: string
  winningNumber: string
  prizesByRank: {
    first: string
    second: string
    third: string
    fourth: string
    fifth: string
  }
  jackpotCount: []
  winners: []
}

export interface lotteryRoundContractType extends lotteryRoundType {
  totalPrizes: number
  winnerCountsByRank: string[]
  contractConfig: {}
}

export interface lotteryDrawType {
  lotteryDrawDate: Date | null
}
