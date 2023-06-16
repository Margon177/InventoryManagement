<template>
    <div class="container">
        <h2>Configurations</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Item Name</th>
                <th>Default Quantity</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in configurations" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.defaultQty }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <button @click='removeConfig(item)' class="btn btn-danger">
                        x
                    </button>
                  </td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'Configurations',
        props: ['configurations'],

        methods:
        {
            removeConfig(item){
                this.configurations.splice(this.configurations.indexOf(item),1);  
            }
        }
     }
</script>