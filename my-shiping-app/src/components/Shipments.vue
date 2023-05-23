<template>
    <div class="container">
        <h2>Shipments</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Order Id</th>
                <th>Shipment Date</th>
                <th>Invoice No</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in deliveries" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.invNo }}</td>
                  <td>{{ item.customer }}</td>
                  <td>{{ item.item }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.status }}</td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        name: 'Shipments',
        props: ['shipments']
     }
</script>