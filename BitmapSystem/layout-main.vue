<!--
Main page

Created by Kevin Le on 2020/12/11.
-->
<template>
    <div class="container">
        <div class="page-title">
            Bitmap Preview
        </div>

        <div v-for="(item, index) in productList" :class="{ active: item.BitmapProductId ==  selectedId}" class="product-card" @click="selectItem(item)">
            <div class="product-card-image-container">
                <img :src="getProductPreviewUrl(item)" alt="">
            </div>
            {{item.BitmapProductId}}
        </div>

        <div class="canvas-container">
           <div>
               <input type="text" v-model="demoText">
           </div>
            
            <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" style="border:1px solid #c3c3c3;">
                Your browser does not support the canvas element.
            </canvas>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            productList: [],
            selectedId: 0,

            demoText: '測試一下',
            fontData: [],
            scale: 5,
            canvas: null,
            ctx: null,
            canvasWidth: 500,
            canvasHeight: 500,
            fontWidth: 16,
            fontHeight: 16,
            codeMap: new Map(),
            
            demoCodeList: [4355]
        }),

        watch: {
            demoText: {
                handler() {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    var fontCode = []
                    this.demoCodeList = []
                    for (var i = 0; i < this.demoText.length; i++) {
                        var code = this.demoText.charCodeAt(i).toString(16);
                        code = this.paddingLeft(code, 4);
                        fontCode.push(code)
                        //console.log(code)
                        //console.log(this.codeMap.get(code))
                        this.demoCodeList.push(this.codeMap.get(code))
                        //this.drawFont(this.codeMap.get(code), i * this.fontWidth * this.scale)
                    }
                    this.showDemo();
                }
            }
        },

        created() {
            this.getProductList();
        },

        components: {
            'data-table': httpVueLoader('data-table.vue'),
        },

        mounted() {
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext('2d');
        },

        methods: {
            getProductList() {
                var self = this;
                axios.get(this.$HOST + '/api/Product')
                    .then(function(response) {
                        if (response.data.code == 1) {
                            self.productList = response.data.data;
                            console.log(self.productList);
                        }

                    }).catch(function(error) {
                        console.log(error);
                    });
            },

            getProductPreviewUrl(item) {
                return this.$HOST + '/Fontfiles/OneWordReview/' + item.FilePath + '_singleword.bmp';
            },

            selectItem(item) {
                console.log(item);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.selectedId = item.BitmapProductId;
                var border = item.Border.split('x');
                this.fontWidth = border[0];
                this.fontHeight = border[1];
                this.getCodeMap(item);
            },

            getCodeMap(item) {
                var fileName = this.$HOST + '/Document/CodePage/' + item.Spec + '-Full-Unicode'
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

                        //console.log(self.codeMap);
                        self.getFontFile(item);
                    }).catch(function(error) {
                        console.log(error);
                    });

            },

            getFontFile(item) {
                var fontFileName = this.$HOST + '/Fontfiles/BitmapFile/' + item.FilePath + '/Product/' + item.FileName;

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
                            self.showDemo()
                        }
                        reader.readAsArrayBuffer(blob);
                    }).catch(function(error) {
                        console.log(error);
                    });
            },
            
            showDemo() {
                for (var i = 0; i < this.demoCodeList.length; i++) {
                    this.drawFont(this.demoCodeList[i], i * this.fontWidth * this.scale)
                }
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
    .container {
        padding: 10px 17px;
        background: #fff;
        border: 1px solid #E6E9ED;
        height: 1000px;
    }
    
    .page-title {
        font-size: 24px;
    }

    .product-card {
        display: inline-block;
        border: 1px #000000 solid;
    }

    .product-card.active {
        background: #000000;
        color: #FFFFFF;
    }

    .product-card-image-container img {
        width: 60px;
        height: 60px;
    }

</style>
