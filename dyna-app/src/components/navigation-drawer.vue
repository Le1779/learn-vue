<template>
    <v-navigation-drawer v-model="app.nav_drawer_expand" app clipped>
        <template v-slot:prepend>
            <v-list-item two-line v-if="$USER != null">
                <v-list-item-avatar color="red">
                    <span class="white--text headline">{{$USER.Name.charAt(0)}}</span>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{$USER.Name}}</v-list-item-title>
                    <v-list-item-subtitle>{{$USER.Priority == 74970855 ? "管理員" : "一般用戶"}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="$USER == null">
                <v-list-item-content>
                    <v-list-item-title>未登入</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider></v-divider>
        <v-list dense>
            <v-list-item-group v-model="selected_view">
                <v-list-item v-for="item in items" :key="item.text" link :to="item.link">
                    <v-list-item-action>
                        <v-icon>mdi-{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-list-item class="mt-4" link to="/auth">
                <v-list-item-action>
                    <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
                </v-list-item-action>
                <v-list-item-title class="grey--text text--darken-1">登入</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-action>
                    <v-icon color="grey darken-1">mdi-settings</v-icon>
                </v-list-item-action>
                <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    module.exports = {
        props: ["app"],
        data: () => ({
            selected_view: 0,
            items: [{
                    icon: 'account',
                    text: '使用者',
                    link: '/user'
                },
                {
                    icon: 'shopping_cart',
                    text: '商品管理',
                    link: '/product'
                },
                {
                    icon: 'description',
                    text: '訂單管理',
                    link: '/order'
                },
                {
                    icon: 'subscriptions',
                    text: '廣告管理',
                    link: '/advertise'
                },
                {
                    icon: 'info',
                    text: '其他設定',
                    link: '/other'
                },
            ],
        }),

        watch: {
            $USER: {
                handler() {
                    console.log("user change");
                    console.log(this.$USER);
                }
            },
        },

    }

</script>
