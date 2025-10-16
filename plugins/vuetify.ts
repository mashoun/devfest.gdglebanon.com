// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#FFFFFF',
            surface: '#FFFFFF'
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: '#2196F3',
            secondary: '#424242',
            accent: '#FF4081',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
            background: '#1e1e1e',
            surface: '#2a2a2a',
            'on-background': '#ffffff',
            'on-surface': '#ffffff',
            'on-primary': '#ffffff'
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
