<template>
    <div class="app-container">
        <quarter-selector :model="quarter"></quarter-selector>
        {{quarter.value}}
        <nav-list :model="nav"></nav-list>
        <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
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
            nav: {}
        }),

        watch: {

        },

        created() {
            console.log("created main");
            this.updateNav();
        },

        components: {
            'quarter-selector': httpVueLoader('quarter-selector.vue'),
            'nav-list': httpVueLoader('nav.vue'),
        },

        methods: {
            updateNav() {
                var self = this;
                axios.get('TestFile/nav.json')
                .then(function (response) {
                    self.nav = response.data
                }).catch(function (error) {
                    console.log(error);
                });
            },
        },
    }

</script>

<style scoped>
    .app-container {
        overflow: hidden;
        background: #F5F6F6;
        padding: 24px 24px;
    }

    .card-container {
        display: inline-block;
        background: white;
        border-radius: 2px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
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
    
    .subpage-container {
        width: 100%;
        overflow: auto;
        display: grid;
        grid-template-rows: auto auto;
        padding: 0;
    }

    .card-head {
        display: inline-grid;
        grid-template-columns: 36px auto;
        margin: 12px 12px;

    }

    .back-button {
        cursor: pointer;
        display: inline;
        color: #5F6169;
        font-size: 24px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }

</style>
