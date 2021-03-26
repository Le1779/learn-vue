<template>
  <div id="container">
      <span id="login" :class="{active: is_login}" @click="onClick(true)">{{loginStr}}</span>
      <span id="slash">|</span>
      <span id="register" :class="{active: !is_login}" @click="onClick(false)">{{registerStr}}</span>
  </div>
</template>

<script>
export default {
  props: {
      is_login: {
        type: Boolean,
        default: false
     }
    }, 
  data() {
    return {
      loginStr: "Login",
      registerStr: "Register"
    };
  },
  methods: {
      onClick(isLogin) {
          this.$emit('update:is_login', isLogin)
      },
  }
};
</script>

<style scoped>
#container {
    height: 3rem;
    line-height: 2rem;
}

#login, #register {
    cursor: pointer;
    color: #C8C8C8;
    transition: all 1s;
}

#login:hover, #register:hover {
    font-size: 1.4rem;
    color: #787878;
}

#login.active, #register.active {
    font-size: 2rem;
    color: #383838;
}

#slash {
    font-size: 2rem;
    color: #C8C8C8;
    padding: 0rem 0.5rem;
}
</style>

