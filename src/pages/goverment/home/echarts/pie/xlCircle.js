import * as echarts from 'echarts';
export const xlCircleCharts = dom => {
    let charts = echarts.init(document.getElementById(dom));
            charts.setOption({
                tooltip: {
                    trigger: 'item'
                },
                color: ['#648EF8', '#52CCA3', '#A1E6CE', '#9580FF', '#BFB3FF'],
                legend: {
                    top: "center",
                    type: "scroll",
                    orient: "vertical",
                    icon: 'circle',
                    right: '10%',
                    itemGap: 15,
                    itemWidth: 10,
                    itemHeight: 10,
                    data: ['安徽省', '江苏省', '浙江省', '山西省', '其他省'],
                    formatter: function (name) {
                        let returnValue = '';
                        [
                            {
                                name: '安徽省',
                                roate: '45%'
                            },
                            {
                                name: '江苏省',
                                roate: '25%'
                            },
                            {
                                name: '浙江省',
                                roate: '15%'
                            },
                            {
                                name: '山西省',
                                roate: '10%'
                            },
                            {
                                name: '其他省',
                                roate: '5%'
                            }
                        ].forEach(element => {
                            if (element.name == name) {
                                returnValue = `${name}  ${element.roate}`
                            }
                        })
                        return returnValue
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: [`45%`, `75%`],
                        center: [`30%`, `50%`],
                        roseType: 'area',
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: 'center',
                            formatter: '地域分布'
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 50, name: '安徽省' },
                            { value: 30, name: '江苏省' },
                            { value: 25, name: '浙江省' },
                            { value: 15, name: '山西省' },
                            { value: 40, name: '其他省' }
                        ]
                    }
                ]
            })
}