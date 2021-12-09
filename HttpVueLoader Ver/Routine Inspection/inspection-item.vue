<template>
  <div class="item-container">
    <div class="item-name-row">
      <span>ID: </span>
      {{ item_data.ItemId }}
    </div>
    <div class="item-name-row">
      <span>Name: </span>
      <input v-model="item_data.Name" type="text" />
    </div>
    <div class="item-name-row">
      <span>Condition: </span>
      <input v-model="item_data.CheckCond" type="text" />
    </div>
    <div class="item-name-row">
      <span>Description: </span>
      <input v-model="item_data.Description" type="text" />
    </div>
    <div class="item-name-row">
      <span>Unit: </span>
      <input v-model="item_data.Unit" type="text" />
    </div>
    <div class="item-name-row">
      <span>Type: </span>
      <select v-model="item_data.Type">
        <option value="int">int</option>
        <option value="float(1)">float(1)</option>
        <option value="float(1)">float(2)</option>
        <option value="float(1)">float(3)</option>
        <option value="char(16)">char(16)</option>
      </select>
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
    item_data: {
      type: Object,
      default() {
        return {
          ItemId: 0,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 0,
          Description: "",
          Remark: null,
          Type: "int",
          Name: "",
          Unit: "",
        };
      },
    },
  },

  data: () => ({}),

  methods: {
    onDeleteButtonClick() {
      this.$emit("delete", this.index);
    },
  },
};
</script>

<style scoped>
.item-name-row {
  padding: 8px 0;
}
</style>
