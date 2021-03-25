<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">新增特約廠商</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="dialog_model.item.Name" label="廠商名稱" :rules="notNullRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">新增</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["dialog_model"],
        data: () => ({
            valid: true,
            notNullRules: [v => !!v || '名稱不為空白'],

        }),

        methods: {
            close() {
                this.dialog_model.show = false;
            },

            save() {
                if (this.$refs.form.validate()) {
                    this.dialog_model.loading = true;
                    this.dialog_model.action()
                }
            },
        },

        watch: {
            "dialog_model.show": {
                handler(val) {
                    this.dialog_model.loading = false;
                },
            },
        }
    }

</script>
