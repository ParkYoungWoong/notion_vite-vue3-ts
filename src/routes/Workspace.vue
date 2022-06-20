<template>
  <section :key="currentWorkspaceId">
    <div class="inner">
      <TheLoader
        :loading="loading"
        :size="30"
        :width="4"
        class="loader" />
      <div
        class="poster"
        @click="triggerInput">
        <img
          v-if="workspaceStore.workspace.poster"
          :src="workspaceStore.workspace.poster"
          alt="Poster" />
        <input
          ref="inputPoster"
          type="file"
          @change="selectPoster" />
        <div
          v-if="workspaceStore.workspace.poster"
          class="delete-poster"
          @click.stop="deletePoster">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <h1
        ref="title"
        class="title"
        placeholder="제목 없음"
        contenteditable
        @keydown.prevent.enter="enterHandler"
        @blur="onInput('title')">
        {{ workspaceStore.workspace.title }}
      </h1>
      <p
        ref="content"
        class="content"
        placeholder="내용을 입력하세요!"
        contenteditable
        @blur="onInput('content')"
        v-html="workspaceStore.workspace.content"></p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

export default defineComponent({
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapStores(useWorkspaceStore),
    currentWorkspaceId() {
      return this.$route.params.id as string
    }
  },
  watch: {
    async $route() {
      this.loading = true
      await this.workspaceStore.readWorkspace(this.currentWorkspaceId)
      this.loading = false
    }
  },
  async created() {
    await this.workspaceStore.readWorkspace(this.currentWorkspaceId)
    this.loading = false
  },
  methods: {
    triggerInput() {
      (this.$refs.inputPoster as HTMLInputElement).dispatchEvent(new MouseEvent('click'))
    },
    enterHandler(event: KeyboardEvent) {
      if (event.isComposing) return // 한글 중복 입력에 대한 버그 방지
      (this.$refs.content as HTMLParagraphElement).focus()
    },
    async onInput(type: 'title' | 'content') {
      const titleEl = this.$refs.title as HTMLHeadingElement
      const contentEl = this.$refs.content as HTMLParagraphElement
      const title = titleEl.textContent as string
      const content = contentEl.innerHTML

      if (!title.trim()) {
        titleEl.innerHTML = ''
      }
      if (!(contentEl.textContent as string).trim()) {
        contentEl.innerHTML = ''
      }
      // 변경된 데이터가 없으면, 서버로 요청하지 않음!
      if (type === 'title' && title === this.workspaceStore.workspace.title) return
      if (type === 'content' && content === this.workspaceStore.workspace.content) return

      await this.workspaceStore.updateWorkspace({
        id: this.currentWorkspaceId,
        title,
        content
      })
      this.workspaceStore.findWorkspacePath(this.currentWorkspaceId)
    },
    selectPoster(event: Event) {
      const files = (event.target as HTMLInputElement).files as FileList

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', async e => {
          this.loading = true
          await this.workspaceStore.updateWorkspace({
            id: this.currentWorkspaceId,
            poster: (e.target as FileReader).result as string // base64
          })
          // 워크스페이스의 이미지(poster)를 브라우저에서 로드할 때까지 더 기다림!
          // poster는 null일 수 있음!
          if (typeof this.workspaceStore.workspace.poster === 'string') {
            await this.$loadImage(this.workspaceStore.workspace.poster)
          }
          this.loading = false
        })
      }
    },
    async deletePoster() {
      await this.workspaceStore.updateWorkspace({
        id: this.currentWorkspaceId,
        poster: '-1'
      })
      // 포스터를 정상적으로 삭제한 후,
      // input[type="file"] 요소가 가진 기존 파일 값을 초기화!
      if (this.workspaceStore.workspace.poster === null) {
        (this.$refs.inputPoster as HTMLInputElement).value = ''
      }
    }
  }
})
</script>

<style scoped lang="scss">
section {
  padding: 100px 0 150px;
  .inner {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    .loader {
      position: absolute;
      top: -50px;
    }
    .poster {
      min-height: 30px;
      max-height: 300px;
      margin-bottom: 30px;
      border-radius: 8px;
      background-color: $color-background;
      background-size: cover;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      position: relative;
      &:hover {
        background-color: $color-background--hover1;
      }
      img {
        width: 100%;
      }
      input[type="file"] {
        display: none;
      }
      .delete-poster {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 1;
        opacity: .3;
        transition: .2s;
        &:hover {
          opacity: 1;
          transform: scale(1.2);
        }
      }
    }
    [contenteditable] {
      outline: none;
      cursor: text;
      position: relative;
      &.title {
        font-size: 42px;
        line-height: 1.3;
        font-weight: 700;
        margin-bottom: 20px;
      }
      &.content {
        font-size: 16px;
        line-height: 1.8;
      }
      // placeholder
      &:empty::before {
        content: attr(placeholder);
        color: rgba($color-font, .3);
      }
      // focus & hover effect
      &::after {
        content: "";
        width: 4px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -20px;   
      }
      &:hover::after {
        background-color: $color-border;
      }
      &:focus::after {
        background-color: $color-highlight;
      }
    }
  }
}
</style>
