<template>
    <v-container fluid>
        <v-row>
            <v-col cols=12 class="pa-0">
                <layout-spaceial-contract-store :snackbar_model=snackbar_error></layout-spaceial-contract-store>
            </v-col>
            <v-col cols=12 sm=6 class="pa-0">
                <layout-bulletin :snackbar_model=snackbar_error></layout-bulletin>
            </v-col>
            <v-col cols=12 sm=6 class="pa-0">
                <layout-purchase-notes :snackbar_model=snackbar_error></layout-purchase-notes>
            </v-col>
        </v-row>

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
            'layout-bulletin': httpVueLoader('Other/layout-bulletin.vue'),
            'layout-purchase-notes': httpVueLoader('Other/layout-purchase-notes.vue'),
        }
    }

</script>
