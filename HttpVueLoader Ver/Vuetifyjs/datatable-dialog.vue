<template>
    <v-dialog v-model="dialog_model.show" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ form_title }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="edited_item.name" label="Dessert name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="edited_item.calories" label="Calories"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="edited_item.fat" label="Fat (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="edited_item.carbs" label="Carbs (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="edited_item.protein" label="Protein (g)"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text :loading="loading" :disabled="loading" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {
        loading: false
    };

    module.exports = {
        props: ["dialog_model", "edited_item", "form_title"],
        data: function() {
            return viewModel
        },
        methods: {
            close() {
                this.dialog_model.show = false;
            },
            save() {
                this.loading = true;
                this.$emit('dialog_data', false)
            }
        },
        watch: {
            dialog_model: {
                handler(val) {
                    if(val.show){
                        this.loading = false;
                    }
                },
                deep: true
            },
        }
    }

</script>

<style scoped>


</style>
