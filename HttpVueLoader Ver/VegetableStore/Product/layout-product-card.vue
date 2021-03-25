<template>
    <v-container fluid>
        <v-row align="stretch" justify="center">
            <v-col cols=12>
                <v-data-table :items="desserts" :loading="loading" sort-by="calories" hide-default-header>
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>My CRUD</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark class="mb-2">New Item</v-btn>

                        </v-toolbar>
                    </template>
                    <template v-slot:item="{ item }">
                        <v-hover v-slot:default="{ hover }">
                            <v-card max-width="344" class="d-inline-block ma-2" :elevation="hover ? 12 : 2">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ 'Create By ' + item.create_date }}</v-list-item-subtitle>
                                        <v-list-item-title class="display-1 font-weight-bold">{{ item.name }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-img :src=item.image height="194"></v-img>

                                <v-card-text>
                                    {{ item.remark }}
                                </v-card-text>

                                <v-card-actions>
                                    <v-card-text class="headline text-right red--text accent-2">
                                        {{ item.price }}
                                    </v-card-text>
                                    <v-card-text class="headline text-center px-0">
                                        /
                                    </v-card-text>
                                    <v-card-text class="headline">
                                        {{ item.unit }}
                                    </v-card-text>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-hover>

                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    module.exports = {
        data: () => ({
            loading: false,

            desserts: [{
                    name: "茄子",
                    price: 100,
                    unit: '1根',
                    create_date: '2019/02/30',
                    image: "https://2.share.photo.xuite.net/yield.life/120e58a/20462333/1216908173_l.jpg",
                    remark: "這是一個茄子"
                },
                {
                    name: "prodrct2",
                    price: 300,
                    unit: '1根',
                    create_date: '2019/02/30',
                    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                    remark: "Greyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfully"
                },
                {
                    name: "prodrct2",
                    price: 300,
                    unit: '1根',
                    create_date: '2019/02/30',
                    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                    remark: "Greyhound divisely hello coldly fonwderfully"
                },
                {
                    name: "prodrct2",
                    price: 300,
                    unit: '1根',
                    create_date: '2019/02/30',
                    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                    remark: "Greyhound divisely hello coldly fonwderfully"
                },
                {
                    name: "prodrct2",
                    price: 300,
                    unit: '1根',
                    create_date: '2019/02/30',
                    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                    remark: "Greyhound divisely hello coldly fonwderfully"
                }
            ],
        }),

        created() {

        },

        methods: {

        },

        watch: {

        },

        components: {}
    }

</script>


<style scoped>
    .lightbox {
        box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 100%, transparent 72px);
    }

</style>
