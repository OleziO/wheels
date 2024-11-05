import { formatDistanceToNow } from 'date-fns'
import { uk, enUS } from 'date-fns/locale'

class TimeService {
  timeAgo (date: Date): string {
    const { locale } = useI18n()
    const distance = formatDistanceToNow(date, {
      addSuffix: true,
      locale: locale.value === 'uk' ? uk : enUS
    })

    return distance.charAt(0).toUpperCase() + distance.slice(1)
  }
}

const timeService = new TimeService()
export default timeService
