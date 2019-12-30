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
                                <v-btn color="primary" dark class="mb-2" @click="showCreateDialog()">New Item</v-btn>

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

        <dialog-create-product :dialog_model=dialog_create_edit_model></dialog-create-product>
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
                    value: 'Stock'
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
                    text: '是否上架',
                    value: 'IsInStock'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],

            desserts: [],

            defaultItem: {
                Name: '',
                CreateDate: '',
                Price: 0,
                Unit: '',
                Stock: 0,
                Area: '',
                Remark: '',
                IsInStock: true,
            },

            dialog_create_edit_model: {
                loading: false,
                show: false,
                item: '',
                isEdit: false,
            }
        }),

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                console.log('initialize');
                this.getProducts();
            },

            showCreateDialog() {
                this.dialog_create_edit_model.item = Object.assign({}, this.defaultItem)
                this.dialog_create_edit_model.isEdit = false
                this.dialog_create_edit_model.show = true
            },

            createProduct() {
                let url = '/Product/QueryByPage';
                let postObj = this.dialog_create_edit_model.item;

                function success(response) {

                }

                function fail(error) {

                }
                
                //this.excutePost(url, postObj, success, fail);
            },

            getProducts() {
                let url = '/Product/QueryByPage';
                let postObj = {
                    startItem: (this.pagination.page - 1) * this.pagination.rowsPerPage,
                    length: this.pagination.rowsPerPage,
                    product: this.searchCondition,
                }

                function success(response) {
                    console.log(response);
                    formatData(response.data.Data.data);
                    this.desserts = response.data.Data.data;
                    console.log(this.desserts);
                    this.totalDesserts = response.data.Data.total
                }

                function fail(error) {
                    console.log(error);
                }

                //this.excutePost(url, postObj, success, fail);

                //fake
                self.loading = false;
                self.desserts = [{
                        Name: "茄子",
                        Price: 100,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://2.share.photo.xuite.net/yield.life/120e58a/20462333/1216908173_l.jpg",
                        Remark: "這是一個茄子"
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfully"
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfully"
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfully"
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfully"
                    }
                ];

                self.totalDesserts = 5

            },

            excutePost(url, obj, success, fail) {
                let self = this;
                self.loading = true;
                axios.post(url, obj)
                    .then(function(response) {
                        success(response);
                        self.loading = false;
                    }).catch(function(error) {
                        fail(error);
                        self.loading = false;
                    });
            },
        },

        watch: {
            pagination: {
                handler() {
                    this.getProducts();
                },
                deep: true
            },
        },

        components: {
            'dialog-create-product': httpVueLoader('Product/dialog-create-product.vue'),
        }
    }

</script>


<style scoped>
    .lightbox {
        box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 100%, transparent 72px);
    }

</style>
