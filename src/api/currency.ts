import axios from 'axios'

class Currency {
  private getFormattedDate () {
    const date = new Date()

    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date).replace(/-/g, '')
  }

  get url () {
    return `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${this.getFormattedDate()}&json`
  }

  async rateUSD () {
    return await axios.get(this.url)
  }
}
const currencyApi = new Currency()
export default currencyApi
