let lcModel = {
    count: 0,
};

let lcMethods = {
    addCount: () => {
        lcModel.count++
    },
}

Vue.component('left-container', {
    data: function () {
        return lcModel
    },
    methods: lcMethods,
    template: '<button v-on:click="addCount">You clicked me {{ count }} times.</button>'
})
