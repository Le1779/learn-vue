<template>
  <v-list-item link :to="item.link">
    <v-list-item-action>
      <v-icon>mdi-{{ item.icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        {{ item.text }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ["item"],

  components: {},

  data: () => ({}),
};
</script>
