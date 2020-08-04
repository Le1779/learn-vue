<!--
Summary page's workorder list

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="card-container">
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in header.column" @click="onOrderByButtonClick(index)">
                        <div>
                            <div>{{item.name}}</div>
                            <div v-if="index != 5" class="material-icons" style="opacity: 0.3;">{{header.orderByIndex == index ? header.desc ? 'arrow_upward' : 'arrow_downward' : 'swap_vert'}}
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in table_data">
                    <td>{{item.ID}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.Manager.Name}}</td>
                    <td>{{item.Description}}</td>
                    <td>{{item.CreationDateStr}}</td>
                    <td>
                        <router-link :to="{name:'WO_OVERVIEW', params: {id: item.ID}}" class="material-icons" style="opacity: 0.3;">{{'search'}}</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            header: {
                column: [{
                    name: 'No.',
                    value: 'AppInstanceID'
                }, {
                    name: '專案名稱',
                    value: 'AppInstanceID'
                }, {
                    name: '負責人',
                    value: 'AppInstanceID'
                }, {
                    name: '建單日期',
                    value: 'AppInstanceID'
                }, {
                    name: '狀態',
                    value: 'AppInstanceID'
                }, {
                    name: '詳情',
                    value: 'AppInstanceID'
                }],
                orderByIndex: 1,
                desc: true
            },

            table_data: []
        }),

        watch: {

        },

        created() {
            console.log("created wo list");
            this.getData();
        },

        components: {},

        methods: {
            getData() {
                var self = this;
                axios.get('TestFile/wo.json')
                .then(function (response) {
                    self.table_data = response.data;
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
