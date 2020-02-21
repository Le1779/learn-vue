<template>
    <v-app id="inspire">
        <navigation-drawer :app=app></navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="app.nav_drawer_expand = !app.nav_drawer_expand"></v-app-bar-nav-icon>
            <v-toolbar-title>小曾蔬果</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({
            app: {
                nav_drawer_expand: null,
            },
        }),

        watch: {
            $TOKEN: {
                handler() {
                    if (this.$TOKEN == null) {
                        console.log("no token");
                        if (this.$router.path !== '/auth') {
                            this.$router.replace('/auth')
                        }
                    }
                }
            },
        },

        created() {
            this.$vuetify.theme.dark = false
            Vue.prototype.$HOST = "http://122.116.79.139/api/v1"
        },

        mounted() {
            if (this.$TOKEN == null) {
                console.log("no token");
                if (this.$router.path !== '/auth') {
                    this.$router.replace('/auth')
                }
            }
        },

        components: {
            'navigation-drawer': httpVueLoader('navigation-drawer.vue'),
        }
    }

</script>
