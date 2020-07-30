<template>
    <div class="card-container subpage-container">
        <div class="card-head">
            <div class="material-icons back-button" @click="back">{{'keyboard_backspace'}}</div>
            <textview :model="textview_model"></textview>
        </div>

        <router-view></router-view>


    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            subtitle: '',
            title: 'WO-20200729-FFFF',
            textview_model: {
                title: 'No.',
                text: 'WO-20200729-FFFF',
                class: 'md'
            },
        }),

        watch: {

        },

        created() {
            console.log("created sub" + this.$route.params.id);
            this.subtitle = 'No.';
            //this.title = this.$route.params.id;
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
        },

        methods: {
            back() {
                this.$router.back(-1)
            }
        },
    }

</script>

<style scoped>
    .card-container {
        display: inline-block;
        background: white;
        height: 100%;
        border-radius: 2px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
    }

    .subpage-container {
        width: 100%;
        overflow: auto;
        display: grid;
        grid-template-rows: auto auto;
    }

    .card-head {
        display: inline-grid;
        grid-template-columns: 36px auto;
        margin: 12px 12px;

    }

    .back-button {
        cursor: pointer;
        display: inline;
        color: #5F6169;
        font-size: 24px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }

</style>
