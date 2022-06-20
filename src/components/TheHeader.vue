<template>
  <header>
    <div class="path">
      <template
        v-for="(path, index) in workspaceStore.currentWorkspacePath"
        :key="path.id">
        <span 
          v-if="index > 0"
          class="divider">
          <i class="fa-solid fa-angle-right"></i>
        </span>
        <button
          class="title"
          @click="$router.push(`/workspaces/${path.id}`)">
          {{ path.title || '제목 없음' }}
        </button>
      </template>
    </div>
    <div class="actions">
      <button><i class="fa-brands fa-github"></i></button>
      <button><i class="fa-solid fa-share"></i></button>
      <button><i class="fa-solid fa-circle-down"></i></button>
      <button><i class="fa-solid fa-star"></i></button>
      <button><i class="fa-solid fa-house"></i></button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default defineComponent({
  computed: {
    ...mapStores(useWorkspaceStore),
    currentWorkspaceId() {
      return this.$route.params.id as string
    }
  },
  watch: {
    // 스토어 상태(점 표기법)를 감시하는 패턴!
    ['workspaceStore.workspacesLoaded'](loaded) {
      loaded && this.workspaceStore.findWorkspacePath(this.currentWorkspaceId)
    },
    $route() {
      this.workspaceStore.findWorkspacePath(this.currentWorkspaceId)
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  flex-shrink: 0;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: auto;
  .path {
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    span.divider {
      margin: 0 2px;
      color: rgba($color-font, .4);
      font-size: 14px;
    }
    .title {
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .actions {
    display: flex;
    flex-shrink: 0;
  }
}
button {
  height: 34px;
  padding: 0 12px;
  border: none;
  border-radius: 4px;
  color: $color-icon;
  outline: none;
  background: none;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    background-color: $color-background;
  }
  &:nth-child(1) { font-size: 20px; }
  &:nth-child(2) { font-size: 19px; }
}
</style>
