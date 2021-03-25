<!--
Release font component test page

Created by Kevin Le on 2021/3/5.
-->
<template>
    <div>
        <loading-button :model="loadingButtonModel" class="loading-button" @action="onLoadingButtonClick"></loading-button>
        <upload-file-block :model="uploadFileBlockModel" @tirgger="tirggerFile" class="upload-file-block"></upload-file-block>
        <font-list :model="fontListModel"></font-list>
    </div>
</template>

<script>
    module.exports = {
        data: () => ({
            loadingButtonModel: {
                icon: 'keyboard_arrow_right',
                loading: false
            },

            uploadFileBlockModel: {
                icon: 'insert_drive_file',
                text: '上傳 Excel',
                accept: '',
                multiple: true,
                disabled: false
            },

            fontListModel: {
                fontList: [{
                        Font_Name: 'ＤＦ華康明朝体 Pro-5 W3 OpenType for Mac',
                        Font_FileName: 'DFMinchoPPro5-W3',
                        Font_FileType: 'otf',
                        notTheSame: false,
                        file: null
                    },
                    {
                        Font_Name: 'ＤＦ華康明朝体 Pro-5 W5 OpenType for Mac',
                        Font_FileName: 'DFMinchoPPro5-W5',
                        Font_FileType: 'otf',
                        notTheSame: false,
                        file: null
                    }
                ]
            }
        }),

        watch: {},

        mounted() {},

        created() {},

        components: {
            'loading-button': httpVueLoader('loading-button.vue'),
            'upload-file-block': httpVueLoader('upload-file-block.vue'),
            'font-list': httpVueLoader('font-list.vue')
        },

        methods: {
            onLoadingButtonClick() {
                console.log("loading button click.")
                setTimeout(() => (this.loadingButtonModel.loading = false), 3000)
            },

            tirggerFile(event) {
                console.log(event.target.files[0]);
            }
        },
    }
</script>

<style scoped>
    .loading-button {
        margin: 24px;
    }

    .upload-file-block {
        margin: 12px;
        padding: 24px 8px;
        width: 15%;
    }
</style>