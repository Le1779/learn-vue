<template>
  <div>
    <v-row>
      <div class="mx-auto">
        <v-list-item class="d-inline-flex">
          <v-list-item-avatar tile size="50">
            <v-img :src="require('../../assets/logo.svg')" contain />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class="headline mb-1 blue-grey--text text--lighten-1"
            >
              {{ text.app_name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-row>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="text-center blue-grey--text text--lighten-3"
          >{{ text.copyright }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  components: {},

  data: () => ({
    text: {
      app_name: "DynaAppAPI後臺系統",
      copyright: "©DynaComware. 2019",
    },
  }),
};
</script>

<style scoped>
</style>

