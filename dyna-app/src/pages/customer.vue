<template>
  <v-container>
    <v-card class="blue-grey--text text--lighten-1">
      <v-card-title>
        {{ text.title }}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Customer",

  components: {},

  data: () => ({
    text: {
      title: "顧客帳號列表",
    },
  }),
};
</script>
