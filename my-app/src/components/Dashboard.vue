<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
            <div class="col-md-8">
                <CreateDelivery @createDelivery="deliveryCreate($event)" />
            </div>
            <div class="col-md-4">
                <DisplayBoard :numberOfDeliveries="numberOfDeliveries"
                 @getAllDeliveries="getAllDeliveries()"
                 @getCurrentStock="$event => getCurrentStock()"
                 />
            </div>
          </div>
    </div>
    <div class="row mrgnbtm">
        <Deliveries v-if="deliveries.length > 0" :deliveries="deliveries" />
    </div>
    <div class="row mrgnbtm">
        <CurrentStock v-if="currentStock.length > 0" :currentStock="currentStock" />
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import CreateDelivery from './CreateDelivery.vue'
import DisplayBoard from './DisplayBoard.vue'
import Deliveries from './Deliveries.vue'
import CurrentStock from './CurrentStock.vue'
import { getAllDeliveries, createDelivery, getCurrentStock } from '../services/DeliveryService'

export default {
  name: 'Dashboard',
  components: {
    Header,
    CreateDelivery,
    DisplayBoard,
    Deliveries,
    CurrentStock,
    createDelivery
},
  data() {
      return {
          deliveries: [],
          numberOfDeliveries: 0,
          currentStock: []
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

    getCurrentStock() {
      getCurrentStock().then(response => {
        console.log(response)
        this.currentStock = response
      })
    },

    deliveryCreate(data) {
      console.log('data:::', data)
      createDelivery(data).then(response => {
        console.log(response);
        this.getAllDeliveries();
        this.getCurrentStock();
      });
    }
  },

  mounted () {
    this.getAllDeliveries();
    this.getCurrentStock();
  }
}
</script>