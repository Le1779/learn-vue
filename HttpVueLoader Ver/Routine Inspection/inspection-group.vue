<template>
  <div class="group-container" @click="onClick">
    <div class="title">群組 . {{group_data.Elements.length}}個項目</div>
    <div>
      <span class="group-name-title">Name:</span>
      <input v-model="group_data.Name" type="text" @click.stop/>
    </div>
    <div>
      <button class="delete-button" @click.stop="onDeleteButtonClick">
        Delete
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
.group-container {
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px #585858 solid;
  padding: 12px;
  cursor: pointer;
}

.title {
  color: #787878;
  font-size: 0.85rem;
}

.group-name-title {
  color: #787878;
  font-size: 0.85rem;
  margin-right: 8px;
}

input {
  color: #383838;
  font-size: 0.85rem;
  border: 0px solid;
  border-bottom: 1px #585858 solid;
  padding: 5px 8px;
}

.delete-button {
  float: right;
  background-color: #fbe9e7;
  color: #d32f2f;
  padding: 8px 12px;
  border: 0px solid;
  border-radius: 5px;
  margin-top: 8px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ffcdd2;
}
</style>
