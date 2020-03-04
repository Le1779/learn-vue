<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
                <span class="ml-2 subtitle-1">{{dialog_model.item.SerialNo}}</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.Name" label="商品名稱" :rules="notNullRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.CreateDate" label="建立時間" readonly></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.Price" label="售價"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select v-model="dialog_model.item.Unit" :items="unitItems" label="單位" :rules="notNullRules"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.Inventory" label="庫存量"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select v-model="dialog_model.item.Area" :items="areaItems" label="銷售地區" :rules="notNullRules"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="dialog_model.item.Remark" label="商品敘述" outlined></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions class="px-7 py-0">
                <v-switch v-model="isInStock" label="是否上架"></v-switch>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="showEditImageDialog">修改圖片</v-btn>
                <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">{{actionTitle}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["dialog_model"],
        data: () => ({
            stepper: 1,
            valid: true,
            notNullRules: [v => !!v || '名稱不為空白'],
            unitItems: ['個', '條', '根', '包', '斤', '箱', '袋'],
            areaItems: ['全區', '北區', '中區', '南區', '東區'],
            uploadImages: [],

            dialog_image_edit_model: {
                loading: false,
                show: false,
                item: '',
                action: null,
            },
        }),

        computed: {
            title() {
                return this.dialog_model.isEdit ? '編輯商品' : '建立商品'
            },

            actionTitle() {
                return this.dialog_model.isEdit ? '編輯' : '建立'
            },

            uploadImageTitle() {
                return this.dialog_model.item.Image != "" ? '編輯圖片' : '上傳圖片'
            },

            isInStock: {
                get: function() {
                    return this.dialog_model.item.IsInStock == 1
                },
                set: function(value) {
                    this.dialog_model.item.IsInStock = value ? 1 : 0
                }
            }
        },

        methods: {
            close() {
                this.dialog_model.show = false;
            },

            save() {
                if (this.$refs.form.validate()) {
                    this.dialog_model.loading = true;
                    this.dialog_model.action()
                }
            },

            showEditImageDialog() {
                this.dialog_model.showEditImageAction(this.dialog_model.item.SerialNo, this.dialog_model.isEdit);
            }
        },

        watch: {
            "dialog_model.show": {
                handler(val) {
                    this.dialog_model.loading = false;
                    this.dialog_model.item.CreateDate = getFormatDate(Date.now(), true);
                    if (!this.dialog_model.isEdit) {
                        this.uploadImages = []
                    }
                },
            },
        },
    }

    function getFormatDate(date, showTime) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        if (!showTime) {
            return [year, month, day].join('/');
        }

        let hour = d.getHours();
        let minute = d.getMinutes();
        let second = d.getSeconds();

        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        let t = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return [year, month, day].join('/') + ' ' + [hour, minute, second].join(':');
    }

</script>

<style scoped>


</style>
