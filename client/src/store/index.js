import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    username: null,
    users: [],
    room: null
  },
  mutations: {
    SOCKET_connect(state) {
      state.isConnected = true
    },
    SOCKET_disconnect(state) {
      state.isConnected = false
    },
    SOCKET_USERS(state, payload) {
      console.log(payload)
      state.users = payload
    },
    SET_USERNAME (state, payload) {
      state.username = payload
    },
    SET_ROOM (state, payload) {
      state.room = payload
    },
    CLEAR_USERNAME (state) {
      state.username = ""
    },
    CLEAR_ROOM (state) {
      state.room = ""
    }
  },
  actions: {
  },
  modules: {
  }
})
