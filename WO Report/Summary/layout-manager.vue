<template>
    <div class="card-container">
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in header.column" @click="onOrderByButtonClick(index)">
                        <div>
                            {{item.name}}
                            <div v-if="index == 1" class="material-icons" style="opacity: 0.3;">{{header.orderByIndex == index ? header.desc ? 'arrow_upward' : 'arrow_downward' : 'swap_vert'}}
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in table_data">
                    <td>
                       <router-link :to="{name:'SUMMARY_MANAGER_DETAIL', params: {id: item.name}}" class="chip">{{item.name}}</router-link>
                    </td>
                    <td>{{item.created_count}}</td>
                    <td>{{item.rate}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            header: {
                column: [{
                    name: '負責人',
                    value: 'AppInstanceID'
                }, {
                    name: '建單數',
                    value: 'AppInstanceID'
                }, {
                    name: '佔整體(%)',
                    value: 'AppInstanceID'
                }],
                orderByIndex: 1,
                desc: true
            },

            table_data: [{
                name: '李鴻儒',
                created_count: 11,
                rate: 0.21
            }, {
                name: '陳以翔',
                created_count: 7,
                rate: 0.13
            }, {
                name: '章君豪',
                created_count: 12,
                rate: 0.23
            }, {
                name: '謝明憲',
                created_count: 7,
                rate: 0.13
            }, {
                name: '姚遠',
                created_count: 7,
                rate: 0.13
            }, {
                name: '鄭力維',
                created_count: 7,
                rate: 0.13
            }]
        }),

        watch: {

        },

        created() {
            console.log("created principal");

            this.sortData(1);
        },

        components: {},

        methods: {
            onOrderByButtonClick(index) {
                if (index != 1) {
                    return;
                }

                if (this.header.orderByIndex == index) {
                    this.header.desc = !this.header.desc;
                } else {
                    this.header.orderByIndex = index;
                }
                this.sortData(index);
            },

            sortData(index) {
                console.log(this.header.desc)
                var self = this;
                this.table_data.sort(compare);

                function compare(a, b) {
                    if (a.created_count < b.created_count) {
                        return self.header.desc ? 1 : -1
                    } else if (a.created_count > b.created_count) {
                        return self.header.desc ? -1 : 1
                    }

                    return 0;
                }
            }
        },
    }

</script>

<style scoped>
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
        display: inline-grid;
        grid-template-columns: auto auto;
        height: 24px;
        line-height: 24px;

    }

    td {
        text-align: center;
    }

    .chip {
        display: inline-block;
        cursor: pointer;
        border-radius: 8px;
        background: #5F6169;
        color: white;
        padding: 5px 8px;
        margin: 6px 0;
        text-decoration:none;
    }

</style>
