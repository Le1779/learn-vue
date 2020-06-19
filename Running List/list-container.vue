<template>
    <div>
        {{filter.current}} {{isVisible.length}}
        <table>
            <list-header :model="headerModel"></list-header>
            <tbody>
                <template v-for="(item, index) in this.view_model">
                    <template v-for="(order, subKey, subIndex) in item.WorkingOrders">
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
                                <button v-if="subIndex==0" @click="expand(index)" :disabled="Object.keys(item.WorkingOrders).length == 1">Expand</button>
                            </td>
                        </tr>
                    </template>

                </template>
            </tbody>
        </table>
    </div>
</template>


<script scoped>
    module.exports = {
        props: ["view_model", "filter"],
        data: () => ({
            isVisible: [],
            isExpand: [],
            userID: '2004',
            departmentMemper: ["樂仲珉", "詹正良"],
            headerModel: {
                column: ["工單號碼", "工單建立日期", "專案負責人", "專案名稱", "客戶名稱", "預定完成日", "工期進度(天數)", "上一關 → 待處理", "工單詳情"],
                orderByIndex: 1,
                desc: true,
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
                    this.filtering()
                },
            },

            'view_model': {
                handler() {
                    console.log(this.view_model);
                    this.filtering();
                },
            },

            headerModel: {
                handler() {
                    console.log("headerModel change")
                    var propName = ['AppInstanceID', 'AppliedDate', 'Staff', 'ProjectName', 'CustomerName', 'PlanFinishDate', 'SpendDays']
                    
                    this.view_model = Object.keys(this.view_model)
                        .map(t => {
                            this.$set(this.view_model[t], 'key', t)
                            return this.view_model[t]
                        })
                        .sort(this.sortProperty(propName[this.headerModel.orderByIndex], this.headerModel.desc))
                    console.log(this.view_model)
                },
                deep: true
            },
        },

        created() {},

        methods: {
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
                Object.keys(this.view_model).forEach((item, index) => {
                    Object.keys(self.view_model[item].WorkingOrders).forEach((subItem, subIndex) => {
                        switch (self.filter.current) {
                            case 'All':
                                console.log("only show all.")
                                self.showAll(index);
                                break;
                            case 'Related':
                                console.log("only show related.")
                                self.showRelated(self.view_model[item].WorkingOrders[subItem], self.view_model[item].NewestWorkingOrder, index);
                                break;
                            case 'Department':
                                console.log("only show department.")
                                self.showDepartment(self.view_model[item].WorkingOrders[subItem], index);
                                break;
                            case 'Confidential':
                                console.log("only show confidential.")
                                self.showConfidential(self.view_model[item].WorkingOrders[subItem], index);
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

            sortProperty(prop, isDesc) {
                return (a, b) => {
                    if (a.NewestWorkingOrder[prop] < b.NewestWorkingOrder[prop])
                        return isDesc ? -1 : 1;
                    if (a.NewestWorkingOrder[prop] > b.NewestWorkingOrder[prop])
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
    table {
        background-color: gray;
    }

    .subRow {
        display: none;
    }

    .expand.subRow {
        display: table-row;
    }

</style>
