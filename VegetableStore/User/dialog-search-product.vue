<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="dialog_model.item.Account" label="使用者帳號"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Name" label="使用者名稱"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Phone" label="使用者電話"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="dialog_model.item.Address" label="使用者地址"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions class="px-7 py-4">
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">取消</v-btn>
                <v-btn color="pink lighten-2" text @click="clean">清除</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">搜尋</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["dialog_model"],

        data: () => ({
            menu: false,
            menu2: false,
            createDateEnd: '',
            title: '搜尋使用者',
        }),

        methods: {
            close() {
                this.dialog_model.show = false;
            },
            
            clean() {
                this.dialog_model.item.Account = '';
                this.dialog_model.item.Name = null;
                this.dialog_model.item.Phone = null;
                this.dialog_model.item.Address = null;
                this.save();
            },
            
            save() {
                this.loading = true;
                this.dialog_model.action();
                this.close();
            }
        },

        computed: {
        },

        watch: {
            dialog_model: {
                handler(val) {
                    if (val.show) {
                        this.loading = false;
                    }
                },
                deep: true
            },
        }
    }

</script>
