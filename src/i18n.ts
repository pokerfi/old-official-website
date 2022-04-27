import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './assets/locales/en.json'
import zh from './assets/locales/zh-CN.json'

const resources: any = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
