<template>
    <div>
        <input type="text" v-model="message" style="width:100%;" />
        Message: {{message}}
        
        <div style="margin:24px;">
            {{time}}
        </div>
        
        現在{{time}} 有人說{{message}}
    </div>
</template>

<script scoped>
    module.exports = {
        data: () => ({
            time: "",
            message: ""
        }),

        created() {
            this.getTime();
            setInterval(() => {
                this.getTime();
            }, 1000)
        },

        methods: {
            getTime() {
                this.time = String(new Date())
            }
        },
    }

</script>

<style scoped>

</style>
