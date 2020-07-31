<template>
    <div class="nav-container">
        <div class="nav-item-container">
            <router-link to="/summary" class="nav-item black">
                <div class="nav-item-value">{{model.QuantityOfWorkOrder}}</div>
                <div class="nav-item-hint">{{wo_count_hint_text}}</div>
            </router-link>
        </div>
        
        <div class="nav-item-container">
            <router-link to="/cost" class="nav-item black">
                <div class="nav-item-value">{{model.QuantityOfFlow}}</div>
                <div class="nav-item-hint">{{flow_count_hint_text}}</div>
            </router-link>
        </div>
        
        <div class="nav-item-container">
            <router-link to="/edit" class="nav-item black">
                <div class="nav-item-value">{{model.EditedTimes}}</div>
                <div class="nav-item-hint">{{edit_flow_count_hint_text}}</div>
            </router-link>
        </div>
        
        <div class="nav-item-container">
            <router-link to="/reject" class="nav-item red">
                <div class="nav-item-value">{{model.RejectedTimes}}</div>
                <div class="nav-item-hint">{{reject_flow_count_hint_text}}</div>
            </router-link>
        </div>
        
        <div class="nav-item-container">
            <router-link to="/reopen" class="nav-item red">
                <div class="nav-item-value">{{model.ReopenedTimes}}</div>
                <div class="nav-item-hint">{{reopen_wo_count_hint_text}}</div>
            </router-link>
        </div>
    </div>


</template>


<script scoped>
    module.exports = {
        props: ["model"],
        data: () => ({
            wo_count_hint_text: '新增工單',
            flow_count_hint_text: '運行流程數量',
            edit_flow_count_hint_text: '編輯次數',
            reject_flow_count_hint_text: '退回次數',
            reopen_wo_count_hint_text: '重啟次數',
        }),

        computed: {

        },

        watch: {

        },

        created() {},

        methods: {

        },

        components: {

        }
    }

</script>

<style scoped>
    .nav-container {
        margin: 48px 0;
        height: 100px;
        display: grid;
        grid-template-columns: 20% 20% 20% 20% 20%;
    }

    .nav-item-container {
        position: relative;
        height: 100%;
        margin: 0;
    }

    .nav-item {
        position: relative;
        display: grid;
        grid-template-rows: auto 30%;
        height: 100%;
        margin: 0 16px;
        border-radius: 8px;
        color: white;
        text-decoration:none;
        transition: all .25s;
    }

    .nav-item a {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .nav-item.black.router-link-active {
        background: #5F6169;
        box-shadow: 0 0 10px 5px rgb(95, 97, 105, .3);
    }

    .nav-item.black {
        background: #A2A5A9;
        box-shadow: 0 0 20px 10px rgb(95, 97, 105, .3);
    }

    .nav-item.red.router-link-active {
        background: #EF6A8D;
        box-shadow: 0 0 10px 5px rgb(239, 106, 141, .3);
    }

    .nav-item.red {
        background: #F3A6BA;
        box-shadow: 0 0 20px 10px rgb(239, 106, 141, .3);
    }
    
    .nav-item-value {
        font-size: 40px;
        text-align: center;
        align-self: flex-end;
    }
    
    .nav-item-hint {
        font-size: 10px;
        line-height: 10px;
        text-align: center;
    }

</style>
