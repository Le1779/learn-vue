<template>
    <div>
        <buttons-container :filter="filter"></buttons-container>
        <list-container :view_model="fakeData" :filter="filter"></list-container>
    </div>
</template>


<script scoped>
    module.exports = {
        data: () => ({
            fakeData: null,
            filter: {
                current: 'Related',
            }
        }),

        computed: {

        },

        watch: {

        },

        created() {
            var self = this;
            axios.get('./data.json')
                .then((res) => {
                    self.fakeData = res.data;
                }).catch((err) => {
                    console.log(err);
                })
        },

        methods: {

        },

        components: {
            'buttons-container': httpVueLoader('buttons-container.vue'),
            'list-container': httpVueLoader('list-container.vue'),
        }
    }

</script>

<style scoped>

</style>
