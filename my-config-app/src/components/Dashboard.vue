<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
            <div class="col-md-8">
                <CreateConfig @createConfiguration ="createConfiguration($event)" />
            </div>
            </div>
            <div class="row mrgnbtm">
              <div class="col-md-8">
              <button type="button" @click='send()' class="btn btn-danger">
                Send Configurations
              </button>
            </div>
            <div class="row mrgnbtm">
              <Configurations v-if="configurations.length > 0" :configurations="configurations" />
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import CreateConfig from './CreateConfig.vue'
import Configurations from './Configurations.vue'
import { sendConfig } from '../services/ConfigService'

export default {
  name: 'Dashboard',
  components: {
    Header,
    CreateConfig,
    Configurations
},
  data() {
      return {
          configurations: [],
      }
  },
  methods: {
    createConfiguration(data) {
      this.configurations.push(data)
        console.log(data);
      },

  send() {
      console.log('data::: ' + JSON.stringify(this.configurations));
      sendConfig(this.configurations).then(response => {
        console.log(response);
      });
    }

  },

}
</script>