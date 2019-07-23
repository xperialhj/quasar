<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      header-nav
    >
      <q-step
        :name="1"
        title="连接数据库"
        icon="settings"
        :done="step > 1"
      >
        <div class="q-gutter-md row">
          <q-select
            filled
            v-model="model"
            use-input
            input-debounce="0"
            label="请选择数据库连接"
            :options="options"
            @filter="filterFn"
            style="width: 250px"
          >

          </q-select>
          <q-btn
            color="white"
            text-color="black"
            label="编辑"
          />
          <q-btn
            color="white"
            text-color="black"
            label="新建"
          />
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="step = 2"
            color="primary"
            label="下一步"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="数据输入"
        icon="create_new_folder"
        :done="step > 2"
      >
        An ad group contains one or more ads which target a shared set of keywords.

        <q-stepper-navigation>
          <q-btn
            @click="step = 3"
            color="primary"
            label="下一步"
          />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="数据输出"
        icon="assignment"
        :done="step > 3"
      >
        This step won't show up because it is disabled.
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="完成"
          />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

    </q-stepper>
    <div class="q-pa-md q-gutter-sm">
    <q-btn label="Maximized" color="primary" @click="dialog = true" />

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1,
       dialog: false,
      maximizedToggle: true
    };
  }
};
</script>