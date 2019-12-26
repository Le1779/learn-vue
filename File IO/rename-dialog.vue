<template>
    <v-dialog v-model="dialog_model.show" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{title}}</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-text-field v-model="dialog_model.filename" label="新的檔案名稱" required :rules="inputRules"></v-text-field>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text :disabled="loading" @click="close">{{cancel_text}}</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="loading" :disabled="loading" @click="renameItem">
                    {{confirm_text}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {
        valid: true,
        inputRules: [v => !!v || '名稱不為空白'],
        title: '重新命名',
        confirm_text: '確認',
        cancel_text: 'Cancel',
        loading: false,
    };

    module.exports = {
        props: ["dialog_model"],
        data: function() {
            return viewModel
        },

        computed: {

        },

        methods: {
            close() {
                this.dialog_model.show = false;
            },
            renameItem() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    this.$emit('action', false)
                }
            }
        },
        watch: {
            dialog_model: {
                handler(val) {
                    if (val.show) {
                        this.loading = false;
                    }
                },
                deep: true
            },
        }
    }

</script>

<style>
    .delete_hint {
        background-color: #fbe9e7;
        color: #d32f2f;
        padding: 0 0 0 24px;
        position: relative;
        margin: 0 0 24px;
        min-height: 48px;
    }

    .delete_hint_text {
        padding-left: 36px;
        margin-right: 24px;
        padding: 12px 0;
        line-height: 20px;
        font-size: 14px;
        white-space: normal;
    }

</style>
