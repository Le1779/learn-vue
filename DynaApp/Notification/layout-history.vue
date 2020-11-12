<!--
history page

Created by Kevin Le on 2020/11/09.
-->
<template>
    <div class="page-container">
        <v-data-table :headers="headers" :items="desserts" :items-per-page="-1" class="elevation-1" :hide-default-footer="true" @click:row="showDialog">
            <template v-slot:item.status="{ item }">
                <div class="notifacation_history_item_container">
                    <div class="notification_progress">
                        <div class="notification_progress_bar" v-bind:style="{'grid-template-columns': getProgressBarStyle(item)}">
                            <div class="notification_progress_bar_item green lighten-1"></div>
                            <div class="notification_progress_bar_item red lighten-1"></div>
                            <div class="notification_progress_bar_item"></div>
                        </div>
                        <div class="notification_progress_info">
                            <div class="notification_progress_info_label">
                                <div class="notification_progress_info_label_icon green lighten-1"></div>
                                <div class="notification_progress_info_label_title">成功送達</div>
                                <div class="notification_progress_info_label_text">{{getRate(item, item.complete)}}%</div>
                            </div>
                            <div class="notification_progress_info_label">
                                <div class="notification_progress_info_label_icon red lighten-1"></div>
                                <div class="notification_progress_info_label_title">失敗</div>
                                <div class="notification_progress_info_label_text">{{getRate(item, item.error)}}%</div>
                            </div>
                            <div class="notification_progress_info_label">
                                <div class="notification_progress_info_label_icon"></div>
                                <div class="notification_progress_info_label_title">已進入排程</div>
                                <div class="notification_progress_info_label_text">{{getRate(item, item.schedule)}}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

        </v-data-table>
        <dialog-history :model="dialogModel"></dialog-history>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            headers: [{
                text: 'index',
                value: 'index'
            }, {
                text: 'Name',
                value: 'name'
            }, {
                text: 'Status',
                value: 'status'
            }],
            desserts: [{
                index: 1,
                name: '通知1',
                complete: 24,
                error: 4,
                schedule: 40
            }, {
                index: 2,
                name: '通知2',
                complete: 300,
                error: 4,
                schedule: 150
            }, {
                index: 3,
                name: '通知3',
                complete: 24,
                error: 40,
                schedule: 12
            }, {
                index: 4,
                name: '通知4',
                complete: 1,
                error: 34,
                schedule: 60
            }, {
                index: 5,
                name: '通知5',
                complete: 100,
                error: 2,
                schedule: 60
            }, {
                index: 6,
                name: '通知6',
                complete: 100,
                error: 0,
                schedule: 0
            }],
            
            dialogModel: {
                isShow: false,
                data: []
            }
        }),

        watch: {

        },

        created() {
            
        },

        components: {
            'dialog-history': httpVueLoader('dialog-history.vue'),
        },

        methods: {
            showDialog(item) {
                console.log(item)
                this.dialogModel.isShow = true
                this.dialogModel.data = item
            },
            
            getRate(item, num) {
                var total = item.complete + item.error + item.schedule
                var rate = num / total * 100
                rate = Math.round(rate * 10) / 10
                return rate
            },

            getProgressBarStyle(item) {
                var complete = `${this.getRate(item, item.complete)}%`
                var error = `${this.getRate(item, item.error)}%`
                var schedule = `${this.getRate(item, item.schedule)}%`

                return `${complete} ${error} ${schedule}`
            }
        },
    }

</script>

<style scoped>
    tr {
        cursor: pointer;
    }
    
    .notifacation_history_item_container {
        padding: 8px 24px;
    }

    .notification_progress {
        margin: 24px 24px;
    }

    .notification_progress_bar {
        display: grid;
        margin-bottom: 24px;
    }

    .notification_progress_bar_item {
        height: 10px;
        background-color: #A8A8A8;
        margin: 0 1px;
        border-radius: 3px;
    }

    .notification_progress_info {
        display: grid;
        grid-template-columns: auto auto auto;
    }

    .notification_progress_info_label {
        display: inline-block;
        padding-left: 8px;
    }

    .notification_progress_info_label_icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #A8A8A8
    }

    .notification_progress_info_label_title {
        display: inline-block;
    }

    .notification_progress_info_label_text {
        display: inline-block;
        color: #787878
    }

</style>
