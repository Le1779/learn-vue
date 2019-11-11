<template>
    <div class="container">
        <account-info :account="account"></account-info>
        <purchase-list :table_data="table_data"></purchase-list>
    </div>
</template>

<script>
    let viewModel = {
        table_data: '',
        table_info: {
            current_page: 0,
            per_page_length: 25,
            data_size: 4,
        },
        account: {
            login_name: 'abc@gmail.com',
            apple_id: 'abc@gmail.com',
            platform: 'apple'
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
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle4@dynacw.com",
                    Expired: "",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle2@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle50@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle2@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle50@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle2@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }, {
                    Amount: 0,
                    Customer_id: 0,
                    Date: "2019/09/24 ~ 1753/01/01",
                    Email: "kevinle50@dynacw.com",
                    Expired: "1753/01/01",
                    Item: "測試品名",
                    Money: 0
                }];
            }
        },
        components: {
            'account-info': httpVueLoader('account-info.vue'),
            'purchase-list': httpVueLoader('purchase-list.vue')
        },
        mounted: function() {
            this.getData();
        }
    }

</script>

<style scoped>
    .container {
        padding: 30pt 42pt 0pt 42pt;
        font-size: 20pt;
        width: 620pt;
        height: 100vw;
        background-color: white;
    }

</style>
