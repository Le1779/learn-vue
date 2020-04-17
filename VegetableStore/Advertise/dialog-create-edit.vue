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
                            <v-col cols="12" sm="6">
                                <v-menu v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dialog_model.item.StartDate" label="廣告投放起始日" readonly v-on="on" required :rules="notNullRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dialog_model.item.StartDate" @input="startDateMenu = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-menu v-model="endDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dialog_model.item.EndDate" label="廣告投放結束日" readonly v-on="on" required :rules="notNullRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dialog_model.item.EndDate" @input="endDateMenu = false" :min="dialog_model.item.StartDate"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="dialog_model.item.Link" label="連結" :rules="notNullRules"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="pic" :rules="imgRules" accept="image/png, image/jpeg, image/bmp" placeholder="上傳廣告圖片" counter="1" prepend-icon="mdi-camera" label="廣告圖片"></v-file-input>
                                <v-img :src="dialog_model.item.ResourceUrl" height="300px" contain></v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" class="white--text" :loading="dialog_model.loading" :disabled="dialog_model.loading" @click="save">{{actionTitle}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: ["dialog_model"],
        data: () => ({
            pic: [],
            startDateMenu: false,
            endDateMenu: false,
            today: '',
            stepper: 1,
            valid: true,
            imgRules: [
                v => v.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            notNullRules: [v => !!v || '名稱不為空白'],

        }),

        computed: {
            title() {
                return this.dialog_model.isEdit ? '編輯廣告' : '新增廣告'
            },

            actionTitle() {
                return this.dialog_model.isEdit ? '編輯' : '新增'
            },
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

            readerImage(file) {
                let reader = new FileReader();
                let self = this;
                reader.onload = function(e) {
                    self.compressImage(e.target.result, function(base64) {
                        self.dialog_model.item.ResourceUrl = base64;
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

            "pic": {
                handler(val) {
                    console.log(val);
                    if (val === undefined) {
                        this.pic = '';
                    } else {
                        this.readerImage(val);
                    }
                },
            },
        }
    }

</script>