import { createRouter, createWebHistory } from 'vue-router'
import BaseView from '../views/HomeView.vue'
import DashboardView from '../pages/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BaseView, children: [
        { path: '/', redirect: { name: 'DashboardHome' } },
        { path: 'dashboard', name: 'DashboardHome', component: DashboardView }
      ]
    }
  ]
})

export default router
