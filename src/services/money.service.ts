import { useI18n } from 'vue-i18n'
import currency from '@/api/currency'

class MoneyService {
  rate: number

  constructor () {
    this.rate = 0
  }

  async getUSDtoUAH () {
    if (!this.rate) {
      const response = await currency.rateUSD()
      this.rate = response.data[0].rate as number
    }

    return this.rate
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

const moneyService = new MoneyService()
export default moneyService
