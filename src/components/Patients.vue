<template>
  <div class="flex flex-col bg-white rounded overflow-hidden">
    <div class="overflow-x-auto">
      <table class="border-collapse w-full">
        <thead>
        <tr>
          <th class="px-6 py-3 bg-gray-100 text-left">ID</th>
          <th class="px-6 py-3 bg-gray-100 text-left">Name</th>
          <th class="px-6 py-3 bg-gray-100 text-left">Document</th>
          <th class="px-6 py-3 bg-gray-100 text-left">Health System ID</th>
          <th class="px-6 py-3 bg-gray-100 text-left">Insurance Plan</th>
          <th class="px-6 py-3 bg-gray-100 text-left">Birthday</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="patient in paginatedPatients" :key="patient.id" @click="redirectToPatientDetails(patient.id)" class="border-b-2 hover:bg-gray-200 cursor-pointer">
          <td class="px-6 py-4">{{ patient.id }}</td>
          <td class="px-6 py-4">{{ patient.name }}</td>
          <td class="px-6 py-4">{{ patient.document }}</td>
          <td class="px-6 py-4">{{ patient.healthSystemId }}</td>
          <td class="px-6 py-4">{{ patient.insurancePlan }}</td>
          <td class="px-6 py-4">{{ formatDate(patient.birthday) }}</td>
        </tr>
        </tbody>
      </table>
    </div>

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
  name: 'PatientsComponent',
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
        return 0;
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
    },
    redirectToPatientDetails(patientId) {
      this.$router.push({ name: 'PatientDetails', params: { patientId: patientId } });
    }
  }
};
</script>

<style scoped>
tbody tr:hover {
  cursor: pointer;
  background-color: #f3f4f6;
}
</style>