<!--
Preview page

Created by Kevin Le on 2020/12/11.
-->
<template>
    <div class="page-container">
        <div class="page-head">
            Bitmap Preview
        </div>
        <div class="page-body">
            <div class="preview-container">
                <input type="text" v-model="previewModel.text" class="preview-text">
                <preview-canvas :model="previewModel" class="preview-canvas"></preview-canvas>
            </div>
            <div class="list-container">
                <product-list :click_callback="onListClick"></product-list>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            previewModel: {
                product: null,
                text: "そっか這是第一段測試點陣文字，そっか這是第二段測試點陣文字"
            }
        }),

        watch: {

        },

        created() {

        },

        components: {
            'product-list': httpVueLoader('components/product-list.vue'),
            'preview-canvas': httpVueLoader('components/preview-canvas.vue'),
        },

        mounted() {

        },

        methods: {
            onListClick(item) {
                this.previewModel.product = item;
            }

        },
    }

</script>

<style scoped>
    .page-container {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-rows: 64px auto;
    }

    .page-head {
        font-size: 24px;
        background: black;
        color: white;
        padding: 16px 24px;
    }

    .page-body {
        display: grid;
        grid-template-columns: 70% 30%;
        overflow: hidden;
        padding: 16px 24px;
    }
    
    .preview-container {
        height: 100%;
        display: grid;
        grid-template-rows: 36px auto;
        padding-right: 24px;
        overflow: hidden;
    }

    .list-container {
        overflow: auto;
    }
    
    .preview-text {
        border:1px solid #000000;
        background: #00000000;
    }
    
    .preview-canvas {
        overflow: auto;
    }
</style>
