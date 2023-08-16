// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

console.log("dev")
const { REACT_APP_ENV  } = process.env;

export default defineConfig({
  define: {
    REACT_APP_ENV : REACT_APP_ENV || false,

    API_URL: 'https://dev-app.irricontrol.net/v3/',
  },
});
