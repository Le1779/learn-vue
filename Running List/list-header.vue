<template>
    <thead>
        <tr>
            <th v-for="(item, index) in model.column" @click="onOrderByButtonClick(index)">
                <div class="material-icons">{{item.name}} {{model.orderByIndex == index ? model.desc ? 'arrow_upward' : 'arrow_downward' : ''}}</div>
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
    th {
        cursor: pointer;
    }

    th>div.material-icons {
        font-size: medium;
        font-weight: bold;
    }

</style>
