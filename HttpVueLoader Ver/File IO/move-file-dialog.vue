<template>
    <v-dialog v-model="dialog_model.show" persistent scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{title}}</span>
            </v-card-title>

            <v-breadcrumbs :items="breadcrumbsItems" divider=">" class="py-0" large>
                <template v-slot:item="props">
                    <v-breadcrumbs-item @click="movePath(props.item.index)" class="move-path-nav" :class="{'disable' : props.item.index == breadcrumbsItems.length - 1}">
                        {{ props.item.text }}
                    </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>

            <v-card-text style="height: 200px;">
                <v-container class="px-0">
                    <v-data-table :headers="headers" :items="dialog_model.directory" hide-default-footer @click:row="handleRowClick">
                        <template v-slot:item.type="{item}">
                            <v-icon>folder</v-icon>
                        </template>
                    </v-data-table>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text :disabled="loading" @click="close">{{cancel_text}}</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="loading" :disabled="loading" @click="moveItem">
                    {{confirm_text}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {
        confirm_text: '移動',
        cancel_text: 'Cancel',
        loading: false,
        headers: [{
                text: '',
                value: 'type',
                sortable: false,
                width: '10%'
            },
            {
                text: '名稱',
                align: 'left',
                value: 'Name',
                width: '90%'
            },
        ],
        breadcrumbsItems: [],
    };

    module.exports = {
        props: ["dialog_model", "items", "current_path"],
        data: function() {
            return viewModel
        },

        computed: {
            title() {
                return '移動' + this.items.length + '個檔案'
            },
        },

        methods: {
            close() {
                this.dialog_model.show = false;
            },

            moveItem() {
                let self = this;
                if (checkPath()) {
                    this.loading = true;
                    this.$emit('action', false)
                } else {
                    //show error message
                    console.log("in parent path");
                }

                function checkPath() {
                    if(self.current_path.length == self.dialog_model.path.length){
                        //貼上路徑為同一層
                        return;
                    }
                    
                    let isPass = true;
                    let parent = makeCompletePath(self.current_path);
                    let targetPath = makeCompletePath(self.dialog_model.path);

                    for (let i = 0; i < self.items.length; i++) {
                        //檢查是否貼上於自己之中
                        isPass &= !targetPath.includes(parent + '/' + self.items[i].Name);
                    }

                    return isPass;

                    function makeCompletePath(path) {
                        return '/' + path.join('/');
                    }
                }
            },

            makeBreadcrumbsItem() {
                let path = this.dialog_model.path;
                this.breadcrumbsItems = [];
                this.breadcrumbsItems.push({
                    text: '/',
                    index: 0,
                })
                for (let i = 0; i < path.length; i++) {
                    this.breadcrumbsItems.push({
                        text: path[i],
                        index: i + 1,
                    })
                }
            },

            movePath(index) {
                if (this.dialog_model.path.length == index) {
                    return;
                }
                while (this.dialog_model.path.length != index) {
                    this.dialog_model.path.pop();
                }
                console.log(this.dialog_model.path);
            },

            handleRowClick(item) {
                this.dialog_model.path.push(item.Name);
            },
        },
        watch: {
            "dialog_model.show": {
                handler(val) {
                    this.loading = false;
                    if (val) {
                        this.makeBreadcrumbsItem();
                    }
                },
            },

            "dialog_model.path": {
                handler(val) {
                    this.$emit('get-directory', false)
                    this.makeBreadcrumbsItem();
                },
            },

            "dialog_model.directory": {
                handler(val) {
                    //this.makeBreadcrumbsItem();
                },
            },
        },
    }

</script>

<style>
    .move-path-nav {
        color: rgb(0, 0, 0, 0.7);
        cursor: pointer;
    }

    .move-path-nav:hover {
        color: rgb(0, 0, 0, 0.5);
    }

    .move-path-nav.disable {
        cursor: default;
        color: black;
    }

</style>
