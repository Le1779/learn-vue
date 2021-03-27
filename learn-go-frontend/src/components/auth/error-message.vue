<template>
  <div id="container">
    {{ msg }}
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "Error msg.",
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
#container {
  line-height: 2.5rem;
  background-color: #fbe9e7;
  color: #d32f2f;
  padding: 0.25rem 0 0.25rem 1.25rem;
  min-height: 2.5rem;
  border-radius: 0.25rem;
}
</style>
