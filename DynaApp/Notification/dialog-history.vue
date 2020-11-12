<!--
history page

Created by Kevin Le on 2020/11/09.
-->
<template>
    <v-dialog v-model="model.isShow" width="500">
        <v-card>
            <v-card-title class="headline">
                {{model.data.name}}
            </v-card-title>

            <div class="notification_progress_info">
                <div class="notification_progress_info_label" @click="filter(0)">
                    <div class="notification_progress_info_label_icon green lighten-1"></div>
                    <div class="notification_progress_info_label_title">成功送達</div>
                    <div class="notification_progress_info_label_text">{{getRate(model.data, model.data.complete)}}%</div>
                </div>
                <div class="notification_progress_info_label" @click="filter(1)">
                    <div class="notification_progress_info_label_icon red lighten-1"></div>
                    <div class="notification_progress_info_label_title">失敗</div>
                    <div class="notification_progress_info_label_text">{{getRate(model.data, model.data.error)}}%</div>
                </div>
                <div class="notification_progress_info_label" @click="filter(2)">
                    <div class="notification_progress_info_label_icon"></div>
                    <div class="notification_progress_info_label_title">已進入排程</div>
                    <div class="notification_progress_info_label_text">{{getRate(model.data, model.data.schedule)}}%</div>
                </div>
            </div>

            <v-data-table :headers="headers" :items="desserts" :items-per-page="5">
                <template v-slot:item="{ item }">
                    <tr :class="{ 'red lighten-4': item.Status == 1 }">
                        <td>{{item.index}}</td>
                        <td>{{item.UserName}}</td>
                        <td>{{status[item.Status]}}</td>
                        <td>{{item.date}}</td>
                    </tr>
                </template>
            </v-data-table>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="model.isShow = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            headers: [{
                text: 'index',
                value: 'index'
            }, {
                text: 'User Name',
                value: 'UserName'
            }, {
                text: 'Status',
                value: 'status'
            }, {
                text: 'Date',
                value: 'date'
            }],
            
            desserts: [{
                index: 1,
                UserName: 'Kevin',
                Status: 0,
                date: '2020/09/28'
            }, {
                index: 2,
                UserName: 'Le',
                Status: 1,
                date: '2020/09/28'
            }, {
                index: 3,
                UserName: 'Kevin Le',
                Status: 0,
                date: '2020/09/28'
            }, {
                index: 4,
                UserName: 'Kevin Le',
                Status: 0,
                date: '2020/09/28'
            }, {
                index: 5,
                UserName: 'Le',
                Status: 1,
                date: '2020/09/28'
            }, {
                index: 6,
                UserName: 'Le',
                Status: 1,
                date: '2020/09/28'
            }, {
                index: 7,
                UserName: 'Kevin',
                Status: 0,
                date: '2020/09/28'
            }, {
                index: 8,
                UserName: 'Kevin',
                Status: 0,
                date: '2020/09/28'
            }, {
                index: 9,
                UserName: 'Kevin',
                Status: 0,
                date: '2020/09/28'
            }, {
                index: 10,
                UserName: 'Le',
                Status: 1,
                date: '2020/09/28'
            }],

            status: ['已送達', '未送達', '待送達']
        }),

        watch: {

        },

        created() {

        },

        components: {

        },

        methods: {
            
            filter(status) {
                console.log("filter: " + status)
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

<style>
    .notification_progress_info {
        display: grid;
        grid-template-columns: auto auto auto;
    }

    .notification_progress_info_label {
        display: inline-block;
        padding-left: 8px;
        cursor: pointer;
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
