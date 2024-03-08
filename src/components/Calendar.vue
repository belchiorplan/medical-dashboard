<template>
  <div class="flex flex-col bg-white rounded overflow-x-scroll">
    <table class="border-collapse w-full">
      <thead>
      <tr>
        <th colspan="1" class="px-4 py-2 border-t text-xs"></th>
        <th v-for="(day, index) in filteredWeekdays" :key="index" class="px-4 py-2 border-t text-xs">{{ day }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="hour in hours" :key="hour">
        <td class="px-4 py-2 border-b text-sm w-1/7">{{ hour }}</td>
        <td v-for="(day, index) in filteredWeekdays" :key="index" class="border border-gray-400 px-4 py-2 sm:w-1/5 md:w-1/7 lg:w-1/7 xl:w-1/7">
          <div v-for="appointment in filteredAppointments[day]" :key="appointment.id">
            <div v-if="isEventAtHour(appointment, hour, day)" class="text-white shadow-md rounded p-2 mb-2"
                 :class="selectColorAppointment(appointment.status)">
              <p class="text-xs text-center"><b>Patient:</b> {{ this.searchPatient(appointment.patientId).name }}</p>
              <p class="text-xs text-center"><b>Type:</b> {{ this.appointmentType[appointment.type] }}</p>
              <p class="text-xs text-center"><b>Status:</b> {{ this.status[appointment.status] }}</p>
              <p class="text-xs text-center">{{ appointment.description }}</p>
            </div>
          </div>
        </td>
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
      status: {
        'pending': "Pending",
        'completed': "Completed",
        'cancelled': "Cancelled",
        'absent': "Absent"
      },
      appointmentType: {
        'firstVisit': "First Visit",
        'followUp': "Follow Up",
        'checkUp': "Check Up",
        'exam': "Exam",
        'surgery': "Surgery"
      },
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
    hours() {
      const startHour = 9;
      const endHour = 18;
      const interval = 30;

      const hours = [];
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          const hourFormatted = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          hours.push(hourFormatted);
        }
      }
      return hours;
    },
    filteredWeekdays() {
      // Retorna apenas os dias da semana de segunda a sexta
      return this.weekdays.slice(1, 6); // Monday to Friday
    },
    filteredAppointments() {
      const filtered = {};
      const currentDate = new Date();
      const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Primeiro dia da semana
      const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)); // Último dia da semana

      this.weekdays.forEach(day => {
        filtered[day] = this.appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.startTime);
          return (
              appointmentDate >= firstDayOfWeek && appointmentDate <= lastDayOfWeek &&
              this.filteredWeekdays.includes(day)
          );
        });
      });

      return filtered;
    }
  },
  methods: {
    isEventAtHour(appointment, hour, day) {
      const appointmentStartTime = new Date(appointment.startTime);
      const appointmentDay = appointmentStartTime.getDay();
      const appointmentHour = appointmentStartTime.getHours();
      const appointmentMinute = appointmentStartTime.getMinutes();
      const [hourStr, minuteStr] = hour.split(':');
      const hourInt = parseInt(hourStr, 10);
      const minuteInt = parseInt(minuteStr, 10);
      return (
          appointmentDay === this.weekdays.indexOf(day) && // Verifica se o evento é no dia correto
          appointmentHour === hourInt &&
          appointmentMinute === minuteInt
      );
    },
    searchPatient(patientId) {
      return this.patients.find(patient => {
        return patient.id === patientId;
      });
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
          return 'bg-blue-500';
      }
    }
  }
};
</script>

<style scoped>
</style>