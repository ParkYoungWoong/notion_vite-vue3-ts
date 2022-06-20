<template>
  <main>
    <LNB />
    <div class="workspace">
      <TheHeader />
      <div class="workspace__contents">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LNB from '~/components/LNB.vue'
import TheHeader from '~/components/TheHeader.vue'

export default defineComponent({
  components: {
    LNB,
    TheHeader
  }
})
</script>

<style lang="scss">
#app {
  color: $color-font;
  font-family: 'Noto Sans KR', sans-serif;
}
</style>

<style scoped lang="scss">
main {
  display: flex;
  height: 100vh;  
  .workspace {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    &__contents {
      flex-grow: 1;
      overflow-y: auto;
    }
  }
}
</style>
