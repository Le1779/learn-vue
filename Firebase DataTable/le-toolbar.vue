<template>
    <div class="toolbar-container" v-bind:class="{ 'editing': show_edit }">
        <div class="toolbar">
            <div class="input-show">
                <div class="search-icon fa fa-search"></div>
                <span class="input-placeholder" @click="doEdit"> {{input_hint}} </span>
                <div class="actions">
                    <le-button :show_text="create_new_user"></le-button>
                </div>
            </div>
            <div class="input-editing">
                <div class="search-icon fa fa-search"></div>
                <input class="search-input" ref="search_text" type="text" :placeholder="input_hint" v-on:blur="endEdit">
            </div>
        </div>
    </div>
</template>

<script>
    let viewModel = {
        input_hint: '依電子郵件地址、電話號碼或使用者 UID 搜尋',
        show_edit: true,
        create_new_user: '新增使用者',
    };
    module.exports = {
        data: function() {
            return viewModel
        },
        methods: {
            doEdit() {
                viewModel.show_edit = true;
                this.$refs.search_text.focus();
            },
            endEdit() {
                viewModel.show_edit = false;
            }
        },
        components: {
            'le-button': httpVueLoader('le-button.vue')
        }
    }

</script>

<style scoped>
    .toolbar-container {
        font-size: 14px;
        height: 56px;
        line-height: 56px;
        min-height: 56px;
        overflow-y: hidden;
        padding-left: 16px;
        padding-right: 8px;
        background-color: #FAFAFA;
    }

    .toolbar-container.editing {
        width: 100%;
        background-color: white;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 2px 6px 2px rgba(60, 64, 67, .15);
    }

    .toolbar {
        height: 100%;
    }

    .input-show {
        display: flex;
        height: 100%;
    }

    .toolbar-container.editing .input-show {
        display: none;
    }

    .search-icon {
        margin-left: 8px;
        margin-right: 12px;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.54);
        margin: auto;
        vertical-align: middle;
    }

    .input-placeholder {
        color: rgba(0, 0, 0, .38);
        outline: 0;
        height: 100%;
        padding: 0 12px;
        letter-spacing: .07px;
        font-size: 100%;
        flex: 1;
        cursor: pointer;
    }

    .actions {
        display: flex;
        align-items: center;
    }

    .input-editing {
        display: flex;
        height: 100%;
    }

    .search-input {
        outline: 0;
        border: 0 none;
        height: 100%;
        padding: 0 12px;
        letter-spacing: .07px;
        font-size: 100%;
        flex: 1;
    }

</style>
