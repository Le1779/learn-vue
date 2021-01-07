<template>
    <div class="app-container">
        <router-view></router-view>
    </div>
</template>

<script>
    module.exports = {
        props: {},
        data: () => ({}),

        watch: {},

        created() {
            console.log("created main");
        },

        components: {
        },

        methods: {
        },
    }

</script>

<style scoped>
    .app-container {
        background: #F5F6F6;
        padding: 24px 24px;
        overflow: auto;
    }
</style>
