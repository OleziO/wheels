interface ITimeIntervals {
  value: number
  forms: [string, string, string]
}

class TimeService {
  timeAgo (date: Date): string {
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const timeIntervals: ITimeIntervals[] = [
      { value: 31536000, forms: ['рік', 'роки', 'років'] },
      { value: 2592000, forms: ['місяць', 'місяці', 'місяців'] },
      { value: 86400, forms: ['день', 'дні', 'днів'] },
      { value: 3600, forms: ['годину', 'години', 'годин'] },
      { value: 60, forms: ['хвилину', 'хвилини', 'хвилин'] }
    ]

    for (const { value, forms } of timeIntervals) {
      const interval = Math.floor(seconds / value)
      if (interval >= 1) {
        const form = this.getPluralForm(interval, forms)
        return `${interval} ${form} тому`
      }
    }

    return 'Недавно'
  }

  private getPluralForm (number: number, forms: [string, string, string]): string {
    const n = Math.abs(number) % 100
    const n1 = n % 10

    if (n > 10 && n < 20) {
      return forms[2]
    }
    if (n1 > 1 && n1 < 5) {
      return forms[1]
    }
    if (n1 === 1) {
      return forms[0]
    }
    return forms[2]
  }
}

export default new TimeService()
