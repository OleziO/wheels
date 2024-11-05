import type { Plugin } from 'vue'
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    recently: 'Recently',
    year: ['year', 'years'],
    month: ['month', 'months'],
    day: ['day', 'days'],
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes']
  },
  uk: {
    recently: 'Недавно',
    year: ['рік', 'роки', 'років'],
    month: ['місяць', 'місяці', 'місяців'],
    day: ['день', 'дні', 'днів'],
    hour: ['годину', 'години', 'годин'],
    minute: ['хвилину', 'хвилини', 'хвилин']
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'uk',
  fallbackLocale: 'en',
  messages
})

export default i18n

const I18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n)
  }
}

export {
  i18n,
  I18nPlugin
}
