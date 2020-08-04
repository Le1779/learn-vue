<!--
Edit history table page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="page-container">
        <div class="card-container table-container">
            <data-table :model="table_model">
                <template v-slot:edit_rate="{item}">
                    {{getRateText(item)}}
                </template>
                <template v-slot:action="{item}">
                    <router-link :to="{name:'WO_EDIT', params: {id: item.AppInstanceID}}" class="material-icons" style="opacity: 0.3;">{{'search'}}</router-link>
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
                    text: '編輯次數',
                    name: 'EditedTimes'
                }, {
                    text: '編輯率',
                    name: 'EditRate',
                    slot: 'edit_rate'
                }],
                data: [],
                orderByIndex: 1,
                isDes: true,
                withAction: true,
            },
            hint: '編輯次數越高，代表最終需求與初始規劃需求差異越大'
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
                axios.get('TestFile/EditInfo.json')
                    .then(function(response) {
                        console.log(response.data);
                        self.table_model.data = response.data;
                        self.table_model.data.forEach(function(item, index, array) {
                            item.managerName = item.Manager.Name;
                        });
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            getRateText(value) {
                return Math.floor(value * 1000) / 10 + '%'
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
