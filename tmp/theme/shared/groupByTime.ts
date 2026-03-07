import dayjs from 'dayjs'

interface Item {
  time?: string
  date?: string
  [k: string]: any
}

interface Result<T = Item> {
  key: string
  records: T[]
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

function getRecordTime(record: Item) {
  return record.date || record.time
}

export function groupByTime<T extends Item>(records: T[]): Result<T>[] {
  const result: Result<T>[] = []
  const timeMap = new Map<string, T[]>()
  if (records.some(record => !getRecordTime(record)))
    return [{ key: '', records }] // not need group

  const getTimestamp = (time: string) => dayjs(time).unix()
  const sortedRecords = records.slice().sort((a, b) => {
    return getTimestamp(getRecordTime(b)!) - getTimestamp(getRecordTime(a)!)
  })

  for (const item of sortedRecords) {
    const year = String(dayjs(getRecordTime(item)!).year())
    const yearRecords = timeMap.get(year)
    if (yearRecords)
      yearRecords.push(item)
    else
      timeMap.set(year, [item])
  }

  let idx = records.length
  for (const [year, records] of timeMap) {
    result.push({
      key: year,
      records: records.map(v => ({
        ...v,
        time: dayjs(getRecordTime(v)!).format('M 月 DD 日'),
        _idx: idx--,
      })),
    })
  }

  return result
}
