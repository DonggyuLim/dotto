import generateUUID from 'utils/generateUUID'

const generateLottery = () => {
  let selectedNumber = []
  while (selectedNumber.length < 6) {
    let r = Math.floor(Math.random() * 10)
    // 숫자 중복 선택 불가능하게 하기
    // if (selectedNumber.indexOf(r) === -1) {
    selectedNumber.push(r)
    // }
  }

  // let selectedPairNumber = []
  // while (selectedPairNumber.length < 1) {
  //   let r = Math.floor(Math.random() * 10) + 1
  //   if (selectedPairNumber.indexOf(r) === -1) {
  //     selectedPairNumber.push(r)
  //   }
  // }

  return {
    number: selectedNumber,
    // number: selectedNumber.sort((a, b) => a - b),
    // pairNumber: selectedPairNumber.sort((a, b) => a - b),
    id: generateUUID(),
  }
}

export default generateLottery
