<!--
Release font main page

Created by Kevin Le on 2021/3/4.
-->
<template>
    <div class="main">
        <div class="header">
            <loading-button v-if="isUploadAllFontFile && displayFirstPage" :model="loadingButtonModel" class="forward" @action="onForwardButtonClick"></loading-button>
            <div v-if="false" class="back button material-icons" @click="onBackButtonClick">keyboard_arrow_left</div>
            <div class="error-message">{{errorMessage}}</div>
        </div>
        <div class="content">
            <div v-if="displayFirstPage" class="first-page">
                <upload-file-block :model="uploadFileBlockModel" @tirgger="tirggerExcelFile" class="upload-excel"></upload-file-block>
                <font-list :model="fontListModel"></font-list>
            </div>
            <div v-else class="second-page">
                <div>處理中...</div>
                <div class="loading"></div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            loadingButtonModel: {
                icon: 'keyboard_arrow_right',
                loading: false
            },
            uploadFileBlockModel: {
                icon: 'insert_drive_file',
                text: '上傳 Excel',
                multiple: false,
                accept: '.xlsx, .xls, .csv',
                disabled: false
            },
            displayFirstPage: true,
            errorMessage: "",
            loading: false,
            excelFile: null,
            fontListModel: {
                fontList: []
            }
        }),

        computed: {
            isUploadAllFontFile() {
                if (!this.excelFile) {
                    return false;
                }

                for (var i = 0; i < this.fontListModel.fontList.length; i++) {
                    if (!this.fontListModel.fontList[i].file || this.fontListModel.fontList[i].notTheSame) {
                        return false;
                    }
                }

                return true;
            }
        },

        components: {
            'loading-button': httpVueLoader('loading-button.vue'),
            'upload-file-block': httpVueLoader('upload-file-block.vue'),
            'font-list': httpVueLoader('font-list.vue')
        },

        methods: {
            tirggerExcelFile(event) {
                this.fontListModel.fontList = [];
                if (!event.target.files[0]) {
                    return;
                }

                var self = this;
                this.excelFile = event.target.files[0];
                readFile(this.excelFile);

                function readFile(file) {
                    var reader = new FileReader();
                    var name = file.name;

                    reader.onload = function(e) {
                        var data = e.target.result;
                        getFontList(data);
                    };

                    reader.readAsBinaryString(file);
                }

                function getFontList(data) {
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    workbook.SheetNames.forEach(function(sheetName) {
                        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        if (roa.length > 0) {
                            for (var i = 0; i < roa.length; i++) {
                                roa[i].notTheSame = false;
                                roa[i].file = null;
                                self.fontListModel.fontList.push(roa[i]);
                            }
                        }
                    });
                }
            },

            onForwardButtonClick() {
                this.errorMessage = "";
                this.uploadAndVerifyFile();
            },

            onBackButtonClick() {
                this.goToFirstPage();
            },

            goToFirstPage() {
                this.displayFirstPage = true;
            },

            goToSecondPage() {
                this.displayFirstPage = false;
            },

            uploadAndVerifyFile() {
                this.uploadFileBlockModel.disabled = true;
                var self = this;
                setTimeout(() => {
                    self.loadingButtonModel.loading = false;
                    this.uploadFileBlockModel.disabled = false;
                    self.goToSecondPage();
                    self.uploadExcelAndFonts();
                }, 1000);
            },

            uploadExcelAndFonts() {
                var self = this;
                setTimeout(() => {
                    self.fontListModel.fontList = [];
                    self.displayFirstPage = true;
                }, 3000);
            }
        },
    }
</script>

<style scoped>
    .main {
        display: grid;
        grid-template-rows: 64px auto 64px;
        border: #AAA 1px solid;
        border-radius: 5px;
        margin: 48px 24px;
        padding: 0 24px;
    }

    .header {
        display: block;
    }

    .upload-excel {
        padding: 24px 8px;
    }

    .button {
        display: inline-block;
        margin-top: 8px;
        height: 48px;
        width: 48px;
        line-height: 48px;
        font-size: 32px;
        border-radius: 48px;
        text-align: center;
        cursor: pointer;
        color: #FFF;
        background-color: #383838;
    }

    .button:hover {
        background-color: #585858;
    }

    .button.back {
        margin-left: 12px;
    }

    .forward {
        float: right;
        margin-top: 8px;
        margin-right: 12px;
    }

    .button.forward.active {
        display: inline-block;
    }

    .error-message {
        float: right;
        line-height: 64px;
        margin-right: 12px;
        color: #FF8584;
    }

    .first-page {
        display: grid;
        grid-template-columns: auto;
    }

    .second-page {
        text-align: center;
    }

    .loading {
        display: inline-block;
        width: 32px;
        height: 32px;
        border: 3px solid #00000000;
        border-radius: 50%;
        border-top: 3px solid #383838;
        -webkit-animation: spin 2s linear infinite;
        /* Safari */
        animation: spin 2s linear infinite;
        margin-top: 24px;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>