<template>
  <q-layout view="lhh LpR lff" container style="height: 500px;" class="shadow-1 rounded-borders">
    <q-drawer
      v-model="drawerLeft"
      :width="300"
      :breakpoint="700"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <q-list bordered>
            <q-expansion-item group="somegroup" icon="explore" label="输入">
              <q-card>
                <q-card-section>
                  <draggable
                    class="dragArea list-group"
                    :list="list1"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                    :clone="cloneDog"
                    :sort="false"
                    @change="log"
                  >
                    <q-chip class="component-item" v-for="element in list1" :key="element.id">
                      <q-avatar icon="bookmark" color="red" text-color="white" />
                      {{element.name}}
                    </q-chip>
                  </draggable>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-separator />

            <q-expansion-item group="somegroup" icon="perm_identity" label="输出">
              <q-card>
                <q-card-section></q-card-section>
              </q-card>
            </q-expansion-item>

            <q-separator />

            <q-expansion-item group="somegroup" icon="shopping_cart" label="转换">
              <q-card>
                <q-card-section></q-card-section>
              </q-card>
            </q-expansion-item>

            <q-separator />

            <q-expansion-item group="somegroup" icon="bluetooth" label="应用">
              <q-card>
                <q-card-section></q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="chart">
        <draggable
          class="dragArea list-group"
          handle="false"
          :list="list2"
          group="people"
          @change="log"
          style="height:100%;"
        >
          <q-chip class="chart-item" v-for="element in list2" :key="element.id">
            <q-avatar icon="bookmark" color="red" text-color="white" />
            {{element.name}}
          </q-chip>
        </draggable>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      drawerLeft: true,
      idGlobal: 8,
      list1: [{ name: "Excel输入", id: 1 }, { name: "表输入", id: 2 }],
      list2: [
        { name: "cat 5", id: 5 },
        { name: "cat 6", id: 6 },
        { name: "cat 7", id: 7 }
      ]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    cloneDog({ id }) {
      return {
        id: this.idGlobal++,
        name: `cat ${id}`
      };
    }
  }
};
</script>
<style lang="scss">
.component-item {
  width: 45%;
  cursor: move;
}
.chart {
  height: 500px;
  background: white;
  padding: 20px;
}
.chart-item {
  width: 140px;
}
</style>
