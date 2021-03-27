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
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 1.25rem;
  background: #e8e8e8;
}

input {
  padding: 0 1.25rem;
  width: 100%;
  height: 2.5rem;
  border-radius: 1.25rem;
  background: transparent;
  border: none;
}

input:focus {
  outline: none;
  border: 2px #383838 solid;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 100px #e8e8e8 inset;
}
</style>
