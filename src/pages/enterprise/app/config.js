import appImg_1_1 from '@/assets/enterprise/app/app/app-1-1.png'
import appImg_1_2 from '@/assets/enterprise/app/app/app-1-2.png'
import appImg_2_1 from '@/assets/enterprise/app/app/app-2-1.png'
import appImg_2_2 from '@/assets/enterprise/app/app/app-2-2.png'
import appImg_2_3 from '@/assets/enterprise/app/app/app-2-3.png'
import appImg_2_4 from '@/assets/enterprise/app/app/app-2-4.png'
import appImg_2_5 from '@/assets/enterprise/app/app/app-2-5.png'
import appImg_3_1 from '@/assets/enterprise/app/app/app-3-1.png'
import appImg_3_2 from '@/assets/enterprise/app/app/app-3-2.png'
import appImg_3_3 from '@/assets/enterprise/app/app/app-3-3.png'
import appImg_3_4 from '@/assets/enterprise/app/app/app-3-4.png'
import appImg_3_5 from '@/assets/enterprise/app/app/app-3-5.png'
import appImg_3_6 from '@/assets/enterprise/app/app/app-3-6.png'
import appImg_4_1 from '@/assets/enterprise/app/app/app-4-1.png'
import appImg_4_2 from '@/assets/enterprise/app/app/app-4-2.png'
import appImg_5_1 from '@/assets/enterprise/app/app/app-5-1.png'
import appImg_5_2 from '@/assets/enterprise/app/app/app-5-2.png'
import appImg_5_3 from '@/assets/enterprise/app/app/app-5-3.png'
import appImg_5_4 from '@/assets/enterprise/app/app/app-5-4.png'
import appImg_5_5 from '@/assets/enterprise/app/app/app-5-5.png'
import appImg_6_1 from '@/assets/enterprise/app/app/app-6-1.png'
import appImg_6_2 from '@/assets/enterprise/app/app/app-6-2.png'
import appImg_6_3 from '@/assets/enterprise/app/app/app-6-3.png'
import appImg_6_4 from '@/assets/enterprise/app/app/app-6-4.png'


/**
 获取我应用页面渲染菜单列表数据
 @param
 @return
 */
export const getRenderAppList = () => {
	return [
		{
			title: '认证服务',
			menuList: [
				{
					text: '茶园确权',
					icon: appImg_1_1,
					router: '/enterprise/teaConfirm/list',
					type: ''
				},
				{
					text: '授权申请',
					icon: appImg_1_2,
					// router: '/enterprise/author/list',
					type: ''
				}
			]
		},
		{
			title: '智慧种植',
			menuList: [
				{
					text: '茶园管理',
					icon: appImg_2_1,
					router: '/enterprise/teaGardenManage/list',
					type: ''
				},
				{
					text: '农资管理',
					icon: appImg_2_2,
					router: '',
					type: '',
					isDisabled: true
				},
				{
					text: '农事工单',
					icon: appImg_2_3,
					router: '/enterprise/workOrderManage/list',
					type: ''
				},
				{
					text: '四情监测',
					icon: appImg_2_4,
					router: '/enterprise/fourSituationWatch/list',
					type: ''
				},
				{
					text: '实时监控',
					icon: appImg_2_5,
					router: '/enterprise/realMonitor/list',
					type: ''
				}
			]
		},
		{
			title: '工厂管理',
			menuList: [
				{
					text: '原料管理',
					icon: appImg_3_1,
					router: '/enterprise/materialManage/list',
					type: ''
				},
				{
					text: '供应商管理',
					icon: appImg_3_2,
					router: '',
					type: '',
					isDisabled: true
				},
				{
					text: '设备管理',
					icon: appImg_3_3,
					router: '',
					type: '',
					isDisabled: true
				},
				{
					text: '生产工单',
					icon: appImg_3_4,
					router: '/enterprise/productionWorkOrder/list',
					type: ''
				},
				{
					text: '仓储管理',
					icon: appImg_3_5,
					router: '/enterprise/storageManage/list',
					type: ''
				},
				{
					text: '质量管理',
					icon: appImg_3_6,
					router: '',
					type: '',
					isDisabled: true
				}
			]
		},
		{
			title: '交易管理',
			menuList: [
				{
					text: '茶青交易',
					icon: appImg_4_1,
					router: '/enterprise/teaDeal/list',
					type: ''
				},
				{
					text: '订单管理',
					icon: appImg_4_2,
					router: '/enterprise/orderManage/list',
					type: ''
				}
			]
		},
		{
			title: '追溯服务',
			menuList: [
				{
					text: '溯源管理',
					icon: appImg_5_1,
					router: '',
					type: '',
					isDisabled: true
				},
				{
					text: '防伪管理',
					icon: appImg_5_2,
					router: '',
					type: '',
					isDisabled: true
				},
				{
					text: '窜货预警',
					icon: appImg_5_3,
					router: '/enterprise/securityAlarm/list',
					type: '',
					isDisabled: true
				},
				{
					text: '分销管理',
					icon: appImg_5_4,
					router: '',
					type: '',
					isDisabled: true
				},
				{
					text: '码上营销',
					icon: appImg_5_5,
					router: '/enterprise/codeMarket/list',
					type: ''
				}
			]
		},
		{
			title: '其他服务',
			menuList: [
				{
					text: '人员管理',
					icon: appImg_6_1,
					router: '/enterprise/userManage/list',
					type: ''
				},
				{
					text: '品牌管理',
					icon: appImg_6_2,
					router: '',
					type: '',
					isDisabled: true
				},
				{
					text: '劳务用工',
					icon: appImg_6_3,
					router: '/enterprise/labourService/list',
					type: ''
				},
				{
					text: '政策学习',
					icon: appImg_6_4,
					router: '/enterprise/policyStudy/list',
					type: ''
				}
			]
		},
	]
}