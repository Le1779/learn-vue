<template>
  <div class="app-container">
    <InspectionTable></InspectionTable>
  </div>
</template>

<script>
module.exports = {
  props: {},
  data: () => ({}),

  watch: {},

  created() {},

  components: {
    inspectiontable: httpVueLoader("inspection-table.vue"),
  },

  methods: {},
};
</script>

<style scoped>
.app-container {
  background: #f5f6f6;
  padding: 24px 24px;
  overflow: auto;
}
</style>
