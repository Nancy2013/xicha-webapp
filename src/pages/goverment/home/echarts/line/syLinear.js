import { linearGrandient } from './../config.js';
import * as echarts from 'echarts';
// 溯源数据分析
export const syLinearCharts = dom => {
    let charts = echarts.init(document.getElementById(dom));
            charts.setOption({
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(245,245,245,0.8)',
                    formatter: (params) => {
                        var relVal = params[0].name.slice(0, 4) + '年' + params[0].name.slice(4) + '月'
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
                color: ['#6699FF', '#52CCA3', '#9580FF'],
                legend: {
                    data: ['溯源码申请', '溯源码扫码', '防伪查询'],
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
                    type: 'category',
                    boundaryGap: false,
                    data: ['202212', '202301', '202302', '202303', '202304', '202305'],
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
                        name: '溯源码申请',
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
                        name: '溯源码扫码',
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
                        name: '防伪查询',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        symbol: 'none',
                        data: [20, 32, 1, 34, 0, 30],
                        lineStyle: {
                            width: 3,
                            color: linearGrandient('rgba(127, 100, 255, 0)', 'rgba(127, 100, 255, 1)')
                        }
                    }
                ]
            })
}