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
                            <v-col v-if="false" cols="5">
                                <v-avatar class="profile elevation-10" color="grey" size="164" tile>
                                    <v-img src="https://picsum.photos/164?random"></v-img>
                                </v-avatar>
                            </v-col>

                            <v-col cols="12">
                                <v-col cols="12" class="pa-0">
                                    <v-text-field v-model="dialog_model.item.Email" label="使用者信箱" :rules="[rules.required]" filled></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field v-model="dialog_model.item.Password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min, rules.max]" :type="showPassword ? 'text' : 'password'" name="input-10-2" label="使用者密碼" class="input-group--focused" @click:append="showPassword = !showPassword" filled></v-text-field>
                                </v-col>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.Name" label="使用者名稱"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dialog_model.item.Phone" label="使用者電話"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select v-model="dialog_model.item.Gender" :items="genderItems" label="性別"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dialog_model.item.Birthday" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dialog_model.item.Birthday" label="Picker in menu" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dialog_model.item.Birthday" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(dialog_model.item.Birthday)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="dialog_model.item.Address" label="使用者地址"></v-text-field>
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
            stepper: 1,
            valid: true,
            rules: {
                required: value => !!value || '必填',
                min: v => v.length >= 8 || 'Min 8 characters',
                max: v => v.length <= 16 || 'Max 16 characters',
                match: this.confirm == this.password || 'No Math',
            },
            showPassword: false,
            genderItems: ['無', '男', '女'],
            menu: false,
        }),

        computed: {
            title() {
                return this.dialog_model.isEdit ? '編輯使用者' : '建立使用者'
            },

            actionTitle() {
                return this.dialog_model.isEdit ? '編輯' : '建立'
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
