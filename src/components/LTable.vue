<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    row-key="name"
    :selected-rows-label="getSelectedString"
    selection="multiple"
    :selected.sync="myselected"
    rows-per-page-label="每页记录"
    :pagination-label='paginationInfo'
    :pagination.sync="pagination"
    :loading="loading"
    @request="onRequest"
  >
    <template v-slot:top-right>
      <q-btn
        round
        color="primary"
        icon="add"
        @click="openDialog"
      />
    </template>
  </q-table>
</template>
<script>
export default {
  name: "LTable",
  data() {
    return {
      myselected: this.selected,
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      }
    };
  },
  props: {
    title: {
      type: String,
      default: null
    }, //表格名
    columns: Array, //表格列配置
    data: Array, //表格数据
    selected: {
      type: Array,
      default: function() {
        return [];
      }
    }, //已选项
    pageRequest: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    paginationInfo(firstRowIndex, endRowIndex, totalRowsNumber) {
      return (
        " 总计:" +
        totalRowsNumber +
        "条  第" +
        firstRowIndex +
        "-" +
        endRowIndex +
        "条"
      );
    },

    getSelectedString() {
      return this.myselected.length === 0
        ? ""
        : `已选${this.myselected.length}条`;
    },
    openDialog() {
      this.$emit("openDialog");
    },
    onRequest(props) {
      this.loading = true;
      let callback = res => {
        this.loading = false;
      };
      this.$emit("findPage", { pageRequest: props.pagination, callbak });
    }
  },
  watch: {
    pageRequest: {
      handler(val, oldVal) {
        this.pagination = {
          page: val.pageNum,
          rowsPerPage: val.pageSize,
          rowsNumber: val.totalSize
        };
      },
      deep: true
    }
  }
};
</script>
