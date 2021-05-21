<template>
  <v-main>
    <v-container fluid>
      <v-row class="mt-16">
        <v-col cols="12" xl="4" lg="4" md="6" sm="8" class="mx-auto">
          <v-card class="px-4 py-8 blue-grey--text text--lighten-1">
            <v-card-title class="justify-center">
              {{ text.login }}
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required]"
                  label="Account"
                  color="secondary"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min, rules.max]"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login()" :loading="loading">
                {{text.login}}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

            <v-divider class="mt-4 mb-10"></v-divider>

            <Footer></Footer>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Footer from "../components/auth/footer.vue"
export default {
  name: "Auth",

  components: {
      Footer
  },

  data: () => ({
    text: {
      login: "Login",
    },
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      max: (v) => v.length <= 16 || "Max 16 characters",
    },
    valid: true,
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        console.log("login");
        //this.loading = true;
      }
    },
  },
};
</script>