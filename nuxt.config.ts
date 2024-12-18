import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const NoirPreset = useCustomThemePreset()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@primevue/nuxt-module',
    'nuxt-vuefire',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/styles/app.css', 'primeicons/primeicons.css'],
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  primevue: {
    autoImport: false,
    options: {
      prefix: 'p',
      ripple: true,
      theme: {
        preset: NoirPreset,
        options: {
          cssLayer: true,
          cssLayerOrder: 'app, primeui, az-search'
        }
      }
    },
    components: {
      prefix: 'p'
    }

  },
  vuefire: {
    auth: true,
    config: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN
    },
    emulators: {
      enabled: false
    }
  }
})

function useCustomThemePreset() {
  // https://nuxt.com/docs/api/configuration/nuxt-config
  return definePreset(Aura, {
    semantic: {
      primary: {
        50: '{zinc.50}',
        100: '{zinc.100}',
        200: '{zinc.200}',
        300: '{zinc.300}',
        400: '{zinc.400}',
        500: '{zinc.500}',
        600: '{zinc.600}',
        700: '{zinc.700}',
        800: '{zinc.800}',
        900: '{zinc.900}',
        950: '{zinc.950}'
      },
      colorScheme: {
        light: {
          primary: {
            color: '{zinc.950}',
            inverseColor: '#ffffff',
            hoverColor: '{zinc.900}',
            activeColor: '{zinc.800}'
          },
          highlight: {
            background: '{zinc.950}',
            focusBackground: '{zinc.700}',
            color: '#ffffff',
            focusColor: '#ffffff'
          }
        },
        dark: {
          primary: {
            color: '{zinc.50}',
            inverseColor: '{zinc.950}',
            hoverColor: '{zinc.100}',
            activeColor: '{zinc.200}'
          },
          highlight: {
            background: 'rgba(250, 250, 250, .16)',
            focusBackground: 'rgba(250, 250, 250, .24)',
            color: 'rgba(255,255,255,.87)',
            focusColor: 'rgba(255,255,255,.87)'
          }
        }
      }
    }
  })
}
