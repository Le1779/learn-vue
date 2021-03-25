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
                       <router-link :to="{name:'MANAGER_OVERVIEW', params: {id: item.name}}" class="chip">{{item.Self.Name}}</router-link>
                    </td>
                    <td>{{item.Handled}}</td>
                    <td>{{Math.floor(item.Rate * 1000)/10}}%</td>
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

            table_data: []
        }),

        watch: {

        },

        created() {
            console.log("created principal");
            this.getData();
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
                    if (a.Handled < b.Handled) {
                        return self.header.desc ? 1 : -1
                    } else if (a.Handled > b.Handled) {
                        return self.header.desc ? -1 : 1
                    }

                    return 0;
                }
            },
            
            getData() {
                var self = this;
                axios.get('TestFile/manager.json')
                .then(function (response) {
                    console.log(response.data)
                    self.table_data = response.data;
                    self.sortData(1);
                }).catch(function (error) {
                    console.log(error);
                });
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
