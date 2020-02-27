<template>
    <v-dialog v-model="dialog_model.show" scrollable max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-file-input v-model="pic1" :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" counter="1" prepend-icon="mdi-camera" label="Avatar"></v-file-input>
                                <v-img :src="picData.pic1" height="300px" contain></v-img>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="pic2" :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" counter="1" prepend-icon="mdi-camera" label="Avatar"></v-file-input>
                                <v-img :src="picData.pic2" height="300px" contain></v-img>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="pic3" :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" counter="1" prepend-icon="mdi-camera" label="Avatar"></v-file-input>
                                <v-img :src="picData.pic3" height="300px" contain></v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">儲存</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["dialog_model"],
        data: () => ({
            title: '編輯商品照片',
            valid: true,
            uploadImages: [],
            rules: [
                v => v.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            pic1: [],
            pic2: [],
            pic3: [],
            picData: {
                pic1: '',
                pic2: '',
                pic3: ''
            },
        }),

        methods: {
            close() {
                this.dialog_model.show = false;
            },

            save() {
                console.log(this.dialog_model.item.Image);
                this.dialog_model.loading = true;
                this.dialog_model.action()
            },

            readerImage(file, index) {
                let reader = new FileReader();
                let self = this;
                reader.onload = function(e) {
                    self.dialog_model.item.Image.splice(index, 1, e.target.result);
                    switch (index) {
                        case 0:
                            self.picData.pic1 = e.target.result;
                            break;
                        case 1:
                            self.picData.pic2 = e.target.result;
                            break;
                        case 2:
                            self.picData.pic3 = e.target.result;
                            break;
                    }
                }

                reader.readAsDataURL(file);
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

            "pic1": {
                handler(val) {
                    console.log(val);
                    if (val === undefined) {
                        this.dialog_model.item.Image.splice(0, 1, null);
                        this.picData.pic1 = '';
                    } else {
                        this.readerImage(val, 0);
                    }
                },
            },

            "pic2": {
                handler(val) {
                    if (val === undefined) {
                        this.dialog_model.item.Image.splice(1, 1, null);
                        this.picData.pic2 = '';
                    } else {
                        this.readerImage(val, 1);
                    }
                },
            },

            "pic3": {
                handler(val) {
                    if (val === undefined) {
                        this.dialog_model.item.Image.splice(2, 1, null);
                        this.picData.pic3 = '';
                    } else {
                        this.readerImage(val, 2);
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
