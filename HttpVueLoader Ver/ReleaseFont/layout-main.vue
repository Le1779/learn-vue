<!--
Release font main page

Created by Kevin Le on 2021/3/4.
-->
<template>
    <div class="main">
        <div class="header">
            <loading-button v-if="isUploadAllFontFile && displayFirstPage" :model="loadingButtonModel" class="forward" @action="onForwardButtonClick"></loading-button>
            <div class="error-message">{{errorMessage}}</div>
        </div>
        <div class="content">
            <div v-if="displayFirstPage" class="first-page">
                <upload-file-block :model="uploadFileBlockModel" @tirgger="tirggerExcelFile" class="upload-excel"></upload-file-block>
                <font-list :model="fontListModel"></font-list>
            </div>
            <div v-else class="second-page">
                <h1>{{isProcessing ? processing : isComplete ? completed : failed}}</h1>
                <loading-button :model="backButtonModel" class="back" @action="onBackButtonClick"></loading-button>
                <div v-if="!isProcessing && !isComplete" class="failed-message">{{failedMessage}}</div>
                <div v-if="!isProcessing && isComplete" class="next-step">
                    <h1>接下來...</h1>
                    <h4>修改官網的WebEditor的javascript檔。</h4>
                    <div class="subtext">
                        <p>1. 前往官網的主機。</p>
                        <p>2. 開啟官網WebEditor的目錄。</p>
                        <p>3. 編輯plugin.js檔案。(台灣站的目錄:F:\WebSites\test.dynacw.com.tw\backend\asset\js\ckeditor\plugins\dfo\plugin.js)</p>
                        <p>4. 將新的字型加入下拉選單的選項中。</p>
                    </div>
                    <h4>是多國語嗎？ 果是的話請依照以下步驟：</h4>
                    <div class="subtext">
                        <p>1. 前往官網的主機。</p>
                        <p>2. 開啟DFO Web Service的目錄。</p>
                        <p>3. 編輯web.config檔案。</p>
                        <p>4. 找到"appSettings"標籤下，key="MutiLang"，新增字體檔的檔案名稱至value的最後面。</p>
                    </div>
                </div>
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
            backButtonModel: {
                icon: 'keyboard_arrow_left',
                loading: false
            },
            uploadFileBlockModel: {
                icon: 'insert_drive_file',
                text: '上傳 Excel',
                multiple: false,
                accept: '.xlsx, .xls, .csv',
                disabled: false
            },
            errorMessage: "",
            loading: false,
            excelFile: null,
            fontListModel: {
                fontList: []
            },
            displayFirstPage: true,
            isProcessing: true,
            isComplete: false,
            processing: '處理中...',
            completed: '已完成！',
            failed: '失敗 :(',
            failedMessage: '這是失敗訊息'
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
                this.loadingButtonModel.loading = false;
                this.backButtonModel.loading = true;
                this.goToSecondPage();
                this.uploadExcelAndFonts();
            },

            onBackButtonClick() {
                this.isProcessing = true;
                this.isComplete = false;
                this.failedMessage = '';
                this.excelFile = null;
                this.fontListModel.fontList = [];
                this.goToFirstPage();
            },

            goToFirstPage() {
                this.displayFirstPage = true;
            },

            goToSecondPage() {
                this.displayFirstPage = false;
            },

            uploadExcelAndFonts() {
                var postObj = new FormData();
                postObj.set('excel', this.excelFile);
                postObj.set('fonts', this.fontListModel.fontList);
                
                setTimeout(() => {
                    success();
                }, 3000);
                
                var self = this;
                function success(response) {
                    self.isProcessing = false;
                    self.isComplete = true;
                    self.backButtonModel.loading = false;
                }

                function fail(error) {
                    self.isProcessing = false;
                    self.isComplete = false;
                    self.failedMessage = "這是測試模式";
                    self.backButtonModel.loading = false;
                }
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

    .forward {
        float: right;
        margin-top: 8px;
        margin-right: 12px;
    }
    
    .back {
        margin-top: 12px;
    }

    .error-message {
        float: right;
        line-height: 64px;
        margin-right: 12px;
        color: #FF8584;
    }

    .failed-message {
        margin-top: 60px;
        color: #FF8584;
    }

    .first-page {
        display: grid;
        grid-template-columns: auto;
    }

    .second-page {
        text-align: center;
    }
    
    .next-step {
        margin-top: 60px;
        margin-left: 60px;
        text-align: left;
    }
    
    .subtext {
        margin-left: 12px;
        color: #787878;
    }
</style>
