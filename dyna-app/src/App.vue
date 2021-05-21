<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {},

  data: () => ({
  }),

  created() {
    this.$TOKEN = "DEBUG"
    //this.$vuetify.theme.dark = false;
  },
};
</script>

<style scoped>
#inspire {
  background-color: #F7F7F7;
}
</style>
