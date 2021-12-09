<template>
  <div class="group-container" @click.self="onClick">
    <div class="group-name-title">Name</div>
    <input v-model="group_data.Name" type="text" />
    <div>
      <button @click.stop="onDeleteButtonClick">Delete</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {},

  props: {
    index: {
      type: Number,
      default: 0,
    },
    group_data: {
      type: Object,
      default() {
        return {
          TableManagerId: 0,
          Elements: [],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 1,
          Name: "",
        };
      },
    },
    root_data: {
      type: Object,
      default() {
        return null;
      },
    },
  },

  data: () => ({}),

  methods: {
    onClick() {
      this.$emit("action", this.group_data, this.root_data);
    },

    onDeleteButtonClick() {
      this.$emit("delete", this.index);
    },
  },
};
</script>

<style scoped>
.group-container {
  border: 2px #585858 solid;
  padding: 12px;
  cursor: pointer;
}
</style>
