<template>
    <div class="button-container" :class="type">
        {{show_text}}
    </div>
</template>

<script>
    module.exports = {
        props: ["show_text", "type"]
    }

</script>

<style scoped>
    .button-container {
        background-color: #1a73e8;
        box-shadow: none;
        color: #fff;
        border: 0;
        border-radius: 8px;
        text-transform: none;
        letter-spacing: .25px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        min-height: 36px;
        line-height: 36px;
        vertical-align: middle;
        align-items: center;
        text-align: center;
        margin: 6px 6px;
        padding-left: 16px;
        padding-right: 16px;
    }

    .button-container:hover {
        background-color: #1765cc;
    }

    .button-container:active {
        background-color: #1457b0;
    }

    .button-container.delete {
        background-color: #d32f2f;
    }

    .button-container.delete:hover {
        background-color: #ba2929;
    }

    .button-container.delete:active {
        background-color: #a02424;
    }

    .button-container.cancel {
        background-color: transparent;
        color: #767676;
    }

    .button-container.cancel:hover {
        background-color: #e8e8e8;
    }

    .button-container.cancel:active {
        background-color: #c8c8c8;
    }

</style>
