<template>
  <div class="q-pa-md">
    <l-table
      title="数据库连接管理"
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
          <div class="text-h6">新建连接</div>
        </q-card-section>
        <div class="row q-col-gutter-xs">
          <div class="col-6">
            <q-card-section>
              <q-select
                v-model="newLink.type"
                :options="options.type"
                option-value="key"
                option-label="value"
                label="选择连接类型"
              >
              </q-select>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-select
                v-model="newLink.version"
                :options="options"
                label="版本号"
              >
              </q-select>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="model"
                :options="options"
                type="text"
                label="连接名称"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="model"
                :options="options"
                type="text"
                label="主机名称"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="model"
                :options="options"
                type="text"
                label="数据库名称"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="model"
                :options="options"
                type="text"
                label="端口号"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="model"
                :options="options"
                type="text"
                label="用户名"
              >
              </q-input>
            </q-card-section>
          </div>
          <div class="col-6">
            <q-card-section>
              <q-input
                v-model="model"
                :options="options"
                label="密码"
                type="text"
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
export default {
  components: {
    LTable
  },
  data() {
    return {
      selected: [],
      prompt: false,
      pageRequest: {},
      options: {
        type: [],
        version: []
      },
      newLink: {
        type: "",
        version: ""
      },
      model: null,
      options: [],
      columns: [
        {
          name: "databaseName",
          align: "left",
          label: "数据库名",
          field: "databaseName",
          sortable: true
        },
        {
          name: "id",
          align: "left",
          label: "ID",
          field: "id",
          sortable: true
        },
      ],
      data: []
    };
  },
  methods: {
    openDialog() {
      this.prompt = true;
    },
    alertErr(err) {
       this.$q.notify({
        message: err,
        color: 'red',
        position:'top'
      })
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
          pageSize: data.pageRequest.rowsPerPage
        };
      }

      let res = await this.$api.databaseLink.findPage(pageRequest);
      console.log(res);
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
    async getType() {
      try {
        let res = await this.$api.databaseLink.getType();
        this.options.type = res.data.data;
      } catch (err) {
        console.log(err);
        this.alertErr("获取连接类型失败");
      }
    },
    async getVersion(val) {
      try {
        let res = await this.$api.databaseLink.getVersion({ dbType: val });
        console.log(res);
        this.options.version = res.data.data;
      } catch (err) {
        console.log(err);
        this.alertErr("获取版本号失败");
      }
    }
  },
  mounted() {
    this.getType();
  },
  watch: {
    "newLink.type": {
      handler(val, oldVal) {
        this.getVersion(val.value);
      },
      deep: true
    }
  }
};
</script>

<style  scoped>
</style>
