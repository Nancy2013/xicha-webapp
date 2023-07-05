import * as echarts from 'echarts';
// 溯源数据
export const syCircleCharts = (dom) => {
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
                    left: '10%',
                    itemGap: 15,
                    itemWidth: 10,
                    itemHeight: 10,
                    data: ['安徽省', '山西省', '浙江省', '江苏省', '其他省'],
                    formatter: function (name) {
                        let returnValue = '';
                        [
                            {
                                name: '安徽省',
                                roate: '45%'
                            },
                            {
                                name: '山西省',
                                roate: '25%'
                            },
                            {
                                name: '浙江省',
                                roate: '15%'
                            },
                            {
                                name: '江苏省',
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
                        name: 'Access From',
                        type: 'pie',
                        radius: [`45%`, `75%`],
                        center: [`70%`, `50%`],
                        roseType: 'area',
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: 'center',
                            formatter: `溯源地区\n\n统计`
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 35, name: '安徽省' },
                            { value: 40, name: '山西省' },
                            { value: 25, name: '浙江省' },
                            { value: 15, name: '江苏省' },
                            { value: 20, name: '其他省' }
                        ]
                    }
                ]
            })
}