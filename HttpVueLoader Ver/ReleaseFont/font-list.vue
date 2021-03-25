<!--
Font List

Created by Kevin Le on 2021/3/8.
-->
<template>
    <div class="font-list">
        <div v-for="(item, i) in model.fontList" class="font-list-item" :class="{active: item.file && !item.notTheSame}">
            <div class="font-list-item-icon material-icons">insert_drive_file</div>
            <div class="font-list-item-font-name">{{item.Font_Name}}</div>
            <div class="font-list-item-font-filename">{{item.Font_FileName}}.{{item.Font_FileType}}</div>
            <div v-if="item.file && item.notTheSame" class="font-list-item-not-the-same-filename">上傳的檔案名稱不符合</div>
            <input class="font-list-item-file" type="file" :accept="'.' + item.Font_FileType" @change="tirggerFontFile($event, item)">
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],

        methods: {
            tirggerFontFile(event, item) {
                item.file = event.target.files[0];
                if (!item.file) {
                    return;
                }

                item.notTheSame = item.file.name != item.Font_FileName + "." + item.Font_FileType;
            },
        },
    }
</script>

<style scoped>
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
        cursor: pointer;
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