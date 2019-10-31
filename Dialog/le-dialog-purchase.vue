<template>
    <div>
        <div class="column" v-for="(item, key, index) in data">
            <div class="title">{{key}}</div>
            <div class="content">{{item}}</div>
        </div>
    </div>
</template>

<script>
    let viewModel = {};

    module.exports = {
        props: ["data"],
        data: function() {
            return viewModel
        },
        methods: {

        },
    }

</script>

<style scoped>
    .column{
        padding: 10px 0;
    }
    
    .title{
        color: rgba(0, 0, 0, 0.54);
        padding-bottom: 5px;
    }
    
    .content{
        color: #73879C;
    }
</style>
