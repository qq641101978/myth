import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0
  },
  mutations: {
    add (state, num = 1) {
      state.num += num
      return true
    }
  },
  actions: {
    add ({ commit, ...data }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('add')
          resolve({ ok: 200 })
        }, 1000)
      })
    }
  }
})
