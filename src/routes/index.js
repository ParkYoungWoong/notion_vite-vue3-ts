import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Workspace from './Workspace.vue'
import NotFound from './NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/workspaces/:id',
      component: Workspace
    },
    {
      path: '/:notFound(.*)*',
      component: NotFound
    }
  ]
})
