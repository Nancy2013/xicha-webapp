import { linearGrandient } from './../config.js';
import * as echarts from 'echarts';
// 品牌价值分析
export const ppLinearCharts = dom => {
    let charts = echarts.init(document.getElementById(dom));
            charts.setOption({
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(245,245,245,0.8)',
                    formatter: (params) => {
                        var relVal = params[0].name + '年'
                        for (var i = 0, l = params.length; i < l; i++) {
                            relVal =
                                relVal +
                                '<br/>' +
                                params[i].marker +
                                params[i].seriesName +
                                '&nbsp;&nbsp;&nbsp;' +
                                params[i].value
                        }
                        return relVal
                    }
                },
                color: ['#6699FF', '#52CCA3', '#9580FF', '#FF8814'],
                legend: {
                    data: ['石台香芽', '雾里青', '石埭红', '石台祁红'],
                    bottom: '3%'
                },
                grid: {
                    left: '5%',
                    right: '6%',
                    top: '10%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    name: '年',
                    nameGap: 0,
                    type: 'category',
                    boundaryGap: false,
                    data: ['2018', '2019', '2020', '2021', '2022', '2023'],
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                series: [
                    {
                        name: '石台香芽',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        symbol: 'none',
                        data: [20, 32, 1, 34, 0, 30],
                        lineStyle: {
                            width: 3,
                            color: linearGrandient('rgba(102, 153, 255, 0)', 'rgba(102, 153, 255, 1)')
                        }
                    },
                    {
                        name: '雾里青',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        symbol: 'none',
                        data: [20, 82, 91, 34, 90, 30],
                        lineStyle: {
                            width: 3,
                            color: linearGrandient('rgba(82, 204, 163, 0)', 'rgba(82, 204, 163, 1)')
                        }
                    },
                    {
                        name: '石埭红',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        symbol: 'none',
                        data: [20, 32, 1, 34, 0, 30],
                        lineStyle: {
                            width: 3,
                            color: linearGrandient('rgba(127, 100, 255, 0)', 'rgba(127, 100, 255, 1)')
                        }
                    },
                    {
                        name: '石台祁红',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        symbol: 'none',
                        data: [20, 82, 91, 34, 90, 30],
                        lineStyle: {
                            width: 3,
                            color: linearGrandient('rgba(255, 136, 20, 0)', 'rgba(255, 136, 20, 1)')
                        }
                    }
                ]
            })
}