<!--
Main page

Created by Kevin Le on 2020/12/11.
-->
<template>
    <div>
        <div class="title">
            {{title}}
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            title: "Bitmap Product System"
        }),

        watch: {},

        created() {},

        components: {},

        methods: {},
    }

</script>

<style scoped>
    .title {
        font-size: 36px;
    }
</style>
