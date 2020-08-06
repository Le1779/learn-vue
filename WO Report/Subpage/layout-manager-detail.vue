<template>
    <div class="card-container page-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{ title: '負責人', text: viewModel.Manager.Name, class: 'md' }"></textview>
        </div>
        <div class="detail-container">
            <div class="formula-container">
                <textview :model="{ title: '負責數量', text: viewModel.HandleWorkOrders.length, class: 'md' }" style="display: block;"></textview>
                <textview :model="{ title: '總送單數量', text: viewModel.SendedTimes, class: 'md' }" style="display: block;"></textview>
                <div class="formula-1">
                    <div class="formula">
                        <div class="symbol">/</div>
                        <textview :model="{ title: '總編輯次數', text: viewModel.EditedTimes, class: 'md' }"></textview>
                        <div class="symbol">=</div>
                        <textview :model="{ title: '編輯率', text: getRateText(viewModel.EditedTimes/viewModel.SendedTimes), class: 'md' }"></textview>
                    </div>
                    <div class="formula">

                        <div class="symbol">/</div>
                        <textview :model="{ title: '總退單次數', text: viewModel.RejectedTimes, class: 'md red' }"></textview>
                        <div class="symbol">=</div>
                        <textview :model="{ title: '退單率', text: getRateText(viewModel.RejectedTimes/viewModel.SendedTimes), class: 'md red' }"></textview>
                    </div>
                    <div class="formula">

                        <div class="symbol">/</div>
                        <textview :model="{ title: '總重啟次數', text: viewModel.ReopenedTimes, class: 'md red' }"></textview>
                        <div class="symbol">=</div>
                        <textview :model="{ title: '重啟率', text: getRateText(viewModel.ReopenedTimes/viewModel.SendedTimes), class: 'md red' }"></textview>
                    </div>
                </div>
            </div>

            <div class="chart-container">
                <canvas id="myChart"></canvas>
                <textview :model="{ title: '點評', text: viewModel.Description, class: 'sm' }"></textview>
            </div>

            <div class="card-container table-container">
                <data-table :model="table_model">
                    <template v-slot:action="{item}">
                        <router-link :to="{name:'WO_OVERVIEW', params: {id: item.ID}}" class="material-icons" style="opacity: 0.3;">{{'search'}}</router-link>
                    </template>
                </data-table>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({

            viewModel: {
                Manager: {
                    Name: ''
                },
                HandleWorkOrders: []
            },

            table_model: {
                head: [{
                    text: 'No.',
                    name: 'ID'
                }, {
                    text: '專案名稱',
                    name: 'Name'
                }, {
                    text: '編輯次數',
                    name: 'EditedTimes'
                }, {
                    text: '退單次數',
                    name: 'RejectedTimes'
                }, {
                    text: '重啟次數',
                    name: 'ReopenedTimes'
                }],
                data: [],
                orderByIndex: -1,
                isDes: true,
                withAction: true,
            },
        }),

        watch: {

        },

        created() {
            console.log("created wo detail");
        },

        mounted() {
            this.getData();
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
            'data-table': httpVueLoader('data-table.vue'),
        },

        methods: {
            back() {
                this.$router.back(-1)
            },

            getData() {
                var self = this;
                axios.get('TestFile/ManagerVM.json')
                    .then(function(response) {
                        console.log(response.data)
                        self.viewModel = response.data;
                        self.table_model.data = self.viewModel.HandleWorkOrders;
                        self.table_model.orderByIndex = 1;
                        self.initChart();
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            getRateText(value) {
                return Math.floor(value * 1000) / 10 + '%'
            },

            initChart() {
                var self = this;
                var ctx = document.getElementById('myChart');
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['編輯', '退回', '重啟'],
                        datasets: [{
                            backgroundColor: [
                                "rgb(57,118,244)",
                                "rgb(255,99,132)",
                                "#5F6169"
                            ],
                            data: [self.viewModel.EditedTimes, self.viewModel.RejectedTimes, self.viewModel.ReopenedTimes]
                        }]
                    }
                });
            },
        },
    }

</script>

<style scoped>
    .page-container {
        width: 100%;
        display: grid;
        grid-template-rows: auto auto;
        padding: 0;
    }

    .subpage-container {
        width: 100%;
        overflow: auto;
        display: grid;
        grid-template-rows: auto auto;
    }

    .card-head {
        display: inline-grid;
        grid-template-columns: 36px auto;
        margin: 12px 12px;

    }

    .back-button {
        cursor: pointer;
        display: inline;
        color: #5F6169;
        font-size: 24px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }

    .detail-container {
        margin: 12px 48px;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-areas:
            "formula chart"
            "list list";
    }

    .formula-container {
        grid-area: formula;
        display: grid;
        grid-template-areas:
            "handle send edit"
            "empty empty reject"
            "empty empty reopen";
    }

    .chart-container {
        grid-area: chart;
    }

    .formula {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
    }

    .formula-1 {
        display: block;
    }

    .symbol {
        display: inline;
        color: #7E7E7E;
        font-size: 16px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }

    .table-container {
        grid-area: list;
        width: 100%;
        padding: 24px 12px 48px 12px;
        margin: 48px 0;
        height: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        border-bottom: 1px solid #B2B2B2;
    }

    th {
        cursor: pointer;
        color: #7E7E7E;
        font-size: 12px;
    }

    th>div {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        width: 100%;
        text-align: left;
    }

    th>div>div {
        float: left;
        display: inline-block;
        height: 24px;
    }

    td {
        text-align: left;
        padding: 12px 8px;
        color: #555555;
    }

</style>
