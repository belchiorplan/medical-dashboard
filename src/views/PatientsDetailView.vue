<script setup>
import PatientsDetailPage from "../pages/PatientsDetail.vue";

const props = defineProps({
  patientId: String,
  appointmentId: String
});
</script>

<template>
  <main>
    <PatientsDetailPage :patientId="props.patientId" :appointmentId="props.appointmentId"></PatientsDetailPage>
  </main>
</template>

