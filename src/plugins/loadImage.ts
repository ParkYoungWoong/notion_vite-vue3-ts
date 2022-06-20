import { App } from 'vue'

export default {
  install(app: App) {
    app.config.globalProperties.$loadImage = (src: string) => {
      return new Promise(resolve => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          resolve(true)
        })
      })
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $loadImage: (src: string) => Promise<undefined>
  }
}
