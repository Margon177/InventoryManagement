<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Create Delivery</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Invoice No</label>
                        <input type="text" class="form-control" v-model="invNo" 
                        name="invNo" id="invNo" placeholder="Invoice Number" />
                    </div>
                    
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Delivery Date</label>
                        <input type="date" class="form-control" v-model="date" 
                        name="date" id="date" placeholder="Delivery Date" />
                    </div>
                    
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="exampleInputEmail1">Supplier Code</label>
                        <input type="text" class="form-control" v-model="supplier" 
                        name="supplier" id="supplier" aria-describedby="emailHelp" placeholder="Supplier Code" />
                    </div>
                </div>
                <div class="row">
                    <label htmlFor="items">Item Name</label>
                    <div class="form-group col-md-10">
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
                <button type="button" @click='createDelivery()' class="btn btn-danger">Create</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>

import { getConfig } from '../services/DeliveryService'

export default {
  name: 'CreateDelivery',
  data() {
    return {
      invNo: '',
      date: '',
      item: '',
      selectedValue: '',
      supplier: '',
      qty: '',
      status: '',
      arrayOfItems: ''
    }
  },

  methods: {

    refreshConfig() {
      getConfig().then(response => {
        console.log(response)
        this.arrayOfItems = response
        return this.arrayOfItems;
      })
      },

    createDelivery() {
      console.log(this.id)
      const payload = {
          id: this.id,
          date: this.date,
          invNo: this.invNo,
          supplier: this.supplier,
          item: this.item,
          qty: this.qty,
          status: "NEW"
          }
          this.$emit('createDelivery', payload)
          this.clearForm();
      },
      
      clearForm() {
          this.invNo = "";
          this.date = "";
          this.item = "";
          this.supplier = "";
          this.qty = 0;
          this.status = "";
          this.selectedValue = "";
      },

      chooseItem(event){

        console.log("array of items: " + JSON.stringify(this.arrayOfItems));
        console.log('event:' + event.target.value);
        let selectedItem = event.target.value;
        console.log('selected: ' + selectedItem);

        const found = this.arrayOfItems.find((item) => {
        return item.name == selectedItem;
        });

        console.log('search in array: ' + found);
        
        let itemName = found.name;
        let defaultQty = found.defaultQty;
        let defaultSupplier = found.defaultSupplier;

        this.item = itemName;
        this.qty = defaultQty;
        this.supplier = defaultSupplier;
  
        
        console.log(itemName);
        console.log(defaultQty);
      }
  }
}
</script>

