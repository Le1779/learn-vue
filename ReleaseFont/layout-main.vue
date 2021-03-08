<!--
Release font main page

Created by Kevin Le on 2021/3/4.
-->
<template>
    <div class="main">
        <div class="header">
            <loading-button v-if="isUploadAllFontFile" :model="loadingButtonModel" class="forward" @action="onForwardButtonClick"></loading-button>
            <div v-if="!displayFirstPage" class="back button material-icons" @click="onBackButtonClick">keyboard_arrow_left</div>
            <div class="error-message">{{errorMessage}}</div>
        </div>
        <div class="content">
            <div v-if="displayFirstPage" class="first-page">
                <upload-file-block :model="uploadFileBlockModel" @tirgger="tirggerExcelFile" class="upload-excel"></upload-file-block>
                <div class="font-list">
                    <div v-for="(item, i) in fontList" class="font-list-item" :class="{active: item.file && !item.notTheSame}">
                        <div class="font-list-item-icon material-icons">task</div>
                        <div class="font-list-item-font-name">{{item.Font_Name}}</div>
                        <div class="font-list-item-font-filename">{{item.Font_FileName}}.{{item.Font_FileType}}</div>
                        <div v-if="item.file && item.notTheSame" class="font-list-item-not-the-same-filename">上傳的檔案名稱不符合</div>
                        <input class="font-list-item-file" type="file" :accept="'.' + item.Font_FileType" @change="tirggerFontFile($event, item)">
                    </div>
                </div>
            </div>
            <div v-else class="second-page">
                <div class="process-list"></div>
                <div class="font-info"></div>
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
            fontList: []
        }),

        watch: {

        },
        
        computed: {
            isUploadAllFontFile() {
                if (!this.excelFile) {
                    return false;
                }
                
                for (var i = 0; i < this.fontList.length; i++) {
                    if (!this.fontList[i].file || this.fontList[i].notTheSame) {
                        return false;
                    }
                }
                
                return true;
            }
        },

        mounted() {},

        created() {},

        components: {
            'loading-button': httpVueLoader('loading-button.vue'),
            'upload-file-block': httpVueLoader('upload-file-block.vue')
        },

        methods: {
            tirggerExcelFile(event) {
                var self = this;
                this.excelFile = event.target.files[0];
                console.log(this.excelFile);
                readFile(this.excelFile);

                function readFile(file) {
                    var reader = new FileReader();
                    var name = file.name;

                    reader.onload = function(e) {
                        var data = e.target.result;
                        getFontList(data);
                        console.log(self.fontList)
                    };

                    reader.readAsBinaryString(file);
                }

                function getFontList(data) {
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    self.fontList = [];
                    workbook.SheetNames.forEach(function(sheetName) {
                        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        if (roa.length > 0) {
                            for (var i = 0; i < roa.length; i++) {
                                roa[i].notTheSame = false;
                                roa[i].file = null;
                                self.fontList.push(roa[i]);
                            }
                        }
                    });
                }
            },

            tirggerFontFile(event, item) {
                item.file = event.target.files[0];
                console.log(item.file);
                if (!item.file) {
                    return;
                }
                
                item.notTheSame = item.file.name != item.Font_FileName + "." + item.Font_FileType
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
                }, 1000)

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
    
    .font-list {
        margin-top: 24px;
    }
    
    .font-list-item {
        position: relative;
        display: grid;
        grid-template-areas: 
            "icon fontname fontname"
            "icon filename upload-resultc";
        grid-template-columns: 48px auto;
        border: #A8A8A8 2px solid;
        border-radius: 5px;
        padding: 12px 24px;
        color: #383838;
        margin-bottom: 8px;
    }
    
    .font-list-item:hover {
        background-color: #F8F8F8;
    }

    .font-list-item-icon {
        grid-area: icon;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #787878;
        color: #FFFFFF;
        line-height: 48px;
        font-size: 32px;
        text-align: center;
    }
    
    .font-list-item-font-name {
        grid-area: fontname;
        padding-left: 12px;
        color: #A8A8A8;
    }
    
    .font-list-item-font-filename {
        grid-area: filename;
        padding-left: 12px;
        color: #D8D8D8;
    }
    
    .font-list-item-not-the-same-filename {
        grid-area: upload-resultc;
        text-align: end;
        color: #FF8584;
    }
    
    .font-list-item-file {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    
    .font-list-item.active {
        background: #383838;
        border-color: #383838;
        color: #FFFFFF;
    }
    
    .font-list-item.active .font-list-item-font-name {
        color: #FFFFFF;
    }
    
    .font-list-item.active .font-list-item-font-filename {
        color: #D8D8D8;
    }
</style>
