<template>
    <v-container fluid>
        <layout-spaceial-contract-store :snackbar_model=snackbar_error></layout-spaceial-contract-store>
        <v-snackbar v-model="snackbar_error.show" :timeout="snackbar_error.timeout">{{ snackbar_error.message }}</v-snackbar>
    </v-container>
</template>


<script>
    module.exports = {
        data: () => ({
            snackbar_error: {
                show: false,
                timeout: 5000,
                message: '',
            }
        }),

        created() {},

        methods: {},

        watch: {},

        components: {
            'layout-spaceial-contract-store': httpVueLoader('Other/SpecialContractStore/layout-special-contract-store.vue'),
        }
    }

</script>
