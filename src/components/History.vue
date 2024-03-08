<template>
  <div class="flex flex-col bg-white rounded overflow-hidden">
    <div class="overflow-x-auto">
      <table class="border-collapse w-full">
        <thead>
        <tr>
          <th class="px-6 py-3 text-left">Patient Name</th>
          <th class="px-6 py-3 text-left">Date</th>
          <th class="px-6 py-3 text-left">Status</th>
          <th class="px-6 py-3 text-left">Type</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="appointment in paginatedAppointments" :key="appointment.id" class="border-b-2 hover:bg-gray-200 cursor-pointer">
          <td class="px-6 py-4">{{ searchPatient(appointment.patientId).name }}</td>
          <td class="px-6 py-4">{{ formatDate(appointment.startTime, appointment.endTime ?? null) }}</td>
          <td class="px-6 py-4"><span class="p-2 rounded text-white" :class="selectColorAppointment(appointment.status)">{{ this.status[appointment.status] }}</span></td>
          <td class="px-6 py-4">{{ this.appointmentType[appointment.type] }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4 mb-2">
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
  props: ['appointmentsResponse', 'patientsResponse'],
  data() {
    return {
      appointmentType: {
        'firstVisit': "First Visit",
        'followUp': "Follow Up",
        'checkUp': "Check Up",
        'exam': "Exam",
        'surgery': "Surgery"
      },
      specialty: {
        'neurology': "Neurology",
        'cardiology': "Cardiology",
        'general': "General"
      },
      status: {
        'pending': "Pending",
        'completed': "Completed",
        'cancelled': "Cancelled",
        'absent': "Absent"
      },
      appointments: null,
      patients: null,
      currentPage: 1,
      pageSize: 10
    };
  },
  watch: {
    appointmentsResponse: {
      handler(data) {
        this.appointments = data;
        this.currentPage = 1;
      },
      immediate: true
    },
    patientsResponse: {
      handler(data) {
        this.patients = data;
        this.currentPage = 1;
      },
      immediate: true
    }
  },
  computed: {
    totalPages() {
      if (!this.appointments) {
        return 0;
      }
      return Math.ceil(this.patients.length / this.pageSize);
    },
    paginatedAppointments() {
      if (!this.appointments) {
        return [];
      }
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      let appointmentsFiltered = this.appointments
          .filter(appointment => appointment.status !== 'pending')
          .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

      return appointmentsFiltered.slice(startIndex, endIndex);
    },
  },
  methods: {
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