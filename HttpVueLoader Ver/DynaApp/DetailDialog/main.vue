<template>
    <v-app>
        <v-main>
           <v-btn color="gray lighten-2" dark @click="dialogViewModel.show = true">
                Click Me
            </v-btn>
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
                show: false
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
