<template>
    <div>
        <v-divider></v-divider>
        <v-data-table v-model="table_obj.selected" :headers="headers" :items="table_obj.data" hide-default-footer show-select item-key="Name" @click:row="handleRowClick">
            <template v-slot:item.type="{item}">
                <v-icon>{{item.type == 'folder' ? 'folder' : 'insert_drive_file'}}</v-icon>
            </template>
        </v-data-table>
    </div>
</template>


<script>
    module.exports = {
        props: ["table_obj", "path"],

        data: () => ({
            headers: [{
                    text: '',
                    value: 'type',
                },
                {
                    text: '名稱',
                    value: 'Name'
                },
                {
                    text: '上次修改',
                    value: 'LastWriteTime'
                },
                {
                    text: '檔案大小',
                    value: 'FileSize'
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
            handleRowClick(item) {
                if(item.type == 'folder'){
                    console.log('is folder');
                    this.path.push(item.Name);
                }else{
                    console.log('is file');
                }
            }
        },
    }
</script>

<style scoped>
</style>