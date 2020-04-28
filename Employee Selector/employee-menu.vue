<template>
    <v-content class="employee-selector-selector">
        <div class="departments-container">
            <div class="department-item" v-for="(item, i) in view_model">
                <div class="department-item-hover" :class="{ selected: item.selected }"></div>
                <div class="item-title">
                    {{item.department_name}}
                    <div class="item-status">{{item.member.length}}位成員</div>
                </div>

                <div class="item-action material-icons" @click="showMember(i)">keyboard_arrow_right</div>
            </div>
        </div>
        <div class="employees-container" :class="{show: currentMember.length > 0}">
            <div class="back-to-parent">
                <div class="item-action material-icons" @click="backToParent">keyboard_arrow_left</div>
            </div>
            <div class="employees-list">
                <div class="employee-item" v-for="(item, i) in currentMember">
                    <div class="employee-item-hover" :class="{ selected: item.selected }"></div>
                    <div class="item-name">{{item.UserName}}</div>
                    <div class="item-email">{{item.Email}}</div>
                </div>
            </div>
        </div>
    </v-content>

</template>


<script scoped>
    module.exports = {
        props: ["view_model"],
        data: () => ({
            currentMember: []
        }),

        computed: {

        },

        watch: {

        },

        created() {},

        methods: {
            showMember(index) {
                console.log(this.view_model[index]);
                this.currentMember = this.view_model[index].member
            },

            backToParent() {
                this.currentMember = []
            }
        },

        components: {

        }
    }

</script>

<style>
    .employee-selector-selector {
        width: 100%;
        margin-top: 8px;
        position: absolute;
        background-color: #5E6169;
        z-index: 100;
        display: inline-block;
        border-radius: 4px;
        max-width: 80%;
        overflow-y: hidden;
        overflow-x: hidden;
        contain: content;
        will-change: transform;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
    }

    .department-item {
        display: grid;
        grid-template-columns: auto 40px;
        box-sizing: initial;
        align-items: center;
        letter-spacing: normal;
        height: 48px;
        outline: none;
        position: relative;
        text-decoration: none;
        color: white;
        cursor: pointer;
        border-top: 1px solid #686B72;
    }

    .department-item-hover {
        content: "";
        position: absolute;
        width: 100%;
        height: 48px;
        background-color: #E97493;
        opacity: 0;
        left: 0;
        top: 0;
        display: none;
    }

    .department-item-hover.selected {
        opacity: 0.1;
        display: block;
    }

    .department-item .item-title {
        height: 100%;
        padding-left: 16px;
        line-height: 48px;
    }

    .department-item .item-title:hover {
        background-color: #937281;
    }

    .department-item .item-title:hover~.item-action {
        background-color: #937281;
    }

    .item-status {
        display: inline-block;
        float: right;
        line-height: 48px;
        font-size: 12px;
        opacity: .7;
        margin-right: 8px;
    }

    .department-item .item-action {
        height: 100%;
        line-height: 48px;
    }

    .department-item .item-action:hover {
        background-color: #937281;
        border-radius: 20px;
        height: auto;
        width: 24px;
        line-height: 24px;
    }

    .departments-container {}

    .employees-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 100%;
        background-color: #5E6169;
        transition: all .25s;
    }

    .employees-container.show {
        left: 0;
    }

    .back-to-parent {
        height: 15%;
        color: white;
    }

    .back-to-parent .item-action {
        margin-left: 16px;
        margin-top: 8px;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .back-to-parent .item-action:hover {
        background-color: #937281;
        border-radius: 20px;
    }

    .employees-list {
        overflow-y: auto;
        height: 85%;
        width: 100%;
    }

    .employee-item {
        display: grid;
        grid-template-rows: auto 12px;
        box-sizing: initial;
        align-items: center;
        letter-spacing: normal;
        min-height: 48px;
        outline: none;
        position: relative;
        text-decoration: none;
        color: white;
        cursor: pointer;
        border-top: 1px solid #686B72;
        padding: 0 16px;
    }

    .employee-item:hover {
        background-color: #937281;
    }

    .item-name {}

    .item-email {
        font-size: 12px;
        opacity: .7
    }

</style>
