<template>
    <div class="display-board">
        <h4>Deliveries Registered</h4>
        <div class="number">
        {{numberOfDeliveries}}
        </div>
        <div class="btn">
            <button @click='getAllDeliveries()' type="button" class="btn btn-warning">Get all Deliveries</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DisplayBoard',
        props: ['numberOfDeliveries'],
        methods: {
            getAllDeliveries() {
                this.$emit('getAllDeliveries')
            }
        }
    }
</script>