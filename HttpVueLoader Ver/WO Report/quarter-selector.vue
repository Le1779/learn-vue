<template>
    <div class="quarter-selector-container">
        <div class="quarter-selector-title">統計區間</div>
        <select class="quarter-selector" v-model="model.value">
            <option value="1">Q1</option>
            <option value="2">Q2</option>
            <option value="3">Q3</option>
            <option value="4">Q4</option>
        </select>
        <div class="quarter-selector datepicker-range">
            <vuejs-datepicker v-model="$START_DATE" :disabled-dates="disabledDatesStart" format="yyyy/MM/dd" @closed="onSelectDate"></vuejs-datepicker>
            <div class="material-icons">keyboard_arrow_right</div>
            <vuejs-datepicker v-model="$END_DATE" :disabled-dates="disabledDatesEnd" format="yyyy/MM/dd" @closed="onSelectDate"></vuejs-datepicker>
        </div>

    </div>
</template>


<script scoped>
    module.exports = {
        props: ["model"],
        data: () => ({
            disabledDatesStart: {
                from: new Date()
            },

            disabledDatesEnd: {
                to: new Date()
            }
        }),

        computed: {

        },

        watch: {
            
        },

        created() {
            this.disabledDatesStart.from = new Date(this.$END_DATE)
            this.disabledDatesEnd.to = new Date(this.$START_DATE)
        },

        methods: {
            onSelectDate() {
                this.disabledDatesEnd.to = new Date(this.$START_DATE)
                this.disabledDatesStart.from = new Date(this.$END_DATE)
                this.model.refresh();
            }
        },

        components: {
            vuejsDatepicker
        }
    }

</script>

<style scoped>
    .quarter-selector-container {
        display: inline-grid;
        grid-template-columns: auto auto auto;
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

    .quarter-selector input {
        border: none;
        background-color: transparent;
        text-align: center;
    }

    .datepicker-range {
        display: inline-grid;
        grid-template-columns: auto auto auto;
        background-color: white;
    }

</style>
