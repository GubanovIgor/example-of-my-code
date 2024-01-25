import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../assets/localisation/en.json';
import pt from '../../assets/localisation/pt.json';

export default i18next.use(initReactI18next).init({
  returnNull: false,
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
    pt: {
      translation: pt,
    },
  },
  lng: 'en',
  react: {
    useSuspense: false,
  },
});
