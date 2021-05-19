<template>
    <v-dialog v-model="view_model.show" width="600" scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="gray lighten-2" dark v-bind="attrs" v-on="on">
                Click Me
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <div class="headline" style="margin-right: 20px;">交易紀錄</div>
                <div>Demo@gmail.com</div>

                <v-spacer></v-spacer>
                <v-btn v-if="page == 1" @click="page = 2" color="grey darken-1" text>{{text.search}}</v-btn>
                <v-icon v-if="page == 2" @click="page = 1">search</v-icon>
                <v-icon v-if="page == 3" @click="page = 2">arrow_back</v-icon>
            </v-card-title>

            <v-card-text>

                <v-stepper v-model="page" elevation=0>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <search-view :search_item = "searchCondition" :clear_trigger="clearSearchColumnTrigger"></search-view>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <main-view :data="data" :actoin="getReceipt"></main-view>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <pre>{{receipt}}</pre>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions v-if="page == 1">
                <v-spacer></v-spacer>
                <v-btn color="pink lighten-2" text @click="clearSearchColumnTrigger = !clearSearchColumnTrigger">{{text.clear}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    module.exports = {
        props: {
            view_model: Object,
        },
        data: () => ({
            text: {
                search: "搜尋",
                clear: "清除"
            },
            page: 2,
            data: [],
            searchCondition: {
                Name: '',
                ProductName: null,
                PurchaseStartDate: null,
                PurchaseEndDate: null,
                ExpireStartDate: null,
                ExpireEndDate: null,
            },
            clearSearchColumnTrigger: true,
            receipt: "",
        }),

        watch: {},

        created() {
            this.getData();
        },

        components: {
            'main-view': httpVueLoader('dialog-main.vue'),
            'search-view': httpVueLoader('dialog-search.vue'),
        },

        methods: {
            getData() {
                var self = this;

                axios.get('data.json')
                    .then(function(response) {
                        console.log(response);
                        self.data = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            getReceipt(receipt) {
                this.page = 3;
                var jsonObj = JSON.parse(receipt);
                this.receipt = JSON.stringify(jsonObj, null, '\t');
            },
        },
    }

</script>

<style scoped>

</style>
