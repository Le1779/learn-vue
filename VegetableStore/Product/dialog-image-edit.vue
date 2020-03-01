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
                                <v-file-input v-model="pic1" :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="上傳圖片一" counter="1" prepend-icon="mdi-camera" label="圖片一"></v-file-input>
                                <v-img :src="dialog_model.pic1" height="300px" contain></v-img>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="pic2" :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="上傳圖片二" counter="1" prepend-icon="mdi-camera" label="圖片二"></v-file-input>
                                <v-img :src="dialog_model.pic2" height="300px" contain></v-img>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="pic3" :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="上傳圖片三" counter="1" prepend-icon="mdi-camera" label="圖片三"></v-file-input>
                                <v-img :src="dialog_model.pic3" height="300px" contain></v-img>
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
        }),

        methods: {
            close() {
                this.dialog_model.show = false;
            },

            save() {
                this.dialog_model.loading = true;
                this.dialog_model.action()
            },

            readerImage(file, index) {
                let reader = new FileReader();
                let self = this;
                reader.onload = function(e) {
                    //self.dialog_model.item.Image.splice(index, 1, e.target.result);
                    self.compressImage(e.target.result, function(base64) {
                        switch (index) {
                            case 0:
                                self.dialog_model.pic1 = base64;
                                break;
                            case 1:
                                self.dialog_model.pic2 = base64;
                                break;
                            case 2:
                                self.dialog_model.pic3 = base64;
                                break;
                        }
                    });
                }

                reader.readAsDataURL(file);
            },

            compressImage(path, callback) {
                var img = new Image();
                img.src = path;
                img.onload = function() {
                    var afterWidth = this.width || 300;
                    var scale = afterWidth / this.width;
                    var afterHeight = this.height * scale;
                    var quality = 0.7;
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var anw = document.createAttribute("width");
                    anw.nodeValue = afterWidth;
                    var anh = document.createAttribute("height");
                    anh.nodeValue = afterHeight;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(this, 0, 0, afterWidth, afterHeight);

                    var base64 = canvas.toDataURL('image/jpeg', quality);
                    callback(base64);
                }
            },
        },

        watch: {
            "dialog_model.show": {
                handler(val) {
                    this.dialog_model.loading = false;
                    if (!this.dialog_model.isEdit) {
                        this.uploadImages = []
                    }
                },
            },

            "pic1": {
                handler(val) {
                    console.log(val);
                    if (val === undefined) {
                        //this.dialog_model.item.Image.splice(0, 1, null);
                        this.dialog_model.pic1 = '';
                    } else {
                        this.readerImage(val, 0);
                    }
                },
            },

            "pic2": {
                handler(val) {
                    if (val === undefined) {
                        //this.dialog_model.item.Image.splice(1, 1, null);
                        this.dialog_model.pic2 = '';
                    } else {
                        this.readerImage(val, 1);
                    }
                },
            },

            "pic3": {
                handler(val) {
                    if (val === undefined) {
                        //this.dialog_model.item.Image.splice(2, 1, null);
                        this.dialog_model.pic3 = '';
                    } else {
                        this.readerImage(val, 2);
                    }
                },
            },
        },
    }
</script>
