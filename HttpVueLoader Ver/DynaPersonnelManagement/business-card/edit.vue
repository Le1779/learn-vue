<template>
  <div>
    <div class="business-card">
      <div class="field-container">
        <div></div>
        <div>
          <input
            type="text"
            class="business-card-text title"
            :class="{ error: value.inputError.name }"
            placeholder="Name"
            aria-label="Name"
            v-model="value.name"
          />
        </div>
        <div>
          <input
            type="text"
            class="business-card-text subtitle"
            :class="{ error: value.inputError.engName }"
            placeholder="English Name"
            aria-label="English Name"
            v-model="value.engName"
          />
        </div>
        <div class="business-card-department-role">
          <div class="business-card-text subtitle inline">
            {{ value.department }}
          </div>
          <div class="inline" style="margin-left: 8px">
            <select
              v-model="value.role"
              class="business-card-text subtitle"
              :class="{ error: value.inputError.role }"
            >
              <option disabled="" selected="" value="">選擇職位</option>
              <option
                v-for="(item, index) in roleOption"
                :key="index"
                :value="item.value"
              >
                {{ item.text }}
              </option>
            </select>
          </div>

          <div class="inline" style="margin-left: 10px">
            <input type="checkbox" :checked="value.isAtWork" />
            <span style="margin-left: 2px">在職</span>
          </div>
        </div>
        <div class="business-card-email">
          <input
            type="text"
            class="business-card-text subtitle"
            :class="{ error: value.inputError.email }"
            placeholder="Email"
            aria-label="Email"
            v-model="value.email"
          />
          <span class="business-card-text subtitle">@dynacw</span>
          <select class="employee-email-country business-card-text subtitle">
            <option value="com">.com</option>
            <option value="co.jp">.co.jp</option>
            <option value="cn">.cn</option>
          </select>
        </div>
      </div>
      <div class="right-block"></div>
      <div class="bottom-block">
        <div class="color-block"></div>
        <CountrySelector v-model="value.country" :editing="true" />
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    value: {
      type: Object,
      default: function () {
        return {
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
        };
      },
    },
  },

  components: {
    countryselector: httpVueLoader("business-card/country-selector.vue"),
  },

  data: () => ({
    roleOption: [
      {
        value: 24,
        text: "華康-行銷部專案經理",
      },
      {
        value: 25,
        text: "華康-行銷部主管",
      },
      {
        value: 32,
        text: "華康-NTD主管",
      },
      {
        value: 33,
        text: "華康-職員",
      },
      {
        value: 34,
        text: "華康-IA工程部主管",
      },
      {
        value: 35,
        text: "華康-FD主管",
      },
      {
        value: 36,
        text: "華康-Gaiji工程部主管",
      },
      {
        value: 37,
        text: "華康-QA工程部主管",
      },
      {
        value: 38,
        text: "華康-Retail工程部主管",
      },
    ],
  }),

  methods: {},
};
</script>

<style scoped>
.business-card-text {
  color: #383838;
}

.business-card-text.title {
  font-size: 1.5rem;
}

.business-card-text.subtitle {
  font-size: 0.925rem;
}

.business-card-text.caption {
  font-size: 0.75rem;
  color: #787878;
}

.inline {
  display: inline-block;
}

.business-card {
  position: relative;
  display: inline-grid;
  grid-template-rows: auto 21%;
  height: 220px;
  width: 360px;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  transition: transform 0.1s;
  overflow: hidden;
}

.field-container {
  display: grid;
  padding: 24px 36px 8px 36px;
  grid-template-rows: 1rem 2rem auto 1.8rem 1.8rem;
}

.business-card:hover {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1);
  transform: scale(1.005, 1.005);
}

.business-card .right-block {
  width: 30%;
  height: 25%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: gainsboro;
  border-bottom-left-radius: 18px;
}

.business-card .bottom-block {
  width: 100%;
  height: 21%;
  bottom: 0;
  left: 0;
  position: absolute;
  display: grid;
  grid-template-columns: 45% 55%;
}

.business-card .bottom-block .color-block {
  background-image: linear-gradient(to left, #7f57a1, #2d71b8);
  border-top-right-radius: 18px;
  height: 100%;
}

.business-card .employee-country {
  height: 100%;
  padding-left: 8px;
}

.business-card .employee-country div {
  display: inline-block;
  font-size: 0.75rem;
  margin-left: 8px;
  color: #ccc;
}

.business-card .employee-country div.selected {
  color: #7f57a1;
}

input[type="text"] {
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #A8A8A8;
}

input[type="text"]:focus {
  outline: none;
  border-bottom: 1px solid #2d71b8;
}

input[type="text"].error {
  border-bottom: 1px solid red;
}

select {
  line-height: normal;
  border: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  border-bottom: 1px solid #9f9f9f;
  box-shadow: none;
}

select.error {
  border-bottom: 1px solid red;
}

.business-card-email {
  display: grid;
  grid-template-columns: auto auto auto;
  line-height: 1.8rem;
}

.business-card-department-role {
  display: grid;
  grid-template-columns: auto auto auto;
  line-height: 1.8rem;
}
</style>

