<template>
    <div class="display-board">
        <h4>Shipments Registered</h4>
        <div class="number">
        {{numberOfShipments}}
        </div>
        <div class="btn">
            <button @click='refresh()' type="button" class="btn btn-warning">Refresh</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'DisplayBoard',
        props: ['numberOfShipments'],
        methods: {
            refresh(){
                this.$emit('getAllShipments')
                this.$emit('getCurrentStock')
            },
            getAllShipments() {
                this.$emit('getAllShipments')
            },
            getCurrentStock() {
                this.$emit('getCurrentStock')
            }
        }
    }

</script>