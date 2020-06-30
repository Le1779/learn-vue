<template>
    <thead>
        <tr>
            <th v-for="(item, index) in model.column" @click="onOrderByButtonClick(index)">
                <div>
                    {{item.name}}
                    <div class="material-icons" style="opacity: 0.3;">{{model.orderByIndex == index ? model.desc ? 'arrow_upward' : 'arrow_downward' : index < 7 ? 'swap_vert' : ''}}
                    </div>
                </div>
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

    th>div {
        display: inline-grid;
        grid-template-columns: auto 24px;
    }

    th>.material-icons {
        font-size: medium;
        font-weight: bold;
    }

</style>
