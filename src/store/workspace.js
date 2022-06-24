import { defineStore } from 'pinia'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => {
    return {
      workspace: {},
      workspaces: [],
      workspacesLoaded: false,
      currentWorkspacePath: [],
      backedUpWorkspaceId: '',
      loading: false
    }
  },
  actions: {
    // C
    async createWorkspace(payload = {}) {
      const { parentId } = payload
      const workspace = await request({
        method: 'POST',
        body: {
          parentId,
          title: ''
        }
      })
      this.readWorkspaces()
      this.$router.push(`/workspaces/${workspace.id}`)
    },
    // R
    async readWorkspaces() {
      this.loading = true
      const workspaces = await request({
        method: 'GET'
      })
      this.workspaces = workspaces
      this.workspacesLoaded = true
      this.loading = false

      if (!this.workspaces.length) {
        this.createWorkspace()
      }
    },
    async readWorkspace(id) {
      const workspace = await request({
        method: 'GET',
        id
      })

      this.workspace = workspace
    },
    // U
    async updateWorkspace(payload) {
      const { id, title, content, poster, parentId } = payload
      const updatedWorkspace = await request({
        id,
        method: 'PUT',
        body: {
          title,
          content,
          poster,
          parentId
        }
      })
      this.workspace = updatedWorkspace

      // 제목이 변경된 경우에만 목록을 다시 가져오기!
      if (title) {
        await this.readWorkspaces()
      }
    },
    // D
    async deleteWorkspace(id) {
      await request({
        id,
        method: 'DELETE'
      })
      this.backedUpWorkspaceId = id
      this.readWorkspaces()
      // 현재 보이는 워크스페이스 페이지를 삭제한 경우, 
      // 가지고 있는 가장 첫 번째 워크스페이스 페이지로 이동!
      // if (id === this.$router.currentRoute.value.params.id) {
      //   this.$router.push(`/workspaces/${this.workspaces[0].id}`)
      // }
    },
    async rollbackWorkspace() {
      await request({
        id: `rollback/${this.backedUpWorkspaceId}`,
        method: 'PUT'
      })
      this.backedUpWorkspaceId = ''
      this.readWorkspaces()
    },
    findWorkspacePath(currentWorkspaceId) {
      const find = (workspace, parents) => {
        if (currentWorkspaceId === workspace.id) {
          this.currentWorkspacePath = [...parents, workspace]
        }
        if (workspace.children) {
          workspace.children.forEach(ws => {
            find(ws, [...parents, workspace])
          })
        }
      }
      this.workspaces.forEach(workspace => {
        find(workspace, [])
      })
    }
  }
})

async function request(options) {
  const { id = '', method, body } = options
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces/${id}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'ParkYoungWoong'
    },
    body: JSON.stringify(body)
  })
  return res.json()
}
