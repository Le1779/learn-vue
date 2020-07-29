<template>
    <div class="textview-container">
        <div v-if="model.text != null" class="textview-title">{{model.title}}</div>
        <div class="textview-text">{{model.text}}</div>
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
            
        },

        components: {

        },

        methods: {
        },
    }

</script>

<style>
    .textview-container {
        display: inline-grid;
        grid-template-rows: auto 40px;
        margin: 8px 12px;
    }
    
    .textview-title {
        color: #7E7E7E;
        font-size: 12px;
    }
    
    .textview-text {
        color: #5F6169;
        font-size: 40px;
        line-height: 40px;
    }
</style>
