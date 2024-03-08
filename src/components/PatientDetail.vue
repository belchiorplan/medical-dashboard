<template>
  <div id="home">
    <div class="flex flex-wrap -mx-3 mb-20">
      <div class="w-1/2 xl:w-1/3 px-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">{{ dataPatient ? dataPatient.patientName : '...' }}</p>
            <p>{{ dataPatient ? dataPatient.patientDocument : '...' }}</p>
          </div>
        </div>
      </div>

      <div class="w-1/2 xl:w-1/3 px-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6 mb-6 xl:mb-0">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">{{ dataPatient ? dataPatient.planName : '...' }}</p>
            <p>{{ dataPatient ? dataPatient.planCode : '...' }}</p>
          </div>
        </div>
      </div>

      <div class="w-1/2 xl:w-1/3 px-3">
        <div class="w-full bg-white border text-blue-400 rounded-lg flex items-center p-6">
          <svg class="w-16 h-16 fill-current mr-4 hidden lg:block" viewBox="0 0 20 20">
            <path
                d="M17.592,8.936l-6.531-6.534c-0.593-0.631-0.751-0.245-0.751,0.056l0.002,2.999L5.427,9.075H2.491c-0.839,0-0.162,0.901-0.311,0.752l3.683,3.678l-3.081,3.108c-0.17,0.171-0.17,0.449,0,0.62c0.169,0.17,0.448,0.17,0.618,0l3.098-3.093l3.675,3.685c-0.099-0.099,0.773,0.474,0.773-0.296v-2.965l3.601-4.872l2.734-0.005C17.73,9.688,18.326,9.669,17.592,8.936 M3.534,9.904h1.906l4.659,4.66v1.906L3.534,9.904z M10.522,13.717L6.287,9.48l4.325-3.124l3.088,3.124L10.522,13.717z M14.335,8.845l-3.177-3.177V3.762l5.083,5.083H14.335z"></path>
          </svg>
          <div class="text-gray-700">
            <p class="font-semibold text-3xl">{{ dataPatient ? dataPatient.lastAppointmentSpecialty : '...' }}</p>
            <p>{{ dataPatient ? dataPatient.lastAppointmentDate : '...' }}</p>
          </div>

        </div>
      </div>
    </div>

    <div class="flex flex-col bg-white rounded overflow-hidden">
      <div class="overflow-x-auto">
        <table class="border-collapse w-full">
          <thead>
          <tr>
            <th class="px-6 py-3 text-left">ID</th>
            <th class="px-6 py-3 text-left">Specialty</th>
            <th class="px-6 py-3 text-left">Status</th>
            <th class="px-6 py-3 text-left">Type</th>
            <th class="px-6 py-3 text-left">Start</th>
            <th class="px-6 py-3 text-left">End</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="appointment in paginatedAppointments" :key="appointment.id" class="border-b-2 hover:bg-gray-200 cursor-pointer">
            <td class="px-6 py-4">{{ appointment.id }}</td>
            <td class="px-6 py-4">{{ this.specialty[appointment.specialty] }}</td>
            <td class="px-6 py-4">{{ this.status[appointment.status] }}</td>
            <td class="px-6 py-4">{{ this.appointmentType[appointment.type] }}</td>
            <td class="px-6 py-4">{{ appointment.startTime }}</td>
            <td class="px-6 py-4">{{ appointment.endTime ?? '-' }}</td>
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

  </div>
</template>

<script>
export default {
  name: 'PatientDetail',
  props: ['patientId', 'patientsResponse', 'appointmentsResponse'],
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
      patients: null,
      appointments: null,
      patientData: null,
      currentPage: 1,
      pageSize: 10
    };
  },
  watch: {
    patientsResponse: {
      handler(data) {
        this.patients = data;
        this.currentPage = 1;
      },
      immediate: true
    },
    appointmentsResponse: {
      handler(data) {
        this.appointments = data;
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
    paginatedAppointments() {
      if (!this.appointments) {
        return [];
      }
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.appointments.slice(startIndex, endIndex);
    },
    dataPatient() {
      return this.constructPatientData();
    }
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
    constructPatientData() {
      if (!this.patients || !this.appointments) {
        return;
      }

      var id = parseInt(this.patientId);

      const patient = this.patients.find(patient => patient.id === id);
      if (!patient) {
        console.error('Patient not found');
        return;
      }

      const patientName = patient.name;
      const planName = patient.insurancePlan;
      const planCode = patient.healthSystemId;
      const patientDocument = patient.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

      this.appointments = this.appointments.filter(appointment => appointment.patientId === id);
      const patientAppointments = this.appointments;

      console.log(this.appointments);

      const totalAppointments = patientAppointments.length;

      let lastAppointmentSpecialty = '';
      let lastAppointmentDate = '';

      if (totalAppointments > 0) {
        const lastAppointment = patientAppointments[totalAppointments - 1];
        lastAppointmentSpecialty = this.specialty[lastAppointment.specialty];
        lastAppointmentDate = lastAppointment.startTime;
      }

      return {
        'patientName': patientName,
        'patientDocument': patientDocument,
        'planName': planName,
        'planCode': planCode,
        'patientAppointments': patientAppointments,
        'lastAppointmentSpecialty': lastAppointmentSpecialty,
        'lastAppointmentDate': lastAppointmentDate
      };
    }
  }
}
</script>
