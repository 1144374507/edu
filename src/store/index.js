
import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)
const key = 'token'
const store = new Vuex.Store({
  state() {
    return {
      token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : '',
      userdata: localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')) : {},
      adminCount: localStorage.getItem('adminCount') ? JSON.parse(localStorage.getItem('adminCount')) : '',
      userName: localStorage.getItem('userName') ? JSON.parse(localStorage.getItem('userName')) : '',
    }
  },
  getters: {
    getSortage: function (state) {
      if (!state.token) {
        state.token = JSON.parse(localStorage.getItem(key))
      }
      return state.token
    },
    getUserdata: function (state) {
      if (!state.userdata) {
        state.userdata = JSON.parse(localStorage.getItem('userdata'))
      }
      return state.userdata
    },
    getAdminCount: function (state) {
      if (!state.adminCount) {
        state.adminCount = JSON.parse(localStorage.getItem('adminCount'))
      }
      return state.adminCount

    },
  },
  mutations: {
    $_setStorage(state, value) {
      state.token = value;
      localStorage.setItem(key, JSON.stringify(value))
    },
    $_removeStorage(state) {
      state.token = null;
      localStorage.removeItem(key)
    },
    $_setUserdata(state, value) {
      state.userdata = value;
      localStorage.setItem('userdata', JSON.stringify(value))

    },
    $_userName(state, value) {
      state.userName = value;
      localStorage.setItem('userName', JSON.stringify(value))
    },
    $_adminCount(state, value) {
      state.adminCount = value;
      localStorage.setItem('adminCount', JSON.stringify(value))
    },

  },
})
export default store