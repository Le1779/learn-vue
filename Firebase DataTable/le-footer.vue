<template>
    <div class="footer-container">
        <div class="footer">
            {{per_page_num_text}}

            {{current_page_item_count_text}}
            <div class="button fa fa-chevron-left">
            </div>
            <div class="button fa fa-chevron-right"></div>
        </div>
    </div>
</template>

<script>
    let viewModel = {
        per_page_num_text: '每頁列數：',
        current_page_item_count_text: '第 1-2 個 (共 2 個)',
    };

    module.exports = {
        data: function() {
            return viewModel
        },
        methods: {

        }
    }

</script>

<style scoped>
    .footer-container {
        background-color: #FAFAFA;
        border-radius: 0 0 8px 8px;
        border-top: 1px solid rgba(0, 0, 0, .08);
        color: rgba(0, 0, 0, 0.54);
        font-size: 12px;
        height: 56px;
        padding-left: 24px;
    }

    .footer {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: flex-end;
    }

    .button {
        font-size: 14px;
        vertical-align: middle;
        align-items: center;
        text-align: center;
        margin: 0 6px;
        height: 40px;
        padding: 8px;
        width: 40px;
        border-radius: 50%;
        cursor: pointer;
        padding-left: 0;
        padding-right: 0;
        color: rgba(0, 0, 0, .26);
        line-height: 40px;
    }

</style>
