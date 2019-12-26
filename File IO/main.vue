<template>
    <div class="container">
        <path-nav :path=path></path-nav>
        <v-row>
            <v-col cols="9" class="pa-0">
                <v-divider></v-divider>
                <v-data-table v-model="selected" :headers="headers" :items="desserts" hide-default-footer show-select item-key="name">
                    <template v-slot:item.type="{ item }">
                        <v-icon>{{item.type == 'folder' ? 'folder' : 'insert_drive_file'}}</v-icon>
                    </template>
                </v-data-table>
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
            selected: [],
            headers: [{
                    text: '',
                    align: 'left',
                    value: 'type',
                },
                {
                    text: '名稱',
                    value: 'name'
                },
                {
                    text: '上次修改',
                    value: 'modify-date'
                },
                {
                    text: '檔案大小',
                    value: 'size'
                },
            ],
            desserts: [{
                name: 'folder1',
                type: 'folder'
            }, {
                name: 'file1',
                type: 'file'
            }]
        }),

        methods: {
            initialize() {
                console.log('initialize');
            },
        },

        watch: {
            path: {
                handler(newVal, oldVal) {
                    console.log('path change');
                },
            },
            
            selected: {
                handler(newVal, oldVal) {
                    console.log(newVal);
                },
            },
        },

        components: {
            'path-nav': httpVueLoader('path-nav.vue')
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
