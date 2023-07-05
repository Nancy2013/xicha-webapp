import waitImg from '@/assets/common/wait.png'
import waitActiveImg from '@/assets/common/wait-active.png'
import rejectImg from '@/assets/common/reject.png'
import rejectActiveImg from '@/assets/common/reject-active.png'
import completeImg from '@/assets/common/complete.png'
import completeActiveImg from '@/assets/common/complete-active.png'
import allImg from '@/assets/common/all.png'
import allActiveImg from '@/assets/common/all-active.png'
import { filterKilobitSplit } from "@/utils/filters"

export const getStatisticsRenderList = () => {
	return [
		{
			label: "剩余码量",
			key: "remainNum",
			unit: ''
		},
		{
			label: "已用码量",
			key: "usedNum",
			unit: ""
		}
	]
}

export const getTeaConfirmTabsRenderList = () => {
	
	return [
		{
			text: '待审核',
			icon: waitImg,
			activeIcon: waitActiveImg,
			type: 0,
			totalDataKey: 'toApprovalNum'
		},
		{
			text: '已授权',
			icon: completeImg,
			activeIcon: completeActiveImg,
			type: 1,
			totalDataKey: 'rechargedNum'
		},
		{
			text: '已驳回',
			icon: rejectImg,
			activeIcon: rejectActiveImg,
			type: 2,
			totalDataKey: 'rejectedNum'
		},
		{
			text: '全部',
			icon: allImg,
			activeIcon: allActiveImg,
			type: -1,
			totalDataKey: 'allNum'
		}
	]
}

export const getAddFormItemRenderList = () => {
	return [
		{
			label: '申请品牌',
			placeholder: '请选择申请品牌',
			type: 'select',
			key: 'brand',
			required: true,
			options: [
				{
					text: '石台香芽',
					value: '石台香芽'
				},
				{
					text: '石台富硒茶',
					value: '石台富硒茶'
				},
				{
					text: '名优特新',
					value: '名优特新'
				}
			]
		},
		{
			label: '申请码量',
			placeholder: '请输入码量',
			type: 'input',
			key: 'applyCount',
			inputType: 'int',
			required: true,
			filterFnc: filterKilobitSplit
		},
	]
}