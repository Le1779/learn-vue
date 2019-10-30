<template>
    <div class="container">
        <le-toolbar></le-toolbar>
        Hello {{who}}
    </div>
</template>

<script>
    let viewModel = {
        who: 'world',
    };
    module.exports = {
        data: function() {
            return viewModel
        },
        methods: {
        },
        components: {
            'le-toolbar': httpVueLoader('le-toolbar.vue')
        }
    }

</script>

<style scoped>
    .container {
        width: 700px;
        height: 300px;
        border-radius: 8px;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15);
        overflow: hidden;
    }

    
</style>
