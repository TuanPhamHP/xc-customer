// import colors from 'vuetify/es5/util/colors';
require('dotenv').config();
export default {
  env: {
    VUE_APP_BASE_URL: process.env.VUE_APP_BASE_URL,
    VUE_APP_LOGIN_URL: process.env.VUE_APP_LOGIN_URL,
    VUE_APP_LOGOUT_URL: process.env.VUE_APP_LOGOUT_URL,
    VUE_APP_WEBSOCKET_URL: process.env.VUE_APP_WEBSOCKET_URL,

    VUE_APP_X_API_KEY: process.env.VUE_APP_X_API_KEY,
    VUE_APP_SOCKET_IO_URL: process.env.VUE_APP_SOCKET_IO_URL,
    VUE_APP_ENVIRONMENT: process.env.VUE_APP_ENVIRONMENT,
    VUE_APP_CHAT_URL: process.env.VUE_APP_CHAT_URL
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Xuân Cương - %s',
    title: 'Khách hàng',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/style/main.scss', '@/assets/fonts/Inter/stylesheet.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/indexedDB.js',
    '~/plugins/globalComponents.js',
    '~/plugins/repositories.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],
  proxy: {
    '/api': { target: process.env.VUE_APP_BASE_URL }
  },

  router: {
    middleware: ['auth'],
    routeNameSplitter: '/'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          app_bg: '#F7F7F7',
          app_bg_navbar: '#fff',
          navbar_bg: '#ffffff',
          border_app: '#d5d5d5',
          news_bg: '#ffffff',
          primary: '#0D7042', // #E53935
          primary_light: '#3389AD', // #E53935
          primary_light_o1: '#cce2eb', // #E53935
          primary_color_sub1: '#FF3333',
          primary_color_sub2: '#CC0000',
          primary_color_sub3: '#800000',
          primary_color_sub4: '#A60001',
          primary_color_sub5: '#FF6666',
          primary_color_sub6: '#FF9999',
          primary_color_sub7: '#FFCCCC',
          primary_color_sub8: '#FFF2F2',
          secondary_text: '#282828',
          secondary_text_color_sub1: '#5A5A5A',
          secondary_text_color_sub2: '#080808',
          secondary: '#E4A025',
          secondary_color_sub1: '#ECBC66',
          secondary_color_sub2: '#B6801E',
          neutral: '#1A1A1A',
          neutral_color_sub1: '#4D4D4D',
          neutral_color_sub2: '#808080',
          neutral_color_sub3: '#B3B3B3',
          neutral_color_sub4: '#E6E6E6',
          neutral_color_sub5: '#F2F2F2',
          semantic_accent: '#00A3FF',
          semantic_warning: '#FE9705',
          semantic_error: '#D11313',
          semantic_info: '#0569FF',
          semantic_success: '#3AC430',
          sidebar_ico_active_color: '#4D4D4D',
          warningRed: '#D11313',
          news_block_bg: '#FAFAFA',
          highlight: '#006C99',
          black: '#000',
          snack_success: '#4CAF50',
          snack_info: '#2196F3',
          snack_warning: '#FB8C00',
          snack_error: '#FF5252'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
