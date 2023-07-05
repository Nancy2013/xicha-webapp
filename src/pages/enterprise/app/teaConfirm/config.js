import waitImg from '@/assets/common/wait.png'
import waitActiveImg from '@/assets/common/wait-active.png'
import rejectImg from '@/assets/common/reject.png'
import rejectActiveImg from '@/assets/common/reject-active.png'
import completeImg from '@/assets/common/complete.png'
import completeActiveImg from '@/assets/common/complete-active.png'
import allImg from '@/assets/common/all.png'
import allActiveImg from '@/assets/common/all-active.png'
import getLocationImg from '@/assets/enterprise/app/teaConfirmList/getLocation.png'
import cyzsImg from "@/assets/enterprise/app/teaConfirmList/cyzs.png"
import qqcyImg from "@/assets/enterprise/app/teaConfirmList/qqcy.png"
import qqmjImg from "@/assets/enterprise/app/teaConfirmList/qqmj.png"
import { validPhone } from "@/utils/reg"
import photographImg from '@/assets/staff/home/complateConfirm/photograph.png'

export const getStatisticsRenderList = () => {
	return [
		{
			label: "茶园总数",
			key: "total",
			unit: '座',
			img: cyzsImg,
			background: `linear-gradient(138deg, #466FF3 0%, #587EF5 100%)`
		},
		{
			label: "已确权茶园",
			key: "authorized",
			unit: '座',
			img: qqcyImg,
			background: `linear-gradient(136deg, #03BBD8 0%, #0AB9D9 100%)`
		},
		{
			label: "已确权面积",
			key: "totalArea",
			unit: "亩",
			img: qqmjImg,
			background: `linear-gradient(141deg, #61BDFF 0%, #61BBFE 100%)`
		}
	]
}

export const tabOptions = [
	{
		label: '全部',
		value: ""
	},
	{
		label: '已确权',
		value: 2
	},
	{
		label: '申请中',
		value: 1
	},
	{
		label: '已驳回',
		value: 3
	}
]

export const getTeaConfirmTabsRenderList = () => {
	return [
		{
			text: '已确权',
			icon: completeImg,
			activeIcon: completeActiveImg,
			type: 1,
			totalDataKey: 'authorizedNum'
		},
		{
			text: '待审核',
			icon: waitImg,
			activeIcon: waitActiveImg,
			type: 0,
			totalDataKey: 'toApprovalNum'
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

export const getAddFormRenderList = () => {
	return [
		{
			label: '茶园名称',
			placeholder: '请输入茶园名称',
			type: 'input',
			key: 'teaGardenName',
			required: true
		},
		{
			label: '茶园面积',
			placeholder: '请输入种植面积',
			type: 'input',
			key: 'teaGardenArea',
			suffixText: '亩',
			required: true,
			inputType: 'float',
			decimalLen: 3
		},
		{
			label: '茶园地址',
			placeholder: '请输入或获取茶园地址',
			type: 'input',
			key: 'teaGardenAddress',
			required: true,
			suffixIcon: getLocationImg
		},
		{
			label: '含硒量',
			placeholder: '请输入含硒量',
			type: 'input',
			key: 'selenium',
			suffixText: 'mg/kg',
			required: false,
			inputType: 'float',
		},
		{
			label: '经纬度',
			placeholder: '请输入经纬度',
			type: 'input',
			key: 'latitudeLongitude',
			required: false,
		},
		{
			label: '海拔',
			placeholder: '请选择海拔范围',
			type: 'select',
			key: 'altitude',
			required: false,
			options: [
				{
					text: '<=500m',
					value: "<=500m"
				},
				{
					text: '500m以上',
					value: "500m以上"
				}
			]
		},
		{
			label: '茶园介绍',
			placeholder: '请填写茶园介绍',
			type: 'textarea',
			key: 'introduce',
			required: false,
		},
		{
			label: '茶园图片',
			placeholder: '最多上传3张',
			type: 'upload',
			key: 'imageUrl',
			overlay: photographImg,
			multiple: true,
			title: "上传图片",
			required: false,
			max: 3
		},
		{
			inputType: 'BUTTON',
			type: 'input',
			label: '提交'
		}
	]
}

export const getTeaTreeFormRenderList = () => {
	return [
		{
			label: '茶树品种数量',
			placeholder: '',
			type: 'stepper',
			key: 'teaCategoryNum',
			required: false,
			inputType: 'int',
			min: 1
		}
	]
}

export const getBreedFormRenderList = () => {
	return [
		{
			label: '茶树品种',
			placeholder: '请输入茶树品种',
			type: 'input',
			key: 'teaTreeCategory',
			required: false
		},
		{
			label: '茶龄',
			placeholder: '请输入茶树茶龄',
			type: 'input',
			key: 'age',
			suffixText: '年',
			required: false,
			inputType: 'int',
		},
		{
			label: '年产量',
			placeholder: '请输入该茶树品种年产量',
			type: 'input',
			key: 'production',
			suffixText: 'KG',
			required: false,
			inputType: 'float',
		},
	]
}

export const getPrincipalFormRenderList = () => {
	return [
		{
			label: '负责人',
			placeholder: '请输入负责人',
			type: 'input',
			key: 'head',
			required: false
		},
		{
			label: '负责人手机号',
			placeholder: '请输入负责人手机号',
			type: 'input',
			key: 'headPhone',
			required: false,
			inputType: 'int',
			validFnc: validPhone,
			maxlength: 11
		}
	]
}