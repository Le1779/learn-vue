<!--
Edit history table page

Created by Kevin Le on 2020/7/30.
-->
<template>
    <div class="page-container">
        <input type="text" v-model="demoText">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" style="border:1px solid #c3c3c3;">
            Your browser does not support the canvas element.
        </canvas>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            demoText: '樂',
            fontData: [],
            scale: 5,
            canvas: null,
            ctx: null,
            canvasWidth: 500,
            canvasHeight: 500,
            fontWidth: 16,
            fontHeight: 16,
            codeMap: new Map(),
        }),

        watch: {
            demoText: {
                handler() {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    var fontCode = []
                    for (var i = 0; i < this.demoText.length; i++) {
                        var code = this.demoText.charCodeAt(i).toString(16);
                        code = this.paddingLeft(code, 4);
                        fontCode.push(code)
                        console.log(code)
                        console.log(this.codeMap.get(code))
                        this.drawFont(this.codeMap.get(code), i * this.fontWidth * this.scale)
                    }
                }
            }
        },

        mounted() {
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext('2d');
            this.readCodeMap();
            this.getData();
        },

        created() {

        },

        components: {

        },

        methods: {
            readCodeMap() {
                var self = this;
                var codeMapFileName = 'Big5-Full-Unicode';
                this.codeMap = new Map();
                axios.get(codeMapFileName)
                    .then(function(response) {
                        var array = response.data.split('\r\n')
                        for (var i = 0; i < array.length; i++) {
                            var a = array[i].split('\t0X');
                            //console.log(a);
                            if (a[1]) {
                                self.codeMap.set(a[1].toLowerCase(), a[0])
                            }
                            
                        }
                        console.log(self.codeMap);
                    }).catch(function(error) {
                        console.log(error);
                    });

            },

            getData() {
                var fontFileName = 'Big5-Hei_16x16';

                var self = this;
                axios.get(fontFileName, {
                        responseType: 'blob'
                    })
                    .then(function(response) {
                        var blob = new Blob([response.data]);

                        var reader = new FileReader();
                        reader.onload = function() {
                            self.fontData = new Uint8Array(this.result)
                            self.drawFont(4355, 0)
                        }
                        reader.readAsArrayBuffer(blob);
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            drawFont(index, startPixel) {
                var rowBytes = Math.floor(this.fontWidth / 8);
                var startIndex = index * this.fontHeight * rowBytes;
                var result = ""
                for (var h = 0; h < this.fontHeight; h++) {
                    for (var w = 0; w < this.fontWidth; w++) {
                        var index = Math.floor(w / 8) + h * rowBytes + startIndex;
                        var ret = (this.fontData[index] & (0x80 >> (w % 8))) > 0;
                        result += ret ? "▉▉" : "  "
                        if (ret) {
                            this.drawPixel(w, h, startPixel);
                        }
                    }
                    result += '\n'
                }
                console.log(result);
            },

            drawPixel(x, y, startPixel) {
                this.ctx.fillRect(x * this.scale + startPixel, y * this.scale, this.scale, this.scale);
            },

            paddingLeft(str, lenght) {
                if (str.length >= lenght)
                    return str;
                else
                    return this.paddingLeft('0' + str, lenght);
            }

        },
    }

</script>

<style scoped>
    .page-container {
        margin: 48px 24px;
        display: grid;
    }

</style>
