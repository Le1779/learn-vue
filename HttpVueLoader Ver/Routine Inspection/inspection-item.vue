<template>
  <div class="item-container">
    <div class="item-row">
      <span>ID: </span>
      {{ item_data.ItemId }}
    </div>
    <div class="item-row">
      <span>Name: </span>
      <input v-model="item_data.Name" type="text" />
    </div>
    <div class="item-row">
      <span>Condition: </span>
      <input v-model="item_data.CheckCond" type="text" />
    </div>
    <div class="item-row">
      <span>Description: </span>
      <input v-model="item_data.Description" type="text" />
    </div>
    <div class="item-row">
      <span>Unit: </span>
      <input v-model="item_data.Unit" type="text" />
    </div>
    <div class="item-row">
      <span>Type: </span>
      <select v-model="type">
        <option value="int">int</option>
        <option value="float(1)">float(1)</option>
        <option value="float(1)">float(2)</option>
        <option value="float(1)">float(3)</option>
        <option value="char(16)">char(16)</option>
        <option value="select">select</option>
      </select>
      <select v-model="singleOrMulti" v-if="type == 'select'">
        <option value="S">單選</option>
        <option value="M">多選</option>
      </select>

      <div class="item-row" v-if="type == 'select'">
        <span>選項(請用,分割選項): </span>
        <input v-model="selectOption" type="text" />
      </div>
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

  data: () => ({
    /**
     * 原始Type資料的暫存，因為select選項有特殊的格式。
     */
    type: null,
    singleOrMulti: "S",
    selectOption: "",
  }),

  watch: {
    type: {
      handler(val) {
        if (val == "select") {
          this.updateSelectType();
          return;
        }

        this.item_data.Type = this.type;
      },
    },
    singleOrMulti: {
      handler(val) {
        this.updateSelectType();
      },
    },
    selectOption: {
      handler(val) {
        this.updateSelectType();
      },
    },
  },

  created() {
    this.type = this.item_data.Type;
  },

  methods: {
    /**
     * 點擊刪除按鈕，觸發父層的刪除動作。
     */
    onDeleteButtonClick() {
      this.$emit("delete", this.index);
    },

    /**
     * 更新單選or多選的Type
     * [S]opt1,opt2
     * [M]opt1,opt2
     */
    updateSelectType() {
      this.item_data.Type = `[${this.singleOrMulti}]` + this.selectOption;
    },
  },
};
</script>

<style scoped>
.item-row {
  padding: 8px 0;
}
</style>
