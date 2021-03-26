<template>
  <div>
    <h1>Auth</h1>
    <div id="auth-container">
      <AuthNav v-model:is_login="isLogin"/>
      <input v-model="email" placeholder="Email" type="text" />
      <input v-model="password" placeholder="Password" type="text" />
      <input v-model="confirmPassword" v-if="!isLogin" placeholder="Confirm" type="text" />
      <button>Login</button>
    </div>
  </div>
</template>

<script>
import AuthNav from '../components/auth/auth-nav.vue'
export default {
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  components: {
      AuthNav
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
}
</style>

