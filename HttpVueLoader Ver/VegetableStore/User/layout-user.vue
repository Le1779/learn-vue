<template>
    <v-container fluid>
        <v-row align="stretch" justify="center">
            <v-col cols=12>
                <v-card>
                    <v-data-table :headers="headers" :items="desserts" :loading="loading" :options.sync="pagination" :server-items-length="totalDesserts" :footer-props="footerProps">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>
                                    <v-btn text icon color="grey darken-1">
                                        <v-icon x-large @click="showSearchDialog()">search</v-icon>
                                    </v-btn>
                                </v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark class="mb-2" @click="showCreateDialog()">新建使用者</v-btn>
                            </v-toolbar>
                        </template>

                        <template v-slot:item.priority="{ item }">
                            {{item.Priority == 74970855 ? "管理員" : "一般用戶"}}
                        </template>

                        <template v-slot:item.gender="{ item }">
                            {{item.Gender == 0 ? "無" : item.Gender == 1? "男" : "女"}}
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
                            <v-btn color="primary" @click="getData()">Reset</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <dialog-create-edit :dialog_model=dialog_create_edit_model></dialog-create-edit>
        <dialog-delete :dialog_model=dialog_delete_model></dialog-delete>
        <dialog-search :dialog_model=dialog_search_model></dialog-search>

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
                    text: '權限',
                    value: 'priority',
                },
                {
                    text: '名稱',
                    value: 'Name'
                },
                {
                    text: '帳號',
                    value: 'Email'
                },
                {
                    text: '地址',
                    value: 'Address'
                },
                {
                    text: '性別',
                    value: 'gender'
                },
                {
                    text: '電話',
                    value: 'Phone'
                },
                {
                    text: '生日',
                    value: 'Birthday'
                },
                {
                    text: '編輯/刪除',
                    value: 'action',
                    sortable: false
                },
            ],

            desserts: [],

            footerProps: {
                itemsPerPageText: '每頁比數',
                itemsPerPageAllText: '全部'
            },

            //id, email, password, name, platform, phone, deviceId, address, 
            defaultItem: {
                Email: '',
                Password: '',
                Name: '',
                Gender: '',
                Phone: '',
                Birthday: '',
                Addresss: '',
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
                    Email: '',
                    Password: '',
                    Name: '',
                    Gender: -1,
                    Phone: '',
                    Birthday: '',
                    Addresss: '',
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
            this.url = this.$HOST + '/User'
        },

        methods: {
            showCreateDialog() {
                this.dialog_create_edit_model.item = Object.assign({}, this.defaultItem)
                this.dialog_create_edit_model.isEdit = false
                this.dialog_create_edit_model.action = this.doCreate
                this.dialog_create_edit_model.show = true
            },

            showEditDialog(item) {
                this.dialog_create_edit_model.item = Object.assign({}, item)
                this.dialog_create_edit_model.isEdit = true
                this.dialog_create_edit_model.action = this.doEdit
                this.dialog_create_edit_model.show = true
            },

            showDeleteDialog(item) {
                this.dialog_delete_model.item = Object.assign({}, item)
                this.dialog_delete_model.action = this.doDelete
                this.dialog_delete_model.show = true
            },

            showSearchDialog() {
                this.dialog_search_model.action = this.getData
                this.dialog_search_model.show = true
            },

            doCreate() {
                console.log("create");
                let creatObj = this.dialog_create_edit_model.item;
                let postObj = new FormData();
                postObj.set('Email', creatObj.Email);
                postObj.set('Password', creatObj.Password);
                postObj.set('Name', creatObj.Name);
                postObj.set('Gender', creatObj.Gender);
                postObj.set('Phone', creatObj.Phone);
                postObj.set('Birthday', creatObj.Birthday);
                postObj.set('Addresss', creatObj.Addresss);
                console.log(postObj);

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

                httpHelper.excutePost(this.url + "/Register", postObj, success, fail);
            },

            doEdit() {
                console.log("edit");
                let editObj = new FormData();
                editObj.set('Token', this.$TOKEN);
                editObj.set('User', JSON.stringify(this.dialog_create_edit_model.item));

                let self = this;

                function success(response) {
                    self.dialog_create_edit_model.show = false
                    self.getData()
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_create_edit_model.loading = false
                    self.snackbar_error.message = error
                    self.snackbar_error.show = true
                }

                httpHelper.excutePut(this.url, editObj, success, fail);
            },

            doDelete() {
                console.log("delete");
                let deleteObj = new FormData();
                deleteObj.set('Token', this.$TOKEN);
                deleteObj.set('ID', this.dialog_delete_model.item.ID);

                let self = this;

                function success(response) {
                    self.dialog_delete_model.show = false
                    self.getData()
                }

                function fail(error) {
                    console.log(error);
                    self.dialog_delete_model.loading = false
                    self.snackbar_error.message = error
                    self.snackbar_error.show = true
                }

                httpHelper.excuteDelete(this.url, deleteObj, success, fail);
            },

            getData() {
                if (this.$TOKEN == null) {
                    return;
                }
                this.loading = true;
                let postObj = {
                    token: this.$TOKEN,
                    startItem: (this.pagination.page - 1) * this.pagination.rowsPerPage,
                    length: this.pagination.rowsPerPage,
                    condition: JSON.stringify(this.dialog_search_model.item),
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
                    this.getData();
                },
                deep: true
            },
        },

        components: {
            'dialog-create-edit': httpVueLoader('User/dialog-create-edit.vue'),
            'dialog-delete': httpVueLoader('User/dialog-delete.vue'),
            'dialog-search': httpVueLoader('User/dialog-search.vue'),
        }
    }

</script>


<style scoped>

</style>
