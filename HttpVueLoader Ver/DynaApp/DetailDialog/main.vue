<template>
    <v-app>
        <v-main>
            <detail-dialog :view_model="dialogViewModel"></detail-dialog>
        </v-main>
    </v-app>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({
            dialogViewModel: {
                show: true
            }
        }),

        watch: {

        },

        created() {
            console.log("created main");
        },

        components: {
            'detail-dialog': httpVueLoader('dialog.vue'),
        },

        methods: {},
    }

</script>

<style scoped>

</style>
