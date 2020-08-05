<!--
Summary page's workorder list

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="card-container">
        <data-table :model="table_model">
                <template v-slot:action="{item}">
                    <router-link :to="{name:'WO_OVERVIEW', params: {id: item.AppInstanceID}}" class="material-icons" style="opacity: 0.3;">{{'search'}}</router-link>
                </template>
            </data-table>
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
                    name: 'Name'
                }, {
                    text: '負責人',
                    name: 'managerName'
                }, {
                    text: '建單日期',
                    name: 'CreationDateStr'
                }, {
                    text: '狀態',
                    name: 'Description'
                }],
                data: [],
                orderByIndex: 1,
                isDes: true,
                withAction: true,
            }
        }),

        watch: {

        },

        created() {
            console.log("created wo list");
            this.getData();
        },

        components: {
            'data-table': httpVueLoader('data-table.vue'),
        },

        methods: {
            getData() {
                var self = this;
                axios.get('TestFile/wo.json')
                .then(function (response) {
                    self.table_model.data = response.data;
                    self.table_model.data.forEach(function(item, index, array) {
                            item.managerName = item.Manager.Name
                        });
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
    }

</script>

<style scoped>
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
