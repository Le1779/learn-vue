<template>
    <div class="container">
        <div class="header-container">
            <div class="toolbar">
                <ul class="toolbar-container">
                    <li class="language-selector"></li>
                    <li class="employee-list">
                        {{employeeListText}}
                    </li>
                    <li class="current-user">{{currentUserText}}</li>
                    <li class="logout">{{logoutText}}</li>
                </ul>
            </div>

            <div class="navbar">
                <div class="navbar-container">
                    <img src="image/logo.png" alt="DynaComware" class="dyna-icon">
                </div>
                <div class="navbar-bottom-line"></div>

            </div>
        </div>
        <div class="page-container">
            <router-view></router-view>
        </div>
        <footer class="footer-container">
            DynaComware - Business Management System by DynaComware
        </footer>
    </div>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({
            employeeListText: '人員列表',
            currentUserText: '歡迎使用 KevinLe 管理者',
            logoutText: 'Logout'
        }),

        watch: {

        },

        created() {
            console.log("created main");
        },

        components: {},

        methods: {},
    }

</script>

<style scoped>
    .container {}

    .header-container {
        overflow: hidden;
        width: 100%;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1030;
        position: fixed;
    }

    .toolbar {
        background: #666666;
        color: white;
        height: 26px;
        line-height: 26px;
    }

    .toolbar-container {
        display: inline-block;
        float: right
    }

    .toolbar-container>li {
        float: left;
        list-style: none;
        font-size: small;
        padding: 0px 15px;
    }

    .navbar {
        background-color: #f8f8f8;
        border-color: #e7e7e7;
        position: relative;
        min-height: 50px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    .navbar-container {
        width: 100%;
        height: 76px;
    }

    .dyna-icon {
        width: 45px;
        height: 60px;
        margin: 8px 12px;
    }

    .navbar-bottom-line {
        background: #e72f62;
        width: 100%;
        height: 5px;
        box-shadow: rgba(0, 0, 0, 0.5) 0 1px 3px;
    }

    .page-container {
        position: relative;
        margin-bottom: 10px;
        opacity: 1;
        transition: all .2s ease;
        font-size: 16px;
        margin: 120px 15px 0 15px;
        padding-bottom: 38px;
    }

    .footer-container {
        color: white;
        background-color: #808080;
        width: 100%;
        margin-bottom: 0;
        border-width: 1px 0 0;
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1030;
        text-align: end;
    }

</style>
