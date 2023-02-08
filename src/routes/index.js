import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/storeAuth';



export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Notes',
      component: () => import('@/views/ViewNotes.vue')
    },
    {
      path: '/stats',
      name: 'Stats',
      component: () => import('@/views/ViewStats.vue')
    },
    {
      path: '/edit-note/:id',
      name: 'Edit-Note',
      component: () => import('@/views/ViewEditNote.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/ViewAuth.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  if (!authStore.user.id && to.name !== 'Auth') {
    return { name: 'Auth' }
  }

  if (authStore.user.id && to.name == 'Auth') {
    return false
  }
})

export default router