<template>
  <div>
    <div class="overlay" :class="{ show: value }" @click="onOverlayClick"></div>
    <div class="dialog" :class="{ show: value }">
      <div class="dialog-content">
        <div class="dialog-header">代理人列表</div>
        <div class="dialog-body">
          <div class="business-card-row">
            <BusinessCard style="display: inline-block"></BusinessCard>
          </div>
        </div>
        <div class="dialog-footer">
          <div class="spacer"></div>
          <div class="button confirm" @click="onConfirmButtonClick">確定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },

  components: {
    businesscard: httpVueLoader("../business-card/detail.vue"),
  },

  data: () => ({
    account: "",
    accountError: false,
    businessCardModel: {
          name: "",
          engName: "",
          department: "",
          role: "",
          email: "",
          country: "zh-TW",
          isAtWork: false,
          inputError: {
            name: false,
            engName: false,
            role: false,
            email: false,
          },
        }
  }),

  methods: {
    onConfirmButtonClick() {
      this.finish();
    },

    onOverlayClick() {
      this.finish();
    },

    finish() {
      this.$emit("input", false);
    }
  },
};
</script>

<style scoped>
.dialog-text {
  color: #383838;
}

.overlay {
  border-radius: inherit;
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: inherit;
  width: 100%;
  will-change: opacity;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  z-index: 1;
  display: none;
}

.dialog {
  max-height: 90%;
  margin: 24px;
  overflow-y: auto;
  pointer-events: auto;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: inherit;
  box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%),
    0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);

  z-index: 2;
  position: absolute;
  background: white;
  margin: auto;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  border-radius: 4px;

  display: none;
}

.dialog.show {
  display: block;
}

.overlay.show {
  display: block;
}

.dialog-content {
  display: grid;
  min-width: 500px;
  min-height: 200px;
  grid-template-rows: 48px auto 48px;
}

.dialog-header {
  border: solid rgba(0, 0, 0, 0.12);
  border-width: 0 0 thin 0;
  padding-left: 24px;
  line-height: 48px;
  font-size: 1.5rem;
}

.dialog-footer {
  border: solid rgba(0, 0, 0, 0.12);
  border-width: thin 0 0 0;
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

.dialog-body {
  margin: 24px 0;
}

.spacer {
  flex-grow: 1;
}

.button {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 12px;
  color: #383838;
}

.button:hover {
  background: #38383820;
}

.button.confirm {
  color: #2d71b8;
}

.button.confirm:hover {
  background: #2d71b820;
}

.button.cancel {
  color: #f44336;
}

.button.cancel:hover {
  background: #f4433620;
}

.business-card-row {
  margin: 24px;
  display: flex;
  justify-content: center;
}

.business-card::after {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    line-height: 220px;
    content: "設定代理人";
    background-color: #FFFFFF;
    border: 2px solid #444;
    border-style: dashed;
    opacity: 0.8;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
}
</style>