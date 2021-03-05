<!--
Release font component test page

Created by Kevin Le on 2021/3/5.
-->
<template>
    <div>
        <loading-button :model="loadingButtonModel" class="loading-button" @action="onLoadingButtonClick"></loading-button>
    </div>
</template>

<script>
    module.exports = {
        data: () => ({
            loadingButtonModel: {
                icon: 'keyboard_arrow_right',
                loading: false
            }
        }),

        watch: {

        },

        mounted() {},

        created() {},

        components: {
            'loading-button': httpVueLoader('loading-button.vue'),
        },

        methods: {
            onLoadingButtonClick() {
                console.log("loading button click.")
                setTimeout(() => (this.loadingButtonModel.loading = false), 3000)
            }
        },
    }

</script>

<style scoped>
    .loading-button {
        margin: 24px;
    }
</style>
