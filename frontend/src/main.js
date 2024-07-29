import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueMask from '@devindex/vue-mask'

const app = createApp(App);
app.use(VueMask);

import '@fortawesome/fontawesome-free/css/all.css'
app.mount('#app')
