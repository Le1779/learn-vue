<!--
WorkOrder edit history page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="card-container subpage-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{ title: 'No.  編輯總覽', text: 'WO-20200729-FFFF', class: 'md' }"></textview>
        </div>
        <div class="detail-container">
            <div>
                <div class="formula">
                    <textview :model="{ title: '編輯次數', text: viewModel.EditedTimes, class: 'md red' }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{ title: '送單數量', text: viewModel.SendedTimes, class: 'md' }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{ title: '編輯率', text: viewModel.editRate, class: 'md red' }"></textview>
                </div>
            </div>
            <div class="edit-history">
                <div v-for="(item, index) in viewModel.ListData" class="history-item-container">
                    <div class="history-item">
                        <div class="history-line" :class="{first: index == 0}"></div>
                        <div class="history-card card-container">
                            <div class="history-remark" v-html="item.Remark"></div>
                            <div v-for="(child_item, child_index) in item.UpdatedColumns">
                                <div class="history-column-name">{{child_item.Name}}</div>
                                <div class="history-value">
                                    <div v-html="child_item.BeforeValue"></div>
                                    <div class="material-icons">{{'keyboard_arrow_right'}}</div>
                                    <div v-html="child_item.AfterValue"></div>
                                </div>
                                
                            </div>
                            <div class="history-edit-date">{{item.UpdateTime}}</div>
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
            viewModel: {}
        }),

        watch: {

        },

        created() {
            console.log("created wo edit");
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
                axios.get('TestFile/edited.json')
                    .then(function(response) {
                        console.log(response.data)
                        self.viewModel = response.data;
                        self.viewModel.editRate = getRateText(self.viewModel.EditedTimes / self.viewModel.SendedTimes)
                    }).catch(function(error) {
                        console.log(error);
                    });

                function getRateText(value) {
                    return Math.floor(value * 1000) / 10 + '%'
                }

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

    .edit-history {
        margin: 48px 0;
    }

    .history-item {
        display: inline-grid;
        grid-template-columns: auto auto;
    }

    .history-line {
        position: relative;
        box-sizing: border-box;
        width: 1px;
        border: 1px solid #B2B2B2;
        margin-bottom: 7px
    }

    .history-line::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        left: -4px;
        top: -8px;
        box-sizing: border-box;
        border: 2px solid #B2B2B2;
    }

    .history-line.first::before {
        content: "";
        position: absolute;
        width: 1px;
        height: 24px;
        left: -1px;
        top: -34px;
        box-sizing: border-box;
        border: 1px dashed #B2B2B2;
    }

    .history-card {
        padding: 12px 24px;
        margin: 0 48px 48px;
    }

    .history-column-name,
    .history-edit-date {
        color: #7E7E7E;
        font-size: 12px;
    }

    .history-edit-date {
        text-align: right;
    }

    .history-value {
        display: inline-grid;
        grid-template-columns: auto auto auto;
        margin: 8px 0 12px;
    }
    
    .history-remark {
        border: 1px solid #C1C1C1;
        border-radius: 8px;
        margin: 8px 12px;
        padding: 24px 12px;
    }

</style>
