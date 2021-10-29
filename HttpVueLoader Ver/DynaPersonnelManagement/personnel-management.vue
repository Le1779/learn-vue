<template>
  <div>
    <BusinessCard
      style="cursor: pointer; display: inline-block"
      @click.native="onBusinessCardClick"
    ></BusinessCard>
    <BusinessCardEdit
      v-model="userData"
      style="display: inline-block"
    ></BusinessCardEdit>
    <div>
      <CountrySelector
        v-model="country"
        style="background: white; display: inline-block; padding: 12px"
      />
    </div>

    <CreateDialog v-model="showCreateDialog"></CreateDialog>
    <AgentListDialog v-model="showAgentListDialog"/>

    
  </div>
</template>

<script>
module.exports = {
  components: {
    businesscard: httpVueLoader("business-card/detail.vue"),
    businesscardedit: httpVueLoader("business-card/edit.vue"),
    countryselector: httpVueLoader("business-card/country-selector.vue"),
    createdialog: httpVueLoader("dialog/create.vue"),
    agentlistdialog: httpVueLoader("dialog/agent-list.vue"),
  },

  data: () => ({
    showCreateDialog: false,
    showAgentListDialog: false,
    userData: {
      name: "",
      engName: "",
      department: "NTD部",
      email: "",
      country: "zh-TW",
      inputError: {
        name: false,
        engName: false,
        role: false,
        email: false,
      },
    },
    country: "zh-TW",
  }),

  methods: {
    onBusinessCardClick() {
      this.showCreateDialog = true;
    },
  },
};
</script>

<style scoped>
</style>
