<!--
Result page

Created by Kevin Le on 2020/01/12.
-->
<template>
    <div class="container">
        <div v-if="Object.getOwnPropertyNames(showList).length === 1" class="loading-view">Loading...</div>
        <div class="show-list">
            <div v-for="(item, key, index) in showList" class="show-list-item">
                {{item.data.name}}
                <div>
                    總分: {{item.totalScore}}
                </div>
                <div>
                    總投票人數: {{item.totalRateUser}}
                </div>
                <div>
                    平均分數: {{item.totalScore / item.totalRateUser}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            firebaseDB: null,
            showList: {},
        }),

        watch: {},

        created() {
            if (!firebase.apps.length) {
                this.initFirebase();
            } else {
                this.initDateBase();
            }
        },

        components: {},

        methods: {
            initFirebase() {
                var self = this;
                axios.get("firebaseConfig.json")
                    .then(function(response) {
                        var config = response.data;
                        firebase.initializeApp(config);
                        self.initDateBase();
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            initDateBase() {
                firebaseDB = firebase.firestore();
                this.getRateData();


            },

            getRateData() {
                var self = this;
                firebaseDB.collection("rate").get().then(function(querySnapshot) {
                    querySnapshot.forEach((doc) => {
                        Vue.set(self.showList, doc.id, {
                            id: doc.id,
                            data: doc.data(),
                            totalScore: 0,
                            totalRateUser: 0
                        })

                        //listen rate collection
                        firebaseDB.collection("rate").doc(doc.id).onSnapshot(function(doc) {
                            self.showList[doc.id].data = doc.data()
                        });
                    });

                    self.listenRateResult();
                })
            },

            listenRateResult() {
                var self = this;
                firebaseDB.collection("userRate").onSnapshot(function(querySnapshot) {
                    for (const [key, value] of Object.entries(self.showList)) {
                        self.showList[key].totalScore = 0;
                        self.showList[key].totalRateUser = 0;
                    }

                    querySnapshot.forEach((doc) => {
                        var userRateData = doc.data();
                        for (const [key, value] of Object.entries(userRateData)) {
                            self.showList[key].totalScore += value.rate;
                            self.showList[key].totalRateUser++;
                        }
                        //console.log(doc.data())
                    })
                });
            }
        },
    }

</script>

<style scoped>
    .show-list-item {
        margin-bottom: 24px;
    }
</style>
