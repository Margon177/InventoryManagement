<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
            <div class="col-md-8">
                <CreateShipment @createShipment="shipmentCreate($event)" />
            </div>
            <div class="col-md-4">
                <DisplayBoard :numberOfShipments="numberOfShipments"
                 @getAllShipments="getAllShipments()"
                 @getCurrentStock="$event => getCurrentStock()"
                 />
            </div>
          </div>
    </div>
    <div class="row mrgnbtm">
        <CurrentStock v-if="currentStock.length > 0" :currentStock="currentStock" />
    </div>
    <div class="row mrgnbtm">
        <Shipments v-if="shipments.length > 0" :shipments="shipments" />
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import CreateShipment from './CreateShipment.vue'
import DisplayBoard from './DisplayBoard.vue'
import Shipments from './Shipments.vue'
import CurrentStock from './CurrentStock.vue'
import { getAllShipments, createShipment, getCurrentStock } from '../services/ShipmentService'

export default {
  name: 'Dashboard',
  components: {
    Header,
    CreateShipment,
    DisplayBoard,
    Shipments,
    CurrentStock,
    createShipment
},
  data() {
      return {
          shipments: [],
          numberOfShipments: 0,
          currentStock: []
      }
  },
  methods: {
    getAllShipments() {
      getAllShipments().then(response => {
        console.log(response)
        this.shipments = response
        this.numberOfShipments = this.shipments.length
      })
    },

    getCurrentStock() {
      getCurrentStock().then(response => {
        console.log(response)
        this.currentStock = response
      })
    },

    shipmentCreate(data) {
      console.log('data:::', data)
      createShipment(data).then(response => {
        console.log(response);
        this.getAllShipments();
        this.getCurrentStock();
      });
    }
  },

  mounted () {
    this.getAllShipments();
    this.getCurrentStock();
  }
}
</script>