import { linearGrandient } from './../config.js';
import * as echarts from 'echarts';
// 地块确权
export const dkLinearCharts = dom => {
    let charts = echarts.init(document.getElementById(dom));
            charts.setOption({
                title: [
                    {
                        right: '4%',
                        top: '1%',
                        subtext: '120,000亩'
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(245,245,245,0.8)',
                    formatter: (params) => {
                        var relVal = params[0].name + '年'
                        for (var i = 0, l = params.length; i < l; i++) {
                            if (params[i].seriesName == '确认亩数') {
                                relVal =
                                    relVal +
                                    '<br/>' +
                                    params[i].marker +
                                    params[i].seriesName +
                                    '&nbsp;&nbsp;&nbsp;' +
                                    params[i].value
                            }
                        }
                        return relVal
                    }
                },
                color: ['#6699FF', '#52CCA3'],
                legend: {
                    itemGap: 30,
                    data: ['确认亩数', '总亩数'],
                    bottom: '3%'
                },
                grid: {
                    left: '5%',
                    right: '10%',
                    top: '15%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    name: '年份',
                    nameGap: 0,
                    boundaryGap: false,
                    data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                    axisTick: {
                        show: false,
                        lineStyle: {
                            width: 1,
                            color: '#EDEDED'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '亩',
                    nameGap: 10,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                series: [
                    {
                        name: '确认亩数',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        symbol: 'none',
                        data: [90000, 39000, 80000, 36000, 90000, 65000, 76000],
                        lineStyle: {
                            width: 3,
                            color: linearGrandient('rgba(102, 153, 255, 0)', 'rgba(102, 153, 255, 1)')
                        }
                    },
                    {
                        name: '总亩数',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        symbol: 'none',
                        data: [120000, 120000, 120000, 120000, 120000, 120000, 120000],
                        lineStyle: {
                            width: 3,
                            color: linearGrandient('rgba(82, 204, 163, 0)', 'rgba(82, 204, 163, 1)')
                        }
                    }
                ]
            })
}