<template>
    <div class="card-container">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            viewModel: {}
        }),

        watch: {

        },

        created() {
            console.log("created chart");
        },
        
        mounted() {
            this.getData();
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
            'chart': httpVueLoader('chart.vue'),
        },

        methods: {
            initChart() {
                var self = this;
                var ctx = document.getElementById('myChart');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: self.viewModel.Month,
                        datasets: [{
                            label: '傳送',
                            backgroundColor: 'rgb(61,204,153, 0.3)',
                            borderColor: 'rgb(61,204,153)',
                            fill: false,
                            data: self.viewModel.SendedTimes
                        }, {
                            label: '編輯',
                            backgroundColor: 'rgb(57,118,244, 0.3)',
                            borderColor: 'rgb(57,118,244)',
                            fill: false,
                            data: self.viewModel.EditedTimes
                        }, {
                            label: '退回',
                            backgroundColor: 'rgb(255,99,132, 0.3)',
                            borderColor: 'rgb(255,99,132)',
                            fill: false,
                            data: self.viewModel.RejectedTimes
                        }, {
                            label: '重啟',
                            fill: false,
                            data: self.viewModel.ReopenedTimes
                        }]
                    }
                });
            }, 
            
            getData() {
                var self = this;
                axios.get('TestFile/FlowChart.json')
                .then(function (response) {
                    console.log(response.data)
                    self.viewModel = response.data
                    self.initChart();
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
    }

</script>

<style>
    .formula {
        display: inline-grid;
        grid-template-columns: auto auto auto auto auto;
    }

    .symbol {
        display: inline;
        color: #7E7E7E;
        font-size: 24px;
        margin: 8px 8px;
        bottom: 0;
        align-self: flex-end;
    }

</style>
