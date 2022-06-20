import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '~', replacement: `${__dirname}/src` }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:color";
          @use "sass:list";
          @use "sass:map";
          @use "sass:math";
          @use "sass:meta";
          @use "sass:selector";
          @use "sass:string";
          @import "~/scss/variables";
        `
      }      
    }
  },
  server: {
    port: 2999
  }
})
