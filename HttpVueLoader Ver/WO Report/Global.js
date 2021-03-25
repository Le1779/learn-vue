const APP = Vue.observable({
    API_URL: null,
    ROUTE_PARAMS: null,
    START_DATE: null,
    END_DATE: null
})

Object.defineProperty(Vue.prototype, '$API_URL', {
    get() {
        return APP.API_URL == null ? localStorage.getItem('api_url') : APP.API_URL
    },

    set(value) {
        localStorage.setItem('api_url', value)
        APP.API_URL = value
    }
})

Object.defineProperty(Vue.prototype, '$ROUTE_PARAMS', {
    get() {
        return APP.ROUTE_PARAMS == null ? localStorage.getItem('route_params') : APP.ROUTE_PARAMS
    },

    set(value) {
        localStorage.setItem('route_params', value)
        APP.ROUTE_PARAMS = value
    }
})

Object.defineProperty(Vue.prototype, '$START_DATE', {
    get() {
        return APP.START_DATE == null ? localStorage.getItem('start_date') : APP.START_DATE
    },

    set(value) {
        localStorage.setItem('start_date', value)
        APP.START_DATE = value
    }
})

Object.defineProperty(Vue.prototype, '$END_DATE', {
    get() {
        return APP.END_DATE == null ? localStorage.getItem('end_date') : APP.END_DATE
    },

    set(value) {
        localStorage.setItem('end_date', value)
        APP.END_DATE = value
    }
})