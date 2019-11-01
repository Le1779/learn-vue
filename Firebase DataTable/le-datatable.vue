<template>
    <div class="container">
        <le-toolbar></le-toolbar>
        <le-table :table_data="table_data"></le-table>
        <le-footer :table_info="table_info"></le-footer>
    </div>
</template>

<script>
    let viewModel = {
        table_data: '',
        table_info: {
            current_page: 0,
            per_page_length: 25,
            data_size: 4,
        }
    };
    module.exports = {
        data: function() {
            return viewModel
        },
        methods: {
            getData() {
                viewModel.table_data = [{
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24",
                    Email: "kevinle4@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24",
                    Email: "kevinle@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24",
                    Email: "kevinle2@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24",
                    Email: "kevinle50@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }];
            }
        },
        components: {
            'le-toolbar': httpVueLoader('le-toolbar.vue'),
            'le-table': httpVueLoader('le-table.vue'),
            'le-footer': httpVueLoader('le-footer.vue')
        },
        mounted: function() {
            this.getData();
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
