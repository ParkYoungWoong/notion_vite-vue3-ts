import 'pinia'
declare module 'pinia' {
  import type Router from 'vue-router'
  export interface PiniaCustomProperties {
    $router: Router
  }
}
