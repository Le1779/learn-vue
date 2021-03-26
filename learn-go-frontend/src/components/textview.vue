<template>
  <div id="container">
    <input
      v-model="val"
      :placeholder="model.placeholder"
      :type="model.type"
      :name="model.name"
    />
  </div>
</template>

<script>
export default {
  props: ["value", "model"],
  data() {
    return {
      val: this.value,
    };
  },
  watch: {
    val: function (val) {
      this.$emit("update:value", val);
    },
  },
  methods: {},
};
</script>

<style scoped>
#container {
  background: #e8e8e8;
  height: 2.5rem;
  border-radius: 1.25rem;
  padding: 0 1.25rem;
  line-height: 2.5rem;
}

input {
  width: 100%;
  background: transparent;
  border: none;
}

input:focus {
  outline: none;
}

input:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}
</style>

