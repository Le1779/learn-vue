<template>
    <div class="card-container">
        <canvas id="barChart"></canvas>
    </div>
</template>

<script>
    module.exports = {
        props: ["model"],
        data: () => ({
            viewModel: []
        }),

        watch: {
            model: {
                immediate: true,
                deep: true,
                handler() {
                    if (!this.model){
                        return;
                    }
                    
                    this.viewModel = [];
                    var self = this;
                    this.model.forEach(function(item, index) {
                        self.viewModel.push({
                            label: item.Self.Name,
                            fill: false,
                            data: [item.Handled]
                        });
                    });
                    
                    this.initChart();
                }
            }
        },

        components: {
            'textview': httpVueLoader('textview.vue'),
        },

        methods: {
            initChart() {
                var self = this;
                var ctx = document.getElementById('barChart');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: [""],
                        datasets: self.viewModel
                    }
                });
            },
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
