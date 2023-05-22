<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
            <div class="col-md-8">
                <CreateDelivery @createDelivery="deliveryCreate($event)" />
            </div>
            <div class="col-md-4">
                <DisplayBoard :numberOfDeliveries="numberOfDeliveries" @getAllDeliveries="getAllDeliveries()" />
            </div>
          </div>
    </div>
    <div class="row mrgnbtm">
        <Deliveries v-if="deliveries.length > 0" :deliveries="deliveries" />
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import CreateDelivery from './CreateDelivery.vue'
import DisplayBoard from './DisplayBoard.vue'
import Deliveries from './Deliveries.vue'
import { getAllDeliveries, createDelivery } from '../services/DeliveryService'


export default {
  name: 'Dashboard',
  components: {
    Header,
    CreateDelivery,
    DisplayBoard,
    Deliveries,
    createDelivery
},
  data() {
      return {
          deliveries: [],
          numberOfDeliveries: 0
      }
  },
  methods: {
    getAllDeliveries() {
      getAllDeliveries().then(response => {
        console.log(response)
        this.deliveries = response
        this.numberOfDeliveries = this.deliveries.length
      })
    },
    deliveryCreate(data) {
      console.log('data:::', data)
      createDelivery(data).then(response => {
        console.log(response);
        this.getAllDeliveries();
      });
    }
  },
  mounted () {
    this.getAllDeliveries();
  }
}
</script>