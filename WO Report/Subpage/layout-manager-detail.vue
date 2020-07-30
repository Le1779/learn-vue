<template>
    <div class="card-container page-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="{
                title: '負責人',
                text: '章君豪',
                class: 'md'
            }"></textview>
        </div>
        <div class="detail-container">
            <div class="formula-container">
                <textview :model="{
                    title: '負責數量',
                    text: '10',
                    class: 'md'
                }" style="display: block;"></textview>
                <textview :model="{
                    title: '總送單數量',
                    text: '21',
                    class: 'md'
                }" style="display: block;"></textview>
                <div class="formula-1">
                    <div class="formula">

                        <div class="symbol">/</div>
                        <textview :model="{
                            title: '總編輯次數',
                            text: '15',
                            class: 'md'
                        }"></textview>
                        <div class="symbol">=</div>
                        <textview :model="{
                            title: '編輯率',
                            text: '71%',
                            class: 'md'
                        }"></textview>
                    </div>
                    <div class="formula">

                        <div class="symbol">/</div>
                        <textview :model="{
                            title: '總退單次數',
                            text: '2',
                            class: 'md red'
                        }"></textview>
                        <div class="symbol">=</div>
                        <textview :model="{
                            title: '退單率',
                            text: '9.5%',
                            class: 'md red'
                        }"></textview>
                    </div>
                    <div class="formula">

                        <div class="symbol">/</div>
                        <textview :model="{
                            title: '總重啟次數',
                            text: '1',
                            class: 'md red'
                        }"></textview>
                        <div class="symbol">=</div>
                        <textview :model="{
                            title: '重啟率',
                            text: '4.7%',
                            class: 'md red'
                        }"></textview>
                    </div>
                </div>
            </div>

            <div class="chart-container"></div>

            <div class="card-container table-container">
                <table>
                    <thead>
                        <tr>
                            <th v-for="(item, index) in header.column" @click="onOrderByButtonClick(index)">
                                <div>
                                    <div>{{item.name}}</div>
                                    <div v-if="index != 5" class="material-icons" style="opacity: 0.3;">{{header.orderByIndex == index ? header.desc ? 'arrow_upward' : 'arrow_downward' : 'swap_vert'}}
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in table_data">
                            <td>{{item.Date}}</td>
                            <td>{{item.Previous}}</td>
                            <td>{{item.Next}}</td>
                            <td>{{item.State}}</td>
                            <td>{{item.Costs}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({

            project_name_textview_model: {
                title: '專案名稱',
                text: '一號工單',
                class: 'sm'
            },

            reject_count_textview_model: {
                title: '退單數量',
                text: 2,
                class: 'md red'
            },
            send_count_textview_model: {
                title: '送單數量',
                text: 5,
                class: 'md'
            },
            reject_rate_textview_model: {
                title: '退單率',
                text: '40%',
                class: 'md red'
            },

            total_working_hour_textview_model: {
                title: '總工時',
                text: '2.5天',
                class: 'md'
            },
            participants_count_textview_model: {
                title: '參與人數',
                text: 2,
                class: 'md'
            },
            labor_costs_textview_model: {
                title: '人力成本(天/元)',
                text: 2000,
                class: 'md'
            },
            costs_textview_model: {
                title: '成本概算',
                text: 10000,
                class: 'md red'
            },

            header: {
                column: [{
                    name: '日期',
                    value: 'AppInstanceID'
                }, {
                    name: '上一關',
                    value: 'AppInstanceID'
                }, {
                    name: '下一關',
                    value: 'AppInstanceID'
                }, {
                    name: '狀態',
                    value: 'AppInstanceID'
                }, {
                    name: '工時長',
                    value: 'AppInstanceID'
                }],
                orderByIndex: 1,
                desc: true
            },

            table_data: [{
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
            }]
        }),

        watch: {

        },

        created() {
            console.log("created wo detail");
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
    .page-container {
        width: 100%;
        display: grid;
        grid-template-rows: auto auto;
        padding: 0;
    }

    .subpage-container {
        width: 100%;
        overflow: auto;
        display: grid;
        grid-template-rows: auto auto;
    }

    .card-head {
        display: inline-grid;
        grid-template-columns: 36px auto;
        margin: 12px 12px;

    }

    .back-button {
        cursor: pointer;
        display: inline;
        color: #5F6169;
        font-size: 24px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }

    .detail-container {
        margin: 12px 48px;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-areas:
            "formula chart"
            "list list";
    }

    .formula-container {
        grid-area: formula;
        display: grid;
        grid-template-areas:
            "handle send edit"
            "empty empty reject"
            "empty empty reopen";
    }

    .chart-container {
        grid-area: chart;
        background: black;
    }

    .formula {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
    }

    .formula-1 {
        display: block;
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
        grid-area: list;
        width: 100%;
        padding: 24px 12px 48px 12px;
        margin: 48px 0;
        height: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        border-bottom: 1px solid #B2B2B2;
    }

    th {
        cursor: pointer;
        color: #7E7E7E;
        font-size: 12px;
    }

    th>div {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        width: 100%;
        text-align: left;
    }

    th>div>div {
        float: left;
        display: inline-block;
        height: 24px;
    }

    td {
        text-align: left;
        padding: 12px 8px;
        color: #555555;
    }
</style>