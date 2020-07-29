<template>
    <div class="summary-container">
        <div class="chart-container card-container">
            <div class="formula">
            <div class="value-container">
                <div class="title">{{text.completed}}</div>
                <div class="value">{{completed_count}}</div>
            </div>
            <div class="symbol">/</div>
            <div class="value-container">
                <div class="title">{{text.created}}</div>
                <div class="value">{{created_count}}</div>
            </div>
            <div class="symbol">=</div>
            <div class="value-container">
                <div class="title">{{text.completed_rate}}</div>
                <div class="value">{{completed_count/created_count}}</div>
            </div>
            </div>
        </div>
        <div class="principal-container card-container"></div>
        <div class="wo-list-container card-container"></div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            text: {
                completed: '已完成',
                created: '已建立',
                completed_rate: '達成率'
            },
            
            completed_count: 40,
            created_count: 52
        }),

        watch: {

        },

        created() {
            console.log("created summary");
        },

        components: {

        },

        methods: {
            getUserInfo() {

            },
        },
    }

</script>

<style>
    .summary-container {
        margin: 48px 24px;
        display: grid;
        grid-template-columns: 60% 40%;
        grid-template-areas:
            "chart principal"
            "list list";
    }

    .card-container {
        display: inline-block;
        background: white;
        height: 100%;
        border-radius: 2px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
    }

    .chart-container {
        grid-area: chart;
        height: 100px;
        margin-right: 20px;
    }

    .principal-container {
        grid-area: principal;
        height: 100px;
        margin-left: 20px;
    }

    .wo-list-container {
        grid-area: list;
        height: 100px;
        margin: 48px 0;
    }
    
    .value-container {
        //mack componter
    }

</style>
