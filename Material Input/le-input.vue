<template>
    <div class="input-container" v-bind:class="{ 'focused': input_info.isFocus }">
        <div class="title">{{input_info.title}}</div>
        <input :id="input_info.id" class="text" type="text" @focus="input_info.isFocus = true" @blur="input_info.isFocus = false">
    </div>
</template>

<script>
    let viewModel = {
    };

    module.exports = {
        props: ["input_info"],
        data: function() {
            return viewModel
        },
        methods: {
        },
        components: {}
    }

</script>

<style scoped>
    .input-container::after,
    .input-container::before {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;
        transition: border .3s cubic-bezier(.4, 0, .2, 1), opacity .3s cubic-bezier(.4, 0, .2, 1), transform 0s cubic-bezier(.4, 0, .2, 1) .3s;
        will-change: border, opacity, transform;
        content: " ";
    }

    .input-container::after {
        height: 1px;
        background-color: rgba(0, 0, 0, .42);
    }

    .input-container::before {
        background-color: #448aff;
        height: 2px;
        z-index: 2;
        opacity: 0;
        transform: scaleX(.12);
    }

    .input-container.focused::before {
        opacity: 1;
        transform: scaleX(1);
        transition: .3s cubic-bezier(.4, 0, .2, 1);
        transition-property: border, opacity, transform;
    }

    .input-container {
        width: 100%;
        min-height: 32px;
        margin: 4px 0 24px;
        padding-top: 16px;
        display: flex;
        position: relative;
        font-family: inherit;
    }

    .title {
        position: absolute;
        top: 23px;
        left: 0;
        pointer-events: none;
        transition: .4s cubic-bezier(.25, .8, .25, 1);
        transition-duration: .3s;
        font-size: 16px;
        line-height: 20px;
        color: rgba(0, 0, 0, .54);
        pointer-events: auto;
        top: 0;
        opacity: 1;
        font-size: 12px;
    }

    .input-container.focused .title {
        color: #448aff;
    }

    .text {
        font-size: 16px;
        height: 32px;
        padding: 0;
        display: block;
        flex: 1;
        border: none;
        background: none;
        transition: .4s cubic-bezier(.25, .8, .25, 1);
        transition-property: font-size, padding-top, color;
        font-family: inherit;
        font-size: 16px;
        line-height: 32px;
        outline: none;
    }

</style>
