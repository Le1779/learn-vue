<!--
Toolbar

Created by Kevin Le on 2021/01/11.
-->
<template>
    <div class="toolbar-container">
        <div v-for="(item, index) in items" class="toolbar-item" @click="onItemClick(item)" :class="{active: subViewId == item.id}">
            <div class="material-icons toolbar-item-icon">{{item.icon}}</div>
            <span class="toolbar-item-text">{{item.text}}</span>
        </div>
        
        <div v-if="showSubview" class="subView">
            <div class="material-icons backButton" @click="onBackButtonClick">
                navigate_before
            </div>
            <scale :model="model"></scale>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            items: [],
            showSubview: false,
            subViewId: null,
        }),

        watch: {

        },

        created() {
            this.generateItems();
        },

        components: {
            'scale': httpVueLoader('components/toolbar/item-scale.vue'),
        },

        mounted() {
        },

        methods: {
            generateItems() {
                this.items.push({
                    id: 'scale',
                    icon: 'format_size',
                    text: 'Scale',
                    children: []
                });
                
                this.items.push({
                    id: 'spacing',
                    icon: 'crop_free',
                    text: 'Spacing',
                    children: []
                });
            },
            
            onItemClick(item) {
                this.subViewId = item.id;
                this.showSubview = true;
            },
            
            onBackButtonClick() {
                this.subViewId = null;
                this.showSubview = false;
            }
        },
    }

</script>

<style scoped>
    .toolbar-container {
        position: relative;
        background: black;
        color: white;
    }

    .toolbar-item {
        display: inline-grid;
        padding: 8px;
        grid-template-rows: 56px 24px;
        cursor: pointer;
        text-align: center;
    }
    
    .toolbar-item.active {
        background: white;
        color: black;
    }
    
    .toolbar-item-icon {
        font-size: 56px;
    }
    
    .toolbar-item-text {
        line-height: 24px;
    }
    
    .subView {
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: 80px auto;
        height: 96px;
        width: 100%;
        background: black;
    }
    
    .backButton {
        line-height: 96px;
        font-size: 64px;
        padding-left: 8px;
        padding-right: 8px;
        cursor: pointer;
        border-right: 3px solid white;
    }
</style>
