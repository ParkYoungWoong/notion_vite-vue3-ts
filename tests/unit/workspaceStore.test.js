import { describe, test, beforeEach, expect, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWorkspaceStore } from '~/store/workspace'

describe('Workspace store', () => {
  let workspaceStore
  beforeEach(() => {
    setActivePinia(createPinia())
    workspaceStore = useWorkspaceStore()
  })

  test('read workspaces', async () => {
    const workspace = {
      id: '1',
      title: 'title1',
      content: 'content1',
      poster: null
    }
    mockFetch([workspace])
    await workspaceStore.readWorkspaces()
    expect(workspaceStore.workspaces).toEqual([workspace])
  })

  test('update workspace', async () => {
    const workspace = {
      id: '1',
      title: 'title1',
      content: 'content1',
      poster: null
    }
    mockFetch(workspace)
    await workspaceStore.updateWorkspace()
    expect(workspaceStore.workspace).toEqual(workspace)
  })

  test('find workspace path', async () => {
    workspaceStore.workspaces = [
      {
        id: '1',
        title: 'title1',
        children: [
          {
            id: '1-1',
            title: 'title1-1'
          }
        ]
      },
      {
        id: '2',
        title: 'title2'
      }
    ]
    workspaceStore.findWorkspacePath('1-1')
    expect(workspaceStore.currentWorkspacePath.map(path => path.title)).toEqual(['title1', 'title1-1'])
  })
})

function mockFetch(returnValue) {
  global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve(returnValue)
  }))
}
