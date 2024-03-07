<template>
  <div class="flex flex-col bg-white rounded overflow-hidden">
    <table class="border-collapse w-full" v-if="filteredAndSortedAppointments.length > 0">
      <thead>
      </thead>
      <tbody>
        <tr class="border-b-2" v-for="appointment in filteredAndSortedAppointments" :key="appointment.id">
          <td class="w-auto py-2 text-sm">{{ this.formatDate(appointment.startTime, appointment.endTime ?? null) }}</td>
          <td class="w-auto y-2 text-sm text-center"><label class="rounded m-2 p-0.5 text-white bg-" :class="selectColorAppointment(appointment.status)">{{ appointment.status }}</label></td>
          <td class="w-auto py-2 text-sm">{{ this.searchPatient(appointment.patientId).name }}</td>
          <td class="w-auto py-2 text-sm">{{ appointment.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: ['appointmentsResponse', 'patientsResponse'],
  data() {
    return {
      appointments: null,
      patients: null
    };
  },
  watch: {
    appointmentsResponse: {
      handler(newVal) {
        this.appointments = newVal;
      },
      immediate: true
    },
    patientsResponse: {
      handler(newVal) {
        this.patients = newVal;
      },
      immediate: true
    }
  },
  computed: {
    filteredAndSortedAppointments() {
      if (!this.appointments) return [];
      return this.appointments
                .filter(appointment => appointment.status !== 'pending')
                .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    }
  },
  methods: {
    formatDate(startDateAppointments, endDateAppointments = null) {
      const startDate = new Date(startDateAppointments);
      const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

      if (endDateAppointments) {
        const endDate = new Date(endDateAppointments);
        const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${startDate.toLocaleDateString()} ${startTime} - ${endTime}`;
      } else {
        return `${startDate.toLocaleDateString()} ${startTime}`;
      }
    },
    searchPatient (patientId) {
      return this.patients.find(patient => {
        return patient.id === patientId
      })
    },
    selectColorAppointment(status) {
      switch (status) {
        case 'absent':
          return 'bg-red-700';
        case 'completed':
          return 'bg-green-700';
        case 'cancelled':
          return 'bg-zinc-500';
        default:
          return ''; // nenhuma cor para outros status
      }
    }
  },
};
</script>

<style scoped>
/* Component styles */
</style>