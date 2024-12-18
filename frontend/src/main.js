import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'
import { definePreset } from '@primevue/themes'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Password from 'primevue/password';
import Message from 'primevue/message';

const app = createApp(App)

const Noir = definePreset(Aura, {
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
      950: '{zinc.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
    },
    focusRing: {
      width: '2px',
      style: 'dashed',
      color: '{primary.color}',
      offset: '1px',
    },
  },
})
app.use(PrimeVue, {
  theme: {
    preset: Noir,
  },
})
app.component('Button', Button)
app.component('FloatLabel', FloatLabel)
app.component('InputText', InputText)
app.component('Card', Card)
app.component('Password', Password)
app.component('Message', Message)
app.mount('#app')
