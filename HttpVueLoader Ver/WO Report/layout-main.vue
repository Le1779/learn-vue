<template>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({

        }),

        watch: {

        },

        created() {

        },

        components: {

        },

        methods: {

        },
    }

</script>

<style>
    .card-container {
        display: inline-block;
        background: white;
        height: 100%;
        border-radius: 2px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
        padding: 12px 24px;
    }

    .fade-enter-active {
        transition: all .2s ease;
    }

    .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter {
        transform: translateX(100%);
        opacity: 0;
    }
    
    .fade-leave-to {
        transform: translateX(0);
        opacity: 0;
    }

</style>
