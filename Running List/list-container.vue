<template>
    <div class="custom_table">
        <list-header :model="headerModel"></list-header>
        <tbody>
            <template v-for="(item, index) in orderList">
                <template v-for="(order, subIndex) in item.SubOrder">
                    <tr v-if="isVisible.includes(index)" :class="[subIndex > 0 ? 'subRow' : '', isExpand.includes(index) ? 'expand' : '']">
                        <td>{{order.AppInstanceID}}</td>
                        <td>{{formatDate(order.AppliedDate, true)}}</td>
                        <td>{{order.Staff}}</td>
                        <td>{{order.ProjectName}}</td>
                        <td>{{order.CustomerName}}</td>
                        <td>{{formatDate(order.PlanFinishDate)}}</td>
                        <td>{{Math.round(order.SpendDays * 10) / 10}}</td>
                        <td>{{order.PreviousUserName}} > {{order.AssignedUserName}}</td>
                        <td>
                            <button v-if="subIndex==0" @click="expand(index)" :disabled="Object.keys(item.SubOrder).length == 1">Expand</button>
                        </td>
                    </tr>
                </template>
            </template>
        </tbody>
        {{filter.current}} {{isVisible.length}}
    </div>
</template>


<script scoped>
    module.exports = {
        props: ["view_model", "filter"],
        data: () => ({
            propName: ['AppInstanceID', 'AppliedDate', 'Staff', 'ProjectName', 'CustomerName', 'PlanFinishDate', 'SpendDays'],
            orderList: [],
            isVisible: [],
            isExpand: [],
            userID: '2004',
            departmentMemper: ["樂仲珉", "詹正良"],
            headerModel: {
                column: [{
                    name: '工單號碼',
                    value: 'AppInstanceID'
                }, {
                    name: '工單建立日期',
                    value: 'AppliedDate'
                }, {
                    name: '專案負責人',
                    value: 'Staff'
                }, {
                    name: '專案名稱',
                    value: 'ProjectName'
                }, {
                    name: '客戶名稱',
                    value: 'CustomerName'
                }, {
                    name: '預定完成日',
                    value: 'PlanFinishDate'
                }, {
                    name: '工期進度(天數)',
                    value: 'SpendDays'
                }, {
                    name: '上一關 → 待處理',
                    value: ''
                }, {
                    name: '工單詳情',
                    value: ''
                }],
                orderByIndex: 1,
                desc: false,
            },
        }),

        computed: {
            ordered: function() {
                this.view_model = Object.keys(this.view_model)
                    .map(t => {
                        this.$set(this.view_model[t], 'key', t)
                        return this.view_model[t]
                    })
                    .sort(this.compare)
                console.log(this.view_model)
                return this.view_model
            }
        },

        watch: {
            'filter.current': {
                handler() {
                    this.orderBy()
                    this.filtering()
                },
            },

            'view_model': {
                handler() {
                    console.log(this.view_model);
                    this.organizeData()
                    this.orderBy()
                    this.filtering();
                },
            },

            headerModel: {
                handler() {
                    console.log("headerModel change")
                    this.orderBy();
                    this.filtering();
                },
                deep: true
            },
        },

        created() {},

        methods: {
            organizeData() {
                var self = this
                Object.keys(this.view_model).forEach((item, index) => {
                    var orderObj = {}
                    orderObj['SubOrder'] = []
                    var mainOrder = self.view_model[item].NewestWorkingOrder
                    var subOrders = self.view_model[item].WorkingOrders
                    Object.keys(subOrders).forEach((subItem, subIndex) => {
                        orderObj['SubOrder'].push(subOrders[subItem])
                        if (mainOrder.SpendDays < subOrders[subItem].SpendDays) {
                            mainOrder.SpendDays = subOrders[subItem].SpendDays
                        }
                    });

                    orderObj['MainOrder'] = mainOrder

                    self.orderList.push(orderObj)
                });
                console.log(this.orderList)
            },

            expand(id) {
                console.log(id)
                var index = this.isExpand.indexOf(id);
                if (index > -1) {
                    this.isExpand.splice(index, 1)
                } else {
                    this.isExpand.push(id)
                }
            },

            setVisible(id, visible) {
                if (visible) {
                    if (!this.isVisible.includes(id)) {
                        this.isVisible.push(id)
                    }
                } else {
                    if (this.isVisible.includes(id)) {
                        var index = this.isVisible.indexOf(id);
                        this.isVisible.splice(index, 1)
                    }
                }
            },

            filtering() {
                var self = this;

                this.orderList.forEach((item, index) => {
                    item.SubOrder.forEach((subItem, subIndex) => {
                        switch (self.filter.current) {
                            case 'All':
                                console.log("only show all.")
                                self.showAll(index);
                                break;
                            case 'Related':
                                console.log("only show related.")
                                self.showRelated(subItem, item.MainOrder, index);
                                break;
                            case 'Department':
                                console.log("only show department.")
                                self.showDepartment(subItem, index);
                                break;
                            case 'Confidential':
                                console.log("only show confidential.")
                                self.showConfidential(subItem, index);
                                break;
                            default:
                                console.log("show all.");
                                break;
                        }
                    });
                });
            },

            showAll(index) {
                this.setVisible(index, true);
            },

            showDepartment(order, index) {
                this.setVisible(index, this.departmentMemper.indexOf(order.AssignedUserName) != -1)
            },

            showConfidential(order, index) {
                this.setVisible(index, order.IsConfidential);
            },

            showRelated(order, newestOrder, index) {
                var self = this;
                this.setVisible(index, false);
                if (this.userID == order.StaffID) {
                    this.setVisible(index, true);
                } else {
                    var BreakException = {};
                    try {
                        newestOrder.ExtraInfo.forEach((item, subindex) => {
                            if (self.userID == item.ChangedUserID || self.userID == item.NextUserID || self.userID == item.OperationUserID) {
                                self.setVisible(index, true);
                                throw BreakException;
                            }
                        })
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                }
            },

            formatDate(date, showTime = false) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear(),
                    hour = d.getHours(),
                    minutes = d.getMinutes()

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                if (hour.length < 2)
                    hour = '0' + hour;
                if (minutes.length < 2)
                    minutes = '0' + minutes;

                if (showTime) {
                    return [year, month, day].join('/') + ' ' + [hour, minutes].join(':');
                } else {
                    return [year, month, day].join('/');
                }
            },

            orderBy() {
                var propName = this.headerModel.column[this.headerModel.orderByIndex].value
                this.orderList.sort(this.sortProperty(propName, this.headerModel.desc))
            },

            sortProperty(prop, isDesc) {
                return (a, b) => {
                    if (a.MainOrder[prop] < b.MainOrder[prop])
                        return isDesc ? -1 : 1;
                    if (a.MainOrder[prop] > b.MainOrder[prop])
                        return isDesc ? 1 : -1;
                    return 0;
                }
            },
        },

        components: {
            'list-header': httpVueLoader('list-header.vue'),
        }
    }

</script>

<style scoped>
    .custom_table {
        width: 100%;
        display: table;
        background-color: gray;
    }

    .subRow {
        display: none;
    }

    .expand.subRow {
        display: table-row;
    }

</style>
