import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { focusDirective } from './directives'
import './scss/styles.scss'

import { formatRelative } from 'date-fns'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app.config.globalProperties.$filters = {
  formatTime(time) {
    return formatRelative(new Date(time), new Date())
  },
}

app.directive('focus', focusDirective)

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCCw7udchhbe1ycD5KUE-vB3DUbOi1gnoY',
  },
})
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
