<template>
    <v-row>
        <v-col cols="6">
            <v-menu v-model="date_from_menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="search_item.PurchaseStartDate" label="購買時間 From" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="search_item.PurchaseStartDate" @input="date_from_menu = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="6">
            <v-menu v-model="date_to_menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="search_item.PurchaseEndDate" label="購買時間 To" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="search_item.PurchaseEndDate" @input="date_to_menu = false" :allowed-dates="allowedPurchaseEndDates"></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="6">
            <v-menu v-model="expire_from_menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="search_item.ExpireStartDate" label="到期日 From" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="search_item.ExpireStartDate" @input="expire_from_menu = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="6">
            <v-menu v-model="expire_to_menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="search_item.ExpireEndDate" label="到期日 To" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="search_item.ExpireEndDate" @input="expire_to_menu = false" :allowed-dates="allowedExpireEndDates"></v-date-picker>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script>
    module.exports = {
        props: {
            clear_trigger: Boolean,
            search_item: Object
        },
        data: () => ({
            date_from_menu: false,
            date_to_menu: false,
            expire_from_menu: false,
            expire_to_menu: false,
        }),

        watch: {
            "clear_trigger": {
                handler(val) {
                    this.clear();
                },
            },
        },

        created() {},

        components: {
            'timeline-item': httpVueLoader('../DetailDialog/timeline-item.vue')
        },

        methods: {

            search() {
                this.$emit('action', false)
            },

            clear() {
                this.search_item.Name = '';
                this.search_item.ProductName = null;
                this.search_item.PurchaseStartDate = null;
                this.search_item.PurchaseEndDate = null;
                this.search_item.ExpireStartDate = null;
                this.search_item.ExpireEndDate = null;
            },

            allowedPurchaseEndDates(val) {
                return val > this.search_item.PurchaseStartDate
            },

            allowedExpireEndDates(val) {
                return val > this.search_item.ExpireStartDate
            },
        },
    }

</script>

<style scoped>

</style>
