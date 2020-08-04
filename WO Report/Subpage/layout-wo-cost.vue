<!--
WorkOrder cost page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="card-container subpage-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{ title: 'No.  成本概算', text: 'WO-20200729-FFFF', class: 'md' }"></textview>
        </div>
        <div class="detail-container">
            <div>
                <div class="formula">
                    <textview :model="{
                        title: '總工時',
                        text: workingHour,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '參與人數',
                        text: viewModel.NumberOfParticipants,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">x</div>
                    <textview :model="{
                        title: '人力成本(天/元)',
                        text: cost,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '成本概算',
                        text: totalCost,
                        class: 'md red'
                    }"></textview>
                </div>
            </div>

            <div class="card-container table-container">
                <data-table :model="table_model"></data-table>
            </div>

            <div class="participants-list-container">
                <div class="participants-container" v-for="(item, index) in viewModel.Participants">
                    <div class="participant-name">{{item.Self.Name}}</div>
                    <textview :model="{title: '被指派', text: item.AssignTimes, class: 'md'}"></textview>
                    <textview :model="{title: '被退回', text: item.RejectTimes, class: 'md red'}"></textview>
                    <div>
                        <div class="formula">
                            <textview :model="{title: '總工時', text: item.WorkingSeconds, class: 'md'}"></textview>
                            <div class="symbol">/</div>
                            <textview :model="{title: '處理數量', text: item.AssignTimes , class: 'md'}"></textview>
                            <div class="symbol">=</div>
                            <textview :model="{title: '平均處理時間', text: item.AvgWorkingHours, class: 'md red'}"></textview>
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
            viewModel: {},
            workingHour: '',
            cost: 2000,
            totalCost: 0,

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
                    name: 'WorkingSeconds'
                }],
                data: [],
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
            console.log("created wo cost " + this.$route.params.id);
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
                axios.get('TestFile/cost.json')
                    .then(function(response) {
                        console.log(response.data)
                        self.viewModel = response.data;
                        self.workingHour = getWorkingHourText(self.viewModel.WorkingSeconds);
                        self.totalCost = Math.floor(self.viewModel.WorkingSeconds / 216000 * 10) / 10 * self.cost;

                        self.table_model.data = []
                        self.viewModel.TableData.forEach(function(item, index, array) {
                            self.table_model.data.push({
                                Date: item.Date,
                                Previous: item.PreviousUser.Name,
                                Next: item.NextUser.Name,
                                State: item.State,
                                WorkingSeconds: getWorkingHourText(item.WorkingSeconds)
                            })
                        });
                    
                        self.viewModel.Participants.forEach(function(item, index, array) {
                            item.AvgWorkingHours = getWorkingHourText(item.WorkingSeconds / item.AssignTimes);
                            item.WorkingSeconds = getWorkingHourText(item.WorkingSeconds);
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
                    } else if (seconds < 5184000) {
                        return Math.floor(seconds / 216000 * 10) / 10 + '天';
                    }
                }
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
