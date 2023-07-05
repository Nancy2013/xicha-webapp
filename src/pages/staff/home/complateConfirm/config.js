import { workTypeDict, workStatusDict, productStepDict } from '@/utils/dict'
import photographImg from '@/assets/staff/home/complateConfirm/photograph.png'
import scanIcon from '@/assets/staff/home/complateConfirm/scan-icon.png'

export const renderFormConfig = {
	[workTypeDict.pick]: [
		{
			label: '上传图片',
			placeholder: '支持上传多张图片',
			type: 'upload',
			key: 'uploadFile',
			overlay: photographImg,
			multiple: true,
			title: "立即拍照",
			capture: "environment",
			required: true
		},
		{
			inputType: 'BUTTON',
			type: 'input',
			label: '确认完成'
		}

	],
	[workTypeDict.productPackaging]: {
		[workStatusDict.waitExecute]: [
			{
				label: '生产批次',
				placeholder: '请选择生产批次',
				type: 'select',
				key: 'productBatchCode',
				required: true,
				options: []
			},
			{
				label: '扫描产品码',
				placeholder: '支持扫描批量产品码',
				type: 'scanCode',
				key: 'idisCodeList',
				required: true,
				multiple: true,
				isDedup: true
			},
			{
				label: '上传图片',
				placeholder: '支持上传多张图片',
				type: 'upload',
				key: 'uploadFile',
				overlay: photographImg,
				multiple: true,
				title: "立即拍照",
				capture: "environment",
				required: true
			}
		],
		[workStatusDict.execute]: [
			{
				label: '生产批次',
				placeholder: '请选择生产批次',
				type: 'select',
				key: 'productBatchCode',
				required: true,
				disabled: true,
				options: []
			},
			{
				label: '扫描产品码',
				placeholder: '支持扫描批量产品码',
				type: 'scanCode',
				key: 'idisCodeList',
				required: true,
				multiple: true,
				isDedup: true
			}
		]
	},
	[workTypeDict.secondaryPackaging]: [
		{
			label: '扫描外包装码',
			placeholder: '只支持扫描一个外包装码',
			type: 'scanCode',
			key: 'idisCode',
			required: true,
			remark: "",
			isDedup: true
		},
		{
			label: '扫描产品码',
			placeholder: '支持批量扫描产品码',
			type: 'scanCode',
			key: 'idisCodeList',
			required: true,
			multiple: true,
			isDedup: true
		},
	],
	[workTypeDict.qualityTesting]: [
		{
			label: '生产批次',
			placeholder: '请选择生产批次',
			type: 'select',
			key: 'productBatchCode',
			required: true,
			options: []
		},
		{
			label: '检验报告',
			type: 'upload',
			key: 'qualityReport',
			required: true,
			multiple: true,
			uploadMode: 'button',
			accept: "image/*, .pdf",
			title: '支持上传图片或pdf,支持上传多份'
		},
		{
			inputType: 'BUTTON',
			type: 'input',
			label: '确认完成'
		}
	],
	[workTypeDict.warehousing]: {
		[workStatusDict.waitExecute]: [
			{
				label: '规定入库数量',
				placeholder: '请输入规定入库数量',
				type: 'input',
				key: 'estimateCount',
				required: true,
				disabled: true,
				inputType: 'int'
			},
			{
				label: '实际入库数量',
				placeholder: '请输入实际入库数量',
				type: 'input',
				key: 'actualCount',
				required: true,
				inputType: 'int'
			},
			{
				label: '入库时间',
				placeholder: '请选择入库时间',
				type: 'dateTimePicker',
				key: 'warehousingCodeTime',
				required: true,
			},
			{
				label: '入库单号',
				placeholder: '请输入入库单号',
				type: 'input',
				key: 'warehousingCode',
				required: true,
				suffixIconClass: "scan-icon",
				suffixIcon: scanIcon
			},
			{
				label: '上传照片',
				placeholder: '支持上传多张图片',
				type: 'upload',
				key: 'uploadFile',
				overlay: photographImg,
				multiple: true,
				title: "立即拍照",
				capture: "environment",
				required: true
			}
		],
		[workStatusDict.execute]: [
			{
				label: '剩余入库数量',
				placeholder: '请输入剩余入库数量',
				type: 'input',
				key: 'estimateCountPre',
				disabled: true,
			},
			{
				label: '本次入库数量',
				placeholder: '请输入本次入库数量',
				type: 'input',
				key: 'actualCount',
				inputType: 'int'
			},
			{
				label: '入库时间',
				placeholder: '请选择入库时间',
				type: 'dateTimePicker',
				key: 'warehousingCodeTime',
			},
			{
				label: '上传照片',
				placeholder: '支持上传多张图片',
				type: 'upload',
				key: 'uploadFile',
				overlay: photographImg,
				multiple: true,
				title: "立即拍照",
				capture: "environment",
				required: true
			}
		]
	}
}

/**
 * 库存工单分批完成上次数据渲染表单
 */
export const warehousingExecuteRenderFormList = [
	{
		label: '规定入库数量',
		placeholder: '请输入规定入库数量',
		type: 'input',
		key: 'estimateCount',
		disabled: true,
		inputType: 'int'
	},
	{
		label: '已入库数量',
		placeholder: '请输入已入库数量',
		type: 'input',
		key: 'actualCountPre',
		disabled: true,
		inputType: 'int'
	},
	{
		label: '入库时间',
		placeholder: '请选择入库时间',
		type: 'dateTimePicker',
		key: 'warehousingCodeTimePre',
		disabled: true,
	},
	{
		label: '入库单号',
		placeholder: '请输入入库单号',
		type: 'input',
		key: 'warehousingCodePre',
		disabled: true,
		suffixIconClass: "scan-icon",
		suffixIcon: scanIcon
	},
	{
		label: '上传照片',
		placeholder: '支持上传多张图片',
		type: 'upload',
		key: 'uploadFilePre',
		overlay: photographImg,
		multiple: true,
		title: "立即拍照",
		disabled: true,
		capture: "environment"
	},
]

export const getProductRenderFormConfig = (productStep, workStatus) => {
	switch (Number(productStep)) {
		case productStepDict.feedKill:
			return [
				{
					label: '结算批次',
					placeholder: '请选择结算批次',
					type: 'select',
					key: 'settlerBatchCode',
					required: true,
					options: []
				},
				{
					label: '茶青重量',
					placeholder: '请填写茶青重量',
					type: 'input',
					key: 'plantingArea',
					required: false,
					inputType: 'float',
					suffixText: 'kg'
				},
				{
					label: '上传图片',
					placeholder: '支持上传多张图片',
					type: 'upload',
					key: 'uploadFile',
					overlay: photographImg,
					multiple: true,
					title: "立即拍照",
					capture: "environment",
					required: true
				},
				{
					inputType: 'BUTTON',
					type: 'input',
					label: '确认完成'
				}
			]
		case productStepDict.cooling:
		case productStepDict.regainTide:
		case productStepDict.kneadRoll:
		case productStepDict.striping:
		case productStepDict.roller:
		case productStepDict.drying:
			return [
				{
					label: '生产批次',
					placeholder: '请选择生产批次',
					type: 'select',
					key: 'settlerBatchCode',
					required: true,
					options: []
				},
				{
					label: '上传图片',
					placeholder: '支持上传多张图片',
					type: 'upload',
					key: 'uploadFile',
					overlay: photographImg,
					multiple: true,
					title: "立即拍照",
					capture: "environment",
					required: true
				},
				{
					inputType: 'BUTTON',
					type: 'input',
					label: '确认完成'
				}
			]
		case productStepDict.spreadCooling:
			return [
				{
					label: '生产批次',
					placeholder: '请选择生产批次',
					type: 'select',
					key: 'settlerBatchCode',
					required: true,
					options: []
				},
				{
					label: '成茶重量',
					placeholder: '请填写茶青重量',
					type: 'input',
					key: 'plantingArea',
					required: false,
					inputType: 'float',
					suffixText: 'kg'
				},
				{
					label: '上传图片',
					placeholder: '支持上传多张图片',
					type: 'upload',
					key: 'uploadFile',
					overlay: photographImg,
					multiple: true,
					title: "立即拍照",
					capture: "environment",
					required: true
				},
				{
					inputType: 'BUTTON',
					type: 'input',
					label: '确认完成'
				}
			]
		case productStepDict.automation:
			if (workStatus == workStatusDict.waitExecute) {
				return [
					{
						label: '结算批次',
						placeholder: '请选择结算批次',
						type: 'select',
						key: 'settlerBatchCode',
						required: true,
						options: []
					},
					{
						label: '茶青重量',
						placeholder: '请填写茶青重量',
						type: 'input',
						key: 'plantingArea',
						required: false,
						inputType: 'float',
						suffixText: 'kg'
					},
					{
						inputType: 'BUTTON',
						type: 'input',
						label: '开始执行'
					}
				]
			} else if (workStatus == workStatusDict.execute) {
				return [
					{
						label: '结算批次',
						placeholder: '请选择结算批次',
						type: 'select',
						key: 'settlerBatchCode',
						required: true,
						disabled: true,
						options: []
					},
					{
						label: '成茶重量',
						placeholder: '请填写茶青重量',
						type: 'input',
						key: 'plantingArea',
						required: false,
						inputType: 'float',
						suffixText: 'kg'
					},
					{
						label: '上传图片',
						placeholder: '支持上传多张图片',
						type: 'upload',
						key: 'uploadFile',
						overlay: photographImg,
						multiple: true,
						title: "立即拍照",
						capture: "environment",
						required: true
					},
					{
						inputType: 'BUTTON',
						type: 'input',
						label: '确认完成'
					}
				]
			}
	}
}