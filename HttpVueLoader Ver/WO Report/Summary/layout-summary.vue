<template>
    <div class="summary-container">
        <layout-chart class="chart-container"></layout-chart>
        <layout-manager class="manager-container"></layout-manager>
        <layout-wo-list class="wo-list-container"></layout-wo-list>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({}),

        watch: {

        },

        created() {
            console.log("created summary");
        },

        components: {
            'layout-chart': httpVueLoader('Summary/layout-chart.vue'),
            'layout-manager': httpVueLoader('Summary/layout-manager.vue'),
            'layout-wo-list': httpVueLoader('Summary/layout-wo-list.vue'),
        },

        methods: {},
    }

</script>

<style scoped>
    .card-container {
        padding: 12px 24px;
    }

    .summary-container {
        margin: 48px 24px;
        display: grid;
        grid-template-columns: 60% 40%;
        grid-template-areas:
            "chart principal"
            "list list";
    }

    .chart-container {
        grid-area: chart;
        height: 100%;
        margin-right: 20px;
    }

    .manager-container {
        grid-area: principal;
        margin-left: 20px;
        height: 100%;
    }

    .wo-list-container {
        grid-area: list;
        margin: 48px 0;
        height: auto;
        padding: 24px 12px 48px 12px;
        margin: 48px 0;
    }

</style>
