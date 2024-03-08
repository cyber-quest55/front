// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    SOCKET_SUFFIX: 'd@',
    SOCKET_DEVICE_SUFFIX: 'd/',
    FCM_SUFFIX: "d-",
    API_URL: 'http://localhost:3000',
    REACT_APP_FIREBASE_APIKEY: "AIzaSyCp-8PCL9NbEcQmT1IZpcsIR7oXuc7pw8s",
    REACT_APP_FIREBASE_AUTHDOMAIN: "irricontrol-dev.firebaseapp.com",
    REACT_APP_FIREBASE_PROJECTID: "irricontrol-dev",
    REACT_APP_FIREBASE_STORAGEBUCKET: "irricontrol-dev.appspot.com",
    REACT_APP_FIREBASE_MESSAGINGSENDERID: "634355703554",
    REACT_APP_FIREBASE_APPID: "1:634355703554:web:b27f1b5c042a114a162c1b",
    REACT_APP_FIREBASE_MEASUREMENTID: "G-DY4KT9WKWC",
    REACT_APP_FIREBASE_USEPUBLICVAPIDKEY: "BHupSxJBrh3JkYt7SkC9Uul0IH-xNQS_ykYjfgWaLexiR34ykwLoCvii4t7CHMFbt6jksm8wsQX-fqOrdJN75vQ",
  },
});
