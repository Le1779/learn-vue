<template>
    <v-container fluid>
        <v-row align="stretch" justify="center">
            <v-col cols=12>
                <v-card>
                    <v-data-table :headers="headers" :items="advertise" :loading="loading" :options.sync="pagination" :server-items-length="totalAdvertise" :footer-props="footerProps">
                       <template v-slot:top>
                            <v-toolbar flat>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark class="mb-2" @click="showCreateDialog()" :loading="loading">新增廣告</v-btn>
                            </v-toolbar>
                        </template>
                        
                        <template v-slot:item="{ item }">
                           <tr>
                            <td>
                                <v-img :src="item.ResourceUrl" :lazy-src="item.ResourceUrl" width="400" class="ma-2"></v-img>
                            </td>
                            <td>
                                {{ item.StartDate }} ~ {{ item.EndDate }}
                            </td>
                            <td>
                                <v-icon small class="mr-2" @click="showEditDialog(item)">
                                    edit
                                </v-icon>
                                <v-icon small @click="showDeleteDialog(item)">
                                    delete
                                </v-icon>
                            </td>
                           </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        
        <dialog-create-edit :dialog_model=dialog_create_edit_model></dialog-create-edit>
        <dialog-delete :dialog_model=dialog_delete_model></dialog-delete>

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

            totalAdvertise: 0,

            searchCondition: {},

            headers: [{
                    text: '圖片',
                },
                {
                    text: '期限',
                },
                {
                    text: '編輯/刪除',
                    value: 'action',
                    sortable: false
                },
            ],

            advertise: [],

            footerProps: {
                itemsPerPageText: '每頁比數',
                itemsPerPageAllText: '全部'
            },
            
            defaultItem: {
                ResourceUrl: '',
                StartDate: '',
                EndDate: '',
            },
            
            dialog_create_edit_model: {
                loading: false,
                show: false,
                isEdit: false,
                item: '',
                action: null,
            },
            
            dialog_delete_model: {
                loading: false,
                show: false,
                item: '',
                action: null,
            },

            snackbar_error: {
                show: false,
                timeout: 5000,
                message: '',
            }
        }),

        created() {
            this.url = this.$HOST + '/Advertise'
        },

        methods: {
            showCreateDialog() {
                this.dialog_create_edit_model.item = Object.assign({}, this.defaultItem);
                this.dialog_create_edit_model.action = this.create;
                this.dialog_create_edit_model.isEdit = false;
                this.dialog_create_edit_model.show = true;
            },
            
            showDeleteDialog(item) {
                this.dialog_delete_model.item = Object.assign({}, item);
                this.dialog_delete_model.action = this.delete;
                this.dialog_delete_model.show = true;
            },
            
            create(){
                console.log("create");
                let postObj = new FormData();
                postObj.set('Token', this.$TOKEN);
                postObj.set('Advertise', JSON.stringify(this.dialog_create_edit_model.item));
                console.log(JSON.stringify(this.dialog_create_edit_model.item));
                httpHelper.excutePost(this.url, postObj, success, fail);

                let self = this;

                function success(response) {
                    console.log(response);
                    self.dialog_create_edit_model.show = false
                    self.getData()
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_create_edit_model.loading = false
                    self.snackbar_error.message = error
                    self.snackbar_error.show = true
                }
            },
            
            delete() {
                console.log("delete");
                let deleteObj = new FormData();
                deleteObj.set('Token', this.$TOKEN);
                deleteObj.set('ID', this.dialog_delete_model.item.ID);
                httpHelper.excuteDelete(this.url, deleteObj, success, fail);
                
                let self = this;

                function success(response) {
                    self.dialog_delete_model.show = false;
                    self.getProducts();
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_delete_model.loading = false;
                    self.snackbar_error.message = error;
                    self.snackbar_error.show = true;
                }
            },
            
            getData() {
                this.loading = true;
                let getObj = {};
                httpHelper.excuteGet(this.url, getObj, success, fail);

                let self = this;

                function success(response) {
                    console.log(response);
                    self.advertise = response.data.Data.data;
                    console.log(self.advertise);
                    self.totalAdvertise = response.data.Data.total;
                    self.loading = false;
                }

                function fail(error) {
                    console.log(error);
                    self.snackbar_error.message = error;
                    self.snackbar_error.show = true;
                    self.loading = false;
                }
            },
        },

        watch: {
            pagination: {
                handler() {
                    this.getData()
                },
                deep: true
            },
        },
        
        components: {
            'dialog-create-edit': httpVueLoader('Advertise/dialog-create-edit.vue'),
            'dialog-delete': httpVueLoader('Advertise/dialog-delete.vue'),
        }
    }

</script>
