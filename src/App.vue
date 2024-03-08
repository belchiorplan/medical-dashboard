<template>
  <div class="leading-normal tracking-normal" id="app">
    <div class="flex flex-wrap">
      <Sidebar :isHidden="isSidebarHidden" />
      <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" id="main-content">
        <Navbar @toggle-sidebar="toggleSidebar" />
        <div class="p-6 bg-gray-100 mb-20">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'app',
  components: {Navbar, Sidebar},
  data() {
    return {
      isSidebarHidden: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    }
  }
}
</script>
