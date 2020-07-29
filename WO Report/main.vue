<template>
    <div class="app-container">
        <quarter-selector :model="quarter"></quarter-selector>
        {{quarter.value}}
        <nav-list :model="nav"></nav-list>
        <router-view></router-view>
    </div>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({
            color: {
                text: '#5F6169'
            },
            quarter: {
                value: 1
            },
            nav: {
                wo_count: 10,
                flow_count: 20,
                edit_flow_count: 30,
                reject_flow_count: 40,
                reopen_wo_count: 5
            }
        }),

        watch: {

        },

        created() {
            console.log("created main");
        },

        components: {
            'quarter-selector': httpVueLoader('quarter-selector.vue'),
            'nav-list': httpVueLoader('nav.vue'),
        },

        methods: {
            getUserInfo() {

            },
        },
    }

</script>

<style scoped>
    .app-container {
        background:#F5F6F6;
        padding: 24px 24px;
    }

</style>
