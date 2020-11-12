<template>
    <v-app>
        <v-main style="margin: 48px 96px;" class="elevation-5">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({

        }),

        watch: {

        },

        created() {
            console.log("created main");
        },

        components: {},

        methods: {},
    }

</script>

<style scoped>

</style>
