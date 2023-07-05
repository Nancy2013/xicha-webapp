import * as echarts from 'echarts';
// 品牌及码量
export const mlCircleCharts = dom => {
    let charts = echarts.init(document.getElementById(dom));
            charts.setOption({
                color: ['#648EF8', '#52CCA3', '#9580FF', '#BFB3FF'],
                legend: {
                    top: "center",
                    type: "scroll",
                    orient: "vertical",
                    icon: 'circle',
                    left: '10%',
                    itemGap: 15,
                    itemWidth: 10,
                    itemHeight: 10,
                    data: ['石台香芽', '雾里青', '石埭红', '石台祁红'],
                    formatter: function (name) {
                        let returnValue = '';
                        [{name: '石台香芽',value: 63},
                         {name: '雾里青',value: 34},
                         {name: '石埭红',value: 25},
                         {name: '石台祁红',value: 43}
                        ].forEach(element => {
                            if (element.name == name) {
                                returnValue = `${name}  ${element.value}`
                            }
                        })
                        return returnValue
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: [`45%`, `75%`],
                        center: [`70%`, `50%`],
                        roseType: 'area',
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 18,
                                fontWeight: 'bold',
                                formatter: function (value) {
                                    let { name, percent } = value
                                    return `${percent}%\n${name}`
                                }
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 63, name: '石台香芽' },
                            { value: 34, name: '雾里青' },
                            { value: 25, name: '石埭红' },
                            { value: 43, name: '石台祁红' }
                        ]
                    }
                ]
            })
}