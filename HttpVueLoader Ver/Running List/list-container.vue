<template>
    <div class="custom-table">
        <list-header :model="headerModel"></list-header>
        <tbody>
            <template v-for="(item, index) in orderList">
                <template v-for="(order, subIndex) in item.SubOrder">
                    <tr v-if="isVisible.includes(index)" :class="getTableRowClass(order, item.MainOrder, index, subIndex)">
                        <td>{{subIndex==0 ? order.AppInstanceID : ''}}</td>
                        <td>{{subIndex==0 ? formatDate(order.AppliedDate, true) : ''}}</td>
                        <td>{{subIndex==0 ? order.Staff : ''}}</td>
                        <td>{{subIndex==0 ? order.ProjectName : ''}}</td>
                        <td>{{subIndex==0 ? order.CustomerName : ''}}</td>
                        <td>{{subIndex==0 ? formatDate(order.PlanFinishDate) : ''}}</td>
                        <td>{{Math.round(order.SpendDays * 10) / 10}}</td>
                        <td>{{order.PreviousUserName}} > {{order.AssignedUserName}}</td>
                        <td>
                            <div v-if="subIndex==0" style="position:relative;">
                                <div class="button-group">
                                    <button :class="[order.StaffID == view_model.userID ? 'light' : 'dark']">
                                        {{order.StaffID == view_model.userID ? '編輯':'詳情'}}
                                        <a href="getActionUrl(order)"></a>
                                    </button>
                                    <button @click="expand(index)" :disabled="Object.keys(item.SubOrder).length == 1" class="expend-button">
                                        展開
                                        <div class="material-icons">{{isExpand.includes(index) ? 'expand_less' : 'expand_more'}}</div>
                                    </button>
                                </div>
                                <div class="tags">
                                    <div class="tag blue">經</div>
                                    <div class="tag pink">待</div>
                                </div>
                            </div>


                        </td>
                    </tr>
                </template>
            </template>
        </tbody>
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

            readyListID: [],

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
                    return
                    console.log(this.view_model);
                    this.organizeData()
                    this.orderBy()
                    this.filtering();
                },
            },

            headerModel: {
                handler() {
                    this.orderBy();
                    this.filtering();
                },
                deep: true
            },
        },

        created() {
            var self = this
            this.view_model.readyList.forEach(function(item, index) {
                self.readyListID.push(item.AppInstanceID)
            })
            this.organizeData()
            this.orderBy()
            this.filtering();
        },

        methods: {
            organizeData() {
                var self = this
                Object.keys(this.view_model.orderData).forEach((item, index) => {
                    var orderObj = {}
                    orderObj['SubOrder'] = []
                    var mainOrder = self.view_model.orderData[item].NewestWorkingOrder
                    var subOrders = self.view_model.orderData[item].WorkingOrders
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

            getTableRowClass(order, newestOrder, index, subIndex) {
                var classStr = ''
                if (order.IsConfidential) {
                    classStr += ' confidential'
                }

                if (this.view_model.userID == order.StaffID) {
                    classStr += ' related'
                } else {
                    var self = this
                    var BreakException = {};
                    try {
                        newestOrder.ExtraInfo.forEach((item, subindex) => {
                            if (self.view_model.userID == item.ChangedUserID || self.view_model.userID == item.NextUserID || self.view_model.userID == item.OperationUserID) {
                                classStr += ' related'
                                throw BreakException;
                            }
                        })
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                }

                if (subIndex > 0) {
                    classStr += ' subRow'
                }

                if (this.isExpand.includes(index)) {
                    classStr += ' expand'
                }

                if (this.readyListID.includes(order.AppInstanceID)) {
                    classStr += ' shelved'
                }

                return classStr
            },

            filtering() {
                var self = this;
                this.isVisible = []
                this.orderList.forEach((item, index) => {
                    item.SubOrder.forEach((subItem, subIndex) => {
                        switch (self.filter.current) {
                            case 'All':
                                self.showAll(index);
                                break;
                            case 'Related':
                                self.showRelated(subItem, item.MainOrder, index);
                                break;
                            case 'Department':
                                self.showDepartment(subItem, index);
                                break;
                            case 'Confidential':
                                self.showConfidential(subItem, index);
                                break;
                            default:
                                break;
                        }
                    });
                });
            },

            showAll(index) {
                this.setVisible(index, true);
            },

            showDepartment(order, index) {
                if (this.isVisible.includes(index)) {
                    return;
                }
                
                this.setVisible(index, this.view_model.departmentMember.indexOf(order.AssignedUserName) != -1)
            },

            showConfidential(order, index) {
                this.setVisible(index, order.IsConfidential);
            },

            showRelated(order, newestOrder, index) {
                var self = this;
                this.setVisible(index, false);
                if (this.view_model.userID == order.StaffID) {
                    this.setVisible(index, true);
                } else {
                    var BreakException = {};
                    try {
                        newestOrder.ExtraInfo.forEach((item, subindex) => {
                            if (self.view_model.userID == item.ChangedUserID || self.view_model.userID == item.NextUserID || self.view_model.userID == item.OperationUserID) {
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

            getActionUrl(order) {
                return this.view_model.actionUrl + "/?appInstanceID=" + order.AppInstanceID + "&taskID=" + order.TaskID + "&previousUserID=" + order.PreviousUserID + "&previousUserName=" + order.PreviousUserName
            }
        },

        components: {
            'list-header': httpVueLoader('list-header.vue'),
        }
    }

</script>

<style scoped>
    .custom-table {
        width: 100%;
        display: table;
        background-color: white;
        border: 1px solid #dddddd;
        margin-bottom: 20px;
        border-collapse: collapse;
        border-spacing: 0;
    }

    tr>th,
    tr>td {
        border: 1px solid #dddddd;
        line-height: 1.5;
        padding: 0.75em 0em;
        text-align: center;
        vertical-align: middle;
    }

    .confidential {
        background-color: #8E9199;
        border: 1px solid #8E9199;
        color: white;
    }

    .subRow {
        display: none;
    }

    .expand.subRow {
        display: table-row;
        background-color: lightgray;
        color: black;
    }

    .button-group {
        display: inline-flex;
        position: relative;
        vertical-align: middle;
        border-radius: 5px;
        border: 1px solid transparent;
        border-collapse: collapse;
        border-spacing: 0;
        overflow: hidden;
    }

    .button-group button {
        position: relative;
        padding: 6px 12px;
        cursor: pointer;
        float: left;
        border-radius: 0px;
        border: 1px solid transparent;
        transition: all 0.15s;
        white-space: nowrap;
        color: black;
    }

    .button-group button.dark {
        background-color: #5E6169;
        color: white;
    }

    .button-group button.light {
        background-color: #FF4C64;
        color: white;
    }

    button:hover {
        background-color: #ADADAD;
    }

    button:disabled {
        color: rgba(16, 16, 16, 0.3);
        background-color: rgba(239, 239, 239, 0.3);
    }

    button.dark:hover {
        background-color: rgba(94, 97, 105, 0.18);
        color: #FF4C64;
    }

    button.light:hover {
        background-color: #FF4C64;
        opacity: 0.7;
        color: white;
    }

    button>a {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    button.material-icons,
    th>div.material-icons {
        font-size: 14px;
    }

    .expend-button {
        display: inline-grid;
        grid-template-columns: auto 24px;
    }

    .tags {
        position: absolute;
        display: inline-block;
        top: -12px;
        right: -8px;
        font-size: xx-small;
        text-align: center;
        z-index: 2;
    }

    .tag {
        display: none;
        padding: 2px 5px;
        border-radius: 5px;
        color: white;
    }

    .related .tag.blue {
        display: inline-block;
        background-color: #428BCA;
    }

    .shelved .tag.pink {
        display: inline-block;
        background-color: #FF4C64;
    }

</style>
