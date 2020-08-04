<!--
Cost table page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="page-container">
        <div class="card-container table-container">
            <data-table :model="table_model">
                <template v-slot:action="{item}">
                    <router-link :to="{name:'WO_COST', params: {id: item.AppInstanceID}}" class="material-icons" style="opacity: 0.3;">{{'search'}}</router-link>
                </template>
            </data-table>
            <div class="table-hint">{{hint}}</div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            table_model: {
                head: [{
                    text: 'No.',
                    name: 'ID'
                }, {
                    text: '專案名稱',
                    name: 'ProjectName'
                }, {
                    text: '負責人',
                    name: 'managerName'
                }, {
                    text: '運行流程數量',
                    name: 'QuantityOfFlow'
                }, {
                    text: '參與人數',
                    name: 'managerName'
                }, {
                    text: '總工時',
                    name: 'workingHours'
                }],
                data: [],
                orderByIndex: 1,
                isDes: true,
                withAction: true,
            },
            hint: '運行的流程數量可以作為工單活耀度的依據'
        }),

        watch: {

        },

        created() {
            this.getData();
        },

        components: {
            'data-table': httpVueLoader('data-table.vue'),
        },

        methods: {
            getData() {
                var self = this;
                axios.get('TestFile/CostInfo.json')
                    .then(function(response) {
                        console.log(response.data);
                        self.table_model.data = response.data;
                        self.table_model.data.forEach(function(item, index, array) {
                            item.managerName = item.Manager.Name
                            item.workingHours = getWorkingHourText(item.WorkingSeconds)
                        });
                    }).catch(function(error) {
                        console.log(error);
                    });

                function getWorkingHourText(seconds) {
                    if (seconds < 60) {
                        return seconds + '秒';
                    } else if (seconds < 3600) {
                        return Math.floor(seconds / 60 * 10) / 10 + '分鐘';
                    } else if (seconds < 216000) {
                        return Math.floor(seconds / 3600 * 10) / 10 + '小時';
                    } else {
                        return Math.floor(seconds / 216000 * 10) / 10 + '天';
                    }
                }
            }
        },
    }

</script>

<style scoped>
    .page-container {
        margin: 48px 24px;
        display: grid;
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

</style>
