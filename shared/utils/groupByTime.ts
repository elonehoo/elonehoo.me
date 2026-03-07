import dayjs from 'dayjs'

function toGroupedRecord<T extends { path?: string }>(record: T, idx: number, getRecordTime: (record: T) => string | undefined) {
  const date = getRecordTime(record)!
  return {
    ...record,
    date,
    time: dayjs(date).format('M 月 DD 日'),
    url: record.path ?? '',
    _idx: idx,
  }
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

export function groupByTime<T extends { path?: string }>(
  records: T[],
  getRecordTime: (record: T) => string | undefined,
) {
  const timeMap = new Map<string, T[]>()
  if (records.some(record => !getRecordTime(record)))
    return [{ key: '', records: records.map((record, index) => toGroupedRecord(record, records.length - index, getRecordTime)) }]

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
  return Array.from(timeMap, ([year, records]) => {
    return {
      key: year,
      records: records.map(v => toGroupedRecord(v, idx--, getRecordTime)),
    }
  })
}
