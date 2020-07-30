<!--
Reopen table page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="page-container">
        <div class="card-container table-container">
            <data-table :model="table_model">
                <template v-slot:action="{item}">
                    <router-link :to="{name:'WO_REOPEN', params: {id: item.AppInstanceID}}" class="material-icons" style="opacity: 0.3;">{{'search'}}</router-link>
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
                    name: 'AppInstanceID'
                }, {
                    text: '專案名稱',
                    name: 'ProjectName'
                }, {
                    text: '負責人',
                    name: 'Staff'
                }, {
                    text: '建立日期',
                    name: 'Date'
                }, {
                    text: '狀態',
                    name: 'State'
                }],
                data: [{
                    AppInstanceID: 'WO-20200729-FFFF',
                    ProjectName: 'Order1',
                    Staff: '章君豪',
                    Date: '2020/07/29 12:01',
                    State: 1
                }, {
                    AppInstanceID: 'WO-20200729-EEEE',
                    ProjectName: 'Order2',
                    Staff: '章君豪',
                    Date: '2020/07/29 12:01',
                    State: 1
                }, {
                    AppInstanceID: 'WO-20200729-DDDD',
                    ProjectName: 'Order3',
                    Staff: '章君豪',
                    Date: '2020/07/29 12:01',
                    State: 1
                }],
                orderByIndex: 1,
                isDes: true,
                withAction: true,
            },
            hint: ''
        }),

        watch: {

        },

        created() {

        },

        components: {
            'data-table': httpVueLoader('data-table.vue'),
        },

        methods: {},
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
