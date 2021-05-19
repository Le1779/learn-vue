<template>
    <v-timeline-item :key="data.recTime" :color="getTimelineColor(data.State)" small>
        <div>
            <v-row class="pt-1">
                <v-col cols="6">
                    <div class="body-1">來自<strong>{{add_from[data.AddFrom]}}</strong>的<span :class="`${getTimelineColor(data.State)}--text`">{{purchase_state[data.State]}}</span></div>
                    <div class="mt-1">{{convertToDate(data.recTime)}}</div>
                    <v-btn text @click="onShowReceiptButtonClick(data.ReceiptFromApple)" :disabled="data.ReceiptFromApple == null  || data.ReceiptFromApple == ''">{{data.ReceiptFromApple == null || data.ReceiptFromApple == '' ? "無收據" : "檢視收據"}}</v-btn>
                </v-col>
                <v-col cols="6">
                    <div>購買時間(UTC)</div>
                    <strong>{{ convertToDate(data.Date) }}</strong>
                    <div class="mt-1">到期時間</div>
                    <strong>{{ convertToDate(data.Expired) }}</strong>
                </v-col>
            </v-row>

        </div>
    </v-timeline-item>
</template>

<script>
    let viewModel = {
        purchase_state: ['購買中', '成功購買', '續訂失敗', '恢復購買', '續訂', '取消續訂', '變更續訂狀態', '不明'],
        add_from: ['未知', 'IPad', '後台', 'Apple']
    };

    module.exports = {
        props: ["data", "action"],
        data: () => (viewModel),
        methods: {
            getTimelineColor(state) {
                if (this.purchase_state[state] == '續訂失敗' || this.purchase_state[state] == '取消續訂') {
                    return 'red';
                } else if (this.purchase_state[state] == '成功購買' || this.purchase_state[state] == '續訂') {
                    return 'green';
                } else {
                    return 'grey';
                }
            },

            convertToDate(str) {
                var date = replaceCSharpFormat()
                return getFormatDate()

                function replaceCSharpFormat() {
                    let leftParentheses = str.indexOf('(');
                    let rightParentheses = str.lastIndexOf(')');
                    let milli = parseInt(str.substring(leftParentheses + 1, rightParentheses));
                    let date = new Date(milli);
                    return date;
                }

                function getFormatDate() {
                    let d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    let hour = d.getHours();
                    let minute = d.getMinutes();
                    let second = d.getSeconds();

                    hour = hour < 10 ? '0' + hour : hour;
                    minute = minute < 10 ? '0' + minute : minute;
                    second = second < 10 ? '0' + second : second;
                    let t = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    return [year, month, day].join('/') + ' ' + [hour, minute, second].join(':');
                }
            },

            onShowReceiptButtonClick(receipt) {
                this.$emit('action', receipt)
            },
        }
    }

</script>
