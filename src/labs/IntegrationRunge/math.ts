type Callback = (x: number) => number;

export default function integrate(callback: Callback, h: number, leftBorder: number, rightBorder: number) {
  let result = 0
  const length = rightBorder - leftBorder
  for (let i = 1; i < length; i++) {
    result += 2 * callback(leftBorder + i * h)
  }
}
