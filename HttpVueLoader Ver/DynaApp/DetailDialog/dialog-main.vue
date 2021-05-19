<template>
    <v-timeline align-top dense>
        <timeline-item v-for="d in data" :key="d.ID" :data="d" @action="actoin"></timeline-item>
    </v-timeline>
</template>

<script>
    module.exports = {
        props: {
            data: Array,
            actoin: Function
        },
        data: () => ({}),

        watch: {},

        created() {},

        components: {
            'timeline-item': httpVueLoader('../DetailDialog/timeline-item.vue')
        },

        methods: {},
    }
</script>

<style scoped></style>