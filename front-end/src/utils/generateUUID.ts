const generateUUID = (): string => {
  const uuid = self.crypto.randomUUID()
  // console.log(self)
  // console.log(uuid)
  return uuid
}
export default generateUUID
