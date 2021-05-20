<template>
  <v-app id="inspire">
    <Nav :app="app" />
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon
        @click.stop="app.nav_drawer_expand = !app.nav_drawer_expand"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Dyna App</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Nav from './components/navigation-drawer'

export default {
  name: "App",

  components: {
    Nav
  },

  data: () => ({
    app: {
      nav_drawer_expand: null,
    },
  }),

  created() {
    this.$vuetify.theme.dark = false;
  },
};
</script>
