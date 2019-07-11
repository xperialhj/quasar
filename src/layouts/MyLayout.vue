<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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

        <div>Quasar v{{ $q.version }}</div>
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
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item
          clickable
          @click="$router.push('/databaselink')"
        >
          <q-item-section avatar>
            <q-icon name="playlist_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>数据库连接管理
            </q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>

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
    openURL,
    test() {
      alert();
    }
  }
};
</script>

<style>
.nav-tabs .q-tabs__content--align-center {
  justify-content: left;
}
.close-tab {
  user-select: all;
  pointer-events: all;
}
</style>
