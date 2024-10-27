class MoneyService {
  convertUSDtoUAH (amount: number): number {
    return amount * 42 // refactor
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
