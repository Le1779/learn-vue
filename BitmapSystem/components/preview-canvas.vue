<!--
Preview Canvas

Created by Kevin Le on 2021/01/08.
-->
<template>
    <div id="canvasContainer">
        <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" style="border:1px solid #000000;">
            Your browser does not support the canvas element.
        </canvas>
    </div>
</template>

<script>
    module.exports = {
        props: ["model", "toolbar_model"],
        data: () => ({
            canvas: null,
            ctx: null,
            canvasWidth: 500,
            canvasHeight: 500,
            codeMap: new Map(),
            fontData: [],
            fontCodeList: [4355],
            fontWidth: 16,
            fontHeight: 16,
        }),

        watch: {
            "model.product": {
                handler() {
                    var border = this.model.product.Border.split('x');
                    this.fontWidth = parseInt(border[0]);
                    this.fontHeight = parseInt(border[1]);
                    this.canvasHeight = this.getCanvasHeight();

                    this.getCodeMap();
                }
            },

            "model.text": {
                handler() {
                    console.log(this.model.text);
                    this.generateFontCodeList();
                    this.canvasHeight = this.getCanvasHeight();
                    this.onScreenResize();

                }
            },
            
            toolbar_model: {
                handler() {
                    this.generateFontCodeList();
                    this.canvasHeight = this.getCanvasHeight();
                    this.onScreenResize();

                },
                deep: true
            }
        },

        created() {
            window.addEventListener("resize", this.onScreenResize);
        },

        destroyed() {
            window.removeEventListener("resize", this.onScreenResize);
        },

        components: {},

        mounted() {
            var container = document.getElementById("canvasContainer")
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext('2d');
            this.canvasWidth = container.clientWidth - 2;
            this.canvasHeight = container.clientHeight;
        },

        methods: {
            getCodeMap() {
                var fileName = this.$HOST + '/Document/CodePage/' + this.model.product.Spec + '-Full-Unicode'
                var self = this;
                this.codeMap = new Map();
                axios.get(fileName)
                    .then(function(response) {
                        var array = response.data.split('\r\n')
                        for (var i = 0; i < array.length; i++) {
                            var a = array[i].split('\t0X');
                            if (a[1]) {
                                self.codeMap.set(a[1].toLowerCase(), a[0])
                            }

                        }

                        self.generateFontCodeList();
                        self.getFontFile();
                    }).catch(function(error) {
                        console.log(error);
                    });

            },

            getFontFile() {
                var fontFileName = this.$HOST + '/Fontfiles/BitmapFile/' + this.model.product.FilePath + '/Product/' + this.model.product.FileName;

                var self = this;
                axios.get(fontFileName, {
                        responseType: 'blob'
                    })
                    .then(function(response) {
                        var blob = new Blob([response.data]);

                        var reader = new FileReader();
                        reader.onload = function() {
                            console.log(this.result)
                            self.fontData = new Uint8Array(this.result)
                            self.reDraw()
                        }
                        reader.readAsArrayBuffer(blob);
                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            reDraw() {
                var oneLineWords = this.getOneLineWords();

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                var col = 0;
                var row = 0;

                for (var i = 0; i < this.fontCodeList.length; i++) {
                    this.drawFont(this.fontCodeList[i], col, row);
                    col++;

                    if (col >= oneLineWords) {
                        col = 0;
                        row++;
                    }
                }
            },

            drawFont(index, col, row) {
                var rowBytes = Math.ceil(this.fontWidth / 8);
                var startIndex = index * this.fontHeight * rowBytes;
                for (var h = 0; h < this.fontHeight; h++) {
                    for (var w = 0; w < this.fontWidth; w++) {
                        var index = Math.floor(w / 8) + h * rowBytes + startIndex;
                        var ret = (this.fontData[index] & (0x80 >> (w % 8))) > 0;
                        if (ret) {
                            var spacingX = this.toolbar_model.spacing * (col + 1);
                            var spacingY = this.toolbar_model.spacing * (row + 1)
                            
                            var x = w + col * this.fontWidth
                            var y = h + row * this.fontHeight
                            this.drawPixel(x, y, spacingX, spacingY, this.toolbar_model.scale);
                        }
                    }
                }
            },

            drawPixel(x, y, spacingX, spacingY , scale) {
                var px = x * scale + spacingX;
                var py = y * scale + spacingY;
                
                this.ctx.fillRect(px, py, scale, scale);
            },

            paddingLeft(str, lenght) {
                if (str.length >= lenght)
                    return str;
                else
                    return this.paddingLeft('0' + str, lenght);
            },

            generateFontCodeList() {
                this.fontCodeList = []
                for (var i = 0; i < this.model.text.length; i++) {
                    var code = this.model.text.charCodeAt(i).toString(16);
                    code = this.paddingLeft(code, 4);
                    this.fontCodeList.push(this.codeMap.get(code))
                }
            },

            getCanvasHeight() {
                var lineHeight = this.fontHeight * this.toolbar_model.scale + this.toolbar_model.spacing * 1;
                var lines = Math.ceil(this.model.text.length / this.getOneLineWords());
                return lines * lineHeight;
            },

            onScreenResize() {
                var container = document.getElementById("canvasContainer")
                this.canvasWidth = container.clientWidth - 2;
                var self = this;
                setTimeout(function() {
                    self.reDraw();
                }, 50);
            },
            
            getOneLineWords() {
                var fontWidth = this.fontWidth * this.toolbar_model.scale + this.toolbar_model.spacing * 1;
                return Math.floor(this.canvasWidth / fontWidth);
                
            }
        },
    }

</script>

<style scoped>
</style>
