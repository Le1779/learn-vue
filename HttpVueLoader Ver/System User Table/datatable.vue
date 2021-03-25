<template>
    <v-card>
        <v-data-table :headers="headers" :items="desserts" :options.sync="pagination" :server-items-length="totalDesserts" :loading="loading" sort-by="calories" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title @click="showSearchDialog">
                        <div class="search-icon fa fa-search"></div>
                    </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2" @click="showCreateDialog">New Item</v-btn>

                </v-toolbar>
            </template>
            
            <template v-slot:item.position="{ item }">
                {{ getPositionName(item.Position) }}
            </template>

            <template v-slot:item.priority="{ item }">
                {{ getPriorityName(item.PriorityLevel) }}
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
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>

        </v-data-table>
        <datatable-dialog :dialog_model="dialog_model" :edited_item="editedItem" :show_text="tableShowText" @dialog_data="save"></datatable-dialog>
        <datatable-delete-dialog :dialog_model="delete_dialog_model" :edited_item="editedItem" @action="deleteItem"></datatable-delete-dialog>
        <datatable-search-dialog :dialog_model="delete_search_model" :search_item="searchItem" @action="doSearch"></datatable-search-dialog>
    </v-card>
</template>


<script>
    module.exports = {
        data: () => ({
            dialog_model: {
                show: true,
                title: '建立使用者',
                idEdit: false,
            },
            delete_dialog_model: {
                show: false,
                title: '刪除紀錄',
            },
            delete_search_model: {
                show: false,
                title: '搜尋紀錄',
            },
            headers: [{
                    text: 'UserName',
                    align: 'left',
                    sortable: false,
                    value: 'UserName',
                },
                {
                    text: 'UserID',
                    value: 'UserID'
                },
                {
                    text: 'EngName',
                    value: 'EngName'
                },
                {
                    text: 'Email',
                    value: 'Email'
                },
                {
                    text: '角色',
                    value: 'priority'
                },
                {
                    text: '職位',
                    value: 'position'
                },
                {
                    text: 'Country',
                    value: 'Country'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            editedIndex: -1,
            editedItem: {
                UserName: '',
                UserID: '',
                EngName: '',
                Email: '',
                PriorityLevel: 1,
                Position: 'E',
                Country: 'zh-TW',
            },
            defaultItem: {
                UserName: '',
                UserID: '',
                EngName: '',
                Email: '',
                PriorityLevel: 1,
                Position: 'E',
                Country: 'zh-TW',
            },
            searchItem: {
                UserName: '',
                UserID: '',
                EngName: '',
                Email: '',
                PriorityLevel: '',
                Position: '',
                Country: '',
            },
            totalDesserts: 0,
            desserts: [],
            loading: true,
            pagination: {
                rowsPerPage: 5,
                page: 1,
            },


            createUserText: '建立使用者',
            editUserText: '編輯使用者',
            tableShowText: {
                priority: ['管理員', '使用者', 'PM'],
                position: ['主管', '員工'],
                country: ['台灣', '日本', '中國'],
                domain: '@dynacw.',
                domain_country: ['com', 'co.jp', 'cn'],
            },
            priorityName: ['管理員', '使用者', 'PM'],
            positionName: ['主管', '員工'],
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
            pagination: {
                handler() {
                    this.getData();
                },
                deep: true
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                this.getData();
            },

            getPriorityName(priority) {
                return this.tableShowText.priority[priority];
            },
            
            getPositionName(position){
                if(position == 'L'){
                    return this.tableShowText.position[0];
                }else if(position == 'E'){
                    return this.tableShowText.position[1];
                }
            },

            showEditDialog(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog_model.title = this.editUserText
                this.dialog_model.isEdit = true
                this.dialog_model.show = true
            },

            showDeleteDialog(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.delete_dialog_model.show = true
                //const index = this.desserts.indexOf(item)
                //confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            showCreateDialog() {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.dialog_model.title = this.createUserText
                this.dialog_model.isEdit = false
                this.dialog_model.show = true
            },

            showSearchDialog() {
                //this.searchItem
                this.delete_search_model.show = true
            },

            close() {
                this.dialog_model.show = false
                this.delete_dialog_model.show = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                console.log('save');
                if (this.editedIndex > -1) {
                    this.editItem();
                } else {
                    this.createItem();
                }
            },

            getData() {
                console.log(this.pagination);
                this.loading = true;
                this.desserts = [{
                        UserName: 'Kevin Le',
                        UserID: 'kevinle',
                        EngName: 'Kevin',
                        Email: 'kevinle@dynacw.com',
                        PriorityLevel: 1,
                        Position: 'E',
                        Country: 'zh-TW',
                    },
                    {
                        UserName: 'Kevin Le',
                        UserID: 'kevinle',
                        EngName: 'Kevin',
                        Email: 'kevinle@dynacw.co.jp',
                        PriorityLevel: 0,
                        Position: 'L',
                        Country: 'zh-TW',
                    }
                ]
                this.totalDesserts = this.desserts.length;
                this.loading = false;
            },

            createItem() {
                console.log('create');
                this.desserts.push(this.editedItem);
                this.totalDesserts = this.desserts.length;
                setTimeout(() => (this.close()), 3000)
            },

            editItem() {
                console.log('edit');
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
                setTimeout(() => (this.close()), 3000)
            },

            deleteItem() {
                console.log('delete');
                this.desserts.splice(this.editedIndex, 1)
                setTimeout(() => (this.close()), 3000)

            },

            doSearch() {
                console.log('search');
                setTimeout(() => (this.close()), 3000)
            }
        },

        components: {
            'datatable-dialog': httpVueLoader('datatable-dialog.vue'),
            'datatable-delete-dialog': httpVueLoader('datatable-delete-dialog.vue'),
            'datatable-search-dialog': httpVueLoader('datatable-search-dialog.vue')
        }
    }

</script>

<style>
    .v-data-footer__select {
        display: none;
    }

    .search-icon {
        margin-left: 8px;
        margin-right: 12px;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.54);
        margin: auto;
        vertical-align: middle;
        cursor: pointer;
    }

</style>
