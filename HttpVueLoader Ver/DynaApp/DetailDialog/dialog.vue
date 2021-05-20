<template>
    <v-dialog v-model="view_model.show" width="600" scrollable>

        <v-card>
            <v-card-title>
                <div class="headline" style="margin-right: 20px;">交易紀錄</div>
                <div>Demo@gmail.com</div>

                <v-spacer></v-spacer>
                <v-icon v-if="page == 1" @click="page = 2">search</v-icon>
                <v-btn v-if="page == 2" @click="page = 1" color="grey darken-1" text>{{text.search}}</v-btn>
                <v-icon v-if="page == 3" @click="page = 1">arrow_back</v-icon>
            </v-card-title>

            <v-card-text>

                <v-stepper v-model="page" elevation=0>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <main-view :data="data" :actoin="getReceipt"></main-view>
                        </v-stepper-content>
                        
                        <v-stepper-content step="2">
                            <search-view :search_item = "searchCondition" :clear_trigger="clearSearchColumnTrigger"></search-view>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <pre>{{receipt}}</pre>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions v-if="page == 2">
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
            page: 1,
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

        watch: {
            "view_model.show": {
                handler(val) {
                    if (val) {
                        this.getData();
                    } else {
                        this.page = 1;
                        this.data = [];
                    }
                }
            },
            
            page: {
                handler(val) {
                    if (val == 1) {
                        this.getData();
                    }
                }
            }
        },

        created() {
            this.view_model.show = true;
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
