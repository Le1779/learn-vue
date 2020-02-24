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
                    console.log("token change");
                    console.log(this.$TOKEN);
                }
            },
        },

        created() {
            console.log(this.$TOKEN);
            this.$vuetify.theme.dark = false
            Vue.prototype.$HOST = "http://122.116.79.139/api/v1"
            this.getUserInfo();
        },

        components: {
            'navigation-drawer': httpVueLoader('navigation-drawer.vue'),
        },

        methods: {
            getUserInfo() {
                console.log("getUserInfo");
                let url = this.$HOST + '/User/ReadUserInfo';
                let postObj = new FormData();
                postObj.set('Token', this.$TOKEN);

                let self = this;

                function success(response) {
                    console.log(response);
                    self.$USER = response.data.Data;
                }

                function fail(error) {
                    console.log(error);
                }

                httpHelper.excutePost(url, postObj, success, fail);
            },
        },
    }

</script>
