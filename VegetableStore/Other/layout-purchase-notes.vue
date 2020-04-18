<template>
    <v-container fluid>
        <v-card>
            <v-card-text>
                <div>購買須知</div>
                <v-progress-circular v-if="loading" indeterminate color="primary" class="ma-2"></v-progress-circular>
                <v-edit-dialog :return-value.sync="notes" large save-text="儲存" cancel-text="取消" @save="savePurchaseNotes()">
                    <p v-if="notes != ''" class="headline text--primary">
                        {{notes}}
                    </p>
                    <p v-else class="headline text--primary">
                        無購買須知
                    </p>
                    <template v-slot:input>
                        <v-textarea v-model="notes" counter> </v-textarea>
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
            notes: '',
        }),

        created() {
            this.url = this.$HOST + '/PurchaseNotes'
            this.getPurchaseNotes()
        },

        methods: {
            getPurchaseNotes() {
                this.loading = true;
                let getObj = {};
                httpHelper.excuteGet(this.url, getObj, success, fail);

                let self = this;

                function success(response) {
                    self.notes = response.data.Data;
                    self.loading = false;
                }

                function fail(error) {
                    console.log(error);
                    self.snackbar_model.message = error;
                    self.snackbar_model.show = true;
                    self.loading = false;
                }
            },

            savePurchaseNotes() {
                console.log("savePurchaseNotes");
                let postObj = new FormData();
                postObj.set('Token', this.$TOKEN);
                postObj.set('PurchaseNotes', this.notes);
                httpHelper.excutePost(this.url, postObj, success, fail);

                let self = this;

                function success(response) {
                    self.getPurchaseNotes()
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
