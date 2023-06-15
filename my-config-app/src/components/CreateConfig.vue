<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Create Configuration</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Item Name</label>
                        <input type="text" class="form-control" v-model="name" name="name" id="name" placeholder="Item Name" />
                    </div>
                    
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Default Quantity</label>
                        <input type="number" class="form-control" v-model="defaultQty" name="defaultQty" id="defaultQty" placeholder="Default Quantity" />
                    </div>
                </div>
                <button type="button" @click='createConfiguration()' class="btn btn-danger">Create</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'createConfiguration',

  data() {
    return {
      name: '',
      defaultQty: ''
    }
  },

  methods: {
    createConfiguration() {
          console.log(this.id)
          const payload = {
              name: this.name,
              defaultQty: this.defaultQty
          }
          this.$emit('createConfiguration', payload)
          this.clearForm();
      },

      clearForm() {
         this.name = '';
         this.defaultQty ='';
      }
  }
}
</script>

