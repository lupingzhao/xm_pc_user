import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carSum: 0,
    user: JSON.parse(localStorage.getItem('pc-user'))
  },
  mutations: {
    setCarSum(state, data) {
      state.carSum = data
    },
    setUser(state, data) {
      state.user = data
    },
  },
  actions: {
  },
  modules: {
  }
})
