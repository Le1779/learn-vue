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
                    <textview :model="{ title: '編輯次數', text: 1, class: 'md red' }"></textview>
                    <div class="symbol">/</div>
                    <textview :model="{ title: '送單數量', text: 5, class: 'md' }"></textview>
                    <div class="symbol">=</div>
                    <textview :model="{ title: '編輯率', text: '20%', class: 'md red' }"></textview>
                </div>
            </div>
            <div class="edit-history">
                <div v-for="(item, index) in history" class="history-item-container">
                    <div class="history-item">
                        <div class="history-line" :class="{first: index == 0}"></div>
                        <div class="history-card card-container">
                            <div class="history-column-name">{{item.columnName}}</div>
                            <div class="history-value">
                                <div v-html="item.beforeValue"></div>
                                <div class="material-icons">{{'keyboard_arrow_right'}}</div>
                                <div v-html="item.afterValue"></div>
                            </div>
                            <div class="history-edit-date">{{item.editDate}}</div>
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
                columnName: '工單名稱',
                beforeValue: '0號工單',
                afterValue: '一號工單',
                editDate: '2020/07/30 13:04'
            }, {
                columnName: 'RD完成日期',
                beforeValue: '2020/09/30',
                afterValue: '2020/08/30',
                editDate: '2020/07/30 12:04'
            }, {
                columnName: 'RD需求',
                beforeValue: '1. Something…<br>2. Something…',
                afterValue: '1. Something…</br>2. Something…</br>3. Something…',
                editDate: '2020/07/30 11:04'
            }]
        }),

        watch: {

        },

        created() {
            console.log("created wo edit");
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

</style>
