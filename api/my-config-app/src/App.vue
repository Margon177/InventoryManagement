<template>
  <div id="app">
    <Dashboard v-if="settings == true"/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Dashboard from './components/Dashboard.vue'

export default {
  name: 'Shipment Panel',
  components: {
    Dashboard
  },
  data() {
      return {
          settings: false
      }
  },
  mounted() {
    console.log("I am in mounted!!!")
    this.settings = true
  },
  setup () {
    console.log("I am in setup!!!")
  }
}
</script>

<style>
  @import './assets/styles/global.css';
</style>

<assets>
  @import '.assets/images/logo.png';
</assets>