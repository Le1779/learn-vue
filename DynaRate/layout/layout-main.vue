<!--
Main page

Created by Kevin Le on 2020/01/12.
-->
<template>
    <div class="container">
        <div v-if="uid == null" class="loading-view">Loading...</div>
        <div class="show-list" v-if="userRateData != null">
            <div v-for="(item, key, index) in showList" class="show-list-item">
                {{item.data.name}}
                <select v-model="item.rate" :disabled="userRateData.hasOwnProperty(item.id)">
                    <option selected>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <button @click="onSendButtonClick(item)" :disabled="userRateData.hasOwnProperty(item.id)">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            uid: null,
            firebaseDB: null,
            showList: {},
            userRateData: null
        }),

        watch: {
            uid: {
                handler() {
                    console.log(this.uid);
                    this.initDateBase();
                }
            },

            showList: {
                handler() {
                    console.log(this.showList);
                },
                deep: true
            },

            userRateData: {
                handler() {
                    console.log("userRateData: " + this.userRateData);
                    if (!this.userRateData) {
                        this.userRateData = {}
                    }

                    for (const [key, value] of Object.entries(this.userRateData)) {
                        this.showList[key].rate = value.rate;
                    }
                },
                deep: true
            },
        },

        created() {
            if (!firebase.apps.length) {
                this.initFirebase();
            } else {
                this.signinFirebase();
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
                        self.signinFirebase();
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            signinFirebase() {
                firebase.auth().signInAnonymously()
                    .then(() => {})
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });

                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.uid = user.uid;
                    } else {
                        this.uid = null;
                        console.log("is logout")
                    }
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
                            rate: 1
                        })

                        //listen rate collection
                        firebaseDB.collection("rate").doc(doc.id).onSnapshot(function(doc) {
                            self.showList[doc.id].data = doc.data()
                        });
                    });

                    self.listenUserRateData();
                })
            },

            listenUserRateData() {
                var self = this;
                firebaseDB.collection("userRate").doc(this.uid).onSnapshot(function(doc) {
                    self.userRateData = doc.data();
                });
            },


            onSendButtonClick(item) {
                var self = this;
                var rate = parseInt(item.rate);
                var docDate = {};
                docDate[item.id] = {
                    rate: rate,
                    date: new Date()
                };

                firebaseDB.collection("userRate").doc(this.uid).update(docDate).then(function() {
                    console.log("Document successfully written!");
                }).catch(function(error) {
                    firebaseDB.collection("userRate").doc(self.uid).set(docDate).then(function() {
                        console.log("Document successfully written!");
                    })
                });
            }
        },
    }

</script>

<style scoped>
    .loading-view {}

</style>
