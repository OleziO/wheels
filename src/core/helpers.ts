import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'
import 'dayjs/locale/uk'

dayjs.extend(relativeTime)

export function timeAgo (date: Date) {
  const { locale } = useI18n()
  const lang = locale.value === 'uk' ? 'uk' : 'en'

  dayjs.locale(lang)
  const distance = dayjs(date).fromNow()

  return distance.charAt(0).toUpperCase() + distance.slice(1)
}
