<template>
  <div class="app-container">
    <PersonnelManagement></PersonnelManagement>
  </div>
</template>

<script>
module.exports = {
  props: {},
  data: () => ({}),

  watch: {},

  created() {},

  components: {
    personnelmanagement: httpVueLoader("personnel-management.vue"),
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
