<template>
  <div class="container">
      <Group v-if="type == 'div'" :group_data="data"></Group>
      <div v-else></div>
  </div>
</template>

<script>
module.exports = {
  components: {
    group: httpVueLoader("inspection-group.vue"),
  },

  props: ["data"],

  data: () => ({
      type: "div"
  }),

  methods: {},
};
</script>

<style scoped>
.container {
    border: 2px #585858 solid;
}

.line_and_button {
  display: grid;
  grid-template-columns: auto 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0;
}

.line_and_button:hover {
  opacity: 1;
}

.line {
  border-bottom: 2px #585858 dashed;
  height: 50%;
  margin-right: 8px;
}

.add_button {
  background: url("add_circle_outline_black_24dp.svg");
}
</style>
