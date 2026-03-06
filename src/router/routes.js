import Layout from '@/layout/MainLayout.vue'
import Index from '@/pages/HomeView.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  {
    component: Layout,
    path: '/',
    name: 'app',
    children: [
      {
        component: Index,
        path: '',
        name: 'index',
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
]

export default routes
