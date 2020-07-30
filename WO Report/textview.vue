<template>
    <div class="textview-container" :class="model.class">
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

<style scoped>
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
        color: #3B3B3B;
        font-size: 40px;
        line-height: 40px;
    }
    
    .textview-container.md {
        grid-template-rows: auto 25px;
    }
    
    .textview-container.md > .textview-text{
        font-size: 25px;
        line-height: 25px;
    }
    
    .textview-container.sm {
        grid-template-rows: auto 16px;
    }
    
    .textview-container.sm > .textview-text {
        font-size: 16px;
        line-height: 16px;
    }
    
    .textview-container.red> .textview-text {
        color: #EA7373;
    }
</style>
