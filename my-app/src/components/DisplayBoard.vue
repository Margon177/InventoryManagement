<template>
    <div class="display-board">
        <h4>Deliveries Registered</h4>
        <div class="number">
        {{numberOfDeliveries}}
        </div>
        <div class="btn">
            <button @click='refresh()' type="button" class="btn btn-warning">Refresh</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'DisplayBoard',
        props: ['numberOfDeliveries'],
        methods: {
            refresh(){
                this.$emit('getAllDeliveries')
                this.$emit('getCurrentStock')
            },
            getAllDeliveries() {
                this.$emit('getAllDeliveries')
            },
            getCurrentStock() {
                this.$emit('getCurrentStock')
            }
        }
    }

</script>