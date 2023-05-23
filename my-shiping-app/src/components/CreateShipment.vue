<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Create Shipment</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Invoice No</label>
                        <input type="text" class="form-control" v-model="invNo" name="invNo" id="invNo" placeholder="Invoice Number" />
                    </div>
                    
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Shipment Date</label>
                        <input type="date" class="form-control" v-model="date" name="date" id="date" placeholder="Shipment Date" />
                    </div>
                    
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputEmail1">Customer Code</label>
                        <input type="text" class="form-control" v-model="customer" name="customer" id="customer" aria-describedby="emailHelp" placeholder="Customer Code" />
                    </div>
                    <div class="form-group col-md-6">
                    <label htmlFor="items">Item Name</label>
                    <select id="items" v-model="selectedValue" class="form-control" @change="chooseItem($event)">
                        <option v-for="item in arrayOfItems" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="exampleInputEmail1">Quantity</label>
                        <input type="number" class="form-control" v-model="qty" name="qty" id="qty" aria-describedby="emailHelp" placeholder="Quantity"/>
                    </div>
                </div>
                <button type="button" @click='createShipment()' class="btn btn-danger">Create</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'CreateShipment',
  data() {
    return {
      invNo: '',
      date: '',
      item: '',
      selectedValue: '',
      customer: '',
      qty: '',
      status: '',
      arrayOfItems: [ {
                id: 1,
              name: 'Bulbulator',
              defaultQty: 100
            } , {
                id: 2,
              name: 'Wyrzymator',
              defaultQty: 200
            } , {
                id: 3,
              name: 'Kaputator',
              defaultQty: 300
            }, ]
    }
  },

  methods: {

      createShipment() {
          console.log(this.id)
          const payload = {
              id: this.id,
              date: this.date,
              invNo: this.invNo,
              customer: this.customer,
              item: this.item,
              qty: this.qty,
              status: "NEW"
          }
          this.$emit('createShipment', payload)
          this.clearForm();
      },
      clearForm() {
          this.invNo = "";
          this.date = "";
          this.item = "";
          this.customer = "";
          this.qty = 0;
          this.status = "";
          this.selectedValue = "";
      },

      chooseItem(event){

        let arrayOfItems = [ {
                id: 1,
              name: 'Bulbulator',
              defaultQty: 100
            } , {
                id: 2,
              name: 'Wyrzymator',
              defaultQty: 200
            } , {
                id: 3,
              name: 'Kaputator',
              defaultQty: 300
            }, ]

        console.log(event.target.value);
        let selectedItem = event.target.value;
        console.log(selectedItem);

        const found = arrayOfItems.find((item) => {
        return item.id == selectedItem;
        });

        console.log(found);
        
        let itemName = found.name;
        let defaultQty = found.defaultQty

        this.item = itemName;
        this.qty = defaultQty;
  
        
        console.log(itemName);
        console.log(defaultQty);
      }
  }
}
</script>

