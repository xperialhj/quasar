<template>
  <div class="q-pa-md">
    <l-table
      title="字典表"
      :columns='columns'
      :data="data"
      :selected="selected"
      @openDialog="openDialog"
    ></l-table>
    <q-dialog
      v-model="prompt"
      persistent
    >
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">新增字典信息</div>
        </q-card-section>
        <div class="row q-col-gutter-xs">

          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="newDict.type"
                :options="options"
                type="text"
                label="字典类型"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="newDict.label"
                :options="options"
                type="text"
                label="字典标签"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="newDict.value"
                :options="options"
                type="text"
                label="字典值"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="newDict.sort"
                :options="options"
                type="text"
                label="排序"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-12">
            <q-card-section>
              <q-input
                v-model="newDict.description"
                :options="options"
                type="textarea"
                label="描述"
              >
              </q-input>
            </q-card-section>
          </div>
        </div>
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
import LTable from "../components/LTable";
import * as dictApi from "../api/dict/dict";
export default {
  components: {
    LTable
  },
  data() {
    return {
      dictApi,
      selected: [],
      prompt: false,
      newDict: {
        type: "mysql_jar2driverName",
        label: "mysql-connector-java-5.1.39",
        value: "com.mysql.jdbc.Driver",
        description: "mysql 驱动-驱动名称",
        sort: 2,
        del_flag: 0
      },
      options: [],
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
        }
      ]
    };
  },
  methods: {
    openDialog() {
      this.prompt = true;
    }
  },
  mounted(){
    this.dictApi.findPage().then(res=>{
      console.log(res)
    })
  }
};
</script>
