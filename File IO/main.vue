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
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length != 1" @click="showRenameDialog">重新命名</v-btn>
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length == 0" @click="showMoveDialog">移動</v-btn>
                    <v-btn color="error" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length == 0" @click="showDeleteDialog">刪除</v-btn>
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2" :disabled="table_obj.selected.length == 0" @click="showPreDownloadDialog">下載</v-btn>
                </div>
            </v-col>
        </v-row>

        <datatable-delete-dialog :dialog_model="delete_dialog_model" :items="table_obj.selected" @action="deleteItem"></datatable-delete-dialog>

        <rename-dialog :dialog_model="rename_dialog_model" :items="table_obj.selected" @action="renameItem"></rename-dialog>

        <pre-download-dialog :dialog_model="pre_download_dialog_model" :items="table_obj.selected" @action="downloadItem"></pre-download-dialog>

        <move-file-dialog :dialog_model="move_dialog_model" :items="table_obj.selected" :current_path=path @action="moveItem" @get-directory="getMoveDirectory"></move-file-dialog>
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

            rename_dialog_model: {
                show: false,
                filename: '',
            },

            move_dialog_model: {
                show: false,
                path: [],
                directory: [],
            },

            delete_dialog_model: {
                show: false,
            },

            pre_download_dialog_model: {
                show: false,
                progress: 0,
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
                    self.table_obj.selected = [];
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

            getMoveDirectory() {
                let self = this;
                console.log("getMoveDirectory: " + self.move_dialog_model.path);
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
                    Files: []
                };
                makeTableData(fakeObj);
                //console.log(self.move_dialog_model.directory);

                function makeTableData(directory) {
                    //self.move_dialog_model.directory = directory.Folders;
self.move_dialog_model.directory = [];
                    for (let i = 0; i < directory.Folders.length; i++) {
                        let notEqual = true;
                        for(let j = 0; j < self.table_obj.selected.length; j++){
                            notEqual &= self.table_obj.selected[j].Name != directory.Folders[i].Name
                        }
                        if (notEqual) {
                            self.move_dialog_model.directory.push(directory.Folders[i])
                        }
                    }
                }
            },

            showRenameDialog() {
                if (this.table_obj.selected.length == 0) {
                    return;
                }

                this.rename_dialog_model.filename = this.table_obj.selected[0].Name;
                this.rename_dialog_model.show = true;
            },

            showMoveDialog() {
                this.move_dialog_model.path = []
                Object.assign(this.move_dialog_model.path, this.path);
                this.getMoveDirectory();
                this.move_dialog_model.show = true;
            },

            showDeleteDialog() {
                this.delete_dialog_model.show = true;
            },

            showPreDownloadDialog() {
                this.pre_download_dialog_model.show = true;
            },

            renameItem() {
                console.log('renameItem');
                let self = this;
                setTimeout(function() {
                    self.getDirectory();
                    self.rename_dialog_model.show = false;
                }, 3000)
            },

            deleteItem() {
                console.log('deleteItem');
                let self = this;
                setTimeout(function() {
                    self.getDirectory();
                    self.delete_dialog_model.show = false;
                }, 3000)
            },

            downloadItem() {
                console.log('downloadItem');
                let self = this;
                test();

                function test() {
                    setTimeout(function() {
                        if (self.pre_download_dialog_model.progress >= 100) {
                            self.pre_download_dialog_model.show = false;
                        } else {
                            self.pre_download_dialog_model.progress++;
                            test();
                        }
                    }, 30)
                }
            },

            moveItem() {
                console.log('moveItem');
                let self = this;
                setTimeout(function() {
                    self.getDirectory();
                    self.move_dialog_model.show = false;
                }, 3000)
            },
        },

        watch: {
            path: {
                handler(newVal, oldVal) {
                    //顯示的路徑已經更換
                    this.getDirectory();
                },
            },
        },

        components: {
            'path-nav': httpVueLoader('path-nav.vue'),
            'directory-table': httpVueLoader('directory-table.vue'),
            'datatable-delete-dialog': httpVueLoader('datatable-delete-dialog.vue'),
            'rename-dialog': httpVueLoader('rename-dialog.vue'),
            'pre-download-dialog': httpVueLoader('pre-download-dialog.vue'),
            'move-file-dialog': httpVueLoader('move-file-dialog.vue'),
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
