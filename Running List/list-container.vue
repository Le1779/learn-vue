<template>
    <div>
        {{filter.current}} {{isVisible.length}}
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in tableHeader">{{item}}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, key, index) in view_model">
                    <template v-for="(order, subKey, subIndex) in item.WorkingOrders">
                        <tr v-if="isVisible.includes(index)" :class="[subIndex > 0 ? 'subRow' : '', isExpand.includes(index) ? 'expand' : '']">
                            <td>{{order.AppInstanceID}} {{Object.keys(item.WorkingOrders).length}}</td>
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
            tableHeader: ["工單號碼", "工單建立日期", "專案負責人", "專案名稱", "客戶名稱", "預定完成日", "工期進度(天數)", "上一關 → 待處理", "工單詳情"],
            isVisible: [],
            isExpand: [],
            userID: '2004',
            departmentMemper: ["樂仲珉", "詹正良"]
        }),

        computed: {},

        watch: {
            'filter.current': {
                handler() {
                    this.filtering()
                },
            },

            'view_model': {
                handler() {
                    console.log(this.view_model);
                    console.log(Object.keys(this.view_model));
                    this.filtering();
                },
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
        },

        components: {}
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
