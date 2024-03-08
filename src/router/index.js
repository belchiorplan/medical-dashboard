import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import PatientsDetailView from "@/views/PatientsDetailView.vue";

// Constantes para os nomes das rotas
const ROUTE_NAMES = {
  DASHBOARD_HOME: 'DashboardHome',
  PATIENTS_DETAIL: 'PatientDetails',
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
      path: '/patient/:patientId/:appointmentId?',
      name: ROUTE_NAMES.PATIENTS_DETAIL,
      component: PatientsDetailView,
      props: true
    }
  ]
});

export default router;
