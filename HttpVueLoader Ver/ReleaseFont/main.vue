<template>
    <router-view></router-view>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({}),

        watch: {

        },

        created() {
            console.log("created main");
        },

        components: {},

        methods: {

        },
    }

</script>

<style scoped></style>
