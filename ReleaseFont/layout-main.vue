<!--
Release font main page

Created by Kevin Le on 2021/3/4.
-->
<template>
    <div class="main">
        <div class="header">
            <div v-if="displayFirstPage" class="forward button material-icons" :class="{active: excelFile && fontFile && !loading}" @click="onForwardButtonClick">keyboard_arrow_right</div>
            <div v-else class="back button material-icons" @click="onBackButtonClick">keyboard_arrow_left</div>
            <div class="error-message">{{errorMessage}}</div>
            <div class="loader" :class="{active: excelFile && fontFile && loading}"></div>
        </div>
        <div class="content">
            <div v-if="displayFirstPage" class="first-page">
                <div class="upload-file-block left" :class="{active: excelFile && !loading}">
                    <div class="material-icons">insert_drive_file</div>
                    <div v-if="!excelFile" class="text">上傳 Excel</div>
                    <div v-else class="selected-file-name">{{excelFile.name}}</div>
                    <input class="file" type="file" @change="tirggerExcelFile($event)" :disabled="loading">
                </div>
                <div class="upload-file-block" :class="{active: fontFile && !loading}">
                    <div class="material-icons">title</div>
                    <div v-if="!fontFile" class="text">上傳 Font</div>
                    <div v-else class="selected-file-name">{{fontFile.name}}</div>
                    <input class="file" type="file" @change="tirggerFontFile($event)" :disabled="loading">
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
            displayFirstPage: true,
            errorMessage: "",
            loading: false,
            excelFile: {
                name: "DFKing.ttf"
            },
            fontFile: {
                name: "DFKing.ttf"
            },
        }),

        watch: {

        },

        mounted() {},

        created() {},

        components: {

        },

        methods: {
            tirggerExcelFile(event) {
                this.excelFile = event.target.files[0];
                console.log(this.excelFile);
            },

            tirggerFontFile(event) {
                this.fontFile = event.target.files[0];
                console.log(this.fontFile);
            },

            onForwardButtonClick() {
                this.errorMessage = "";
                this.loading = true;
                //this.uploadAndVerifyFile();
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
                this.goToSecondPage();
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
    }

    .header {
        display: block;
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

    .button.forward {
        float: right;
        margin-right: 12px;
        display: none;
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
        grid-template-columns: 50% 50%;
    }

    .upload-file-block {
        position: relative;
        margin: 12px;
        padding: 24px 8px;
        width: 50%;
        border: #AAA 2px solid;
        border-radius: 5px;
        display: grid;
        grid-template-rows: 64px 24px;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        color: #AAA;
    }

    .upload-file-block.left {
        align-self: flex-end;
        justify-self: flex-end;
    }

    .upload-file-block.active,
    .upload-file-block:hover {
        color: #383838;
    }

    .upload-file-block .material-icons {
        line-height: 64px;
        font-size: 64px;
    }

    .upload-file-block .file {
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .loader {
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        border-top: 4px solid #383838;
        width: 32px;
        height: 32px;
        -webkit-animation: spin 2s linear infinite;
        /* Safari */
        animation: spin 2s linear infinite;
        float: right;
        margin-top: 12px;
        margin-right: 12px;
        display: none;
        cursor: pointer;
    }
    
    .loader.active {
        display: inline-block;
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
