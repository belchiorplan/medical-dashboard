<template>
  <div class="flex flex-col bg-white rounded overflow-hidden">
    <div class="overflow-x-auto">
      <table class="border-collapse w-full">
        <thead>
        <tr>
          <th class="px-4 py-2 bg-gray-100 text-left">Patient Name</th>
          <th class="px-4 py-2 bg-gray-100 text-left">Date</th>
          <th class="px-4 py-2 bg-gray-100 text-center">Status</th>
          <th class="px-4 py-2 bg-gray-100 text-left">Type</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="appointment in filteredAndSortedAppointments" :key="appointment.id">
          <td class="px-4 py-2 text-sm">{{ searchPatient(appointment.patientId).name }}</td>
          <td class="px-4 py-2 text-sm">{{ formatDate(appointment.startTime, appointment.endTime ?? null) }}</td>
          <td class="px-4 py-2 text-sm text-center"><label class="rounded m-2 p-0.5 text-white" :class="selectColorAppointment(appointment.status)">{{ this.status[appointment.status] }}</label></td>
          <td class="px-4 py-2 text-sm">{{ this.appointmentType[appointment.type] }}</td>
        </tr>
        </tbody>
      </table>
    </div>
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
      appointments: null,
      patients: null
    };
  },
  watch: {
    appointmentsResponse: {
      handler(data) {
        this.appointments = data;
      },
      immediate: true
    },
    patientsResponse: {
      handler(data) {
        this.patients = data;
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
      const startTime = startDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});

      if (endDateAppointments) {
        const endDate = new Date(endDateAppointments);
        const endTime = endDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
        return `${startDate.toLocaleDateString()} ${startTime} - ${endTime}`;
      } else {
        return `${startDate.toLocaleDateString()} ${startTime}`;
      }
    },
    searchPatient(patientId) {
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
  }
};
</script>

<style scoped>
@media (max-width: 640px) {
  .table {
    overflow-x: auto;
    display: block;
  }

  .table thead,
  .table tbody,
  .table tr,
  .table th,
  .table td {
    display: block;
  }

  .table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .table tr {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .table td {
    border-bottom: none;
    border-top: 1px solid #ccc;
    position: relative;
    padding-left: 50%;
    white-space: nowrap;
  }

  .table td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  .table td:nth-of-type(1):before {
    content: "Date:";
  }

  .table td:nth-of-type(2):before {
    content: "Status:";
  }

  .table td:nth-of-type(3):before {
    content: "Patient Name:";
  }

  .table td:nth-of-type(4):before {
    content: "Type:";
  }
}
</style>