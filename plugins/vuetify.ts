import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as dataTableComponents from 'vuetify/labs/VDataTable'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#3a7dff',
    secondary: '#21359b',
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...dataTableComponents,
    },
    directives,
    icons: {
      defaultSet: 'mdi',
    },
    theme: {
      defaultTheme: 'customDarkTheme',
      themes: { customDarkTheme },
    },
    defaults: {
      VDataTable: {
        fixedHeader: true,
        noDataText: 'No hay resultados.',
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
