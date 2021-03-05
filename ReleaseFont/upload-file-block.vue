<!--
Loading Button

Created by Kevin Le on 2021/3/5.
-->
<template>
    <div class="upload-file-block" :class="{active: file, disabled: model.disabled}">
        <div class="material-icons">{{model.icon}}</div>
        <div v-if="!file" class="text">{{model.text}}</div>
        <div v-else class="selected-file-name">{{file.name}}</div>
        <input class="file" type="file" @change="tirgger($event)" :disabled="model.disabled" :multiple="model.multiple" :accept="model.accept">
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            file: null
        }),

        watch: {

        },

        mounted() {},

        created() {},

        components: {},

        methods: {
            tirgger(event) {
                console.log(event.target.files)
                this.file = event.target.files[0];
                this.$emit('tirgger', event)
            }
        },
    }

</script>

<style scoped>
    .upload-file-block {
        position: relative;
        border: #AAA 2px solid;
        border-radius: 5px;
        display: grid;
        grid-template-rows: 64px 24px;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        color: #AAA;
    }

    .upload-file-block.active,
    .upload-file-block:hover {
        color: #383838;
    }
    
    .upload-file-block.disabled {
        color: #AAA;
    }

    .upload-file-block .material-icons {
        line-height: 64px;
        font-size: 64px;
    }

    .upload-file-block .file {
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
        cursor: pointer;
    }

</style>
