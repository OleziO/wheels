import currencyApi from '@/api/currency'
import { useI18n } from 'vue-i18n'

class MoneyService {
  async getUSDtoUAH () {
    return (await currencyApi.rateUSD()).data[0].rate as number
  }

  numToMoneyWithFormat (amount: number, moneyText: string, moneyPosition: 'start' | 'end' = 'start') {
    const formattedAmount = this.formatCurrency(amount)
    const { t } = useI18n()

    const formattedMoneyText = t(moneyText)

    if (moneyPosition === 'start') {
      return `${formattedMoneyText}${formattedAmount}`
    }
    return `${formattedAmount} ${formattedMoneyText}`
  }

  formatCurrency (amount: number): string {
    return new Intl.NumberFormat('uk-UA', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }
}

export const moneyService = new MoneyService()
