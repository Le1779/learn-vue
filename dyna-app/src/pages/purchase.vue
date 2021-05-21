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
      title: "顧客交易紀錄列表",
    },
  }),
};
</script>
