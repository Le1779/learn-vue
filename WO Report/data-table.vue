<!--
Data Table
model: {
    head: [{
        name: DATA_KEY_NAME,
        text: COLUMN_TEXT
    }],
    data: [object],
    orderByIndex: NUM,
    isDes: Bool
}
Created by Kevin Le on 2020/7/30.
-->
<template>
    <table>
        <thead>
            <tr>
                <th v-for="(item, index) in model.head" @click="onOrderByButtonClick(index)">
                    <div>
                        <div>{{item.text}}</div>
                        <div v-if="index != 5" class="material-icons" style="opacity: 0.3;">{{model.orderByIndex == index ? model.isDes ? 'arrow_upward' : 'arrow_downward' : 'swap_vert'}}
                        </div>
                    </div>
                </th>
                <th v-if="model.withAction"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data_item, index) in model.data">
                <td v-for="(head_item, i) in model.head">{{data_item[head_item.name]}}</td>
                <td v-if="model.withAction">
                    <slot name="action" v-bind:item="data_item"></slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
        }),

        watch: {

        },

        created() {

        },

        components: {

        },

        methods: {},
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
