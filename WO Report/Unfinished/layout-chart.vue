<template>
    <div class="card-container">
        <canvas id="barChart"></canvas>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            viewModel: [],
            chart: null
        }),

        watch: {
            model: {
                immediate: true,
                deep: true,
                handler() {
                    if (!this.model){
                        return;
                    }
                    
                    this.initChart();
                    if (this.chart == null) {
                        return;
                    }
                    console.log(this.chart)
                    this.viewModel = [];
                    var self = this;
                    this.model.forEach(function(item, index) {
                        self.viewModel.push({
                            label: item.Self.Name,
                            fill: false,
                            data: [item.Handled]
                        });
                    });
                    
                    this.updateChart();
                }
            }
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
        },

        methods: {
            initChart() {
                if (this.chart != null) {
                    return;
                }
                
                var ctx = document.getElementById('barChart');
                if (ctx == null) {
                    return;
                }
                
                this.chart = new Chart(ctx, {
                    type: 'bar'
                });
                
            },
            
            updateChart() {
                this.chart.config.data.datasets = this.viewModel;
                this.chart.update();
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
