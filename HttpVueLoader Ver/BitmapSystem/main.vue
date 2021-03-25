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
            Vue.prototype.$HOST = "http://testdfo.dynacw.com.tw/Bitmap"
            /*
            release: http://dfo.dynacw.com.tw:8080
            debug: http://testdfo.dynacw.com.tw/Bitmap
            */
        },

        components: {},

        methods: {},
    }

</script>

<style scoped></style>
