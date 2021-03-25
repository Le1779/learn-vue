<template>
    <v-container fluid>
        <v-card max-width="344" class="mx-auto" v-if="!isLogin">
            <v-list-item>
                登入
            </v-list-item>

            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="email" :rules="notNullRules" label="Account" required></v-text-field>

                    <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min, rules.max]" :type="showPassword ? 'text' : 'password'" name="input-10-2" label="Password" value="wqfasds" class="input-group--focused" @click:append="showPassword = !showPassword"></v-text-field>

                    <v-text-field v-model="confirm" :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordConfirmationRule]" :type="showConfirm ? 'text' : 'password'" name="input-10-2" label="Confirm" class="input-group--focused" @click:append="showConfirm = !showConfirm" v-if="isRegister"></v-text-field>
                </v-form>
            </v-card-text>

            <v-card-actions v-if="!isRegister">
                <v-btn text color="deep-purple accent-4" @click="isRegister = true">
                    Register
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="deep-purple accent-4" @click="login()" :loading="loading">
                    Login
                </v-btn>
            </v-card-actions>

            <v-card-actions v-if="isRegister">
                <v-btn text color="deep-purple accent-4" @click="isRegister = false">
                    Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="deep-purple accent-4" @click="register()">
                    Register
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card class="mx-auto" max-width="344" v-if="isLogin">
            <v-card-text>
                <p class="text--primary">ID: {{user.ID}}</p>
                <p class="text--primary">Email: {{user.Email}}</p>
                <p class="text--primary">Name: {{user.Name}}</p>
                <p class="text--primary">Gender: {{user.Gender}}</p>
                <p class="text--primary">Phone: {{user.Phone}}</p>
                <p class="text--primary">Birthday: {{user.Birthday}}</p>
                <p class="text--primary">Address: {{user.Address}}</p>
                <p class="text--primary">Password: {{user.Password}}</p>
                <p class="text--primary">Priority: {{user.Priority}}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="deep-purple accent-4" @click="logout()">
                    Logout
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({
            valid: true,
            notNullRules: [v => !!v || '名稱不為空白'],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                max: v => v.length <= 16 || 'Max 16 characters',
                match: this.confirm == this.password || 'No Math',
            },
            email: 'Admin@test.vegetable.store.com',
            password: '12345678',
            showPassword: false,
            confirm: '',
            showConfirm: false,
            isRegister: false,
            isLogin: false,
            loading: false,
            user: {}
        }),

        computed: {
            passwordConfirmationRule() {
                return this.password === this.confirm || "Password must match";
            },
        },

        created() {
            this.getUserInfo();
        },

        methods: {
            login() {
                if (this.$refs.form.validate()) {
                    console.log("login");
                    this.loading = true;
                    let url = this.$HOST + '/User/Login';
                    let postObj = new FormData();
                    postObj.set('Email', this.email);
                    postObj.set('Password', this.password);

                    let self = this;

                    function success(response) {
                        console.log(response);
                        self.$TOKEN = response.data.Token;
                        self.getUserInfo();
                    }

                    function fail(error) {
                        console.log(error);
                        self.loading = false;
                    }

                    httpHelper.excutePost(url, postObj, success, fail);
                }
            },

            logout() {
                localStorage.removeItem('token');
                this.$router.push('/auth');
            },

            register() {
                if (this.$refs.form.validate()) {
                    console.log("register");
                }
            },

            getUserInfo() {
                console.log("getUserInfo");
                let url = this.$HOST + '/User/ReadUserInfo';
                let postObj = new FormData();
                postObj.set('Token', this.$TOKEN);

                let self = this;

                function success(response) {
                    console.log(response);
                    self.loading = false;
                    self.checkToken();
                    self.user = response.data.Data;
                    self.$USER = response.data.Data;
                }

                function fail(error) {
                    console.log(error);
                    self.loading = false;
                }

                httpHelper.excutePost(url, postObj, success, fail);
            },

            checkToken() {
                if (this.$TOKEN != null) {
                    this.isLogin = true;
                }
            }
        },
    }

</script>
