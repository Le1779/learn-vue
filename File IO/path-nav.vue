<template>
    <div class="mb-4">
        <div class="path_container">
            <div @click="moveToRoot" class="path root" :class="{'disable' : path.length == 0}">{{root_text}}</div>
        </div>
        <div v-for="(item, index) in path" class="path_container">
            <v-icon>keyboard_arrow_right</v-icon>
            <div @click="(index + 1) != path.length ? movePath(index) : ''" class="path" :class="{'disable' : (index + 1) == path.length}">{{item}}</div>
        </div>
    </div>
</template>


<script>
    module.exports = {
        props: ["path"],

        data: () => ({
            root_text: '最新的檔案',
        }),

        methods: {
            moveToRoot(){
                //this.path = [];
                this.path.splice(0, this.path.length);
            },
            
            movePath(index) {
                for (let i = 0; i <= index; i++) {
                    this.path.pop();
                }
                console.log(this.path);
            },
        }
    }

</script>

<style scoped>
    .path_container {
        display: inline-block;
    }

    .path {
        margin: 5px;
        padding: 5px;
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
        color: rgb(0, 0, 0, 0.7);
    }

    .path:hover {
        color: rgb(0, 0, 0, 0.5);
    }

    .path.disable {
        cursor: default;
        color: black;
    }

    .root {
        color: white;
        background-color: red;
        border-radius: 8px;
    }

    .root:hover {
        color: white;
        background-color: rgb(0, 0, 0, 0.1);
    }

    .root.disable {
        color: white;
        background-color: red;
    }

</style>
