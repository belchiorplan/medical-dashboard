import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import PatientsView from '../views/PatientsView.vue';

// Constantes para os nomes das rotas
const ROUTE_NAMES = {
  DASHBOARD_HOME: 'DashboardHome',
  PATIENTS_HOME: 'PatientsHome',
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardView,
      name: ROUTE_NAMES.DASHBOARD_HOME
    },
    {
      path: '/patients',
      component: PatientsView,
      name: ROUTE_NAMES.PATIENTS_HOME
    }
  ]
});

export default router;
