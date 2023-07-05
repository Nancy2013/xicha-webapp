import nsgdImg from '@/assets/enterprise/home/home/nsgd-icon.png'
import cyqqImg from '@/assets/enterprise/home/home/cyqq-icon.png'
import sqsqImg from '@/assets/enterprise/home/home/sqsq-icon.png'
import cqjyImg from '@/assets/enterprise/home/home/cqjy-icon.png'
import moreImg from '@/assets/enterprise/home/home/more-icon.png'
import overviewImg1 from '@/assets/enterprise/home/home/overview1.png'
import overviewImg2 from '@/assets/enterprise/home/home/overview2.png'
import overviewImg3 from '@/assets/enterprise/home/home/overview3.png'
import overviewImg4 from '@/assets/enterprise/home/home/overview4.png'

import deviceImg1 from '@/assets/enterprise/home/home/device1.png'
import deviceImg2 from '@/assets/enterprise/home/home/device2.png'
import deviceImg3 from '@/assets/enterprise/home/home/device3.png'


import normalBgImg from '@/assets/enterprise/home/home/normal.png'
import offlineBgImg from '@/assets/enterprise/home/home/offline.png'
import malfunctionBgImg from '@/assets/enterprise/home/home/malfunction.png'
import policyImg1 from '@/assets/enterprise/home/home/policy1.jpg'
import policyImg2 from '@/assets/enterprise/home/home/policy2.jpg'
import travelImg1 from "@/assets/enterprise/home/home/travelImg1.jpg"
import travelImg2 from "@/assets/enterprise/home/home/travelImg2.jpg"
import travelImg3 from "@/assets/enterprise/home/home/travelImg3.jpg"
import travelImg4 from "@/assets/enterprise/home/home/travelImg4.png"

/**
 * 获取数据总览渲染数据的方法
 */
export const getOverviewRenderList = () => {
	return [
		{
			title: '茶园总数',
			titleKey: '1',
			subtitle: '已确权',
			subtitleKey: '2',
			unit: '座',
			icon: overviewImg1
		},
		{
			title: '种植面积',
			titleKey: '3',
			subtitle: '已确权',
			subtitleKey: '4',
			unit: '亩',
			icon: overviewImg2
		},
		{
			title: '工人总数',
			titleKey: '5',
			subtitle: '已认证',
			subtitleKey: '6',
			unit: '人',
			icon: overviewImg3
		},
		{
			title: '智能设备',
			titleKey: '7',
			subtitle: '运行数',
			subtitleKey: '8',
			unit: '台',
			icon: overviewImg4
		}
	]
}

/**
 * 获取应用的渲染数据方法
 */
export const getAppRenderList = () => {
	return [
		{
			text: '农事工单',
			icon: nsgdImg,
			type: '',
			width: '0.57rem',
			height: '0.55rem',
			route: "/enterprise/workOrderManage/list"
		},
		{
			text: '茶园确权',
			icon: cyqqImg,
			type: '',
			width: '0.54rem',
			height: '0.54rem',
			route: "/enterprise/teaConfirm/list"
		},
		{
			text: '授权申请',
			icon: sqsqImg,
			type: '',
			width: '0.5rem',
			height: '0.56rem',
			//route: "/enterprise/author/list"
		},
		{
			text: '茶青结算',
			icon: cqjyImg,
			type: '',
			width: '0.44rem',
			height: '0.56rem',
			// route: "/enterprise/teaDeal/list",
			route: "/staff/taeGreen"
		},
		{
			text: '更多应用',
			icon: moreImg,
			type: '',
			width: '0.54rem',
			height: '0.55rem',
			route: "more"
		}
	]
}

/**
 * 获取设备运行的渲染数据方法
 */
export const getDeviceRenderList = () => {
	return [
		{
			text: '正常运行',
			key: '1',
			bgImg: deviceImg1,
			color: '#629B88'
		},
		{
			text: '设备离线',
			key: '2',
			bgImg: deviceImg2,
			color: '#A9AE44'
		},
		{
			text: '设备故障',
			key: '3',
			bgImg: deviceImg3,
			color: '#11D8C5'
		}
	]
}


/**
 * 数据总览默认数据
 */
export const overviewData = {
	'1': '3',
	'2': '2',
	'3': '400',
	'4': '300',
	'5': '300',
	'6': '200',
	'7': '400',
	'8': '300',
	'9': '3'
}

/**
 * 设备运行的默认数据
 */
export const deviceData = {
	'1': '2342',
	"2": '324',
	"3": '20'
}

/**
 * 实时生产的echarts数据
 */
export const getProdChartData = function (res) {
	res = [{ name: '石台香芽', material: 200, output: 200, unit: 'kg' },
		{ name: '石台香芽', material: 200, output: 200, unit: 'kg' }]
	const color = ['#4ECBB3', '#185EF0']
	return {
		tooltip: {
			trigger: 'item'
		},
		color: color,
		legend: {
			show: false
			// orient: 'horizontal',
			// //width: '300',
			// //padding: [60, 0],
			// left: 'right',
			// align: 'left',
			// textStyle: {
			// 	color: ['#4ECBB3', '#185EF0'],
			// 	padding: [0, 12],
			// 	lineHeight: 16
			// },
			// formatter: function (name) {
			// 	console.log(name)
			// 	for (let i = 0; i < res.length; i++) {
			// 		const item = res[i]
			// 		if (item.name === name) {
			// 			return `${name} ${item.value}kg/亩 \n 环比 ${item.ringgit}`
			// 		}
			// 	}
			// }
		},
		tooltip: {
			position: 'right'
		},
		series: [
			{
				name: '',
				type: 'pie',
				center: ['30%', '50%'],
				radius: ['35%', '65%'],
				//avoidLabelOverlap: false,
				// label: {
				// 	show: true,
				// 	position: 'center',
				// 	formatter: '200kg',
				// 	color: "#629B88",
				// 	fontSize: 13,
				// 	fontWeight: "bold"
				// },
				label: {
					show: true,
					position: 'outside',
					padding:[0, -200,0,0],
					//position: 'right',
					formatter: function (params) {
						const prodItem = res[params.dataIndex]
						return `   {block${params.dataIndex}|} {a| ${params.name} }{b| ${params.percent}% }\n{c|原料${prodItem.material}${prodItem.unit} 产出${prodItem.output}${prodItem.unit}}`
						
					},
					fontSize: 13,
					color: '#333',
					
					rich: {
						block0: {
							width: 20,
							height: 8,
							backgroundColor: '#4ECBB3',
						},
						block1: {
							width: 20,
							height: 8,
							backgroundColor: '#185EF0',
						},
						a: {
							color: '#222222',
							fontSize: 12,
							lineHeight: 17,
							align: 'center',
							fontWeight: 400,
						},
						b: {
							color: '#222222',
							fontSize: 18,
							fontWeight: '500',
							lineHeight: 25
						},
						c: {
							color: '#666',
							fontSize: 12,
							lineHeight: 17,
							align: 'center',
							fontWeight: 400,
						}
					}
				},
				labelLine: {
					//center: ['0%', '0%']
					lineStyle: {
						dashOffset: 50
					}
				},
				labelLayout(params) {
					
					return {
						x: 175,
						y: params.labelRect.y+10,
						verticalAlign: 'middle',
						align: 'left'
					}
				},
				clockwise: false,
				emphasis: {
					disabled: true,
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold',
					}
				},

				data: [
					{ value: 750, name: '石台香芽' },
					{ value: 250, name: '石台富硒茶' }
				]
			}
		]
	}
}

/**
 * 销售分析的echarts数据
 */
export const salesChartData = {
	color: ['#185EF0', '#FF8814', '#63CDC5'],
	grid: {
		top: 40,
		left: 55,
		right: 15,
		bottom: 50,
	},
	legend: {
		bottom: 0,
		left: '60',
		data: ["石台香芽", "石台富硒茶", "名优特新"],
		icon: 'rect',
		itemWidth: 12,
		itemHeight: 4,
		textStyle: {
			color: 'rgba(21, 21, 21, 0.85)',
			fontSize: 12
		}
	},
	tooltip: {
	},
	xAxis: {
		type: 'category',
		data: ["202211", "202212", "202301", "202302", "202303", "202304"],
		name: '月份',
		axisLine: {
			lineStyle: {
				color: "#D9D9D9",
			}
		},
		axisTick: {
			alignWithLabel: true
		},
		axisLabel: {
			interval: 0,
			fontSize: 11,
			textStyle: {
				color: 'rgba(21, 21, 21, 0.65)'
			}
		}
	},
	yAxis: {
		name: '万元',
		type: 'value',
		axisLine: {
			show: true,
			lineStyle: {
				color: "#D9D9D9",
			}
		},
		axisLabel: {
			textStyle: {
				color: 'rgba(21, 21, 21, 0.65)'
			}
		},
		splitLine: {
			lineStyle: {
				color: '#D9D9D9',
				type: 'dashed'
			}
		}
	},
	series: [
		{ "name": "石台香芽", "data": [142.6, 175.8, 238.3, 316.9, 645.1, 468.5], "type": "line", "symbol": ["none", "arrow"], symbolSize: 4 },
		{ "name": "石台富硒茶", "data": [434.3, 578.5, 592.0, 784.3, 1199.1, 1146.9], "type": "line", "symbol": ["none", "arrow"], symbolSize: 4 },
		{ "name": "名优特新", "data": [195.3, 262.6, 314.2, 404.2, 802.4, 728.2], "type": "line", "symbol": ["none", "arrow"], symbolSize: 4 }]
}

/**
 * 政策信息的渲染数据
 */
export const policyRenderList = [
	{
		icon: policyImg1,
		title: "李强在国务院第一次廉政工作会议上强调",
		content: "3月31日，国务院召开第一次廉政工作会议，中共中央政治局常委、国务院总理李强发表讲话。中共中央政治局常委、国务院副总理丁薛祥主持会议。中共中央政治局常委、中央纪委书记李希等应邀出席会议。新华社记者 翟健岚 摄",
		link: "https://mp.weixin.qq.com/s/E0es-zRBlk-hhOoGBElXwA"
	},
	{
		icon: policyImg2,
		title: "中共中央政治局召开会议 习近平主持会议",
		content: "新华社北京3月30日电 中共中央政治局3月30日召开会议，决定从今年4月开始，在全党自上而下分两批开展学习贯彻习近平新时代中国特色社会主义思想主题教育。会议审议了《领导干部报告个人有关事项规定》。中共中央总书记习近平主持会议",
		link: "https://mp.weixin.qq.com/s/Fy6jokTb6jybfeT4ER2I5A"
	},
	{
		icon: policyImg2,
		title: "文旅资讯 | 全县旅游市场秩序和安全工作会议召开",
		content: "3月27日，全县旅游市场秩序和安全工作会议召开。县政府副县长孙华婧主持会议并讲话，各景区管理中心主要负责同志，各乡镇、县直相关单位分管负责同志和部分旅游企业主要负责人参加了会议。",
		link: "https://mp.weixin.qq.com/s/56EEtiCEd-DM5WWfkeDOKw"
	}
]

/**
 * 文旅活动的渲染数据
 */
export const travelRenderList = [
	{
		icon: travelImg1,
		title: "相约安徽 向春而行 | 清明假期，在石台开启一日美好时光",
		link: "https://mp.weixin.qq.com/s/a37vMzoX6kxsjmeOPqh6JQ"
	},
	{
		icon: travelImg2,
		title: "相约安徽 向春而行 | 趁着春光正好，石台四家省级职工疗休养基地等你来度假！",
		link: "https://mp.weixin.qq.com/s/QRz1NkzlHM86psnJnwRtnw"
	},
	{
		icon: travelImg3,
		title: "相约安徽 向春而行 | 热度飙升，石台县文旅局长火了!",
		link: "https://mp.weixin.qq.com/s/PxanI-lBNiGM_FZJorZQrA"
	},
	{
		icon: travelImg4,
		title: "相约安徽 向春而行 | 骑行石台秋浦河百里画廊，诗和远方都触手可及!",
		link: "https://mp.weixin.qq.com/s/9k0dyR5UND3incFtZoIy2A"
	}
]