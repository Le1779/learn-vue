<template>
    <v-dialog v-model="dialog_model.show" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ dialog_model.title }}</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="edited_item.UserName" label="User Name" required :rules="nameRules"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="edited_item.EngName" label="English Name" required :rules="engNameRules"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field v-model="edited_item.UserID" label="User ID" required :rules="idRules"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-card class="mx-auto px-4 py-2" outlined>
                                    <div class="overline mb-4">Email</div>
                                    <v-text-field v-model="edited_item.Email" label="Email" required :rules="emailRules"></v-text-field>
                                    <v-chip-group mandatory active-class="primary--text" v-model="selectedEmailIndex">
                                        <v-chip v-for="i in show_text.domain_country.length" :key="i">
                                            {{ getEmail(i - 1) }}
                                        </v-chip>
                                    </v-chip-group>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="7" md="7">
                                <v-card class="mx-auto px-4 py-2" outlined>
                                    <div class="overline mb-4">Priority</div>
                                    <v-chip-group mandatory active-class="primary--text" v-model="edited_item.PriorityLevel">
                                        <v-chip v-for="i in show_text.priority.length" :key="i">
                                            {{ getPriorityName(i - 1) }}
                                        </v-chip>
                                    </v-chip-group>
                                </v-card>
                            </v-col>
                            <v-col cols="12" sm="5" md="5">
                                <v-card class="mx-auto px-4 py-2" outlined>
                                    <div class="overline mb-4">Position</div>
                                    <v-chip-group mandatory active-class="primary--text" v-model="positionKey">
                                        <v-chip key="L">{{ show_text.position[0] }}</v-chip>
                                        <v-chip key="E">{{ show_text.position[1] }}</v-chip>
                                    </v-chip-group>
                                </v-card>

                            </v-col>
                            <v-col cols="12">
                                <v-card class="mx-auto px-4 py-2" outlined>
                                    <div class="overline mb-4">Country</div>
                                    <v-chip-group mandatory active-class="primary--text" v-model="countryKey">
                                        <v-chip key="zh-TW">{{ show_text.country[0] }}</v-chip>
                                        <v-chip key="ja_JP">{{ show_text.country[1] }}</v-chip>
                                        <v-chip key="zh_CN">{{ show_text.country[2] }}</v-chip>
                                    </v-chip-group>
                                </v-card>

                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text :loading="loading" :disabled="loading" @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    let viewModel = {
        loading: false,
        valid: true,
        nameRules: [
            v => !!v || '請填入資料',
        ],

        engNameRules: [
            v => !!v || '請填入資料',
            v => /^[a-zA-Z0-9_/ ]*$/.test(v) || '輸入違法字元',
        ],

        idRules: [
            v => !!v || '請填入資料',
            v => /^[a-zA-Z0-9_/]*$/.test(v) || '輸入違法字元',
        ],

        emailRules: [
            v => !!v || '請填入資料',
            v => /^[a-zA-Z0-9_/.@]*$/.test(v) || '輸入違法字元',
        ],

        isInit: false,
        selectedEmailIndex: 0,
    };

    module.exports = {
        props: ["dialog_model", "edited_item", "show_text"],
        data: function() {
            return viewModel
        },

        computed: {
            positionKey: function() {
                if (this.edited_item.Position == 'L') {
                    return 0;
                } else if (this.edited_item.Position == 'E') {
                    return 1;
                }
                return 0;
            },

            countryKey: function() {
                if (this.edited_item.Country == 'zh-TW') {
                    return 0;
                } else if (this.edited_item.Country == 'ja_JP') {
                    return 1;
                } else if (this.edited_item.Country == 'zh_CN') {
                    return 2;
                }
                return 0;
            },
        },

        methods: {
            getPriorityName(priority) {
                return this.show_text.priority[priority];
            },

            getEmail: function(index) {
                let keyWordIndex = this.edited_item.Email.search('@dynacw.');
                let email = this.edited_item.Email.substring(0, keyWordIndex);
                return email + this.show_text.domain + this.show_text.domain_country[index]
            },

            getSelectedEmailIndex: function(email) {
                let keyWordIndex = this.edited_item.Email.search('@dynacw.');
                let email1 = this.edited_item.Email.substring(keyWordIndex + '@dynacw.'.length);
                this.selectedEmailIndex = this.show_text.domain_country.indexOf(email1);
            },

            close() {
                this.dialog_model.show = false;
            },

            save() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    this.edited_item.Email = this.getEmail(this.selectedEmailIndex);
                    console.log(this.edited_item);
                }

                //this.$emit('dialog_data', false)
            }
        },
        watch: {
            dialog_model: {
                handler(val) {
                    if (val.show) {
                        this.loading = false;
                        this.isInit = false;
                    }

                    //this.selectedEmailIndex = 0;
                },
                deep: true
            },

            "edited_item.EngName": function() {
                if (this.dialog_model.isEdit) {
                    return
                }
                let regexValue = this.edited_item.EngName.replace(/[ ]/g, '_').replace(/[^a-zA-Z0-9_/]/g, '').toLowerCase();
                this.edited_item.UserID = regexValue;
            },

            "edited_item.UserID": function() {
                if (this.dialog_model.isEdit) {
                    return
                }

                if (this.edited_item.UserID == '') {
                    this.edited_item.Email = '';
                    return;
                }
                
                this.edited_item.Email = this.edited_item.UserID + this.show_text.domain + this.show_text.domain_country[this.selectedEmailIndex];

            },

            "edited_item.Email": function() {
                console.log("Email");
                if (!this.isInit) {
                    this.getSelectedEmailIndex(this.edited_item.Email);
                    this.isInit = true;
                }
            },

            selectedEmailIndex: {
                handler(val) {
                    console.log("selectedEmailIndex");
                    this.edited_item.Email = this.getEmail(val);
                },
            },
        }
    }

</script>

<style scoped>


</style>
