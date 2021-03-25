<!--
WorkOrder reopen history page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="card-container subpage-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{ title: 'No.  重啟總覽', text: 'WO-20200729-FFFF', class: 'md' }"></textview>
        </div>
        <div class="detail-container">
            <div>
                <div class="formula">
                    <textview :model="{ title: '重啟次數', text: 1, class: 'md red' }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{ title: '送單數量', text: 5, class: 'md' }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{ title: '重啟率', text: '20%', class: 'md red' }"></textview>
                </div>
            </div>
            <div class="reject-history">
                <div v-for="(item, index) in history" class="history-item-container">
                    <div class="history-item">
                        <div class="history-line" :class="{first: index == 0}"></div>
                        <div class="history-card card-container">
                            <div class="history-value" v-html="item.reason"></div>
                            <div class="history-date">{{item.date}}</div>
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
            history: [{
                reason: '需求2有誤',
                date: '2020/07/30 13:04'
            }, {
                reason: '需求3有誤',
                date: '2020/07/30 13:04'
            }, {
                reason: '結案日期有誤',
                date: '2020/07/30 13:04'
            }]
        }),

        watch: {

        },

        created() {
            console.log("created wo reopen");
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
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

    .reject-history {
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
        border: 1px solid #EF6A8D;
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
        border: 2px solid #EF6A8D;
        background: #EF6A8D;
    }

    .history-line.first::before {
        content: "";
        position: absolute;
        width: 1px;
        height: 24px;
        left: -1px;
        top: -34px;
        box-sizing: border-box;
        border: 1px dashed #EF6A8D;
    }

    .history-card {
        padding: 12px 24px;
        margin: 0 48px 48px;
    }

    .history-column-name,
    .history-date {
        color: #7E7E7E;
        font-size: 12px;
    }
    
    .history-date {
        text-align: right;
    }
    
    .history-value {
        display: inline-grid;
        grid-template-columns: auto auto auto;
        margin: 8px 0 12px;
    }

</style>
