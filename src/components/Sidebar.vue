<template>
    <div class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30" id="main-nav">
          <div class="mb-4 px-4 pt-7">
            <div class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <router-link to="/" class="text-gray-700">Dashboard</router-link>
            </div>
            <div class="w-full flex items-center text-blue-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer mt-3">
              <router-link to="/patients" class="text-gray-700">Patients</router-link>
            </div>
          </div>

        </div>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>