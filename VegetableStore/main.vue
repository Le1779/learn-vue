<template>
    <v-app id="inspire">
        <navigation-drawer :app=app></navigation-drawer>
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="app.nav_drawer_expand = !app.nav_drawer_expand"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
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
            app:{
                nav_drawer_expand: null,
                user: {
                    name: 'Kevin Le',
                    role: 'Admin'
                }
            },
        }),

        created() {
            this.$vuetify.theme.dark = false
        },

        components: {
            'navigation-drawer': httpVueLoader('navigation-drawer.vue'),
        }
    }

</script>
