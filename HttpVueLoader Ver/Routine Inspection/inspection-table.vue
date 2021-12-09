<template>
  <div class="table_container">
    <div>
      <div>
        <button v-if="displayList.TableName == null" @click="onBackButtonClick">
          Back
        </button>
      </div>
      <AddItem :index="0" @action="addNewItem"></AddItem>
      <div v-for="(item, index) in displayList.Elements" :key="index">
        <Group
          v-if="'Div' == item.ElmentType"
          :index="index"
          :group_data="item"
          :root_data="displayList"
          @action="onGroupSelect"
          @delete="deleteItem"
        ></Group>
        <Item
          v-if="'Item' == item.ElmentType"
          :index="index"
          :item_data="item"
          @delete="deleteItem"
        ></Item>
        <AddItem :index="index + 1" @action="addNewItem"></AddItem>
      </div>
    </div>
    <div>
      <v-json-tree
        :json-data="displayList"
      ></v-json-tree>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    additem: httpVueLoader("add-item.vue"),
    inspectionelement: httpVueLoader("inspection-element.vue"),
    group: httpVueLoader("inspection-group.vue"),
    item: httpVueLoader("inspection-item.vue"),
  },

  data: () => ({
    list: {
      TableManagerId: 0,
      Elements: [
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 1,
              CheckCond: "if value >= 0 ",
              ElmentType: "Item",
              DisplayOrder: 2,
              Description: "描述1",
              Remark: null,
              Type: "int",
              Name: "V1",
              Unit: "",
            },
            {
              ItemId: 2,
              CheckCond: "if value >= 0",
              ElmentType: "Item",
              DisplayOrder: 3,
              Description: "描述2",
              Remark: null,
              Type: "int",
              Name: "V2",
              Unit: "",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 1,
          Name: "GIS",
        },
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 3,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 5,
              Description: "描述3",
              Remark: null,
              Type: "int",
              Name: "溫度",
              Unit: "",
            },
            {
              ItemId: 4,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 6,
              Description: "描述4",
              Remark: null,
              Type: "int",
              Name: "濕度",
              Unit: "",
            },
            {
              ItemId: 5,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 7,
              Description: "描述5",
              Remark: null,
              Type: "float(1)",
              Name: "KV0",
              Unit: "",
            },
            {
              ItemId: 6,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 8,
              Description: "描述6",
              Remark: null,
              Type: "float(1)",
              Name: "KV",
              Unit: "",
            },
            {
              ItemId: 7,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 9,
              Description: "描述7",
              Remark: null,
              Type: "float(2)",
              Name: "KVAR1",
              Unit: "",
            },
            {
              ItemId: 8,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 10,
              Description: "描述8",
              Remark: null,
              Type: "int",
              Name: "KVAR2",
              Unit: "",
            },
            {
              ItemId: 9,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 11,
              Description: "描述9",
              Remark: null,
              Type: "float(3)",
              Name: "COS0.98",
              Unit: "",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 4,
          Name: "16KV操作監視盤",
        },
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 10,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 13,
              Description: "描述10",
              Remark: null,
              Type: "float(3)",
              Name: "KVCOS",
              Unit: "",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 12,
          Name: "M-S4",
        },
        {
          ItemId: 11,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 14,
          Description: "描述11",
          Remark: null,
          Type: "float(1)",
          Name: "KW1400A",
          Unit: "A",
        },
        {
          ItemId: 12,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 15,
          Description: "描述12",
          Remark: null,
          Type: "int",
          Name: "SA-KW432A",
          Unit: "W",
        },
        {
          ItemId: 13,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 16,
          Description: "描述13",
          Remark: null,
          Type: "int",
          Name: "SB-KW420A",
          Unit: "W",
        },
        {
          ItemId: 14,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 17,
          Description: "描述14",
          Remark: null,
          Type: "int",
          Name: "SC-KW450A",
          Unit: "W",
        },
        {
          ItemId: 15,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 18,
          Description: "描述15",
          Remark: null,
          Type: "int",
          Name: "SD-KW432A",
          Unit: "W",
        },
        {
          ItemId: 16,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 19,
          Description: "描述16",
          Remark: null,
          Type: "int",
          Name: "SF-KW300A",
          Unit: "W",
        },
        {
          ItemId: 17,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 20,
          Description: "描述17",
          Remark: null,
          Type: "int",
          Name: "SE-KAVR60A",
          Unit: "W",
        },
        {
          ItemId: 18,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 21,
          Description: "描述18",
          Remark: null,
          Type: "int",
          Name: "ST-KW5A",
          Unit: "W",
        },
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 19,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 23,
              Description: "描述19",
              Remark: null,
              Type: "float(3)",
              Name: "KVCOS",
              Unit: "V",
            },
            {
              ItemId: 20,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 24,
              Description: "描述20",
              Remark: null,
              Type: "int",
              Name: "KV1560A",
              Unit: "A",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 22,
          Name: "M-S2",
        },
        {
          ItemId: 21,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 25,
          Description: "描述21",
          Remark: null,
          Type: "int",
          Name: "SG-KW420A",
          Unit: "A",
        },
        {
          ItemId: 22,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 26,
          Description: "描述22",
          Remark: null,
          Type: "int",
          Name: "SH-KW420A",
          Unit: "A",
        },
        {
          ItemId: 23,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 27,
          Description: "描述23",
          Remark: null,
          Type: "int",
          Name: "SI-KW450A",
          Unit: "A",
        },
        {
          ItemId: 24,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 28,
          Description: "描述24",
          Remark: null,
          Type: "int",
          Name: "SJ-KW450A",
          Unit: "A",
        },
        {
          ItemId: 25,
          CheckCond: "",
          ElmentType: "Item",
          DisplayOrder: 29,
          Description: "描述25",
          Remark: null,
          Type: "int",
          Name: "SK-KW200A",
          Unit: "A",
        },
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 26,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 31,
              Description: "描述26",
              Remark: null,
              Type: "int",
              Name: "周溫",
              Unit: "度",
            },
            {
              ItemId: 27,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 32,
              Description: "描述27",
              Remark: null,
              Type: "int",
              Name: "一次線圈105°C",
              Unit: "度",
            },
            {
              ItemId: 28,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 33,
              Description: "描述28",
              Remark: null,
              Type: "int",
              Name: "二次線圈105°C",
              Unit: "度",
            },
            {
              ItemId: 29,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 34,
              Description: "描述29",
              Remark: null,
              Type: "int",
              Name: "油溫",
              Unit: "度",
            },
            {
              ItemId: 30,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 35,
              Description: "描述30",
              Remark: null,
              Type: "int",
              Name: "油液位",
              Unit: "cm",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 30,
          Name: "120MVA 主變壓器",
        },
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 31,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 37,
              Description: "描述31",
              Remark: null,
              Type: "char(16)",
              Name: "位置",
              Unit: "",
            },
            {
              ItemId: 38,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 38,
              Description: "描述32",
              Remark: null,
              Type: "int",
              Name: "動作記錄",
              Unit: "",
            },
            {
              ItemId: 33,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 39,
              Description: "描述33",
              Remark: null,
              Type: "int",
              Name: "油液位",
              Unit: "cm",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 36,
          Name: "OLTC",
        },
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 34,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 41,
              Description: "描述34",
              Remark: null,
              Type: "int",
              Name: "電壓",
              Unit: "V",
            },
            {
              ItemId: 35,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 42,
              Description: "描述35",
              Remark: null,
              Type: "int",
              Name: "電流",
              Unit: "A",
            },
            {
              ItemId: 36,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 43,
              Description: "描述36",
              Remark: null,
              Type: "int",
              Name: "溫度",
              Unit: "度",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 40,
          Name: "所內變壓器",
        },
        {
          TableManagerId: 0,
          Elements: [
            {
              ItemId: 37,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 45,
              Description: "描述37",
              Remark: null,
              Type: "float(2)",
              Name: "電壓",
              Unit: "V",
            },
            {
              ItemId: 38,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 46,
              Description: "描述38",
              Remark: null,
              Type: "int",
              Name: "電流",
              Unit: "A",
            },
            {
              ItemId: 39,
              CheckCond: "",
              ElmentType: "Item",
              DisplayOrder: 48,
              Description: "描述39",
              Remark: null,
              Type: "float(2)",
              Name: "功率",
              Unit: "W",
            },
          ],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 44,
          Name: "中控室所內 M-P記錄器",
        },
      ],
      TableName: "elec",
      DisplayName: "輪班人員巡車記錄表",
      ElmentType: "Div",
      DisplayOrder: 0,
      Name: null,
    },
    displayList: null,
    rootData: null,
  }),

  created() {
    this.displayList = this.list;
    this.rootData = this.list;
  },

  methods: {
    addNewItem(at, type) {
      console.log(at);
      console.log(type);
      var obj;
      if (type == "Div") {
        obj = {
          TableManagerId: 0,
          Elements: [],
          TableName: null,
          DisplayName: null,
          ElmentType: "Div",
          DisplayOrder: 1,
          Name: "",
        };

        this.displayList.Elements.splice(at, 0, obj);
      } else {
        obj = {
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

        this.displayList.Elements.splice(at, 0, obj);
        this.restoreItemId(this.list, 1);
      }
    },

    onGroupSelect(data, rootData) {
      console.log(data);
      this.rootData = rootData;
      this.displayList = data;
    },

    onBackButtonClick() {
      this.displayList = this.rootData;
    },

    deleteItem(index) {
      this.displayList.Elements.splice(index, 1);
      this.restoreItemId(this.list, 1);
    },

    restoreItemId(root, currentId) {
      for (var i = 0; i < root.Elements.length; i++) {
        var item = root.Elements[i];
        if (item.ElmentType == "Div") {
          currentId = this.restoreItemId(item, currentId);
        } else {
          item.ItemId = currentId++;
        }
      }

      return currentId;
    },
  },
};
</script>

<style scoped>
.table_container {
  display: grid;
  grid-template-columns: 50% 50%;
}

.item-container {
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px #585858 solid;
  padding: 12px;
}

.item-container span {
  color: #787878;
  font-size: 0.85rem;
  margin-right: 8px;
}

.item-container input, select {
  color: #383838;
  font-size: 0.85rem;
  border: 0px solid;
  border-bottom: 1px #585858 solid;
  padding: 5px 8px;
}

.item-container .delete-button {
  float: right;
  background-color: #fbe9e7;
  color: #d32f2f;
  padding: 8px 12px;
  border: 0px solid;
  border-radius: 5px;
  margin-top: 8px;
  cursor: pointer;
}

.item-container .delete-button:hover {
  background-color: #ffcdd2;
}
</style>
