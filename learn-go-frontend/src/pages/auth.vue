<template>
  <div>
    <h1>Auth</h1>
    <div id="auth-container">
      <AuthNav id="auth-nav" v-model:is_login="isLogin" />
      <Textview
        class="textview"
        v-model:value="email"
        v-model:model="emailTextviewModel"
      />
      <Textview
        class="textview"
        v-model:value="password"
        v-model:model="passwordTextviewModel"
      />
      <Textview
        v-if="!isLogin"
        class="textview"
        v-model:value="confirmPassword"
        v-model:model="confirmPasswordTextviewModel"
      />
      <ErrorMessage v-if="errorMsg != null && errorMsg != ''" v-model:msg="errorMsg" class="error-message"/>
      <Button class="button" v-model:loading="loading" @click="onButtonClick" />
    </div>
  </div>
</template>

<script>
import AuthNav from "../components/auth/auth-nav.vue";
import Textview from "../components/textview.vue";
import Button from "../components/auth/button.vue";
import ErrorMessage from "../components/auth/error-message.vue";
export default {
  data() {
    return {
      isLogin: true,
      emailTextviewModel: {
        placeholder: "Email",
        type: "email",
        name: "email",
      },
      passwordTextviewModel: {
        placeholder: "Password",
        type: "password",
        name: "password",
      },
      confirmPasswordTextviewModel: {
        placeholder: "Password",
        type: "password",
        name: "password",
      },
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      errorMsg: ""
    };
  },
  components: {
    AuthNav,
    Textview,
    Button,
    ErrorMessage
  },
  methods: {
    onButtonClick() {
      if (this.loading) {
        return;
      }

      this.errorMsg = "";
      this.loading = true;
      var self = this;
      setInterval(() => {
        self.loading = false;
        self.errorMsg = "Debugging.";
      }, 3000);
    },
  },
};
</script>

<style scoped>
#auth-container {
  display: table;
  margin: auto;
  padding: 48px 24px;
  border: 2px #383838 solid;
  border-radius: 5px;
  min-width: 360px;
}

#auth-nav {
  margin-bottom: 2rem;
}

.textview {
  margin-bottom: 1rem;
}

.error-message {
  margin-top: 1rem;
}

.button {
  display: inline;
  width: 5rem;
  margin-top: 1rem;
  float: right;
}
</style>

