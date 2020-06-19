<template>
    <thead>
        <tr>
            <th v-for="(item, index) in model.column">
                {{item}}
                <button v-if="index<7" :class="[model.orderByIndex == index ? model.desc ? 'red' : 'green' : '']" @click="onOrderByButtonClick(index)">s</button>
            </th>
        </tr>
    </thead>
</template>


<script scoped>
    module.exports = {
        props: ["model"],
        data: () => ({

        }),

        computed: {

        },

        watch: {

        },

        created() {},

        methods: {
            onOrderByButtonClick(index) {
                if (index == this.model.orderByIndex) {
                    this.model.desc = !this.model.desc;
                } else {
                    this.model.orderByIndex = index;
                    this.model.desc = true;
                }
            }
        },

        components: {

        }
    }

</script>

<style scoped>
    .red {
        background-color: red;
    }
    
    .green {
        background-color: green;
    }

</style>
