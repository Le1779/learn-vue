<template>
    <v-navigation-drawer v-model="app.nav_drawer_expand" app clipped>
        <template v-slot:prepend>
            <v-list-item two-line>
                <v-list-item-avatar color="red">
                    <span class="white--text headline">{{app.user.name.charAt(0)}}</span>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{app.user.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{app.user.role}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider></v-divider>
        <v-list dense>
            <v-list-item-group v-model="selected_view">
                <v-list-item v-for="item in items" :key="item.text" link :to="item.link">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-list-item class="mt-4" link>
                <v-list-item-action>
                    <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
                </v-list-item-action>
                <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
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
                    icon: 'person',
                    text: '使用者',
                link: '/user-table'
                },
                {
                    icon: 'description',
                    text: '訂單管理',
                    link: '/order-table'
                },
            ],
            items2: [{
                    picture: 28,
                    text: 'Joseph'
                },
                {
                    picture: 38,
                    text: 'Apple'
                },
                {
                    picture: 48,
                    text: 'Xbox Ahoy'
                },
                {
                    picture: 58,
                    text: 'Nokia'
                },
                {
                    picture: 78,
                    text: 'MKBHD'
                },
            ],
        }),
    }

</script>
