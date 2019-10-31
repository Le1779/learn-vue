<template>
    <div class="button-container">
        {{show_text}}
    </div>
</template>

<script>
    module.exports = {
        props: ["show_text"]
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
        min-width: 88px;
        line-height: 36px;
        vertical-align: middle;
        align-items: center;
        text-align: center;
        padding: 0 6px;
        margin: 6px 8px;
    }
    
    .button-container:hover{
        background-color: #1765cc;
    }
    
    .button-container:active{
        background-color: #1457b0;
    }

</style>
