<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Create Shipment</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Invoice No</label>
                        <input type="text" class="form-control" v-model="invNo" 
                        name="invNo" id="invNo" placeholder="Invoice Number" />
                    </div>
                    
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Shipment Date</label>
                        <input type="date" class="form-control" v-model="date" 
                        name="date" id="date" placeholder="Shipment Date" />
                    </div>
                    
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="exampleInputEmail1">Customer Code</label>
                        <input type="text" class="form-control" v-model="customer" 
                        name="customer" id="customer" aria-describedby="emailHelp" placeholder="Customer Code" />
                    </div>
                </div>
                    <div class="row">
                      <div class="form-group col-md-10">
                        <label htmlFor="items">Item Name</label>
                          <select id="items" v-model="selectedValue" class="form-control" @change="chooseItem($event)">
                            <option v-for="item in arrayOfItems" :key="item.name" :value="item.name">
                              {{ item.name }}
                            </option>
                          </select>
                      </div>
                      <div class="form-group col-md-2">
                        <button type="button" @click='refreshConfig()' class="btn btn-info">
                            Refresh Items
                        </button>
                      </div>
                  </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <input type="number" class="form-control" v-model="qty" 
                        name="qty" id="qty" aria-describedby="emailHelp" placeholder="Quantity"/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="exampleInputEmail1">Price</label>
                        <input type="number" class="form-control" v-model="price" 
                        name="price" id="price" aria-describedby="emailHelp" placeholder="Price"/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-10">
                        <label htmlFor="exampleInputEmail1">Total Price</label>
                        <input type="number" class="form-control" v-model="totalPrice" 
                        name="totalPrice" id="totalPrice" aria-describedby="emailHelp" placeholder="Total Price"/>
                    </div>
                    <div class="form-group col-md-2">
                    <button type="button" @click='recalculate()' class="btn btn-info">
                      Calculate
                    </button>
                  </div>
                </div>
                <div class="row ">
                <button type="button" @click='createShipment()' class="btn btn-danger">Create</button>
                </div>
            </form>
        </div>
    </div>
    <div style="padding-top: 2%;padding-bottom: 2%;" v-if="this.error == true">
    <AlertBox>
      {{ errorText }} 
      <br/>
      {{ errorTextDetail }}
      <div style="font-weight: bold;">
        {{ errorTextDetail2 }}
      </div>
    </AlertBox>
    </div>
  </div>

</template>

<script>

import { getCurrentStock , getConfig } from '../services/ShipmentService'
import AlertBox from './AlertBox.vue'

export default {
  components: { AlertBox },

  name: 'CreateShipment',
  data() {
    return {
      error: false,
      errorText: '',
      errorTextDetail: '',
      errorTextDetail2: '',
      currentStock: [],
      invNo: '',
      date: '',
      item: '',
      selectedValue: '',
      customer: '',
      qty: '',
      status: '',
      arrayOfItems: '',
      price: '',
      totalPrice: ''
    }
  },

  methods: {

    refreshConfig() {
      getConfig().then(response => {
        console.log(response)
        this.arrayOfItems = response
      })
      },   
    
      recalculate(){
        console.log("Calculate qty * price (qty) " + this.qty + " (price) " + this.price);
        this.totalPrice = this.qty*this.price;
        console.log("total price is: " + this.totalPrice);
      },

      createShipment() {
          console.log(this.id)
          let valid = false;
          this.errorText = '';
          this.errorTextDetail = '';
          this.errorTextDetail2 = '';
          this.error = false;

          if(this.checkStockBeforeCreatingShipment(valid) == true){
          const payload = {
              id: this.id,
              date: this.date,
              invNo: this.invNo,
              customer: this.customer,
              item: this.item,
              qty: this.qty,
              price: this.price,
              totalPrice: this.totalPrice,
              status: "NEW"
          }
          this.$emit('createShipment', payload)
          this.clearForm();
        } else{
          this.error = true;
          this.errorTextDetail2 += "Shipment is NOT created!";
          this.clearForm();
        }
      },
      clearForm() {
          this.invNo = "";
          this.date = "";
          this.item = "";
          this.customer = "";
          this.qty = 0;
          this.status = "";
          this.selectedValue = "";
          this.price = 0;
      },

      chooseItem(event){
        console.log(event.target.value);
        let selectedItem = event.target.value;
        console.log(selectedItem);

        const found = this.arrayOfItems.find((item) => {
        return item.name == selectedItem;
        });

        console.log(found);
        
        let itemName = found.name;
        let defaultQty = found.defaultQty;
        let price = found.price;
        let defaultCustomer = found.defaultCustomer;

        this.item = itemName;
        this.qty = defaultQty;
        this.customer = defaultCustomer;

        console.log('item qty:' + this.item.qty);
        console.log('item price:' + price);

        this.price = price;

        this.totalPrice = price * this.qty;

        this.getCurrentStock();
  
  
        console.log(itemName);
        console.log(defaultQty);
      },

    checkStockBeforeCreatingShipment(valid){
    valid = false;
    this.getCurrentStock();
    console.log('currentStock ' + JSON.stringify(this.currentStock));
    const itemFromStock = this.currentStock.find(element => element.item == this.item);
    console.log('item found: ' + JSON.stringify(itemFromStock));
    if(itemFromStock == undefined){
      this.errorText += "No Stock for this item!";
    } else if(itemFromStock.qty >= this.qty){
      console.log("qty from stock: " + itemFromStock.qty + " is greater than qty from shipment" + this.qty + ' check passed... valid = true');
      valid = true;
      console.log('valid is ' + valid);
      } else {
        this.errorText += "Not enough stock to create shipment!";
        this.errorTextDetail += ' Requested item: ' + this.item;
        this.errorTextDetail += ' Requested quantity: ' + this.qty;
    }

    return valid;
  },

  getCurrentStock() {
      getCurrentStock().then(response => {
        console.log(response)
        this.currentStock = response
      })
    }
  },

  mounted () {
    this.getCurrentStock();
  }

}
</script>
