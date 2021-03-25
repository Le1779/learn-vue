<!--
Main page

Created by Kevin Le on 2020/01/12.
-->
<template>
    <div class="container">
        <div class="show-selector-container" style="display: none;">
            <select class="show-selector">
                <option selected>表演節目1</option>
                <option>表演節目2</option>
            </select>
        </div>

        <div class="rate" style="display: none;">
            <div class="rate-text">
                評分
            </div>
        </div>

        <div v-if="Object.keys(showList).length == 0" class="loading-view">Loading...</div>

        <div class="show-list" v-if="userRateData != null">
            <div v-for="(item, key, index) in showList" class="show-list-item">
                <div class="show-name">
                    節目{{index+1}}:{{item.data.name}}
                    <div class="player">{{item.data.player}}</div>
                </div>

                <div style="margin: auto; display: table;">
                    <div class="show-rate">
                        評分
                        <select v-model="item.rate" :disabled="userRateData.hasOwnProperty(item.id)">
                            <option selected>10</option>
                            <option>9</option>
                            <option>8</option>
                            <option>7</option>
                            <option>6</option>
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                        </select>
                    </div>



                    <button @click="onSendButtonClick(item)" :disabled="userRateData.hasOwnProperty(item.id)" class="show-rate-send">送出</button>
                </div>


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
                            rate: 10
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
    .loading-view {
        font-size: 2rem;
        color: #D2A76A;
        text-align: center;
        line-height: 20vh;
    }

    .container {
        position: absolute;
        width: 100vw;
        height: 100vh;
        padding: 6.4rem 0;
        overflow: hidden;
    }

    .show-list {
        height: 100%;
        overflow: auto;
    }

    .show-list-item {
        margin-bottom: 2rem;
    }

    .show-name {
        background: url('../images/show-bg.png') no-repeat;
        background-position: center center;
        background-size: contain;
        position: relative;
        margin: auto;
        width: 24rem;
        height: 6.4rem;
        top: 0;
        margin: auto;
        max-width: 100%;

        padding-top: 1.4rem;
        padding-left: 8.4rem;
        padding-right: 0.4rem;
        font-size: 1.4rem;
    }

    .show-rate {
        background: url('../images/rate.png') no-repeat;
        background-position: center center;
        background-size: contain;
        position: relative;
        width: 11rem;
        height: 4rem;
        font-size: 2.4rem;
        line-height: 4rem;
        display: inline-grid;
        padding-left: 1rem;
        padding-right: 1rem;
        grid-template-columns: auto auto;
    }

    .show-rate select {
        background: none;
        border: none;
        height: 4rem;
        font-size: 1.8rem;
    }

    .show-rate-send {
        background: url('../images/rate.png') no-repeat;
        background-position: center center;
        background-size: contain;
        position: relative;
        width: 11rem;
        height: 4rem;
        font-size: 2.4rem;
        line-height: 4rem;
        display: inline-block;
        border: none;
        cursor: pointer;
        text-align: center;
    }

    .player {}

    .show-selector-container {
        background: url('../images/show-bg.png') no-repeat;
        background-position: center center;
        background-size: contain;
        position: relative;
        margin: auto;
        width: 24rem;
        height: 6.4rem;
        top: 0;
        margin: auto;
        max-width: 100%;
    }

    .show-selector {
        background: none;
        border: none;
        height: 6.4rem;
        font-size: 2.4rem;
        margin-left: 8.4rem;
    }

    .rate {
        display: grid;
        grid-template-columns: 12rem auto;
    }

    .rate-text {
        background: url('../images/rate.png') no-repeat;
        background-position: center center;
        background-size: contain;
        position: relative;
        width: 12rem;
        height: 4rem;
        font-size: 2.4rem;
        text-align: center;
        line-height: 4rem;
        display: inline-block;
    }

    .rate-item {
        background: url('../images/rate-item.png') no-repeat;
        background-position: center center;
        background-size: contain;
        position: relative;
        width: 3rem;
        height: 4rem;
        font-size: 2.4rem;
        text-align: center;
        line-height: 4rem;
        display: inline-block;
    }

    @media only screen and (max-width: 768px) {
        .container {
            padding: 4.8rem 0 !important;
        }

        .show-selector-container {
            height: 4.8rem !important;
        }

        .show-selector {
            height: 4.8rem !important;
            font-size: 1.6rem !important;
            margin-left: 6.8rem !important;
        }
    }

</style>
