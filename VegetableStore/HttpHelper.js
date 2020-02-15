var httpHelperMixin = {
    methods: {
        hello: function () {
            console.log('hello from mixin!')
        },
        
        excuteGet(url, obj, success, fail) {
            axios.get(url, { params: obj })
                .then(function (response) {
                    if (response.data.Code == 0) {
                        success(response);
                    } else {
                        fail(response.data.Message);
                    }
                }).catch(function (error) {
                    fail(error);
                });
        },

        excutePost(url, obj, success, fail) {
            axios.post(url, obj)
                .then(function (response) {
                    if (response.data.Code == 0) {
                        success(response);
                    } else {
                        fail(response.data.Message);
                    }
                }).catch(function (error) {
                    fail(error);
                });
        },
    }
}

var HttpHelper = Vue.extend({
    mixins: [httpHelperMixin]
})

var httpHelper = new HttpHelper()
