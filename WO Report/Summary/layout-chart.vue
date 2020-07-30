<template>
    <div class="card-container">
        <div class="formula">
            <textview :model="completed_textview_model"></textview>
            <div class="symbol">/</div>
            <textview :model="created_textview_model"></textview>
            <div class="symbol">=</div>
            <textview :model="completed_rate_textview_model"></textview>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
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
            console.log("created chart");
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
        },

        methods: {},
    }

</script>

<style>
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
