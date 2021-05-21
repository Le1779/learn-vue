<template>
  <v-navigation-drawer v-model="app.nav_drawer_expand" app clipped hide-overlay>
    <template v-slot:prepend>
      <v-list-item two-line v-if="$USER != null">
        <v-list-item-avatar color="red">
          <span class="white--text headline">{{ $USER.Name.charAt(0) }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $USER.Name }}</v-list-item-title>
          <v-list-item-subtitle>{{
            $USER.Priority == 74970855 ? "管理員" : "一般用戶"
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-if="$USER == null">
        <v-list-item-content>
          <v-list-item-title>未登入</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list dense>
      <v-list-item-group v-model="selected_view">
        <component
          :is="item.children.length == 0 ? 'Item' : 'SubGroup'"
          v-for="item in app.items"
          :key="item.idß"
          :item="item"
        />
      </v-list-item-group>

      <v-list-item class="mt-4" link to="/auth">
        <v-list-item-action>
          <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1"
          >登入</v-list-item-title
        >
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon color="grey darken-1">mdi-settings</v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1"
          >Manage Subscriptions</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SubGroup from "./sub-group.vue";
import Item from "./item.vue";
export default {
  props: ["app"],
  data: () => ({
    selected_view: 0,
  }),

  components: {
    SubGroup,
    Item,
  },

  watch: {
    $USER: {
      handler() {
        console.log("user change");
        console.log(this.$USER);
      },
    },
  },
};
</script>
