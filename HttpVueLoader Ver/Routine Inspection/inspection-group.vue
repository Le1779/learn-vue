<template>
  <div class="item-container group" @click="onClick">
    <div class="title">群組 . {{ group_data.Elements.length }}個項目</div>
    <div>
      <span>Name:</span>
      <input v-model="group_data.Name" type="text" @click.stop />
    </div>
    <div>
      <button class="delete-button" @click.stop="onDeleteButtonClick">
        刪除
      </button>
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
.item-container.group {
  cursor: pointer;
}

.title {
  color: #787878;
  font-size: 0.85rem;
}
</style>
