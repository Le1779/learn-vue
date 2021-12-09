<template>
  <div class="add_item_container">
    <div class="line_and_button" @click="onAddButtonClick">
      <div class="line"></div>
      <div class="add_button"></div>
    </div>
    <div v-if="showTypeSelecter" class="type_selecter">
      <ul>
        <li @click="onTypeSelected('Div')">群組</li>
        <li @click="onTypeSelected('Item')">項目</li>
      </ul>
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
  },

  data: () => ({
    showTypeSelecter: false,
  }),

  created() {
      window.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)){
          this.showTypeSelecter = false;
        }
      })
  },

  methods: {
    onAddButtonClick() {
      this.showTypeSelecter = true;
    },

    onTypeSelected(type) {
      this.$emit('action', this.index, type);
      this.showTypeSelecter = false;
    }
  },
};
</script>

<style scoped>
.add_item_container {
  position: relative;
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

.type_selecter {
  position: absolute;
  background-color: #FFFFFF;
  right: 0;
  padding: 8px 0;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.type_selecter li {
  list-style:none;
  cursor: pointer;
  padding: 1px 12px;
  color: #383838;
}

.type_selecter li:hover {
  background-color: #E8E8E8;
}
</style>
