<template>
  <q-tabs
    v-model="tab"
    inline-label
    indicator-color="primary"
    class="bg-grey-2 text-black nav-tabs shadow"
  >
    <q-route-tab
      v-for="(item,index) in tabList"
      :key="index"
      :name="item.name"
      :label="item.label"
      :to="item.path"
      exact
    >
      <template v-if="item.name != 'home'">
        <q-btn
          class="close-tab" 
          flat
          round
          icon="close"
          size="10px"
          @click.prevent="closeTab(item)"
        />
      </template>
    </q-route-tab>

  </q-tabs>
</template>
<script>
export default {
  name: "LMenuTab",
  props: {
    menuTabList:{
      type:Array,
      default:[
        {
          name: "home",
          label: "首页",
          path: "/"
        }
      ]
    }  //标签页数据列表
  },
  data() {
    return {
      tab: "home",
      tabList: this.menuTabList
    };
  },
  methods: {
    closeTab(row) {
      // this.tabList = this.tabList.filter(item => {
      //   item.name != row.name;
      // });
      this.$emit("closeTab", row);
    }
  },
  watch:{
    menuTabList:{
         handler(val, oldVal){
            this.tabList=val;
            console.log(this.tabList)
         },
         deep:true
     }
  }
};
</script>
<style lang="scss">
.nav-tabs .q-tabs__content--align-center {
  justify-content: flex-start;
  -ms-justify-content: flex-start;
}
.close-tab {
  user-select: all;
  pointer-events: all;
  position: absolute;
  right:-15px;
}
</style>

