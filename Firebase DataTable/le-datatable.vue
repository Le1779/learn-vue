<template>
    <div class="container">
        <le-toolbar></le-toolbar>
        <le-table :table_data="table_data"></le-table>
        <le-footer></le-footer>
    </div>
</template>

<script>
    let viewModel = {
        who: 'world',
        table_data: 'null'
    };
    module.exports = {
        data: function() {
            return viewModel
        },
        methods: {},
        components: {
            'le-toolbar': httpVueLoader('le-toolbar.vue'),
            'le-table': httpVueLoader('le-table.vue'),
            'le-footer': httpVueLoader('le-footer.vue')
        }
    }

</script>

<style scoped>
    .container {
        width: 90%;
        border-radius: 8px;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

</style>
