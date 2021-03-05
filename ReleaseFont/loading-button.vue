<!--
Loading Button

Created by Kevin Le on 2021/3/5.
-->
<template>
   <div class="button-container" @click="onClickListener">
       <div v-if="!model.loading" class="icon material-icons">{{model.icon}}</div>
       <div v-if="model.loading" class="loader"></div>
   </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
        }),

        watch: {

        },

        mounted() {},

        created() {},

        components: {

        },

        methods: {
            onClickListener() {
                if (this.model.loading) {
                    return;
                }
                
                this.model.loading = true;
                this.$emit('action', false)
            }
        },
    }

</script>

<style scoped>
    .button-container {
        display: inline-block;
        position: relative;
        background-color: #383838;
        color: #FFFFFF;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        cursor: pointer;
    }
    
    .button-container:hover {
        background-color: #585858;
    }
    
    .button-container .icon {
        font-size: 32px;
        line-height: 48px;
        text-align: center;
        width: 100%;
    }
    
    .button-container .loader {
        position: absolute;
        top: 9px;
        left: 9px;
        width: 24px;
        height: 24px;
        border: 3px solid #00000000;
        border-radius: 50%;
        border-top: 3px solid #FFFFFF;
        -webkit-animation: spin 2s linear infinite;
        /* Safari */
        animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

</style>
