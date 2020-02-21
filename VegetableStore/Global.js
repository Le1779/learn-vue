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

$TOKEN = localStorage.getItem('token');
console.log($TOKEN);

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