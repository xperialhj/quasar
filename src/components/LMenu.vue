<template>
  <q-list
    bordered
    class="rounded-borders"
  >
    <q-expansion-item
      expand-separator
      icon="perm_identity"
      label="数据系统"
    >
      <q-item v-for="(item,index) in menuList" :key="index"
        class="menu-item"
        clickable
        @click="addTab(item)"
      >
        <q-item-section>
          <q-item-label class="menu-item-label">{{item.label}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

  </q-list>
</template>
<script>
export default {
    name:'LMenu',
    data(){
      return{
        menuList:[
          {
            name:"datadict",
            label:"字典表",
            path:"/datadict"
          },
          {
            name:"databaselink",
            label:"数据库连接管理",
            path:"/databaselink"
          },
          {
            name:"datadriverinfo",
            label:"数据库驱动信息",
            path:"/datadriverinfo"
          },
          {
            name:"createtransition",
            label:"新建转换",
            path:"/createtransition"
          }
        ]
      }
    },
    methods:{
      addTab(row){
        this.$emit("addTab",row);
      }
    }
};
</script>
<style lang="scss">
.menu-item {
  border-left: 4px solid transparent;
  .menu-item-label {
    text-align: left;
    padding-left:50px;
  }
}
.menu-item:hover {
  background: #76a6ef;
  border-left: 4px solid #4b77ba;
  color: white;
  transition: background 0.5s;
}

</style>
