import dayjs from 'dayjs'

interface Item {
  time: string
  [k: string]: any
}

interface Result {
  key: string
  records: any
}

export function formatDate(d: string | Date, onlyDate = true) {
  const date = dayjs(d)
  if (onlyDate || date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}

export function formatTime(time: string) {
  return dayjs(time).format('YYYY-MM-DD')
}

export function groupByTime(records: Item[]): Result[] {
  const result: Result[] = []
  const timeMap = new Map()
  if (records.some(r => !r.time))
    return [{ key: '', records }] // not need group
  const getTimestamp = (time: string) => dayjs(time).unix()
  const sortedRecords = records.slice().sort((a, b) => {
    return getTimestamp(b.date) - getTimestamp(a.date)
  })
  for (const item of sortedRecords) {
    const year = dayjs(item.date).year()
    if (timeMap.has(year))
      timeMap.get(year).push(item)

    else
      timeMap.set(year, [item])
  }
  let idx = records.length
  for (const [year, records] of timeMap) {
    result.push({
      key: year,
      records: records.map((v: any) => ({ ...v, time: dayjs(v.date).format('M 月 DD 日'), _idx: idx-- })),
    })
  }

  return result
}
