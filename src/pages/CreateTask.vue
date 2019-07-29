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
        :width="260"
        :breakpoint="700"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <q-list bordered>
              <q-expansion-item
                v-for="(item,index) in taskMenu"
                :key='index'
                group="somegroup"
                icon="dashboard"
                :label="item.text"
              >
                <q-card>
                  <q-card-section>
                    <draggable
                      class="dragArea list-group"
                      :list="item.children"
                      :group="{ name: 'people', pull: 'clone', put: false }"
                      :clone="cloneDog"
                      :sort="false"
                      @change="log"
                      @end="end"
                    >
                      <q-chip
                        class="component-item"
                        v-for="element in item.children"
                        :key="element.id"
                      >
                        <q-avatar
                          icon="settings"
                          color="red"
                          text-color="white"
                        />
                        {{element.text}}
                      </q-chip>
                    </draggable>
                  </q-card-section>
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
              @dblclick.native="optionsDialog=true"
            >
              <q-avatar
                icon="settings"
                color="red"
                text-color="white"
              />
              {{element.text}}
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
            option-value="taskGroupName"
            option-label="taskGroupName"
            emit-value
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
            @click="createJob"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="optionsDialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
            >Minimize</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
            >Maximize</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          配置项
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import jsplumb from "jsplumb";
import { setTimeout } from "timers";
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
      taskMenu: [],
      list1: [{ name: "Excel输入", id: 1 }, { name: "表输入", id: 2 }],
      list2: [{ id: 0, text: "START" }, { id: 1, text: "DUMMY" }],
      optionsDialog: false,
      maximizedToggle: true,
      lineData: [{ source: "node0", target: "node1" }]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);

      this.j.draggable(document.getElementById("node" + evt.added.element.id), {
        containment: "parentid"
      });

      this.j.addEndpoint(
        "node" + evt.added.element.id,
        {
          anchor: "Continuous"
        },
        this.common
      );

      this.newNodeId = "node" + evt.added.element.id;
    },
    cloneDog({ text }) {
      return {
        id: this.idGlobal++,
        text
      };
    },
    end(evt) {
      console.log(evt.originalEvent);
      // evt.item; //可以知道拖动的本身
      // evt.to; // 可以知道拖动的目标列表
      // evt.from; // 可以知道之前的列表
      // evt.oldIndex; // 可以知道拖动前的位置
      // evt.newIndex; // 可以知道拖动后的位置
      let newNode = document.getElementById(this.newNodeId);
      console.log(newNode.style);
      newNode.style.left = evt.originalEvent.offsetX + "px";
      newNode.style.top = evt.originalEvent.offsetY + "px";
      this.$nextTick(() => {
        this.j.setSuspendDrawing(false, true);
      });
    },
    cancleCreate() {
      this.$store.commit("closeTab", { name: "createTask" });
      this.$router.push(
        this.$store.state.menuTabList[this.$store.state.menuTabList.length - 1]
          .path
      );
    },
    async getAllTaskGroup() {
      let res = await this.$api.task.getAllTaskGroup();
      this.options = res.data.data;
      console.log(res);
    },
    async createJob() {
      let data = {
        dir: "/",
        jobName: this.create.taskName,
        taskGroupArray: this.create.taskGroup
      };

      await this.$api.task.createJob(this.parseParams(data));
      let res = await this.$api.task.jobentrys();
      this.taskMenu = res.data.data;
      console.log(this.taskMenu);
    },
    parseParams(data) {
      try {
        var tempArr = [];
        for (var i in data) {
          var key = encodeURIComponent(i);
          var value = encodeURIComponent(data[i]);
          tempArr.push(key + "=" + value);
        }
        var urlParamsStr = tempArr.join("&");
        return urlParamsStr;
      } catch (err) {
        return "";
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
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
        // this.j.draggable(document.getElementsByClassName("chart-item"));
        this.common = {
          isSource: true,
          isTarget: true,
          maxConnections: -1,
          connector: "Flowchart"
        };
        this.list2.forEach(el => {
          this.j.draggable(document.getElementById("node" + el.id), {
            containment: "parentid"
          });
          this.j.addEndpoint(
            "node" + el.id,
            { uuid: "node" + el.id, anchor: "Continuous" },
            this.common
          );

          this.idGlobal++;
        });

        this.lineData.forEach(el => {
          this.j.connect(
            // {
            //   source: 'node0',
            //   target: 'node1'
            // }
            { uuids: [el.source, el.target] }
          );

          this.$nextTick(() => {
            this.j.setSuspendDrawing(false, true);
          });
        });

        this.j.bind("click", conn => {
          this.$q
            .dialog({
              title: "删除链接",
              message: "确定要删除该链接吗?",
              ok: {
                label: "确定"
              },
              cancel: {
                label: "取消"
              },
              persistent: true
            })
            .onOk(() => {
              this.j.deleteConnection(conn);
            });
        });

        this.j.bind("connection", (info, originalEvent) => {
          console.log(info, originalEvent);
          let line = {
            source: info.sourceId,
            target: info.targetId
          };
          this.lineData.push(line);
          console.log(this.lineData);
        });
      });
    });
   
    this.getAllTaskGroup();
  },
  watch: {
    taskNameShow: {
      handler(val, oldVal) {
        if(!val)
        this.$nextTick(() => {
           this.j.repaintEverything();
        });
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.component-item {
  width: 200px;
  cursor: move;
}
.chart {
  height: 500px;
  width: 100%;
  background: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.chart-item {
  width: auto;
  position: absolute;
  transition: none;
  margin: 0;
  cursor: pointer;
  left: 0;
  top: 0;
}
.ghost {
  position: absolute;
  opacity: 0;
}
</style>
