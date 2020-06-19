<template>
    <thead>
        <tr>
            <th v-for="(item, index) in model.column" @click="onOrderByButtonClick(index)">
                {{item.name}}
                <div class="material-icons">{{model.orderByIndex == index ? model.desc ? 'arrow_upward' : 'arrow_downward' : ''}}</div>
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

</style>
