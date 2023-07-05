import { roleTypeDict, workTypeDict } from "@/utils/dict"

export const getOperateList = (roleId) => {
	roleId = Number(roleId)
	switch (roleId) {
		case roleTypeDict.teaGardener:
			return [
				{
					text: '农事执行',
					img: require("@/assets/staff/home/index/farmWork-new.png"),
					imgHeight: '0.64rem',
					router: "/staff/workOrderManage/list",
					workType: workTypeDict.farming
				},
				{
					text: '茶青采摘',
					img: require("@/assets/staff/home/index/teaPick.png"),
					imgHeight: '0.64rem',
					router: "/staff/workOrderManage/list",
					workType: workTypeDict.pick
				},
				{
					text: '茶青结算',
					img: require("@/assets/staff/home/index/settlement-new.png"),
					imgHeight: '0.64rem',
					router: "/staff/taeGreen"
				},
				// {
				// 	text: '劳务用工',
				// 	img: require("@/assets/staff/home/index/labourService-new.png"),
				// 	imgHeight: '0.64rem'
				// }
			]
		case roleTypeDict.packer:
			return [
				{
					text: '包装',
					img: require("@/assets/staff/home/index/pack.png"),
					imgHeight: '0.64rem',
					router: "/staff/workOrderManage/list",
					workType: workTypeDict.productPackaging
				},
				{
					text: '二次包装',
					img: require("@/assets/staff/home/index/secondaryPackaging.png"),
					imgHeight: '0.64rem',
					router: "/staff/workOrderManage/list",
					workType: workTypeDict.secondaryPackaging
				},
				{
					text: '劳务用工',
					img: require("@/assets/staff/home/index/labourService-new.png"),
					imgHeight: '0.64rem'
				},
			]
		case roleTypeDict.inspector:
			return [
				{
					text: '质量检验',
					img: require("@/assets/staff/home/index/inspector-icon.png"),
					imgHeight: '0.66rem',
					router: "/staff/workOrderManage/list",
					workType: workTypeDict.qualityTesting
				},
				{
					text: '劳务用工',
					img: require("@/assets/staff/home/index/labourService-new.png"),
					imgHeight: '0.64rem'
				},
			]
		case roleTypeDict.teaWorker:
			return [
				{
					text: '生产执行',
					img: require("@/assets/staff/home/index/inspector-icon.png"),
					imgHeight: '0.66rem',
					router: "/staff/workOrderManage/list",
					workType: workTypeDict.production
				},
				{
					text: '劳务用工',
					img: require("@/assets/staff/home/index/labourService-new.png"),
					imgHeight: '0.64rem'
				},
			]
	}

}

