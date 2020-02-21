var httpHelperMixin = {
    methods: {
        excuteGet(url, obj, success, fail) {
            axios.get(url, {
                    params: obj
                })
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

        excuteDelete(url, obj, success, fail) {
            axios.delete(url, obj)
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

        excuteTestPost(url, obj, success, fail) {
            setTimeout(function () {
                fail("Test");
            }, 3000)
            return;
        },
    }
}

var HttpHelper = Vue.extend({
    mixins: [httpHelperMixin]
})

var httpHelper = new HttpHelper()
