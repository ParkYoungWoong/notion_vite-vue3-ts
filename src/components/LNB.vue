<template>
  <nav
    ref="nav"
    :style="{ width: `${navWidth}px` }">
    <div class="header">
      <div class="user-profile"></div>
      <h2 class="title">
        Heropy's Notion
      </h2>
      <TheLoader
        :loading="workspaceStore.loading"
        class="loader" />
    </div>
    <ul class="workspaces">
      <WorkspaceItem 
        v-for="workspace in workspaceStore.workspaces"
        :key="workspace.id"
        :workspace="workspace" />
    </ul>
    <div class="actions">
      <p>현재 게스트로 사용 중입니다. 모든 워크스페이스 페이지를 보려면 관리자에게 요청해 멤버로 업그레이드하세요.</p>
      <div
        class="action"
        @click="workspaceStore.createWorkspace({})">
        <i class="fa-solid fa-plus"></i>
        워크스페이스 생성
      </div>
      <div
        :class="{ disabled: !workspaceStore.backedUpWorkspaceId }"
        class="action"
        @click="workspaceStore.rollbackWorkspace">
        <i class="fa-solid fa-rotate-left"></i>
        워크스페이스 삭제 되돌리기
      </div>
    </div>
    <div
      ref="resizeHandle"
      class="resize-handle"
      @dblclick="navWidth = 260"></div>
  </nav>
</template>

<script lang="ts">
import interact from 'interactjs'
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'
import WorkspaceItem from '~/components/WorkspaceItem.vue'

export default defineComponent({
  components: {
    WorkspaceItem
  },
  data() {
    return {
      navWidth: 260
    }
  },
  computed: {
    ...mapStores(useWorkspaceStore)
  }, 
  created() {
    this.workspaceStore.readWorkspaces()
  },
  mounted() {
    this.resizeInit()
  },
  methods: {
    resizeInit() {
      interact(this.$refs.nav as HTMLElement)
        .resizable({
          edges: {
            right: this.$refs.resizeHandle as HTMLDivElement
          }
        })
        .on('resizemove', event => {
          this.navWidth = event.rect.width
        })
    }
  }
})
</script>

<style scoped lang="scss">
nav {
  max-width: 500px;
  min-width: 160px;
  height: 100%;
  background-color: $color-background;
  flex-shrink: 0; // 뷰포트 가로 너비가 작을 때 찌그러짐 방지
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .header {
    padding: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    .user-profile {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 10px;
      background-image: url("https://heropy.blog/css/images/logo.png");
      background-size: cover;
    }
    .title {
      flex-grow: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      height: 100%;
    }
    .loader {
      margin-left: 6px;
    }
  }
  ul.workspaces {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 4px;
  }
  .actions {
    padding: 14px;
    border-top: 1px solid $color-border;
    color: $color-font;
    p {
      font-size: 12px;
      line-height: 1.2;
      opacity: .6;
    }
    .action {
      margin-top: 10px;
      height: 40px;
      padding: 0 12px;
      border-radius: 10px;
      background-color: $color-background--hover1;
      font-size: 14px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &.disabled {
        cursor: default;
        opacity: .3;
      }
      &:hover {
        background-color: $color-background--hover2;
      }
      i {
        font-size: 18px;
        margin-right: 6px;
      }
    }
  }
  .resize-handle {
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: col-resize;
    transition: .4s;
    &:hover {
      background-color: $color-border;
    }
  }
}
</style>
