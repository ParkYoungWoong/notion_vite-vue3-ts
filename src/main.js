import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import loadImage from './plugins/loadImage'
import App from './App.vue'
import TheLoader from './components/TheLoader.vue'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

createApp(App)
  .use(pinia)
  .use(router)
  .use(loadImage)
  .component('TheLoader', TheLoader)
  .mount('#app')
