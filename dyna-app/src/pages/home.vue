<template>
  <div>
    <Nav :app="app" />
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon
        @click.stop="app.nav_drawer_expand = !app.nav_drawer_expand"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Dyna App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      
    </v-main>
  </div>
</template>

<script>
import Nav from "../components/navigation-drawer.vue";
export default {
  name: "Home",
  
  components: {
    Nav,
  },

  data: () => ({
    app: {
      nav_drawer_expand: null,
    },
  }),
};
</script>

<style scoped>
</style>

