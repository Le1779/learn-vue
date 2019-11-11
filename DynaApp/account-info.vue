<template>
    <div class="account-info-container">
        <div class="login-account-container">
            <div class="account-title">
                {{login_account_title_text}}
            </div>
            <div class="login-account">
                <platform-logo :platform="account.platform"></platform-logo>
                <div class="login-account-text">
                    {{account.login_name}}
                </div>
            </div>
        </div>
        <div class="apple-id-container">
            <div class="account-title">
                {{apple_id_title_text}}
            </div>
            <div class="apple-id">
                {{account.apple_id}}
            </div>
        </div>
    </div>
</template>

<script>
    let viewModel = {
        login_account_title_text: '購買帳號',
        apple_id_title_text: 'Apple ID'
    }

    module.exports = {
        props: ["account"],
        data: function() {
            return viewModel
        },
        components: {
            'platform-logo': httpVueLoader('platform-logo.vue')
        },
    }

</script>

<style scoped>
    .account-info-container {
        display: flex;
        margin-bottom: 40pt;
    }

    .login-account-container {
        position: relative;
        display: inline-block;
        width: 60%;
    }

    .apple-id-container {
        display: inline-block;
        width: 30%;
    }

    .account-title {
        margin-bottom: 14pt;
    }

    .login-account {
        display: flex;
        align-items: center;
        align-content: center;
    }

    .platform-icon {
        width: 25pt;
        height: 25pt;
        border-radius: 15pt;
        left: 0;
    }

    .login-account-text {
        padding-left: 10pt;
    }

</style>
