<template>
    <div>
       {{filter.current}}
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in tableHeader">{{item}}</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(item, key, index) in view_model">
                    <template v-for="(order, subKey, subIndex) in item.WorkingOrders">
                        <tr v-if="!isHidden.includes(index)" :class="bindClass(order, index, subIndex)">
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
            isHidden: [],
            isExpand: []
        }),

        computed: {},

        watch: {
            'filter.current': {
                handler() {
                    switch(this.filter.current) {
                        case 'Confidential':
                            console.log("only show confidential.")
                            break;
                        default:
                            console.log("show all.");
                            break;
                    }
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
            
            bindClass(order, index, subIndex) {
                var classStr = "";
                if (subIndex > 0) {
                    classStr += "subRow ";
                }
                
                if (this.isExpand.includes(index)) {
                    classStr += "expand "
                }
                
                return classStr;
            }
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
