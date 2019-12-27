<template>
    <v-dialog v-model="dialog_model.show" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{title}}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <div class="download_hint">
                        <div class="download_hint_text">
                            <i class="fa fa-exclamation-triangle"></i>
                            {{delete_hint}}
                        </div>
                    </div>
                    <div>
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
                <v-progress-linear v-if="loading" :value="dialog_model.progress" rounded></v-progress-linear>
                <v-btn color="grey darken-1" text :disabled="loading" @click="close">{{loading ? dialog_model.progress + '%' : cancel_text}}</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="loading" :disabled="loading" @click="downloadItem">
                    {{confirm_text}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {

        delete_hint: '一次下載500MB以上的檔案會出現錯誤。',
        confirm_text: '下載',
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
                return '準備下載這' + this.items.length + '個檔案'
            },
        },

        methods: {
            close() {
                this.dialog_model.show = false;
            },
            downloadItem() {
                this.loading = true;
                this.$emit('action', false)
            }
        },
        watch: {
            "dialog_model.show": {
                handler(val) {
                    this.dialog_model.progress = 0;
                    this.loading = false;
                },
            },
        }
    }

</script>

<style>
    .download_hint {
        background-color: #BBDEFB;
        color: #0D47A1;
        padding: 0 0 0 24px;
        position: relative;
        margin: 0 0 24px;
        min-height: 48px;
    }

    .download_hint_text {
        padding-left: 36px;
        margin-right: 24px;
        padding: 12px 0;
        line-height: 20px;
        font-size: 14px;
        white-space: normal;
    }
</style>
