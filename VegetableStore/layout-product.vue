<template>
    <v-container fluid>
        <v-row align="stretch" justify="center">
            <v-col cols=12>
                <v-card>
                    <v-data-table :headers="headers" :items="desserts" :loading="loading" :options.sync="pagination" :server-items-length="totalDesserts">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>My CRUD</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark class="mb-2">New Item</v-btn>

                            </v-toolbar>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <v-icon small class="mr-2">
                                edit
                            </v-icon>
                            <v-icon small>
                                delete
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary">Reset</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    module.exports = {
        data: () => ({
            loading: false,

            pagination: {
                rowsPerPage: 10,
                page: 1,
            },

            totalDesserts: 0,

            searchCondition: {},

            headers: [{
                    text: '商品名稱',
                    value: 'Name',
                },
                {
                    text: '建立時間',
                    value: 'CreateDate'
                },
                {
                    text: '價錢',
                    value: 'Price'
                },
                {
                    text: '單位',
                    value: 'Unit'
                },
                {
                    text: '庫存',
                    value: 'Inventory'
                },
                {
                    text: '販售地區',
                    value: 'Area'
                },
                {
                    text: '商品說明',
                    value: 'Remark'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],

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
            this.initialize()
        },

        methods: {
            initialize() {
                console.log('initialize');
                this.getProducts();
            },
            
            getProducts() {
                let self = this;
                self.loading = true;

                //axios.post('/Product/QueryByPage', {
                //        startItem: (self.pagination.page - 1) * self.pagination.rowsPerPage,
                //        length: self.pagination.rowsPerPage,
                //        product: self.searchCondition,
                //    })
                //    .then(function(response) {
                //        console.log(response);
                //        self.loading = false;
                //        formatData(response.data.Data.data);
                //        self.desserts = response.data.Data.data;
                //        console.log(self.desserts);
                //        self.totalDesserts = response.data.Data.total
                //    })
                //    .catch(function(error) {
                //        console.log(error);
                //    });
            }
        },

        watch: {
            pagination: {
                handler() {
                    this.getProducts();
                },
                deep: true
            },
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