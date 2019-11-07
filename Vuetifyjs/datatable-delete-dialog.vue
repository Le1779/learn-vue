<template>
    <v-dialog v-model="dialog_model.show" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ dialog_model.title }}</span>
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
                        <div class="delete_target_title">使用者帳戶</div>
                        <div class="delete_target_account">
                            {{edited_item.name}}
                        </div>
                    </div>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="red darken-1" dark @click="deleteItem">{{delete_text}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {
        delete_hint: '資料一經刪除後即無法復原。',
        delete_text: '刪除',
        delete_button_type: 'delete',
        cancel_text: '取消',
        cancel_button_type: 'cancel'
    };

    module.exports = {
        props: ["dialog_model", "edited_item"],
        data: function() {
            return viewModel
        },
        methods: {
            close() {
                this.dialog_model.show = false;
            },
            deleteItem() {
                this.$emit('action', false)
                this.close();
            }
        },
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
