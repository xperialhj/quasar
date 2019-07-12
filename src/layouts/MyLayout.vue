<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background:#2f333e">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <q-btn
            flat
            dense
            round
            @click="$router.push('/')"
            aria-label="Home"
          >
            <q-icon name="home" />
          </q-btn>
        </q-toolbar-title>

      </q-toolbar>
      <q-tabs
        v-model="tab"
        inline-label
        indicator-color="primary"
        class="bg-grey-2 text-black nav-tabs shadow"
      >
        <q-route-tab
          name="home"
          label="首页"
          to="/"
          exact
        >

        </q-route-tab>
        <q-route-tab
          name="databaselink"
          label="数据库连接管理"
          to="/databaselink"
          exact
        >
          <q-btn
            class="close-tab"
            flat
            round
            color="primary"
            icon="cancel"
            size="8px"
          />
        </q-route-tab>

      </q-tabs>
    </q-header>

    <q-drawer
      :width="285"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    > 
     <div class="logo-title">
       FENHB
     </div>
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          label="数据系统"
        >
          <q-item  class="menu-item"
            clickable
            @click="$router.push('/datadict')"
          >
            <q-item-section>
              <q-item-label class="menu-item-label">字典表
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item  class="menu-item"
            clickable
            @click="$router.push('/databaselink')"
          >
            <q-item-section>
              <q-item-label class="menu-item-label">数据库连接管理
              </q-item-label>
            </q-item-section>
          </q-item>

        </q-expansion-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      tab: "mails"
    };
  },
  methods: {
    openURL
  }
};
</script>

<style>
.nav-tabs .q-tabs__content--align-center {
  justify-content: flex-start;
  -ms-justify-content: flex-start;
}
.close-tab {
  user-select: all;
  pointer-events: all;
}
.menu-item-label {
  text-align: center;
}
.menu-item{
  border-left:4px solid transparent;
}
.menu-item:hover{
  background:#76a6ef;
  border-left:4px solid #4b77ba;
  color:white;
  transition: background .5s;
}
.logo-title{
  background-color:#2f333e;
  height:50px;
  font-size:30px;
  line-height: 50px;
  text-align: center;
  color:white;
}
.q-drawer{
 border-right:none!important;
}
</style>
