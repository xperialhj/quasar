<template>
  <div class="q-pa-md">
    <q-table
      title="数据库连接管理"
      :data="data"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      rows-per-page-label="每页记录"
      :pagination-label='paginationInfo'
    >
      <template v-slot:top-right>
        <q-btn
          round
          color="primary"
          icon="add"
          @click="prompt = true"
        />
      </template>
    </q-table>
    <q-dialog
      v-model="prompt"
      persistent
    >
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">新建连接</div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="model"
            :options="options"
            label="选择连接类型"
          >
          </q-select>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="model"
            :options="options"
            label="版本号"
          >
          </q-select>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="model"
            :options="options"
            label="选择连接方式"
          >
          </q-select>
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            color="white"
            text-color="black"
            label="取消"
            size='md'
            v-close-popup
          />
          <q-btn
            color="primary"
            label="确定"
            size='md'
            v-close-popup
          />

        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      prompt: false,
      model:null,
      options:[],
      columns: [
        {
          name: "desc",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories",
          sortable: true
        },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        {
          name: "calcium",
          label: "Calcium (%)",
          field: "calcium",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "iron",
          label: "Iron (%)",
          field: "iron",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        }
      ]
    };
  },
  methods: {
    paginationInfo(firstRowIndex, endRowIndex, totalRowsNumber) {
      return (
        " 总计:" +
        totalRowsNumber +
        "  第" +
        firstRowIndex +
        "-" +
        endRowIndex +
        "条"
      );
    },
    getSelectedString() {
      return this.selected.length === 0 ? "" : `已选${this.selected.length}条`;
    }
  }
};
</script>

<style  scoped>

</style>
