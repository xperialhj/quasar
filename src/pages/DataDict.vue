<template>
  <div class="q-pa-md">
    <l-table
      title="字典表"
      :columns='columns'
      :data="data"
      :selected="selected"
      :pageRequest="pageRequest"
      @openDialog="openDialog"
      @findPage="findPage"
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
            @click="addDict"
          />

        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import LTable from "../components/LTable";
export default {
  components: {
    LTable
  },
  data() {
    return {
      selected: [],
      prompt: false,
      pageRequest: {},
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
          name: "type",
          required: true,
          label: "字典类型",
          align: "left",
          field: "type",
          sortable: true
        },
        {
          name: "label",
          align: "center",
          label: "字典标签",
          field: "label",
          sortable: true
        },
        {
          name: "value",
          label: "字典值",
          align: "center",
          field: "value",
          sortable: true
        },
        {
          name: "sort",
          label: "排序",
          align: "center",
          field: "sort",
          sortable: true
        },
        {
          name: "description",
          label: "描述",
          align: "center",
          field: "description"
        },
        
      ],
      data: []
    };
  },
  methods: {
    openDialog() {
      this.prompt = true;
    },
    async findPage(data) {
      let sortBy = null;
      let descending = false;
      let pageRequest = {};
      if (data) {
        sortBy = data.pageRequest.sortBy;
        descending = data.pageRequest.descending;
        pageRequest = {
          pageNum: data.pageRequest.page,
          pageSize: data.pageRequest.rowsPerPage,
          record:{
            type:'1',
            sort:'2'
          }
        };
      }

      let res = await this.$api.dict.findPage(pageRequest);
      // console.log(res);
      let result = res.data.data;
      this.data = result.content;
      this.pageRequest = {
        page: result.pageNum,
        rowsPerPage: result.pageSize,
        rowsNumber: result.totalSize,
        sortBy,
        descending
      };

      console.log(this.pageRequest);
      if (sortBy) {
        this.data.sort((a, b) => {
          let x = descending ? b : a;
          let y = descending ? a : b;
          if (sortBy !== "sort") {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0;
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
          }
        });
      }
      if (data) {
        data.callback();
      }
    },
    async addDict() {
      await this.$api.dict.save(this.newDict);
      await this.findPage();
    }
  },
  mounted() {}
};
</script>
