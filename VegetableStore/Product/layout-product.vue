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

        <!--<dialog-create-edit-product :dialog_model=dialog_create_edit_model></dialog-create-edit-product>-->
        <dialog-delete-product :dialog_model=dialog_delete_model></dialog-delete-product>
        <dialog-search-product :dialog_model=dialog_search_model></dialog-search-product>
        <dialog-create :dialog_model=dialog_create_edit_model></dialog-create>
        <dialog-image-edit :dialog_model=dialog_image_edit_model></dialog-image-edit>

        <v-snackbar v-model="snackbar_error.show" :timeout="snackbar_error.timeout">{{ snackbar_error.message }}</v-snackbar>
    </v-container>
</template>


<script>
    module.exports = {
        data: () => ({
            url: '',
            
            loading: false,

            pagination: {
                rowsPerPage: 10,
                page: 1,
            },

            totalDesserts: 0,

            searchCondition: {},

            headers: [{
                    text: '商品序號',
                    value: 'SerialNo',
                },{
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
                Inventory: 0,
                Area: '',
                Remark: '',
                Image: [],
                IsInStock: 0,
            },

            dialog_create_edit_model: {
                loading: false,
                show: false,
                item: '',
                isEdit: false,
                action: null,
                showEditImageAction: null,
            },

            dialog_delete_model: {
                loading: false,
                show: false,
                item: '',
                action: null,
            },
            
            dialog_image_edit_model: {
                loading: false,
                show: false,
                serialNo: '',
                pic1: '',
                pic2: '',
                pic3: '',
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
                    IsInStock: 1,
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
                this.url = this.$HOST + '/Product'
            },

            showCreateDialog() {
                this.dialog_create_edit_model.item = Object.assign({}, this.defaultItem)
                this.dialog_create_edit_model.isEdit = false
                this.dialog_create_edit_model.action = this.createProduct
                this.dialog_create_edit_model.showEditImageAction = this.showEditImageDialog
                this.dialog_create_edit_model.show = true
            },

            showEditDialog(item) {
                item.Image = JSON.parse("[" + item.Image + "]")
                this.dialog_create_edit_model.item = Object.assign({}, item)
                this.dialog_create_edit_model.isEdit = true
                this.dialog_create_edit_model.action = this.editProduct
                this.dialog_create_edit_model.showEditImageAction = this.showEditImageDialog
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
            
            showEditImageDialog(serialNo){
                console.log(serialNo);
                this.dialog_image_edit_model.serialNo = serialNo
                this.dialog_image_edit_model.action = this.editImage
                this.dialog_image_edit_model.show = true
            },

            createProduct() {
                console.log("createProduct");
                let postObj = new FormData();
                postObj.set('Token', this.$TOKEN);
                postObj.set('Product', JSON.stringify(this.dialog_create_edit_model.item));
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

                httpHelper.excutePost(this.url, postObj, success, fail);
            },

            editProduct() {
                console.log("editProduct");
                let editObj = new FormData();
                editObj.set('Token', this.$TOKEN);
                editObj.set('Product', JSON.stringify(this.dialog_create_edit_model.item));
                console.log(this.dialog_create_edit_model.item);

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

                httpHelper.excutePut(this.url, editObj, success, fail);
            },

            deleteProduct() {
                console.log("deleteProduct");
                let deleteObj = new FormData();
                deleteObj.set('Token', this.$TOKEN);
                deleteObj.set('SerialNo', this.dialog_delete_model.item.SerialNo);

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

                httpHelper.excuteDelete(this.url, deleteObj, success, fail);
            },

            getProducts() {
                this.loading = true;
                let postObj = {
                    startItem: (this.pagination.page - 1) * this.pagination.rowsPerPage,
                    length: this.pagination.rowsPerPage,
                    //condition: JSON.stringify(this.dialog_search_model.item),
                }

                let self = this;

                function success(response) {
                    console.log(response);
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
                
                httpHelper.excuteGet(this.url, postObj, success, fail);
            },
            
            editImage(){
                this.loading = true;
                let editObj = new FormData();
                editObj.set('Token', this.$TOKEN);
                editObj.set('SerialNo', this.dialog_image_edit_model.serialNo);
                editObj.set('Pic1', this.dialog_image_edit_model.pic1);
                editObj.set('Pic2', this.dialog_image_edit_model.pic2);
                editObj.set('Pic3', this.dialog_image_edit_model.pic3);

                let self = this;

                function success(response) {
                    console.log(response);
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
                
                httpHelper.excutePut(this.$HOST + '/ProductPicture', editObj, success, fail);
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
            'dialog-create': httpVueLoader('Product/dialog-create.vue'),
            'dialog-image-edit': httpVueLoader('Product/dialog-image-edit.vue'),
        }
    }

</script>


<style scoped>
    .lightbox {
        box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 100%, transparent 72px);
    }

</style>
