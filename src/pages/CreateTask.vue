<template>
  <div>
    <q-layout
      view="lhh LpR lff"
      container
      style="height: 500px;"
      class="shadow-1 rounded-borders"
      v-show="!taskNameShow"
    >
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
                        class="component-item"
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
                  <q-card-section></q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />

              <q-expansion-item
                group="somegroup"
                icon="shopping_cart"
                label="转换"
              >
                <q-card>
                  <q-card-section></q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />

              <q-expansion-item
                group="somegroup"
                icon="bluetooth"
                label="应用"
              >
                <q-card>
                  <q-card-section></q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <draggable
          class="dragArea list-group"
          handle="false"
          :list="list2"
          group="people"
          @change="log"
          style="height:100%;"
          ghostClass="ghost"
        >
          <div
            class="chart"
            id="chartContainer"
          >

            <q-chip
              class="chart-item"
              v-for="element in list2"
              :key="element.id"
              :id="'node'+element.id"
            >
              <q-avatar
                icon="bookmark"
                color="red"
                text-color="white"
              />
              {{element.name}}
            </q-chip>

          </div>
        </draggable>
      </q-page-container>
    </q-layout>
    <q-dialog
      v-model="taskNameShow"
      persistent
    >
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">新建作业</div>
        </q-card-section>

        <q-card-section>
          <!-- <q-input dense v-model="address" autofocus @keyup.enter="taskNameShow = false" /> -->
          <q-input
            v-model="create.taskName"
            label="作业名"
          />
          <q-select
            v-model="create.taskGroup"
            :options="options"
            label="分配任务"
          />
        </q-card-section>

        <q-card-actions
          align="right"
          class="text-primary"
        >
          <q-btn
            flat
            label="取消"
            @click="cancleCreate"
          />
          <q-btn
            flat
            label="确认"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>
import draggable from "vuedraggable";
import jsplumb from "jsplumb";
export default {
  components: {
    draggable
  },
  data() {
    return {
      options: [],
      create: {
        taskName: "",
        taskGroup: ""
      },
      taskNameShow: true,
      drawerLeft: true,
      idGlobal: 0,
      list1: [{ name: "Excel输入", id: 1 }, { name: "表输入", id: 2 }],
      list2: []
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
       this.$nextTick(() => {
        // alert( "node"+evt.added.element.id)
          this.j.draggable(document.getElementById("node"+evt.added.element.id));
          
          this.j.addEndpoint(
          "node"+evt.added.element.id,
          {
            anchor: "Continuous"
          },
          this.common
        );
        });
    },
    cloneDog({ name }) {
      return {
        id: this.idGlobal++,
        name
      };
    },
    cancleCreate() {
      this.$store.commit("closeTab", { name: "createTask" });
      this.$router.push(
        this.$store.state.menuTabList[this.$store.state.menuTabList.length - 1]
          .path
      );
    }
  },
  mounted() {
    jsPlumb.ready(() => {
      var j = jsPlumb.getInstance({
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        PaintStyle: { stroke: "red", strokeWidth: 3 }, //配置自己拖拽小点的时候连接线的默认样式
        Endpoint: ["Dot", { radius: 5 }], //这个是控制连线终端那个小点的半径
        EndpointStyle: { fill: "red" }, //这个是控制连线终端那个小点的样式
        EndpointHoverStyle: { fill: "blue" }, //这个是控制连线终端那个小点的样式
        Connector: ["Flowchart", { curviness: 70 }],
        ConnectionOverlays: [
          ["Arrow", { location: 1 }],
          [
            "Label",
            {
              location: 0.5,
              // label: "hehe",
              id: "label",
              cssClass: "aLabel"
            }
          ]
        ],
        Container: "chartContainer"
      });
      // jsPlumb.setContainer("chartContainer");
      this.j = j;
      this.j.draggable(document.getElementsByClassName("chart-item"));
      this.common = {
        isSource: true,
        isTarget: true,
        maxConnections: -1,
        connector: "Flowchart",
        
      };
      

      // j.addEndpoint("flowchartWindow2", {
      //   uuid: 2,
      //   anchor: "Right",
      //   isTarget: true
      // });
      // j.addEndpoint("flowchartWindow3", { anthors: "Right", isTarget: true });
      // let line = j.connect({uuids: ["1", "2"], editable: true})
      // j.connect({
      //   uuids: [1, 2], //根据uuid进行连接
      //   paintStyle: { stroke: "red", strokeWidth: 3 }, //线的样式
      //   endpointStyle: {
      //     fill: "blue",
      //     outlineStroke: "darkgray",
      //     outlineWidth: 2
      //   }, //点的样式
      //   overlays: [["Arrow", { width: 12, length: 12, location: 0.5 }]] //覆盖物 箭头 及 样式
      // });
    });
  },
  // watch: {
  //   list2: {
  //     handler(val, oldVal) {
  //       this.$nextTick(() => {
  //         this.j.draggable(document.getElementsByClassName("chart-item"));
  //       });
  //     },
  //     deep: true
  //   }
  // }
};
</script>
<style lang="scss">
.component-item {
  width: 115px;
  cursor: move;
}
.chart {
  height: 500px;
  width:100%;
  background: white;
  padding: 20px;
  position: relative;
}
.chart-item {
  width: 140px;
  position: absolute;
  transition: none;
  margin: 0;
}
.ghost {
  position: absolute;
  opacity: 0;
}
</style>
