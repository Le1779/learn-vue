const TOKEN = Vue.observable({
    TOKEN: null
})

Object.defineProperty(Vue.prototype, '$TOKEN', {
    get() {
        return TOKEN.TOKEN
    },

    set(value) {
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