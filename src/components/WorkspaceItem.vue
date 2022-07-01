<template>
  <li>
    <div
      :style="{ paddingLeft: `${14 * depth}px` }"
      :class="{ active: workspace.id === $route.params.id }"
      class="item" 
      @click="$router.push(`/workspaces/${workspace.id}`)">
      <div
        :class="{ active: showChildren }"
        class="icon"
        @click.stop="showChildren = !showChildren">
        <i class="fa-solid fa-caret-right"></i>
      </div>
      <div class="title">
        {{ workspace.title || '제목 없음' }}
      </div>
      <div class="actions">
        <div
          class="icon"
          @click.stop="createWorkspace">
          <i class="fa-solid fa-plus"></i>
        </div>
        <div
          class="icon"
          @click.stop="deleteWorkspace">
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
    <div
      v-if="!workspace.children && showChildren"
      :style="{ paddingLeft: `${14 * depth + 32}px` }"
      class="item no-children">
      <div class="title">
        하위 페이지가 없습니다.
      </div>
    </div>
    <ul v-if="workspace.children && showChildren">
      <WorkspaceItem 
        v-for="ws in workspace.children"
        :key="ws.id"
        :workspace="ws"
        :depth="depth + 1" />
    </ul>
  </li>
</template> 

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkspaceStore } from '~/store/workspace'

const route = useRoute()
const router = useRouter()
const workspaceStore = useWorkspaceStore()

const props = defineProps({
  workspace: {
    type: Object,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  }
})

const showChildren = ref(false)

watch(route, () => {
  openChildren()
})

openChildren()

function openChildren() {
  showChildren.value = workspaceStore.currentWorkspacePath.some(w => w.id === props.workspace.id) 
    ? true
    : showChildren.value // 다른 워크스페이스 항목이 닫히지 않도록, 원래 값으로 다시 할당!
}
async function createWorkspace() {
  await workspaceStore.createWorkspace({ 
    parentId: props.workspace.id 
  })
  showChildren.value = true
}
async function deleteWorkspace() {
  await workspaceStore.deleteWorkspace(props.workspace.id)
  if (props.workspace.id === route.params.id) {
    router.push(`/workspaces/${workspaceStore.workspaces[0].id}`)
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
  user-select: none;
  .item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    $size: 32px;
    height: $size;
    position: relative;
    color: rgba($color-font, .8);
    &:hover {
      background-color: $color-background--hover1;
      .actions {
        display: flex;
      }
    }
    &.active {
      background-color: $color-background--hover1;
      &:hover {
        background-color: $color-background--hover2;
        .icon:hover {
          background-color: $color-background--hover3;
        }
      }
      .title {
        font-weight: 700;
        color: rgba($color-font, .8);
      }
    }

    .icon {
      flex-shrink: 0;
      width: $size - 4;
      height: $size;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba($color-icon, .8);
      &:hover {
        background-color: $color-background--hover2;
      }
      &.active i {
        transform: rotate(90deg);
      }
    }
    .title {
      flex-grow: 1;
      margin: 0 2px 0 4px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 14px;
    }
    .actions {
      display: none;
      align-items: center;
    }
    &.no-children {
      color: rgba($color-font, .35);
      height: 30px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
