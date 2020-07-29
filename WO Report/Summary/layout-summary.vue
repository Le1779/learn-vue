<template>
    <div class="summary-container">
        <layout-chart class="chart-container"></layout-chart>
        <layout-principal class="principal-container"></layout-principal>
        <layout-wo-list class="wo-list-container"></layout-wo-list>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
        }),

        watch: {

        },

        created() {
            console.log("created summary");
        },

        components: {
            'layout-chart': httpVueLoader('Summary/layout-chart.vue'),
            'layout-principal': httpVueLoader('Summary/layout-principal.vue'),
            'layout-wo-list': httpVueLoader('Summary/layout-wo-list.vue'),
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
        height: 100%;
        margin-right: 20px;
    }

    .principal-container {
        grid-area: principal;
        margin-left: 20px;
        height: 100%;
    }

    .wo-list-container {
        grid-area: list;
        height: 100px;
        margin: 48px 0;
    }

</style>
