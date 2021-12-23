<template>
<div id="chart">
    <v-card class="mt-0 mx-auto" max-width="300" dark elevation="24" :style="'border: 1px solid grey'">
        <apexchart :options="chartOptions" :series="series"></apexchart>
    </v-card>
</div>
</template>

<script>
export default {
    name: 'ChartDonut',
    data: () => ({
        chartOptions: {},

    }),
    props: ['series', 'labels'],
    methods: {
        obtenerDatos() {
            this.chartOptions = {
                colors:['#00f458', '#ff0017', '#ffb017'],
                labels: this.labels,
                legend: {
                    show: false,

                },
                chart: {
                    type: 'donut',
                    width: 200,
                },
                dataLabels: {
                    enabled: true,
                   
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '64%',
                            background: 'transparent',
                            labels: {
                                show: true,
                                name: {
                                    fontSize: '11px',
                                    show: true,
                                    formatter: function (val) {
                                        return val
                                    }
                                },
                                value: {
                                    show: true,
                                    color: 'white'
                                },
                                total: {
                                    show: true,
                                    showAlways: false,
                                    label: 'Total',
                                    fontSize: '17px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 400,
                                    color: 'white',
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => {
                                            return a + b;
                                        }, 0)
                                    }
                                }
                            }
                        }
                    }
                },

            }

        }
    },
    created() {
        this.obtenerDatos();
    },
}
</script>
