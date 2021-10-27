<template>
  <div>
    <BusinessCard></BusinessCard>
  </div>
</template>

<script>
module.exports = {
  components: {
    businesscard: httpVueLoader("business-card.vue"),
  },

  data: () => ({}),

  methods: {},
};
</script>

<style scoped>
</style>
