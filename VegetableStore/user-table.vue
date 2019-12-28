<template>
    <v-container fluid>
        <v-row align="stretch" justify="center">
            <v-col cols=12>
                <v-data-table :headers="headers" :items="desserts" :loading="loading" sort-by="calories" class="elevation-1">
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
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
    module.exports = {
        data: () => ({
            loading: false,
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
            
            desserts: [],
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

</style>
