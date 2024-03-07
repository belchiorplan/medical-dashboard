<template>
  <div class="flex flex-col bg-white shadow-md rounded overflow-hidden">
    <table class="border-collapse w-full">
      <thead>
      <tr>
        <th colspan="1" class="px-4 py-2 border-t text-xs"></th>
        <th v-for="(day, index) in weekDays" :key="index" class="px-4 py-2 border-t text-xs">{{ day }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hour in hours" :key="hour">
        <td class="px-4 py-2 border-b text-sm">{{ hour }}</td>
        <td v-for="(day, index) in weekDays" :key="index" class="border border-gray-400 px-4 py-2">
          <div v-for="appointment in filteredAppointments[day]" :key="appointment.id">
            <div class="bg-blue-500 text-white shadow-md rounded p-2 mb-2">
              <p v-if="patientData[appointment.patientId]">Patient: {{ patientData[appointment.patientId].name }}</p>
              <p>Description: {{ appointment.description }}</p>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      appointments: [],
      patientData: {}
    };
  },
  computed: {
    hours() {
      return Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    },
    filteredAppointments() {
      const filtered = {};
      this.weekDays.forEach(day => {
        filtered[day] = this.appointments.filter(appointment => new Date(appointment.startTime).getDay() === this.weekDays.indexOf(day) && appointment.status === 'pending');
      });
      return filtered;
    },

  },
  methods: {
    async fetchAppointments() {
      try {
        const [appointmentsResponse, patientsResponse] = await Promise.all([
          axios.get('https://cm42-medical-dashboard.herokuapp.com/appointments'),
          axios.get('https://cm42-medical-dashboard.herokuapp.com/patients')
        ]);

        this.appointments = appointmentsResponse.data;
        this.patientData = patientsResponse.data.reduce((acc, patient) => {
          acc[patient.id] = patient;
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    getWeekStart() {
      const today = new Date();
      const day = today.getDay();
      const offset = day === 0 ? 6 : day - 1; // Adjust for Sunday as first day
      return new Date(today.setDate(today.getDate() - offset));
    },
    getWeekEnd() {
      const weekStart = this.getWeekStart();
      weekStart.setDate(weekStart.getDate() + 6); // Add 6 days to get the end of the week
      return weekStart;
    }
  },
  mounted() {
    this.fetchAppointments();
  }
};
</script>

<style scoped>
/* Component styles */
</style>