class TimeService {
  timeAgo (date: Date): string {
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const timeIntervals = [
      { value: 31536000, label: 'рік' },
      { value: 2592000, label: 'місяць' },
      { value: 86400, label: 'день' },
      { value: 3600, label: 'година' },
      { value: 60, label: 'хвилина' }
    ]

    for (const { value, label } of timeIntervals) {
      const interval = Math.floor(seconds / value)
      if (interval >= 1) {
        return `${interval} ${label}${interval > 1 ? 'и' : ''} тому`
      }
    }

    return '1 хвилина тому'
  }
}

export default new TimeService()
