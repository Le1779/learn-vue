<!--
Preview page

Created by Kevin Le on 2020/12/11.
-->
<template>
    <div class="list-container">
        <list-item v-for="(item, index) in listData" :model="item" :selected="item.BitmapProductId == selectedId" @click.native="selectItem(item)"></list-item>
    </div>
</template>

<script>
    module.exports = {
        props: ["model", "click_callback"],
        data: () => ({
            listData: [],
            selectedId: 0,
        }),

        watch: {

        },

        created() {
            this.getList();
        },

        components: {
            'list-item': httpVueLoader('components/product-list-item.vue'),
        },

        mounted() {

        },

        methods: {
            getList() {
                var self = this;
                axios.get(this.$HOST + '/api/Product')
                    .then(function(response) {
                        if (response.data.code == 1) {
                            self.listData = response.data.data;
                            console.log(self.listData);
                            self.selectItem(self.listData[0])
                        }

                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            selectItem(item) {
                this.selectedId = item.BitmapProductId;
                if (this.click_callback) {
                    this.click_callback(item);
                }
            }
        },
    }

</script>

<style scoped>


</style>
