<template>
    <div class="textview-container">
        
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            text: {
                completed: '已完成',
                created: '已建立',
                completed_rate: '達成率'
            },
            
            completed_count: 40,
            created_count: 52
        }),

        watch: {

        },

        created() {
            console.log("created summary");
        },

        components: {

        },

        methods: {
            getUserInfo() {

            },
        },
    }

</script>

<style>
    .textview-container {
        
    }
</style>
