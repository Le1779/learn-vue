<!--
Produce list item

Created by Kevin Le on 2021/01/08.
-->
<template>
    <div class="item-container" :class="{ selected: selected }">
        <div class="id">
            {{model.BitmapProductId}}
        </div>
        <div class="image">
            <img :src="getPreviewUrl()" alt="">
        </div>
        <div class="title">
            {{model.FontName}}
        </div>

    </div>
</template>

<script>
    module.exports = {
        props: ["model", "selected"],
        data: () => ({}),

        watch: {

        },

        created() {

        },

        components: {},

        mounted() {

        },

        methods: {
            getPreviewUrl() {
                return this.$HOST + '/Fontfiles/OneWordReview/' + this.model.FilePath + '_singleword.bmp';
            }
        },
    }

</script>

<style scoped>
    .item-container {
        display: grid;
        grid-template-columns: 30px 60px auto;
        height: 64px;
        line-height: 64px;
        border: 1px #000000 solid;
        margin-bottom: 8px;
        overflow: hidden;
        text-align: center;
    }

    .item-container.selected {
        background: #000000;
        color: #FFFFFF;
    }

    .id {
        padding: 2px;
    }

    .image {
        padding-top: 1px;
        padding-bottom: 1px;
    }

    .image img {
        width: 60px;
        height: 60px;
    }

    .title {
        padding-left: 16px;
    }

</style>
