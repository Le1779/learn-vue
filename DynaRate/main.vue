<template>
    <div class="root-container">
        <div class="bg"></div>
        <div class="bg2"></div>
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
        <router-view></router-view>
    </div>
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

<style scoped>
    @media only screen and (max-width: 768px) {
        .corner {
            width: 4.8rem !important;
            height: 4.8rem !important;
        }
    }
    
    .bg {
        background: url('images/bg.png') no-repeat;
        background-position: center center;
        background-size: cover;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
    }
    
    .bg2 {
        background: url('images/bg2.png');
        background-position: center center;
        background-size: contain;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
    }
    
    .corner {
        background: url('images/corner.png') no-repeat;
        background-position: center center;
        background-size: cover;
        position: fixed;
        width: 6.4rem;
        height: 6.4rem;
    }
    
    .corner.rt {
        top: 0;
        right: 0;
        transform: scaleX(-1);
    }
    
    .corner.lb {
        bottom: 0;
        left: 0;
        transform: scaleY(-1);
    }
    
    .corner.rb {
        bottom: 0;
        right: 0;
        transform: scaleX(-1) scaleY(-1);
    }
    
    .title {
        font-size: 1.6rem;
    }

</style>
