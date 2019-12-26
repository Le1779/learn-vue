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
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2">重新命名</v-btn>
                    <v-btn color="error" outlined style="width: 100%;" class="mb-2">刪除</v-btn>
                    <v-btn color="primary" outlined style="width: 100%;" class="mb-2">下載</v-btn>
                </div>
            </v-col>
        </v-row>

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
                console.log(this.makeCompletePath());
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
                    }]
                };
                self.makeTableData(fakeObj);

            },

            makeTableData(directory) {
                this.table_obj.data = [];
                for (let i = 0; i < directory.Folders.length; i++) {
                    this.table_obj.data.push({
                        Name: directory.Folders[i].Name,
                        LastWriteTime: directory.Folders[i].LastWriteTime,
                        FileSize: directory.Folders[i].FileSize,
                        type: 'folder'
                    })
                }
                
                for (let i = 0; i < directory.Files.length; i++) {
                    this.table_obj.data.push({
                        Name: directory.Files[i].Name,
                        LastWriteTime: directory.Files[i].LastWriteTime,
                        FileSize: directory.Files[i].FileSize,
                        type: 'file'
                    })
                }
            },
            
            makeCompletePath(){
                return '/' + this.path.join('/');
            }
        },

        watch: {
            path: {
                handler(newVal, oldVal) {
                    console.log('path change');
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
            'directory-table': httpVueLoader('directory-table.vue')
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
