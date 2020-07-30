<template>
    <div class="card-container subpage-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{ title: 'No.  成本概算', text: 'WO-20200729-FFFF', class: 'md' }"></textview>
        </div>
        <div class="detail-container">
            <div>
                <div class="formula">
                    <textview :model="{ title: '總工時', text: '2.5天', class: 'md' }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{ title: '參與人數', text: 2, class: 'md' }"></textview>
                    <div class="symbol">x</div>
                    <textview :model="{ title: '人力成本(天/元)', text: 2000, class: 'md' }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{ title: '成本概算', text: 10000, class: 'md red' }"></textview>
                </div>
            </div>

            <div class="card-container table-container">
                <data-table :model="table_model"></data-table>
            </div>

            <div class="participants-list-container">
                <div class="participants-container" v-for="(item, index) in participants">
                    <div class="participant-name">{{item.Name}}</div>
                    <textview :model="{title: '被指派', text: item.Assign, class: 'md'}"></textview>
                    <textview :model="{title: '被退回', text: item.Reject, class: 'md red'}"></textview>
                    <div>
                        <div class="formula">
                            <textview :model="{title: '總工時', text: item.WorkingHour, class: 'md'}"></textview>
                            <div class="symbol">/</div>
                            <textview :model="{title: '處理數量', text: item.Assign + item.Reject , class: 'md'}"></textview>
                            <div class="symbol">=</div>
                            <textview :model="{title: '平均處理時間', text: item.WorkingHour, class: 'md red'}"></textview>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({

            table_model: {
                head: [{
                    text: '日期',
                    name: 'Date'
                }, {
                    text: '上一關',
                    name: 'Previous'
                }, {
                    text: '下一關',
                    name: 'Next'
                }, {
                    text: '狀態',
                    name: 'State'
                }, {
                    text: '工時長',
                    name: 'Costs'
                }],
                data: [{
                    Date: '2020/07/29 12:11',
                    Previous: '章君豪',
                    Next: '樂仲珉',
                    State: '2',
                    Costs: '10分鐘',
                }, {
                    Date: '2020/07/31 12:11',
                    Previous: '樂仲珉',
                    Next: '章君豪',
                    State: '2',
                    Costs: '2天',
                }, {
                    Date: '2020/07/31 12:18',
                    Previous: '章君豪',
                    Next: '樂仲珉',
                    State: '2',
                    Costs: '7分鐘',
                }, {
                    Date: '2020/07/31 13:18',
                    Previous: '樂仲珉',
                    Next: '章君豪',
                    State: '2',
                    Costs: '1小時',
                }],
                orderByIndex: 1,
                isDes: true
            },

            participants: [{
                Name: '章君豪',
                Assign: 1,
                Reject: 1,
                WorkingHour: '19分鐘',
            }, {
                Name: '樂仲珉',
                Assign: 2,
                Reject: 1,
                WorkingHour: '2天1小時',
            }, {
                Name: '樂仲珉',
                Assign: 2,
                Reject: 1,
                WorkingHour: '2天1小時',
            }]
        }),

        watch: {

        },

        created() {
            console.log("created wo detail");
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
            'data-table': httpVueLoader('data-table.vue'),
        },

        methods: {
            back() {
                this.$router.back(-1)
            }
        },
    }
</script>

<style scoped>

    .detail-container {
        margin: 12px 48px;
    }

    .formula {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        margin: 12px 0;
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
        width: 100%;
        padding: 24px 12px 48px 12px;
        margin: 48px 0;
    }

    .participants-list-container {
        display: grid;
        grid-template-columns: 50% 50%;
        margin-bottom: 48px;
    }

    .participants-container {
        border: 1px solid #C1C1C1;
        border-radius: 8px;
        margin: 8px 12px;
        padding: 24px 12px;
    }

    .participant-name {
        margin-left: 12px;
        color: #555555;
    }
</style>