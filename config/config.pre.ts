// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    SOCKET_SUFFIX: 'd@',
    SOCKET_DEVICE_SUFFIX: 'd/',
    API_URL: 'http://localhost:3000',
  },
});
