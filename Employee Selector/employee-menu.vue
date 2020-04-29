<template>
    <v-content class="employee-selector-selector">
        <div class="departments-container">
            <div class="department-item" v-for="(item, i) in view_model" :class="{ selected: item.selected_count > 0 }">
                <div class="item-title" @click="selectDepartment(item)">
                    {{item.department_name}}
                    <div class="item-status">
                        <div v-if="item.selected_count > 0" class="item-selected-count">選擇{{item.selected_count}}位</div>
                        {{item.member.length}}位成員
                    </div>
                </div>

                <div class="item-action material-icons" @click="showMember(i)">keyboard_arrow_right</div>
            </div>
        </div>
        <div class="search-container" :class="{show: searchItems.length > 0}">
            <div class="search-list">
                <div class="employee-item" v-for="(item, i) in searchItems" @click="selectSearchEmployee(item)" :class="{ selected: item.selected }">
                    <div class="item-name">{{item.employee_name}}</div>
                    <div class="item-email">{{item.employee_email}}</div>
                </div>
            </div>
        </div>
        <div class="employees-container" :class="{show: currentMember.length > 0}">
            <div class="back-to-parent">
                <div class="item-action material-icons" @click="backToParent">keyboard_arrow_left</div>
            </div>
            <div class="employees-list">
                <div class="employee-item" v-for="(item, i) in currentMember" @click="selectEmployee(item)" :class="{ selected: item.selected }">
                    <div class="item-name">{{item.employee_name}}</div>
                    <div class="item-email">{{item.employee_email}}</div>
                </div>
            </div>
        </div>
    </v-content>

</template>


<script scoped>
    module.exports = {
        props: ["view_model", "selected_items", "parent_object"],
        data: () => ({
            searchMember: [],
            currentMember: [],
            currentDepartment: null,
            searchItems: []
        }),

        computed: {

        },

        watch: {
            'parent_object.searchKeyword': {
                handler() {
                    this.backToParent()
                    this.searchItems = []
                    this.searchOrg(this.view_model, this.parent_object.searchKeyword)
                },
            },
        },

        created() {},

        methods: {
            showMember(index) {
                console.log(this.view_model[index]);
                this.currentMember = this.view_model[index].member
                this.currentDepartment = this.view_model[index]
            },

            backToParent() {
                this.currentMember = []
            },

            selectDepartment(item) {
                this.currentDepartment = item
                var unselectAll = false
                if (item.selected_count == item.member.length) {
                    unselectAll = true
                }

                let self = this
                item.member.forEach(function(value, index) {
                    if (unselectAll) {
                        self.unselectItem(value)
                    } else {
                        self.selectItem(value)
                    }
                });
            },

            selectEmployee(item) {
                if (item.selected) {
                    this.unselectItem(item)
                } else {
                    this.selectItem(item)
                }
            },

            selectItem(item) {
                if (item.selected) {
                    return
                }
                item.selected = true
                this.currentDepartment.selected_count++
                this.selected_items.push(item)
            },

            unselectItem(item) {
                if (!item.selected) {
                    return
                }
                item.selected = false
                this.currentDepartment.selected_count--
                var index = this.selected_items.indexOf(item)
                if (index > -1) {
                    this.selected_items.splice(index, 1)
                }
            },

            selectSearchEmployee(item) {
                this.parent_object.searchKeyword = ""
                this.findDepartment(this.view_model, item.employee_email)
                this.selectEmployee(item)
            },

            findDepartment(obj, query) {
                if (query === "") {
                    return
                }

                let self = this
                for (var key in obj) {
                    var value = obj[key];
                    if (typeof value === 'object') {
                        var isFind = self.findDepartment(value, query);
                        if (isFind) {
                            if (obj['department_name'] === undefined) {
                                return true
                            }
                            self.currentDepartment = obj
                            return
                        }
                    }

                    if (value === query) {
                        return true
                    }
                }
            },

            searchOrg(obj, query) {
                if (query === "") {
                    return
                }

                let self = this
                for (var key in obj) {
                    var value = obj[key];
                    if (typeof value === 'object') {
                        self.searchOrg(value, query);
                    }

                    if (value.toString().indexOf(query) > -1) {
                        this.searchItems.push(obj)
                    }
                }
            },
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

    .department-item.selected {
        background-color: #75717C;
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

    .item-selected-count {
        display: inline-block;
        color: #E97493;
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
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
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
        grid-template-rows: auto 20px;
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

    .employee-item.selected {
        background-color: #75717C;
    }

    .employee-item-hover {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #75717C;
    }

    .item-name {}

    .item-email {
        font-size: 12px;
        opacity: .7
    }

    .search-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: -100%;
        background-color: #5E6169;
        transition: all .25s;
    }

    .search-container.show {
        left: 0;
    }

    .search-list {
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }

</style>
