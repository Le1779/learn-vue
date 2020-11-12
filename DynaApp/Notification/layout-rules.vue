<!--
Edit history table page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            headers: [
                {
                    text: 'index',
                    value: 'index'
                },
                {
                    text: 'rule',
                    value: 'rule'
                },
                {
                    text: 'template',
                    value: 'template'
                },
                {
                    text: 'action',
                    value: 'action'
                },
            ],
            desserts: [{
                    index: 1,
                    rule: 159,
                    template: 6.0,
                    action: 24,
                },
            ],
        }),

        watch: {

        },

        created() {

        },

        components: {

        },

        methods: {

        },
    }

</script>

<style scoped>


</style>
