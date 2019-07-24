<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      style="background:#2f333e"
    >
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
      <l-menu-tab
        :menuTabList='this.$store.state.menuTabList'
        @closeTab="closeTab"
      ></l-menu-tab>
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
      <l-menu @addTab="addTab"></l-menu>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";
import LMenu from "../components/LMenu";
import LMenuTab from "../components/LMenuTab";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
      // menuTabList: [
      //   {
      //     name: "home",
      //     label: "首页",
      //     path: "/"
      //   }
      // ]
    };
  },
  components: {
    LMenu,
    LMenuTab
  },
  methods: {
    openURL,
    closeTab(row) {
      // this.$store.state.menuTabList = this.$store.state.menuTabList.filter(item => item.name != row.name);
      this.$store.commit("closeTab", row);
      this.$router.push(
        this.$store.state.menuTabList[this.$store.state.menuTabList.length - 1]
          .path
      );
    },
    addTab(row) {
      let tab = {
        name: row.name,
        label: row.label,
        path: row.path
      };
      if (
        !this.$store.state.menuTabList.find(item => {
          return item.name == tab.name;
        })
      ) {
        this.$store.commit("addTab", tab);
        // this.$store.state.menuTabList.push(tab);
      }
      this.$router.push(row.path);
    }
  }
};
</script>

<style lang="scss">
.logo-title {
  background-color: #2f333e;
  height: 50px;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  color: white;
}
.q-drawer {
  border-right: none !important;
}
</style>
