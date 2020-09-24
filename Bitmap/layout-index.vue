<!--
Edit history table page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="page-container">
        <div v-for="(d) in listData">
            {{d.Department}}
            <div v-for="(m) in d.Member">
                {{m}}
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            listData: [],
        }),

        watch: {

        },

        created() {
            this.getData();
        },

        components: {

        },

        methods: {
            getData() {
                var self = this;
                axios.get('JIS0201')
                    .then(function(response) {
                        console.log(response.data.length);
                        console.log(response.data);
                        //self.drawFont(28, 28, response.data)
                        //return;
                        //const blob = new Blob([response.data])
                        //var reader = new FileReader();
                        //reader.addEventListener('load', function() {
                        //    console.log(reader.result)
                        //    // reader.result contains the contents of blob as a typed array
                        //    self.drawFont(28, 28, new Uint8Array(reader.result))
                        //});
                        //reader.readAsArrayBuffer(blob);
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            drawFont(width, height, date) {
                var result = ""
                for (var h = 0; h < height; h++) {
                    for (var w = 0; w < width; w++) {
                        var index = 45024 + Math.round(w / 8) + h * 4;
                        //console.log(index)
                        console.log(date[index].charCodeAt(0))
                        var ret = (date[index].charCodeAt(0) & (0x80 >> (w % 8))) > 0;
                        //var ret = date[index].charCodeAt(0) == 65533
                        result += ret ? "@@" : "__"
                    }
                    result += '\n'
                }
                console.log(result);
            }
        },
    }

    function string2Bin(str) {
        var result = [];
        for (var i = 0; i < str.length; i++) {
            result.push(str.charCodeAt(i).toString(2));
        }
        return parseInt(result, 2);
    }

</script>

<style scoped>
    .page-container {
        margin: 48px 24px;
        display: grid;
    }

</style>
