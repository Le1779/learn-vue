<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Name" label="商品名稱"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select v-model="dialog_model.item.IsInStock" :items="inStockItems" item-text="text" item-value="value" label="是否上架"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="dialog_model.item.CreateDate" label="從" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="dialog_model.item.CreateDate" no-title @input="menu = false" :max="createDateEnd"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="createDateEnd" label="到" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="createDateEnd" no-title @input="menu2 = false" :min="dialog_model.item.CreateDate"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Price" label="售價"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select v-model="dialog_model.item.Unit" :items="unitItems" label="單位"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="dialog_model.item.Stock" label="庫存量"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select v-model="dialog_model.item.Area" :items="areaItems" label="銷售地區"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="dialog_model.item.Remark" label="商品敘述" outlined></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions class="px-7 py-4">
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">搜尋</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["dialog_model", "search_item"],

        data: () => ({
            menu: false,
            menu2: false,
            createDateEnd: '',
            title: '搜尋商品',
            unitItems: ['個', '條', '根', '包', '斤', '箱', '袋'],
            areaItems: ['全區', '北區', '中區', '南區', '東區'],
            inStockItems: [{
                    text: '無',
                    value: -1
                },
                {
                    text: '是',
                    value: 1
                },
                {
                    text: '否',
                    value: 0
                }
            ]
        }),

        methods: {
            close() {
                this.dialog_model.show = false;
            },
            save() {
                this.loading = true;
                this.dialog_model.action();
                this.close();
            }
        },

        computed: {
            showPickedDate() {
                return this.pickedDate.length <= 1 ? null : this.pickedDate[0] + "~" + this.pickedDate[1]
            },
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

<style scoped>


</style>
