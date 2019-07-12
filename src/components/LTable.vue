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
</template>
<script>
export default {
  name: "LTable",
  data() {
    return {
      myselected: this.selected
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
    } //已选项
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
      return this.myselected.length === 0 ? "" : `已选${this.myselected.length}条`;
    }
  }
};
</script>
