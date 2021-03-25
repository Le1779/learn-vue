<template>
    <v-dialog v-model="dialog_model.show" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{title}}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <div class="delete_hint">
                        <div class="delete_hint_text">
                            <i class="fa fa-exclamation-triangle"></i>
                            {{delete_hint}}
                        </div>
                    </div>
                    <div class="delete_target">
                        <v-card-text class="pa-0">
                            <div v-for="(item, index) in items" style="display: inline-block">
                                <v-chip class="ma-1">
                                    <v-icon>{{item.type == 'folder' ? 'folder' : 'insert_drive_file'}}</v-icon>
                                    {{item.Name}}
                                </v-chip>
                            </div>
                        </v-card-text>
                    </div>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text :disabled="loading" @click="close">{{cancel_text}}</v-btn>
                <v-btn color="red darken-1" class="white--text" :loading="loading" :disabled="loading" @click="deleteItem">
                    {{delete_text}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {

        delete_hint: '資料一經刪除後即無法復原。',
        delete_text: '刪除',
        delete_button_type: 'delete',
        cancel_text: 'Cancel',
        cancel_button_type: 'cancel',
        loading_text: '刪除中...',
        loading: false,
    };

    module.exports = {
        props: ["dialog_model", "items"],
        data: function() {
            return viewModel
        },

        computed: {
            title() {
                return '確定要將這' + this.items.length + '個檔案刪除嗎？'
            },
        },

        methods: {
            close() {
                this.dialog_model.show = false;
            },
            deleteItem() {
                this.loading = true;
                this.$emit('action', false)
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
