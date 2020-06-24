<template>
    <div class="container">
        <div v-for="(item, index) in orderList" class="card-container" :class="getClass(item.MainOrder, item.MainOrder, index, index)">
            <div class="card-title">
                <div class="card-sub-title">
                    {{item.MainOrder.AppInstanceID}}
                </div>
                <div class="tags">
                    <div class="tag blue">經</div>
                    <div class="tag pink">待</div>
                </div>
                <div class="card-main-title">
                    {{item.MainOrder.ProjectName}}
                </div>
            </div>
            <div class="card-content">
                <div class="label">
                    <div class="label-title">
                        客戶名稱
                    </div>
                    {{item.MainOrder.CustomerName}}
                </div>
                <div class="label">
                    <div class="label-title">
                        預定完成日
                    </div>
                    {{formatDate(item.MainOrder.PlanFinishDate)}}
                </div>
                <div class="label">
                    <div class="label-title">
                        進度
                    </div>
                    {{Math.round(item.MainOrder.SpendDays * 10) / 10}} 天
                </div>
                <div class="label">
                    <div class="label-title">
                        目前狀態
                    </div>
                    {{item.MainOrder.PreviousUserName}} to {{item.MainOrder.AssignedUserName}}
                </div>
            </div>
            <div class="card-footer">
                <div class="">
                    {{item.MainOrder.Staff}}
                </div>
                <div class="label-title">
                    {{formatDate(item.MainOrder.AppliedDate, true)}}
                </div>
            </div>
        </div>
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
            this.view_model.departmentMember = Object.keys(this.view_model.departmentMember)
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
                        
                        mainOrder.PreviousUserName = subOrders[subItem].PreviousUserName
                        mainOrder.AssignedUserName = subOrders[subItem].AssignedUserName
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

            getClass(order, newestOrder, index, subIndex) {
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
                this.setVisible(index, this.view_model.departmentMemper.indexOf(order.AssignedUserName) != -1)
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
    .container {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        background-color: #F6F9FB;
        padding: 12px 24px;
    }

    .card-container {
        background-color: #FFFFFF;
        border-radius: 16px;
        display: inline-grid;
        grid-template-rows: auto auto 48px;
        margin: 12px 24px;
        padding: 12px 24px;
    }
    
    .confidential {
        background-color: #8E9199;
        border: 1px solid #8E9199;
        color: white;
    }
    
    .card-main-title {
        grid-area: title;
    }

    .card-sub-title {
        font-size: small;
        opacity: 0.6;
        grid-area: sub;
    }

    .card-title {
        font-weight: bold;
        font-size: x-large;
        margin-bottom: 12px;
        display: grid;
        grid-template-columns: auto 48px;
        grid-template-rows: 24px auto;
        grid-template-areas:
            "sub tags"
            "title title";
    }

    .card-content {}

    .card-footer {
        display: block;
        grid-template-columns: auto auto;
        margin-bottom: 24px;
        text-align: center;
    }

    .label {
        margin-bottom: 8px;
    }

    .label-title {
        font-size: small;
        opacity: 0.6;
    }

    ..tags {
        grid-area: tags;
        display: grid;
        grid-template-columns: 24px 24px;
    }

    .tag {
        display: none;
        height: 20px;
        width: 20px;
        font-size: small;
        text-align: center;
        line-height: 20px;
        border-radius: 2px;
        color: white;
        overflow: hidden;
        float: right;
        margin: 0 1px;
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
