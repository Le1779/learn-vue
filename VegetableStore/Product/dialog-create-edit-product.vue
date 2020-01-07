<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>

            <v-card-text>
                <v-stepper v-model="stepper" class="elevation-0">

                    <v-stepper-items>
                        <v-stepper-content step="1" class="pa-0">
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
                                            <v-text-field v-model="dialog_model.item.Stock" label="庫存量"></v-text-field>
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
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-file-input v-model="uploadImages" color="pink lighten-1" counter="5" label="File input" multiple accept="image/png, image/jpeg, image/bmp" placeholder="商品圖片" prepend-icon="mdi-camera" :show-size="1000">
                                <template v-slot:selection="{ index, text }">
                                    <v-chip v-if="index < 2" color="pink lighten-1" dark label small>
                                        {{ text }}
                                    </v-chip>

                                    <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
                                        +{{ uploadImages.length - 2 }} File(s)
                                    </span>
                                </template>
                            </v-file-input>
                            <v-carousel height="300px">
                                <v-carousel-item v-for="(data, i) in dialog_model.item.Image" :key="data">
                                    <v-img :src="data" height="300px" contain></v-img>
                                </v-carousel-item>
                            </v-carousel>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>

            <v-card-actions v-if="stepper == 1" class="px-7 py-0">
                <v-switch v-model="isInStock" label="是否上架"></v-switch>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="pink lighten-1" text @click="stepper = 2">{{uploadImageTitle}}</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">{{actionTitle}}</v-btn>
            </v-card-actions>

            <v-card-actions v-if="stepper == 2" class="px-7 py-0 mb-4">
                <v-btn color="grey darken-1" text @click="stepper = 1">Back</v-btn>
                <v-spacer></v-spacer>
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
                    this.uploadImage = null;
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