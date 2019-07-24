import Vue from 'vue'
import Vuex from 'vuex'


// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      menuTabList: [
        {
          name: "home",
          label: "首页",
          path: "/"
        }
      ]
    },
    mutations: {
      addTab (state, tab) {
        state.menuTabList.push (tab); 
      },
      closeTab(state, tab) {
        state.menuTabList = state.menuTabList.filter(item => item.name != tab.name);
      },
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
