export function delay(millis = 1000): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, millis)
  })
}
