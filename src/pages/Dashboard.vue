<template>
  <div id="home">

    <!-- breadcrumb -->
    <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex">
        <li class="flex items-center text-blue-500">
          <a class="text-gray-700">Home</a>
          <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
          </svg>
        </li>
        <li class="flex items-center">
          <a class="text-gray-600">Dashboard</a>
        </li>
      </ol>
    </nav>
    <!-- breadcrumb end -->

    <div class="lg:flex justify-between items-center mb-6">
      <p class="text-2xl font-semibold mb-2 lg:mb-0">Welcome!</p>
    </div>

    <div class="flex flex-wrap -mx-3 ml-3 mr-3 mb-6">
      <div class="w-full">
        <p class="text-xl font-semibold mb-4">Calendar</p>
        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <CalendarComponent v-if="appointmentsResponse.length > 0 && patientsResponse.length > 0"
                             :appointmentsResponse="appointmentsResponse"
                             :patientsResponse="patientsResponse"></CalendarComponent>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 ml-3 mr-3 mb-6">
      <div class="w-full">
        <p class="text-xl font-semibold mb-4">History</p>
        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <HistoryComponent v-if="appointmentsResponse.length > 0 && patientsResponse.length > 0"
                            :appointmentsResponse="appointmentsResponse"
                            :patientsResponse="patientsResponse"></HistoryComponent>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 ml-3 mr-3 mb-6">
      <div class="w-full">
        <p class="text-xl font-semibold mb-4">Patients</p>
        <div class="w-full bg-white border rounded-lg p-4 mb-8 xl:mb-0">
          <PatientsComponent v-if="patientsResponse.length > 0"
                             :patientsResponse="patientsResponse"></PatientsComponent>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';

import CalendarComponent from "@/components/Calendar.vue";
import HistoryComponent from "@/components/History.vue";
import PatientsComponent from "@/components/Patients.vue";

export default {
  name: 'DashboardHome',
  components: {PatientsComponent, CalendarComponent, HistoryComponent},
  data() {
    return {
      appointmentsResponse: [],
      patientsResponse: [],
      buyersData: {
        type: 'line',
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{
            backgroundColor: "rgba(99,179,237,0.4)",
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            data: [203, 156, 99, 251, 305, 247, 256]
          },
            {
              backgroundColor: "rgba(198,198,198,0.4)",
              strokeColor: "#f7fafc",
              pointColor: "#fff",
              pointStrokeColor: "#f7fafc",
              data: [86, 97, 144, 114, 94, 108, 156]
            }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        }
      },
      reviewsData: {
        type: 'bar',
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{
            backgroundColor: "rgba(99,179,237,0.4)",
            strokeColor: "#63b3ed",
            pointColor: "#fff",
            pointStrokeColor: "#63b3ed",
            data: [203, 156, 99, 251, 305, 247, 256]
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        }

      }
    }
  },
  beforeMount() {
    var _this = this;
    axios.get('https://cm42-medical-dashboard.herokuapp.com/appointments').then(function (response) {
      _this.appointmentsResponse = response.data;
    });
    axios.get('https://cm42-medical-dashboard.herokuapp.com/patients').then(function (response) {
      _this.patientsResponse = response.data;
    });
  }
}
</script>