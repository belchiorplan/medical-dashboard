<template>
  <div class="flex flex-col bg-white rounded overflow-hidden">
    <table class="border-collapse w-full">
      <thead>
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Document</td>
        <td>Health System ID</td>
        <td>Insurance Plan</td>
        <td>Birthday</td>
      </tr>
      </thead>
      <tbody>
      <tr class="border-b-2" v-for="patient in paginatedPatients" :key="patient.id">
        <td class="w-auto py-2">{{ patient.id }}</td>
        <td class="w-auto py-2">{{ patient.name }}</td>
        <td class="w-auto py-2">{{ patient.document }}</td>
        <td class="w-auto py-2">{{ patient.healthSystemId }}</td>
        <td class="w-auto py-2">{{ patient.insurancePlan }}</td>
        <td class="w-auto py-2 text-sm">{{ formatDate(patient.birthday) }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-center mt-4">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 mr-2 bg-blue-500 text-white rounded">
        Previous
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-500 text-white rounded">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['patientsResponse'],
  data() {
    return {
      patients: null,
      currentPage: 1,
      pageSize: 10
    };
  },
  watch: {
    patientsResponse: {
      handler(newVal) {
        this.patients = newVal;
        this.currentPage = 1;
      },
      immediate: true
    }
  },
  computed: {
    totalPages() {
      if (!this.patients) {
        return 0; // ou qualquer outro valor padrão que faça sentido no seu contexto
      }
      return Math.ceil(this.patients.length / this.pageSize);
    },
    paginatedPatients() {
      if (!this.patients) {
        return [];
      }

      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.patients.slice(startIndex, endIndex);
    }
  },
  methods: {
    formatDate(startDateAppointments, endDateAppointments = null) {
      const startDate = new Date(startDateAppointments);
      const startTime = startDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});

      if (endDateAppointments) {
        const endDate = new Date(endDateAppointments);
        const endTime = endDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
        return `${startDate.toLocaleDateString()} ${startTime} - ${endTime}`;
      } else {
        return `${startDate.toLocaleDateString()} ${startTime}`;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
/* Estilos do componente */
</style>