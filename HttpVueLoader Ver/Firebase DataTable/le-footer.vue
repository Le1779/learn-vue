<template>
    <div class="footer-container">
        <div class="footer">
            {{per_page_num_text}}
            {{table_info.per_page_length}}
            {{current_page_item_count_text}}
            <div class="button fa fa-chevron-left" @click="getPreviousPage" v-bind:class="{ 'disabled': table_info.current_page == 0 }">
            </div>
            <div class="button fa fa-chevron-right" @click="getNextPage" v-bind:class="{ 'disabled': table_info.current_page >= max_page - 1 }"></div>
        </div>
    </div>
</template>

<script>
    let viewModel = {
        per_page_num_text: '每頁列數：',
        current_page_item_count_text: '第 1-2 個 (共 0 個)',
        max_page: 0,
    };

    module.exports = {
        props: ["table_info"],
        data: function() {
            return viewModel
        },
        methods: {
            getPreviousPage() {
                this.table_info.current_page--;
            },
            getNextPage() {
                this.table_info.current_page++;
            },
            modifyCountText() {

                let dataSize = this.table_info.data_size;
                let form = this.table_info.per_page_length * this.table_info.current_page + 1;
                let to = form + this.table_info.per_page_length;
                if (to > dataSize) {
                    to = dataSize;
                }

                viewModel.current_page_item_count_text = '第 ' + form + '-' + to + ' 個 (共 ' + dataSize + ' 個)'
            }
        },
        watch: {
            table_info: {
                handler(newVal, oldVal) {
                    this.modifyCountText();
                    max_page = this.table_info.data_size / this.table_info.per_page_length;
                },
                deep: true
            }
        },
        mounted: function() {
            this.modifyCountText();
            max_page = this.table_info.data_size / this.table_info.per_page_length;
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
        height: 100%;
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
        padding: 0;
        width: 40px;
        border-radius: 50%;
        cursor: pointer;
        color: rgba(0, 0, 0, .52);
        line-height: 40px;
        background: none;
        box-shadow: none;
        border: none;
    }

    .button:hover {
        color: rgba(0, 0, 0, .78);
    }

    .button.disabled {
        pointer-events: none;
        color: rgba(0, 0, 0, .26);
    }

</style>
