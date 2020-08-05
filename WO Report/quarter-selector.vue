<template>
    <div class="quarter-selector-container">
        <div class="quarter-selector-title">統計區間</div>
        <select class="quarter-selector" v-model="model.value">
            <option value="1">Q1</option>
            <option value="2">Q2</option>
            <option value="3">Q3</option>
            <option value="4">Q4</option>
        </select>
    </div>
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
    .quarter-selector-container {
        display: inline-grid;
        grid-template-columns: auto auto;
    }
    
    .quarter-selector-title {
        color: #5F6169;
        font-size: x-large;
    }
    
    .quarter-selector {
        margin-left: 16px;
        padding: 8px 24px;
        border-radius: 20px;
        border: 1px solid #C1C1C1;
    }

</style>
