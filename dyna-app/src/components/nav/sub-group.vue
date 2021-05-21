<template>
  <v-list-group :prepend-icon="'mdi-' + item.icon">
    <template v-slot:activator>
      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </template>
    <Item v-for="item in item.children" :item="item" :key="item.id" />
  </v-list-group>
</template>

<script>
import Item from "./item.vue";
export default {
  props: ["item"],

  components: {
    Item,
  },

  data: () => ({}),
};
</script>
