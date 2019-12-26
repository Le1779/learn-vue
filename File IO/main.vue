<template>
    <div class="container">
        <path-nav :path=path></path-nav>
        <v-row>
            <v-col cols="9" class="pa-0">
                <directory-table :table_obj=table_obj :path=path></directory-table>
            </v-col>
            <v-col cols="3" class="py-0">
                <v-btn color="primary" outlined style="width: 100%;">複製FTP網址</v-btn>
                <v-divider class="my-2"></v-divider>
                <div>
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length != 1" @click="renameItem">重新命名</v-btn>
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length == 0" @click="renameItem">移動</v-btn>
                    <v-btn color="error" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length == 0" @click="showDeleteDialog">刪除</v-btn>
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length == 0" @click="downloadItem">下載</v-btn>
                </div>
            </v-col>
        </v-row>

        <datatable-delete-dialog :dialog_model="delete_dialog_model" :items="table_obj.selected" @action="deleteItem"></datatable-delete-dialog>
    </div>
</template>


<script>
    module.exports = {
        data: () => ({
            path: ["path1", "path2"],
            
            table_obj: {
                data: [],
                selected: [],
            },
            
            delete_dialog_model: {
                show: false,
            },
        }),

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                console.log('initialize');
                this.getDirectory();
            },

            getDirectory() {
                let self = this;
                console.log(makeCompletePath());
                let fakeObj = {
                    Folders: [{
                        Name: "Folder1",
                        LastWriteTime: "2019/12/19 17:42",
                        FileSize: ""
                    }, {
                        Name: "Folder2",
                        LastWriteTime: "2019/12/19 17:42",
                        FileSize: ""
                    }, {
                        Name: "Folder3",
                        LastWriteTime: "2019/12/19 17:42",
                        FileSize: ""
                    }],
                    Files: [{
                        Name: "File1",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "2.73 KB"
                    }, {
                        Name: "File2",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "529 KB"
                    }, {
                        Name: "File3",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "529 KB"
                    }, {
                        Name: "File4",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "529 KB"
                    }, {
                        Name: "File5",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "529 KB"
                    }, {
                        Name: "File6",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "529 KB"
                    }, {
                        Name: "File7",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "529 KB"
                    }, {
                        Name: "File8",
                        LastWriteTime: "2019/12/19 17:40",
                        FileSize: "529 KB"
                    }]
                };
                makeTableData(fakeObj);

                //將從後台得到的資料轉成前端看得懂的物件
                function makeTableData(directory) {
                    self.table_obj.data = [];
                    for (let i = 0; i < directory.Folders.length; i++) {
                        self.table_obj.data.push({
                            Name: directory.Folders[i].Name,
                            LastWriteTime: directory.Folders[i].LastWriteTime,
                            FileSize: directory.Folders[i].FileSize,
                            type: 'folder'
                        })
                    }

                    for (let i = 0; i < directory.Files.length; i++) {
                        self.table_obj.data.push({
                            Name: directory.Files[i].Name,
                            LastWriteTime: directory.Files[i].LastWriteTime,
                            FileSize: directory.Files[i].FileSize,
                            type: 'file'
                        })
                    }
                }
                //得到完整的路徑
                function makeCompletePath() {
                    return '/' + self.path.join('/');
                }
            },

            showRenameDialog() {},

            showMoveDialog() {
                
            },

            showDeleteDialog() {
                this.delete_dialog_model.show = true;
            },

            showPreDownloadDialog() {},

            renameItem() {
                console.log('renameItem');
            },

            deleteItem() {
                console.log('deleteItem');
            },

            downloadItem() {
                console.log('downloadItem');
            },
        },

        watch: {
            path: {
                handler(newVal, oldVal) {
                    //顯示的路徑已經更換
                    this.getDirectory();
                },
            },

            "table_obj.selected": {
                handler(newVal, oldVal) {
                    console.log('selected change');
                },
            },
        },

        components: {
            'path-nav': httpVueLoader('path-nav.vue'),
            'directory-table': httpVueLoader('directory-table.vue'),
            'datatable-delete-dialog': httpVueLoader('datatable-delete-dialog.vue'),
        }
    }

</script>


<style scoped>
    .container {
        margin: auto;
        width: 80%;
        margin-bottom: 10vh;
    }

</style>
