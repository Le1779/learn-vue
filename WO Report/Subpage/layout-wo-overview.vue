<template>
    <div class="card-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{
                title: 'No.',
                text: 'WO-20200729-FFFF',
                class: 'md'
            }"></textview>
        </div>
        <div class="detail-container">
            <div>
                <textview :model="{
                    title: '專案名稱',
                    text: '一號工單',
                    class: 'sm'
                }"></textview>
            </div>
            <div>
               <router-link :to="{name:'WO_COST'}" class="formula">
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
               </router-link>
            </div>
            <div>
                <router-link :to="{name:'WO_EDIT'}" class="formula">
                    <textview :model="{
                        title: '編輯次數',
                        text: viewModel.EditedTimes,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '送單數量',
                        text: viewModel.SendedTimes,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '編輯率',
                        text: editedRate,
                        class: 'md'
                    }"></textview>
                </router-link>
            </div>
            <div>
                <router-link :to="{name:'WO_REJECT'}" class="formula">
                    <textview :model="{
                        title: '退單次量',
                        text: viewModel.RejectedTimes,
                        class: 'md red'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '送單數量',
                        text: viewModel.SendedTimes,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '退單率',
                        text: rejectRate,
                        class: 'md red'
                    }"></textview>
                </router-link>
            </div>
            <div>
                <router-link :to="{name:'WO_REOPEN'}" class="formula">
                    <textview :model="{
                        title: '重啟次數',
                        text: viewModel.ReopenedTimes,
                        class: 'md red'
                    }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{
                        title: '送單數量',
                        text: viewModel.SendedTimes,
                        class: 'md'
                    }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{
                        title: '重啟率',
                        text: reopenRate,
                        class: 'md red'
                    }"></textview>
                </router-link>
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
            editedRate: '',
            rejectRate: '',
            reopenRate: '',
        }),

        watch: {

        },

        created() {
            console.log("created wo overview");
            this.getData();
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
        },

        methods: {
            back() {
                this.$router.back(-1)
            },
            
            getData() {
                var self = this;
                axios.get('TestFile/overview.json')
                .then(function (response) {
                    console.log(response.data)
                    self.viewModel = response.data;
                    self.workingHour = getWorkingHourText(self.viewModel.WorkingSeconds);
                    self.totalCost = Math.floor(self.viewModel.WorkingSeconds/216000 * 10)/10 * self.cost;
                    self.editedRate = getRateText(self.viewModel.EditedTimes / self.viewModel.SendedTimes);
                    self.rejectRate = getRateText(self.viewModel.RejectedTimes / self.viewModel.SendedTimes);
                    self.reopenRate = getRateText(self.viewModel.ReopenedTimes / self.viewModel.SendedTimes);
                }).catch(function (error) {
                    console.log(error);
                });
                
                function getRateText(value) {
                    return Math.floor(value * 1000)/10 + '%'
                }
                
                function getWorkingHourText(seconds) {
                    if (seconds < 60) {
                        return seconds + '秒';
                    } else if (seconds < 3600) {
                        return Math.floor(seconds/60 * 10)/10 + '分鐘';
                    } else if (seconds < 216000) {
                        return Math.floor(seconds/3600 * 10)/10 + '小時';
                    } else if (seconds < 5184000) {
                        return Math.floor(seconds/216000 * 10)/10 + '天';
                    }
                }
            }
        },
    }

</script>

<style scoped>
    .card-container {
        width: 100%;
    }

    .detail-container {
        margin: 12px 48px 48px;
    }

    .formula {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        border: 1px solid #C1C1C1;
        border-radius: 8px;
        margin: 8px 12px;
        padding: 24px 12px;
        text-decoration:none;
    }

    .symbol {
        display: inline;
        color: #7E7E7E;
        font-size: 16px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }
    
</style>
