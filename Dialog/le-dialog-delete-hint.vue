<template>
    <div>
        <div class="delete_hint">
            <div class="hint_content">
                <i class="fa fa-exclamation-triangle"></i>
                {{delete_hint}}
            </div>
        </div>
        <div class="delete_target">
            <div class="title">使用者帳戶</div>
            <div class="delete_target_account">
                {{delete_account}}
            </div>
        </div>
        <div class="dialog-actions">
            <le-button :show_text="cancel_text" :type="cancel_button_type" @click.native="callback('cancel')"></le-button>
            <le-button :show_text="delete_text" :type="delete_button_type" @click.native="doDelete"></le-button>
        </div>
    </div>
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
        props: {
            delete_account: String,
            callback: Function
        },
        data: function() {
            return viewModel
        },
        methods: {
            doDelete(){
                this.callback('complete');
            }
        },
        components: {
            'le-button': httpVueLoader('../Dialog/le-button.vue')
        }
    }

</script>

<style scoped>
    .title {
        color: rgba(0, 0, 0, 0.54);
        padding-bottom: 5px;
    }

    .delete_target_account {
        color: #73879C;
    }

    .delete_hint {
        background-color: #fbe9e7;
        color: #d32f2f;
        padding: 0 0 0 24px;
        position: relative;
        margin: 0 0 24px;
        min-height: 48px;
    }

    .hint_content {
        padding-left: 36px;
        margin-right: 24px;
        padding: 12px 0;
        line-height: 20px;
        font-size: 14px;
        white-space: normal;
    }

</style>
