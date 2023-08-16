// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

console.log("pre")
const { REACT_APP_ENV } = process.env;
console.log("asdsa", REACT_APP_ENV)
export default defineConfig({
  define: {
    REACT_APP_ENV : REACT_APP_ENV || false,

    API_URL: 'localhost:3000',
  },
});
