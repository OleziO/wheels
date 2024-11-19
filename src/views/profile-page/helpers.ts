import dayjs from 'dayjs'

export function calculateYearAvgViews (data: TTables<'cars_with_views'>[], itemsCount = 1) {
  const thisYearData = data.map(item => {
    return {
      ...item,
      month: dayjs(item.created_at).month(),
      year: dayjs(item.created_at).year()
    }
  }).filter(item => item.year === dayjs().year())

  const countByMonth = thisYearData.reduce((acc, item) => {
    acc[item.month - 1] = (acc[item.month - 1] || 0) + 1
    return acc
  }, new Array(12).fill(0)).map(item => Math.round(item / itemsCount))

  return countByMonth
}
