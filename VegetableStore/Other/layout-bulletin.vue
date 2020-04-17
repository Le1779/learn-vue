<template>
    <v-container fluid>
        <v-card>
            <v-card-text>
                <div>公告</div>
                <v-progress-circular v-if="loading" indeterminate color="primary" class="ma-2"></v-progress-circular>
                <v-edit-dialog :return-value.sync="bulletin" large save-text="儲存" cancel-text="取消" @save="saveBulletin()">
                    <p v-if="bulletin != ''" class="headline text--primary">
                        {{bulletin}}
                    </p>
                    <p v-else class="headline text--primary">
                        無公告
                    </p>
                    <template v-slot:input>
                        <v-textarea v-model="bulletin" counter> </v-textarea>
                    </template>
                </v-edit-dialog>
            </v-card-text>
        </v-card>
    </v-container>
</template>


<script>
    module.exports = {
        props: ["snackbar_model"],
        data: () => ({
            url: '',
            loading: false,
            bulletin: '',
        }),

        created() {
            this.url = this.$HOST + '/Bulletin'
            this.getBulletin()
        },

        methods: {
            getBulletin() {
                this.loading = true;
                let getObj = {};
                httpHelper.excuteGet(this.url, getObj, success, fail);

                let self = this;

                function success(response) {
                    self.bulletin = response.data.Data;
                    self.loading = false;
                }

                function fail(error) {
                    console.log(error);
                    self.snackbar_model.message = error;
                    self.snackbar_model.show = true;
                    self.loading = false;
                }
            },

            saveBulletin() {
                console.log("saveBulletin");
                let postObj = new FormData();
                postObj.set('Token', this.$TOKEN);
                postObj.set('Bulletin', this.bulletin);
                httpHelper.excutePost(this.url, postObj, success, fail);

                let self = this;

                function success(response) {
                    self.getBulletin()
                }

                function fail(error) {
                    console.log(error);
                    self.snackbar_model.message = error
                    self.snackbar_model.show = true
                }
            },
        },

        watch: {},
    }

</script>
