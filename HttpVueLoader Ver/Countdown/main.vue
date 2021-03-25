<template>
    <div>
        <div class="time">
        {{time}}
    </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            source: String,
        },
        data: () => ({
            time: 0
        }),

        watch: {

        },

        created() {
            var clock = setInterval(this.countdown, 1000);
        },

        components: {

        },

        methods: {
            countdown() {
                var target = new Date();
                target.setHours(18, 0, 0);
                var m = target.getTime() - new Date().getTime();
                this.time = Math.round(m / 1000 / 60 * 100) / 100;
            }
        },
    }

</script>

<style scoped>
    .time {
        display: inline-block;
        padding: 24px 24px;
        box-shadow:
            -7px -7px 20px 0px #fff9,
            -4px -4px 5px 0px #fff9,
            7px 7px 20px 0px #0002,
            4px 4px 5px 0px #0001;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: #555;
        font-size: 24px;
        border-radius: 5px;
    }

</style>
