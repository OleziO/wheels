import axios from 'axios'

class Location {
  private getUrl (city: string) {
    return `https://us1.locationiq.com/v1/search?key=${import.meta.env.VITE_LOCATION_KEY}&q=${city}&format=json`
  }

  async getLocationUrl (city: string) {
    const data = JSON.parse(JSON.stringify((await axios.get(this.getUrl(city))).data))

    const lon = data[0].lon
    const lat = data[0].lat
    const latSpan = (parseFloat(data[0].boundingbox[1]) - parseFloat(data[0].boundingbox[0])).toFixed(6)
    const lonSpan = (parseFloat(data[0].boundingbox[3]) - parseFloat(data[0].boundingbox[2])).toFixed(6)

    return `https://www.google.com/maps?ll=${lat},${lon}&spn=${latSpan},${lonSpan}`
  }
}

const locationApi = new Location()
export default locationApi
