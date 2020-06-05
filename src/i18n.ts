import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Chat": "Chat",
          "Settings": "Settings",
          "Language": "Language",
          "User name": "User name",
          "Interface color": "Interface color",
          "Clock display": "Clock display",
          "Send message on CTRL+ENTER": "Send message on <1>CTRL+ENTER</1>",
          "Light": "Light",
          "Dark": "Dark",
          "On": "On",
          "Off": "Off",
          "12 Hours": "12 Hours",
          "24 Hours": "24 Hours",
          "Reset to defaults": "Reset to defaults",
          "Enter message": "Enter message"
        }
      },
      tr: {
        translation: {
          "Chat": "Sohbet",
          "Settings": "Ayarlar",
          "Language": "Dil",
          "User name": "Kullanıcı adı",
          "Interface color": "Arayüz rengi",
          "Clock display": "Saat şekli",
          "Send message on CTRL+ENTER": "<1>CTRL+ENTER</1> ile mesaj gönder",
          "Light": "Aydınlık",
          "Dark": "Koyu",
          "On": "Açık",
          "Off": "Kapalı",
          "12 Hours": "12 Saat",
          "24 Hours": "24 Saat",
          "Reset to defaults": "Varsayılana sıfırla",
          "Enter message": "Mesaj yaz"
        }
      }
    },

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'tr'],

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
