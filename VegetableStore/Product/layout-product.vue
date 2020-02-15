<template>
    <v-container fluid>
        <v-row align="stretch" justify="center">
            <v-col cols=12>
                <v-card>
                    <v-data-table :headers="headers" :items="desserts" :loading="loading" :options.sync="pagination" :server-items-length="totalDesserts">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    <v-btn text icon color="grey darken-1">
                                        <v-icon x-large @click="showSearchDialog()">search</v-icon>
                                    </v-btn>
                                </v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark class="mb-2" @click="showCreateDialog()">新建商品</v-btn>
                            </v-toolbar>
                        </template>

                        <template v-slot:item.instock="{ item }">
                            <v-icon v-if="item.IsInStock == 1" color="teal">mdi-check</v-icon>
                            <v-icon v-if="item.IsInStock != 1" color="red">mdi-close</v-icon>
                        </template>

                        <template v-slot:item.action="{ item }">
                            <v-icon small class="mr-2" @click="showEditDialog(item)">
                                edit
                            </v-icon>
                            <v-icon small @click="showDeleteDialog(item)">
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

        <dialog-create-edit-product :dialog_model=dialog_create_edit_model></dialog-create-edit-product>
        <dialog-delete-product :dialog_model=dialog_delete_model></dialog-delete-product>
        <dialog-search-product :dialog_model=dialog_search_model></dialog-search-product>

        <v-snackbar v-model="snackbar_error.show" :timeout="snackbar_error.timeout">{{ snackbar_error.message }}</v-snackbar>
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
                    text: '是否上架',
                    value: 'instock'
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
                Image: '',
                IsInStock: true,
            },

            dialog_create_edit_model: {
                loading: false,
                show: false,
                item: '',
                isEdit: false,
                action: null,
            },

            dialog_delete_model: {
                loading: false,
                show: false,
                item: '',
                action: null,
            },

            dialog_search_model: {
                loading: false,
                show: false,
                item: {
                    Name: '',
                    CreateDate: '',
                    Price: 0,
                    Unit: '',
                    Inventory: 0,
                    Area: '',
                    Remark: '',
                    Image: '',
                    IsInStock: true,
                },
                action: null,
            },

            snackbar_error: {
                show: false,
                timeout: 5000,
                message: '',
            }
        }),

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                console.log('initialize');
            },

            showCreateDialog() {
                this.dialog_create_edit_model.item = Object.assign({}, this.defaultItem)
                this.dialog_create_edit_model.isEdit = false
                this.dialog_create_edit_model.action = this.createProduct
                this.dialog_create_edit_model.show = true
            },

            showEditDialog(item) {
                this.dialog_create_edit_model.item = Object.assign({}, item)
                this.dialog_create_edit_model.isEdit = true
                this.dialog_create_edit_model.action = this.editProduct
                this.dialog_create_edit_model.show = true
            },

            showDeleteDialog(item) {
                this.dialog_delete_model.item = Object.assign({}, item)
                this.dialog_delete_model.action = this.deleteProduct
                this.dialog_delete_model.show = true
            },

            showSearchDialog() {
                this.dialog_search_model.action = this.getProducts
                this.dialog_search_model.show = true
            },

            createProduct() {
                console.log("createProduct");
                let url = '/Product/Create';
                let postObj = this.dialog_create_edit_model.item;
                console.log(postObj);

                let self = this;

                function success(response) {
                    console.log(response);
                    self.dialog_create_edit_model.show = false
                    self.getProducts()
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_create_edit_model.loading = false
                    self.snackbar_error.message = error
                    self.snackbar_error.show = true
                }

                this.excutePost(url, postObj, success, fail);
            },

            editProduct() {
                console.log("editProduct");
                let url = '/Product/Edit';
                let postObj = this.dialog_create_edit_model.item;
                console.log(postObj);

                let self = this;

                function success(response) {
                    self.dialog_create_edit_model.show = false
                    self.getProducts()
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_create_edit_model.loading = false
                    self.snackbar_error.message = error
                    self.snackbar_error.show = true
                }

                this.excutePost(url, postObj, success, fail);
            },

            deleteProduct() {
                console.log("deleteProduct");
                let url = '/Product/Delete';
                let postObj = this.dialog_delete_model.item;

                let self = this;

                function success(response) {
                    self.dialog_delete_model.show = false
                    self.getProducts()
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_delete_model.loading = false
                    self.snackbar_error.message = error
                    self.snackbar_error.show = true
                }

                this.excutePost(url, postObj, success, fail);
            },

            getProducts() {
                this.loading = true;
                let url = this.$HOST + '/Product';
                let postObj = {
                    startItem: (this.pagination.page - 1) * this.pagination.rowsPerPage,
                    length: this.pagination.rowsPerPage,
                    //product: this.searchCondition,
                }

                let self = this;

                function success(response) {
                    console.log(response);
                    //formatData(response.data.Data.data);
                    self.desserts = response.data.Data.data;
                    console.log(self.desserts);
                    self.totalDesserts = response.data.Data.total
                    self.loading = false;
                }

                function fail(error) {
                    console.log(error);
                    self.snackbar_error.message = error
                    self.snackbar_error.show = true
                    self.loading = false;
                }
                
                httpHelper.excuteGet(url, postObj, success, fail);
                return;
                this.excutePost(url, postObj, success, fail);

                //fake
                this.desserts = [{
                        Name: "茄子",
                        Price: 100,
                        Unit: '根',
                        Area: '北區',
                        CreateDate: '2019/02/30',
                        Image: "https://2.share.photo.xuite.net/yield.life/120e58a/20462333/1216908173_l.jpg",
                        Remark: "這是一個茄子",
                        Stock: 30,
                        IsInStock: -1
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfully",
                        Stock: 30,
                        IsInStock: 0
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfully",
                        Stock: 30,
                        IsInStock: 1
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfully",
                        Stock: 30,
                        IsInStock: -1
                    },
                    {
                        Name: "prodrct2",
                        Price: 300,
                        Unit: '1根',
                        CreateDate: '2019/02/30',
                        Image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        Remark: "Greyhound divisely hello coldly fonwderfully",
                        Stock: 30,
                        IsInStock: -1
                    }
                ];

                this.totalDesserts = 5

            },

            excutePost(url, obj, success, fail) {
                setTimeout(function() {
                    fail("Test");
                }, 3000)
                return;

                axios.post(url, obj)
                    .then(function(response) {
                        if (response.data.Code == 0) {
                            success(response);
                        } else {
                            fail(response.data.Message);
                        }
                    }).catch(function(error) {
                        fail(error);
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
            'dialog-create-edit-product': httpVueLoader('Product/dialog-create-edit-product.vue'),
            'dialog-delete-product': httpVueLoader('Product/dialog-delete-product.vue'),
            'dialog-search-product': httpVueLoader('Product/dialog-search-product.vue'),
        }
    }

    function formatData(data) {
        data.forEach(function(item, index, array) {
            let createDate = stringToDate(item.CreateDate);
            item.CreateDate = getFormatDate(createDate);
        });

        function stringToDate(str) {
            let leftParentheses = str.indexOf('(');
            let rightParentheses = str.lastIndexOf(')');
            let milli = parseInt(str.substring(leftParentheses + 1, rightParentheses));
            let date = new Date(milli);
            return date;
        }

        function getFormatDate(date) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    }

</script>


<style scoped>
    .lightbox {
        box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 100%, transparent 72px);
    }

</style>
