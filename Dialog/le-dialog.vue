<template>
    <div v-show="dialog_info.showDialog">
        <div class="mask"></div>
        <div class="dialog-container">
            <div class="dialog">
                <div class="close-button"></div>
                <div class="dialog-title">{{dialog_info.title}}</div>
                <div class="content-container">
                    <le-dialog-purchase v-show="dialog_info.type == 'purchase'" :data="dialog_info.content"></le-dialog-purchase>
                    <le-dialog-delete-hint v-show="dialog_info.type == 'delete_hint'" :delete_account="dialog_info.content.Email" :callback="actionCallback"></le-dialog-delete-hint>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let viewModel = {
    };

    module.exports = {
        props: ["dialog_info"],
        data: function() {
            return viewModel
        },
        methods: {
            dismiss(){
                console.log("dismiss");
                this.dialog_info.showDialog = false;
            },
            actionCallback(response){
                if(response == 'cancel'){
                    this.dismiss();
                }
                
                if(response == 'complete'){
                    this.dismiss();
                }
            }
        },
        components: {
            'le-button': httpVueLoader('le-button.vue'),
            'le-dialog-purchase': httpVueLoader('le-dialog-purchase.vue'),
            'le-dialog-delete-hint': httpVueLoader('le-dialog-delete-hint.vue')
        }
    }

</script>

<style scoped>
    .mask {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25)
    }

    .dialog-container {
        position: fixed;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;

    }

    .dialog {
        position: relative;
        background-color: white;
        min-width: 240px;
        max-width: 80%;
        width: 512px;
        border-radius: 8px;
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15);
        overflow: hidden;
    }

    .dialog-title {
        margin-bottom: 20px;
        padding: 24px 24px 0;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: .005em;
        line-height: 26px;
    }

    .content-container {
        padding: 0 24px;
        margin-bottom: 20px;
    }

    .dialog-actions {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: flex-end;
        padding: 0 24px;
        margin-bottom: 20px;
    }

</style>
