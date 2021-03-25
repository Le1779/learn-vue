<!--
Detail page

Created by Kevin Le on 2020/01/22.
-->
<template>
    <div class="container">
        {{uid}}
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            uid: null,
        }),

        watch: {},

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
                        console.log("is login")
                    } else {
                        this.uid = null;
                        console.log("is logout")
                    }
                });
            },
        },
    }

</script>

<style scoped>
    .container {
        position: absolute;
        width: 100vw;
        height: 100vh;
        padding: 6.4rem 0;
        overflow: hidden;
        color: #D2A76A;
        text-align: center;
        font-size: 2rem;
    }
</style>
