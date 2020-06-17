<template>
    <div>
        <div class="fake-button" @click="filter.current='Related'">Related</div>
        <div class="fake-button" @click="filter.current='All'">All</div>
        <div class="fake-button" @click="filter.current='Department'">Department</div>
        <div class="fake-button" @click="filter.current='Confidential'">Confidential</div>
    </div>
</template>


<script scoped>
    module.exports = {
        props: ["filter"],
        data: () => ({

        }),

        computed: {

        },

        watch: {

        },

        created() {},

        methods: {

        },

        components: {

        }
    }

</script>

<style scoped>
    .fake-button {
        width: 100px;
        height: 50px;
        background-color: white;
        display: inline;
    }

</style>
