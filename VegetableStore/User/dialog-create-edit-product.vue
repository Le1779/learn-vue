<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
                <v-avatar v-if="dialog_model.isEdit" class="ml-2" size="24">
                    <img src="../VegetableStore/Image/facebook.svg" alt="John">
                </v-avatar>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="5">
                                <v-avatar class="profile elevation-10" color="grey" size="164" tile>
                                    <v-img src="https://picsum.photos/164?random"></v-img>
                                </v-avatar>
                            </v-col>

                            <v-col cols="7">
                                <v-col cols="12" class="pa-0">
                                    <v-text-field v-model="dialog_model.item.Account" label="使用者帳號" :rules="notNullRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field v-model="dialog_model.item.Password" label="使用者密碼" :rules="notNullRules"></v-text-field>
                                </v-col>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.Name" label="使用者名稱" :rules="notNullRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.Phone" label="使用者電話"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="dialog_model.item.Address" label="使用者地址"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions >
                <v-spacer></v-spacer>
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
        }),

        computed: {
            title() {
                return this.dialog_model.isEdit ? '編輯使用者' : '建立使用者'
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

            readerImage(files, index) {
                let reader = new FileReader();
                let self = this;
                reader.onload = function(e) {
                    self.dialog_model.item.Image.push(e.target.result);
                    if (files.length > ++index) {
                        self.readerImage(files, index);
                    }
                }

                reader.readAsDataURL(files[index]);
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

            uploadImages: {
                handler(val) {
                    console.log(val);
                    this.dialog_model.item.Image = [];
                    let uploadLength = val.length;
                    if (uploadLength > 5 || uploadLength == 0) {
                        return;
                    }

                    this.readerImage(val, 0);
                },
            },
        }
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
