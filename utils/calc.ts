export function calcHeight(width: number | string, height: number | string | undefined, aspectWidth: number, aspectHeight: number) {
  if (height)
    return height

  if (typeof width === 'number') {
    return (width * aspectHeight) / aspectWidth
  }
  else if (typeof width === 'string' && width.search('px') !== -1) {
    const widthNum = Number(width.replace('px', ''))
    return (widthNum * aspectHeight) / aspectWidth
  }
  else if (typeof width === 'string' && width === '100%') {
    return '100%'
  }
  return 360
}
