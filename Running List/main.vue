<template>
    <div style="width: 100%;">
        <buttons-container :filter="filter" :export_excel_url="view_model.exportExcelUrl" style="margin: 12px 0px;"></buttons-container>
        <list-container :view_model="view_model" :filter="filter"></list-container>
    </div>
</template>

<script scoped>
    module.exports = {
        props: ["view_model"],
        data: () => ({
            fakeData: null,
            filter: {
                current: 'Related',
            }
        }),

        computed: {

        },

        watch: {

        },

        created() {
            console.log(this.view_model)
        },

        methods: {

        },

        components: {
            'buttons-container': httpVueLoader('buttons-container.vue'),
            'list-container': httpVueLoader('list-container.vue'),
            //'list-container': httpVueLoader('list-container-card.vue'),
        }
    }

</script>

<style scoped>

</style>
