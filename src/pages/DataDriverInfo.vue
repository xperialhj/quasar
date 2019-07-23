<template>
  <div class="q-pa-md">
    <l-table
      title="数据库驱动信息"
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
      options: [],
      columns: [
        {
          name: "id",
          align: "left",
          label: "ID",
          field: "id",
          sortable: true
        },
        {
          name: "driverClassName",
          align: "left",
          label: "驱动类名",
          field: "driverClassName",
          sortable: true
        },
        {
          name: "remark",
          align: "left",
          label: "备注",
          field: "remark",
          sortable: true
        }
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
          pageSize: data.pageRequest.rowsPerPage
        };
      }

      let res = await this.$api.dataDriverInfo.findPage(pageRequest);
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
    async addDict() {
      await this.$api.dict.save(this.newDict);
      await this.findPage();
    }
  },
  mounted() {}
};
</script>
