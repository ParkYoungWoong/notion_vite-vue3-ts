import { app } from '@storybook/vue3'
import { markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import TheLoader from '~/components/TheLoader.vue'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

app
  .use(pinia)
  .use(router)
  .use(loadImage)
  .component('TheLoader', TheLoader)
  .mount('#app')

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}