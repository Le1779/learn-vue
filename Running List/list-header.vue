<template>
    <thead>
        <tr>
            <th v-for="(item, index) in model.column" @click="onOrderByButtonClick(index)" :class="[model.orderByIndex == index ? model.desc ? 'red' : 'green' : '']">
                {{item.name}}
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
                if (index >= 7) {
                    return
                }
                
                if (index == this.model.orderByIndex) {
                    this.model.desc = !this.model.desc;
                } else {
                    this.model.orderByIndex = index;
                    this.model.desc = false;
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
