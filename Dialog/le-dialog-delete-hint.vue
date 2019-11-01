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
            <le-button :show_text="delete_text" :type="button_type"></le-button>
        </div>
    </div>
</template>

<script>
    let viewModel = {
        delete_hint: '資料一經刪除後即無法復原。',
        delete_text: '刪除',
        button_type: 'delete'
    };

    module.exports = {
        props: ["delete_account"],
        data: function() {
            return viewModel
        },
        methods: {

        },
        components: {
            'le-button': httpVueLoader('le-button.vue')
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
