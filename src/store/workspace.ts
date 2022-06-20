import { defineStore } from 'pinia'

interface Workspace {
  id: string
  title: string
  content: string
  poster: string | null // URL
  createdAt?: string
  updatedAt?: string
  children?: Workspace[]
}
interface WorkspaceParamsForUpdate {
  id?: string
  parentId?: string
  title?: string
  content?: string
  poster?: string // base64
}

export const useWorkspaceStore = defineStore('workspace', {
  state: () => {
    const workspace: Workspace = {
      id: '',
      title: '',
      content: '',
      poster: null
    }
    const workspaces: Workspace[] = []
    const currentWorkspacePath: Workspace[] = []
    return {
      workspace,
      workspaces,
      workspacesLoaded: false,
      currentWorkspacePath,
      backedUpWorkspaceId: '',
      loading: false
    }
  },
  actions: {
    // C
    async createWorkspace(payload: WorkspaceParamsForUpdate = {}) {
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
    async readWorkspace(id: string) {
      const workspace = await request({
        method: 'GET',
        id
      })

      this.workspace = workspace
    },
    // U
    async updateWorkspace(payload: WorkspaceParamsForUpdate) {
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
    async deleteWorkspace(id: string) {
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
    findWorkspacePath(currentWorkspaceId: string) {
      const find = (workspace: Workspace, parents: Workspace[]) => {
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


// Request function!
interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  id?: string
  body?: {
    [prop: string]: unknown
  }
}
async function request(options: RequestOptions) {
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
