<template>
  <div class="country-selector-container">
    <div
      v-for="(item, index) in option"
      :key="index"
      :class="[
        item.value,
        value == item.value ? 'selected' : '',
        editing ? 'edit' : '',
      ]"
      @click="onItemClick(item.value)"
    >
      {{ item.name }}<br />{{ item.engName }}
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    value: {
      type: String,
      default: "",
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },

  components: {},

  data: () => ({
    option: [
      {
        value: "zh-TW",
        name: "台灣",
        engName: "Taipei",
      },
      {
        value: "ja-JP",
        name: "日本",
        engName: "Japan",
      },
      {
        value: "zh-CN",
        name: "中國",
        engName: "China",
      },
    ],
  }),

  methods: {
      onItemClick(country) {
          if (!this.editing) {
              return;
          }

          this.$emit("input", country);
      }
  },
};
</script>

<style scoped>
.country-selector-container {
  height: 100%;
  padding-left: 8px;
}

.country-selector-container div {
  display: inline-block;
  font-size: 0.75rem;
  margin-left: 8px;
  color: #ccc;
}

.country-selector-container div.selected {
  color: #7f57a1;
}

.country-selector-container div.edit {
    cursor: pointer;
}
</style>