<template>
    <div class="container">
        <h2>Configurations</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Item Name</th>
                <th>Default Quantity</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in configurations" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.defaultQty }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'Configurations',
        props: ['configurations']
     }
</script>