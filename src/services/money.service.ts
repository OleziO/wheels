import currency from '@/api/currency'

class MoneyService {
  rate

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

    if (moneyPosition === 'start') return `${moneyText}${formattedAmount}`
    return `${formattedAmount} ${moneyText}`
  }

  formatCurrency (amount: number): string {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
}

export default new MoneyService()
