<template>
    <v-dialog v-model="dialog_model.show" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
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
                        <div class="delete_target_title">使用者帳號</div>
                        <div class="delete_target_account">
                            {{dialog_model.item.Email}}
                        </div>
                    </div>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">{{cancel_text}}</v-btn>
                <v-btn color="red darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="deleteItem">
                    {{delete_text}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {

    };

    module.exports = {
        props: ["dialog_model"],
        data: () => ({
            title: '刪除使用者',
            delete_hint: '資料一經刪除後即無法復原。',
            delete_text: '刪除',
            cancel_text: '取消',
            loading_text: '刪除中...',
        }),
        methods: {
            close() {
                this.dialog_model.show = false;
            },
            deleteItem() {
                this.dialog_model.loading = true;
                this.dialog_model.action()
            }
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

    .delete_target_title {
        color: rgba(0, 0, 0, 0.54);
        padding-bottom: 5px;
    }

    .delete_target_account {
        color: #73879C;
    }

</style>
