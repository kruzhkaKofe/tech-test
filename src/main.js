import { createApp } from 'vue'
import './styles/style.sass'
import App from './App.vue'
import VObserver from './directives/VObserver'

const app = createApp(App)

app.directive('observer', VObserver)

app.mount('#app')
