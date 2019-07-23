<template>
  <div
    class="q-pa-md"
    style="max-width: 350px"
  >
    <q-list bordered>
      <q-expansion-item
        group="somegroup"
        icon="explore"
        label="输入"
      >
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
              <q-chip
                class='component-item'
                v-for="element in list1"
                :key="element.id"
              >
                <q-avatar
                  icon="bookmark"
                  color="red"
                  text-color="white"
                />
                {{element.name}}
              </q-chip>
            </draggable>

          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="somegroup"
        icon="perm_identity"
        label="输出"
      >
        <q-card>
          <q-card-section>

          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="somegroup"
        icon="shopping_cart"
        label="转换"
      >
        <q-card>
          <q-card-section>

          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item
        group="somegroup"
        icon="bluetooth"
        label="应用"
      >
        <q-card>
          <q-card-section>

          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
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
        id: idGlobal++,
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
</style>
