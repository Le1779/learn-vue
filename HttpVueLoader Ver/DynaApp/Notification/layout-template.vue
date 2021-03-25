<!--
Edit history table page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="page-container">
        <div v-for="(d) in listData">
            {{d.Department}}
            <div v-for="(m) in d.Member">
                {{m}}
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            listData: [],
        }),

        watch: {

        },

        created() {
            
        },

        components: {

        },

        methods: {
            
        },
    }

</script>

<style scoped>


</style>
