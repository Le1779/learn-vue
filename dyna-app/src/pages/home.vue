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
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
import Nav from "../components/nav/navigation-drawer.vue";
export default {
  name: "Home",

  components: {
    Nav,
  },

  data: () => ({
    app: {
      nav_drawer_expand: null,
      items: [
        {
          id: 1,
          icon: "account",
          text: "顧客列表",
          link: "/customer",
          children: []
        },
        {
          id: 2,
          icon: "barcode",
          text: "交易查詢",
          link: "",
          children: [
            {
              id: 21,
              icon: "",
              text: "顧客交易列表",
              link: "/purchase",
            },{
              id: 22,
              icon: "",
              text: "顧客交列表",
              link: "/app-store-response",
            },
          ],
        },
      ],
    },
  }),
};
</script>

<style scoped>
</style>

