<template>
    <div>
        <div v-for="button in buttons" class="filter-button" :class="[filter.current==button.value ? '' : 'hidden']" @click="filter.current=button.value">
            {{button.name}}
            <div class="material-icons">{{filter.current==button.value ? 'visibility' : 'visibility_off'}}</div>
        </div>
    </div>
</template>


<script scoped>
    module.exports = {
        props: ["filter"],
        data: () => ({
            buttons: [{
                name: '與我有關的工單',
                value: 'Related'
            }, {
                name: '檢視全部工單',
                value: 'All'
            }, {
                name: '部門進行中工單',
                value: 'Department'
            }, {
                name: '保密工單',
                value: 'Confidential'
            }]
        }),

        computed: {

        },

        watch: {

        },

        created() {},

        methods: {

        },

        components: {

        }
    }

</script>

<style scoped>
    .filter-button {
        display: inline-grid;
        grid-template-columns: auto 24px;
        background-color: #E4E4E4;
        padding: 8px 12px;
        border-radius: 5px;
        margin-left: 30px;
        transition: 0.2 opacity 0.5 ease-in-out;
    }

    .filter-button.hidden {
        opacity: 0.3;
    }

    .filter-button .material-icons {
        padding-left: 2px;
        color: #E63061;
        font-size: normal;

    }

    .filter-button.hidden .material-icons {
        color: black;
    }

</style>
