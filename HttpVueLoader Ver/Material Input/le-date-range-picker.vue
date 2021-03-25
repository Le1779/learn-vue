<template>
    <div class="input-container" v-bind:class="{ 'focused': input_info.isFocus }">
        <div class="title">{{input_info.title}}</div>
        <v-md-date-range-picker :id="input_info.id" @change="handleChange"></v-md-date-range-picker>
    </div>
</template>

<script src=""></script>
<script>
    let viewModel = {};

    module.exports = {
        props: ["input_info"],
        data: function() {
            return viewModel
        },
        methods: {
            handleChange(values) {
                this.input_info.data = values
            }
        },
        components: {}
    }

</script>

<style scoped>
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

    .activator-wrapper label {
        display: none;
    }

    .mdrp__panel.dropdown-menu.show-calendar.opens-arrow-pos-left {
        position: initial;
    }

    .mdrp__panel.dropdown-menu.show-calendar.opens-arrow-pos-left::before {
        display: none;
    }

    .mdrp__panel.dropdown-menu.show-calendar.opens-arrow-pos-left::after {
        display: none;
    }

</style>
