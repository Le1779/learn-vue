<template>
    <v-container fluid>
        <v-row align="stretch" justify="center">
            <v-col cols=12>
                <v-card>
                    <v-data-table :headers="headers" :items="stores" :loading="loading" :options.sync="pagination" :server-items-length="totalStores" hide-default-footer>
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    特約廠商
                                </v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark class="mb-2" @click="showCreateDialog()" :loading="loading">新增廠商</v-btn>
                            </v-toolbar>
                        </template>

                        <template v-slot:item.action="{ item }">
                            <v-icon small @click="showDeleteDialog(item)">
                                delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <dialog-create :dialog_model=dialog_create_model></dialog-create>
        <dialog-delete :dialog_model=dialog_delete_model></dialog-delete>

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

            totalStores: 0,

            headers: [{
                    text: 'ID',
                    value: 'ID',
                    width: '10%',
                }, {
                    text: '廠商名稱',
                    value: 'Name',
                },
                {
                    text: '刪除',
                    value: 'action',
                    width: '10%',
                    sortable: false
                },
            ],

            stores: [],

            defaultItem: {
                Name: '',
            },

            dialog_create_model: {
                loading: false,
                show: false,
                item: '',
                action: null,
            },

            dialog_delete_model: {
                loading: false,
                show: false,
                item: '',
                action: null,
            },

            snackbar_model: {
                show: false,
                timeout: 5000,
                message: '',
            }
        }),

        created() {
            this.url = this.$HOST + '/SpecialContractStore'
        },

        methods: {
            showCreateDialog() {
                this.dialog_create_model.item = Object.assign({}, this.defaultItem);
                this.dialog_create_model.action = this.create;
                this.dialog_create_model.show = true;
            },

            showDeleteDialog(item) {
                this.dialog_delete_model.item = Object.assign({}, item);
                this.dialog_delete_model.action = this.delete;
                this.dialog_delete_model.show = true;
            },

            create() {
                console.log("create");
                let postObj = new FormData();
                postObj.set('Token', this.$TOKEN);
                postObj.set('SpecialContractStore', JSON.stringify(this.dialog_create_model.item));
                httpHelper.excutePost(this.url, postObj, success, fail);

                let self = this;

                function success(response) {
                    console.log(response);
                    self.dialog_create_model.show = false
                    self.getData()
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_create_model.loading = false
                    self.snackbar_model.message = error
                    self.snackbar_model.show = true
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
                    self.getData();
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_delete_model.loading = false;
                    self.snackbar_model.message = error;
                    self.snackbar_model.show = true;
                }
            },

            getData() {
                this.loading = true;
                let getObj = {};
                httpHelper.excuteGet(this.url, getObj, success, fail);

                let self = this;

                function success(response) {
                    self.stores = response.data.Data.data;
                    self.totalStores = response.data.Data.total;
                    self.loading = false;
                }

                function fail(error) {
                    console.log(error);
                    self.snackbar_model.message = error;
                    self.snackbar_model.show = true;
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
            'dialog-create': httpVueLoader('Other/SpecialContractStore/dialog-create.vue'),
            'dialog-delete': httpVueLoader('Other/SpecialContractStore/dialog-delete.vue'),
        }
    }

</script>
