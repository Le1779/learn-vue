import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const TOKEN = Vue.observable({
    TOKEN: null
})

Object.defineProperty(Vue.prototype, '$TOKEN', {
    get() {
        return TOKEN.TOKEN == null ? localStorage.getItem('token') : TOKEN.TOKEN
    },

    set(value) {
        localStorage.setItem('token', value)
        TOKEN.TOKEN = value
    }
})

const USER =  Vue.observable({
    USER: null
})

Object.defineProperty(Vue.prototype, '$USER', {
    get() {
        return USER.USER
    },

    set(value) {
        USER.USER = value
    }
})

export default store