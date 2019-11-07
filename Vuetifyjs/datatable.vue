<template>
    <v-card>
        <v-data-table :headers="headers" :items="desserts" :options.sync="pagination" :server-items-length="totalDesserts" :loading="loading" sort-by="calories" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>My CRUD</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2" @click="showCreateDialog">New Item</v-btn>

                </v-toolbar>
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
        <datatable-dialog :dialog_model="dialog_model" :edited_item="editedItem" :form_title="'formTitle'" @dialog_data="save"></datatable-dialog>
        <datatable-delete-dialog :dialog_model="delete_dialog_model" :edited_item="editedItem" @action="deleteItem"></datatable-delete-dialog>
    </v-card>
</template>


<script>
    module.exports = {
        data: () => ({
            dialog_model: {
                show: false,
                title: '',
            },
            delete_dialog_model: {
                show: false,
                title: '刪除紀錄',
            },
            headers: [{
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'Calories',
                    value: 'calories'
                },
                {
                    text: 'Fat (g)',
                    value: 'fat'
                },
                {
                    text: 'Carbs (g)',
                    value: 'carbs'
                },
                {
                    text: 'Protein (g)',
                    value: 'protein'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            totalDesserts: 0,
            desserts: [],
            loading: true,
            pagination: {
                rowsPerPage: 5,
                page: 1,
            },
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

            showEditDialog(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
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
                this.dialog_model.show = true
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
                this.loading = true;
                this.desserts = [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                    },
                ]
                this.totalDesserts = this.desserts.length;
                this.loading = false;
            },

            createItem() {
                console.log('create');
                this.desserts.push(this.editedItem);
                this.totalDesserts = this.desserts.length;
                this.close()
            },

            editItem() {
                console.log('edit');
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
                this.close();
            },

            deleteItem() {
                console.log('delete');
                this.desserts.splice(this.editedIndex, 1)
                this.close();
            }
        },

        components: {
            'datatable-dialog': httpVueLoader('datatable-dialog.vue'),
            'datatable-delete-dialog': httpVueLoader('datatable-delete-dialog.vue')
        }
    }

</script>
