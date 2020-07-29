<template>
    <div class="summary-container">
        <div class="chart-container card-container">
            <div class="formula">
               <textview :model="completed_textview_model"></textview>
                <div class="symbol">/</div>
                <textview :model="created_textview_model"></textview>
                <div class="symbol">=</div>
                <textview :model="completed_rate_textview_model"></textview>
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
            created_count: 52,
            completed_textview_model: {
                title: '已完成',
                text: 40
            },
            created_textview_model: {
                title: '已建立',
                text: 52
            },
            completed_rate_textview_model: {
                title: '達成率',
                text: '76.9%'
            },
        }),

        watch: {

        },

        created() {
            console.log("created summary");
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
        },

        methods: {},
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
        padding: 12px 24px;
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
    
    .formula {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
    }
    
    .symbol {
        display: inline;
        color: #7E7E7E;
        font-size: 24px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }

</style>
