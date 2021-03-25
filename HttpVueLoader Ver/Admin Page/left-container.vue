<template>
    <div class="container">
        Hello {{who}}
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
                who: 'world'
            }
        }
    }
</script>

<!--scoped 可以讓這段css只在該區域作用-->
<style scoped>
    .container {
        width: 20vw;
        height: 100vh;
        padding: .5em;
        color: #73879C;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.471;
        background-color: #2A3F54;
    }

</style>
