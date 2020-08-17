<!--
Unfinished page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="page-container">
        <layout-chart class="chart-container" :model="viewModel.Managers"></layout-chart>
        <layout-manager class="manager-container" :model="viewModel.Managers"></layout-manager>
        <div class="card-container list-container">
            <data-table :model="table_model">
               <template v-slot:id="{item}">
                    <a :href="'/Home/RunningListMessageBorder/?appInstanceID=' + item.ID">{{item.ID}}</a>
                </template>
                <template v-slot:finish_date="{item}">
                    {{item.PlanFinishDate}}
                    <div v-if="item.ExpiredDay > 0" class="expired">
                        逾期{{item.ExpiredDay}}天
                    </div>
                    <div v-else class="unfinish">
                        尚餘{{item.ExpiredDay * -1}}天
                    </div>
                </template>
                <template v-slot:action="{item}">
                    <router-link :to="{name:'WO_OVERVIEW', params: {id: item.AppInstanceID}}" class="material-icons" style="opacity: 0.3; color: black;">{{'search'}}</router-link>
                </template>
            </data-table>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            viewModel: {
                Managers: null,
                UnFinishList: null
            },
            table_model: {
                head: [{
                    text: 'No.',
                    name: 'ID',
                    slot: 'id'
                }, {
                    text: '建立日期',
                    name: 'CreateTime'
                }, {
                    text: '負責人',
                    name: 'managerName'
                }, {
                    text: '專案名稱',
                    name: 'ProjectName'
                }, {
                    text: '客戶名稱',
                    name: 'CustomerName'
                }, {
                    text: '預定完成日',
                    name: 'PlanFinishDate',
                    slot: 'finish_date'
                }],
                data: [],
                orderByIndex: 0,
                isDes: true,
                withAction: true,
            },
        }),

        watch: {

        },

        created() {
            this.getData();
        },

        components: {
            'layout-chart': httpVueLoader('Unfinished/layout-chart.vue'),
            'layout-manager': httpVueLoader('Unfinished/layout-manager.vue'),
            'data-table': httpVueLoader('data-table.vue'),
        },

        methods: {
            getData() {
                var self = this;
                axios.get('TestFile/Unfinished.json')
                    .then(function(response) {
                        console.log(response.data);
                        self.viewModel = response.data;
                        self.table_model.data = response.data.UnFinishList
                        self.table_model.data.forEach(function(item, index, array) {
                            item.managerName = item.Manager.Name
                            if (index == 1) {
                                item.ExpiredDay *= -1;
                            }
                        });
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            getWorkingHourText(seconds) {
                console.log(seconds)
            }
        },
    }

</script>

<style scoped>
    .page-container {
        margin: 48px 24px;
        display: grid;
        grid-template-columns: 60% 40%;
        grid-template-areas:
            "chart principal"
            "list list";
    }

    .card-container {
        padding: 12px 24px;
    }

    .table-container {
        padding: 24px 24px 48px 24px;
        margin: 48px 0;
    }

    .table-hint {
        margin-top: 24px;
        color: #7E7E7E;
        font-size: 12px;
    }

    .chart-container {
        grid-area: chart;
        height: 100%;
        margin-right: 20px;
    }

    .manager-container {
        grid-area: principal;
        margin-left: 20px;
        height: 100%;
    }

    .list-container {
        grid-area: list;
        margin: 48px 0;
        height: auto;
        padding: 24px 12px 48px 12px;
        margin: 48px 0;
    }

    .expired, .unfinish {
        border-radius: 20px;
        border: 2px solid #00C58D;
        color: #00C58D;
        padding: 2px;
    }
    
    .expired {
        border: 2px solid #EF6A8D;
        color: #EF6A8D;
    }
    
    a {
        cursor: pointer;
        color: black;
        text-decoration:none;
    }
</style>
