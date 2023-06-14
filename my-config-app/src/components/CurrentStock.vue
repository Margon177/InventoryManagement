<template>
    <div class="container">
        <h2>Current Stock</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentStock" :key="item.id">
                  <td>{{ item.item }}</td>
                  <td>{{ item.qty }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'CurrentStock',
        props: ['currentStock']
     }
</script>