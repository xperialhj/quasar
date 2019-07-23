<template>
  <q-table
    class="my-sticky-column-table"
    :title="title"
    :data="data"
    :columns="columns"
    row-key="name"
    :selected-rows-label="getSelectedString"
    selection="multiple"
    :selected.sync="myselected"
    rows-per-page-label="每页记录"
    no-data-label="暂无数据"
    no-results-label="暂无搜索结果"
    :pagination-label='paginationInfo'
    :pagination.sync="pagination"
    :loading="loading"
    :filter="filter"
    :rows-per-page-options="[5,10,30]"
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
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-checkbox v-model="props.selected" />
        </q-td>
        <template v-for="item in columns">
          <q-td
            :props="props"
            :key="item.name"
          >
            {{props.row[item.name]}}
          </q-td>
        </template>
        <q-td key="operation">
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              color="primary"
              label="编辑"
            />
            <q-btn
              color="red"
              label="删除"
            />
          </div>
        </q-td>
      </q-tr>
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
        rowsPerPage: 5,
        rowsNumber: 100,
        sortBy: "",
        descending: false
      },
      filter: ""
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
      console.log(props, "props");
      this.$emit("findPage", { pageRequest: props.pagination, callback });
    },
    fliterColumns(key) {
      return this.columns.find(item => item.field == key);
    }
  },
  mounted() {
    this.onRequest({ pagination: this.pagination });
  },
  watch: {
    pageRequest: {
      handler(val, oldVal) {
        this.pagination = val;
        console.log(this.pagination, "pagerequest");
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.my-sticky-column-table {
  // max-width: 600px;

  th:last-child {
    background-color: #fff;
    opacity: 1;
  }

  td:last-child {
    background-color: #fff;
  }
  //  tr:hover td:last-child{
  //     background-color: rgba(0,0,0,0.03);
  //   }
  th:last-child,
  td:last-child {
    position: sticky;
    right: 0;
    z-index: 1;
  }
}
</style>