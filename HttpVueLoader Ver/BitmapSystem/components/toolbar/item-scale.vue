<!--
Toolbar scale item.

Created by Kevin Le on 2021/01/11.
-->
<template>
    <div class="item-container">
        <div>
            {{title}}&ensp;x{{model.scale}}
        </div>
        <input type="range" min="1" max="10" v-model="model.scale">
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            title: 'Scale'
        }),

        watch: {

        },

        created() {

        },

        components: {},

        mounted() {

        },

        methods: {

        },
    }

</script>

<style scoped>
    .item-container {
        padding: 16px 24px;
    }

    input[type="range"] {
        -webkit-appearance: none;
        outline: none;
        width: 100%;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        margin-top: -4px;
        transition:.2s;
    }

    input[type=range]::-webkit-slider-runnable-track {
        height: 3px;
        background: white;
        border: none;
        border-radius: 3px;
    }

    input[type="range"]:active::-webkit-slider-thumb {
        width: 16px;
        height: 16px;
        margin-top: -6px;
    }

</style>
