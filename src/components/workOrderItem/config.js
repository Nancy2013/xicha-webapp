import { workStatusDict, workTypeDict, roleTypeDict, farmingTypeDict, productStepDict } from '@/utils/dict'

/**
 * 农事操作（除生产工序）的说明数据
 */
export const workHandleDict = {
	[workStatusDict.waitExecute]: {
		[workTypeDict.farming]: '扫码执行',
		[workTypeDict.pick]: '扫码执行',
		[workTypeDict.productPackaging]: '去完成',
		[workTypeDict.secondaryPackaging]: '去完成',
		[workTypeDict.qualityTesting]: '去完成',
		[workTypeDict.warehousing]: '去完成',
		[workTypeDict.outbound]: '去完成'
	},
	[workStatusDict.execute]: {
		[workTypeDict.farming]: '确认完成',
		[workTypeDict.pick]: '确认完成',
		[workTypeDict.productPackaging]: '继续包装',
		[workTypeDict.secondaryPackaging]: '继续包装',
		[workTypeDict.warehousing]: '继续完成',
		[workTypeDict.outbound]: '继续完成'
	},
	[workStatusDict.complete]: {
		[workTypeDict.secondaryPackaging]: '包装详情',
		[workTypeDict.pick]: '采摘批次码',
	}
}

export const productHandleDict = {
	[workStatusDict.waitExecute]: {
		[productStepDict.feedKill]: "去完成",
		[productStepDict.cooling]: "去完成",
		[productStepDict.regainTide]: "去完成",
		[productStepDict.kneadRoll]: "去完成",
		[productStepDict.striping]: "去完成",
		[productStepDict.roller]: "去完成",
		[productStepDict.drying]: "去完成",
		[productStepDict.spreadCooling]: "去完成",
		[productStepDict.automation]: "开始执行"
	},
	[workStatusDict.execute]: {
		[productStepDict.automation]: "完成确认"
	}

}




/**
 * 渲染农事详情的配置数据
 */

export const getWorkRenderList = (workType, workStatus, roleType, farmingType) => {
	switch (workType) {
		// 农事工单
		case workTypeDict.farming:
			switch (workStatus) {
				case workStatusDict.waitExecute:
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" }
						]
					}
				case workStatusDict.execute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '执行定位', key: 'address', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '开始执行时间', key: 'actualStartTime', type: 'text', filterType: "date" },
							{ label: '茶园码', key: 'teaGardenCode', type: 'code' }
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" }
						],
						panelText: "详细信息",
						panelRender: [
							{ label: '执行定位', key: 'address', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '开始执行时间', key: 'actualStartTime', type: 'text', filterType: "date" },
							{ label: '工作完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },

							{ label: '除草类型', key: 'farmingProcessType', type: 'text', isHide: farmingType != farmingTypeDict.weeding },
							{ label: '备注', key: 'remark', type: 'textarea', isHide: farmingType != farmingTypeDict.weeding, emptyHide: true },

							{ label: '翻土方式', key: 'farmingProcessType', type: 'text', isHide: farmingType != farmingTypeDict.turnTheSoil },
							{ label: '备注', key: 'remark', type: 'textarea', isHide: farmingType != farmingTypeDict.turnTheSoil, emptyHide: true },

							{ label: '修剪方式', key: 'farmingProcessType', type: 'text', isHide: farmingType != farmingTypeDict.clipTrim },
							{ label: '修剪工具', key: 'pruneTool', type: 'text', isHide: farmingType != farmingTypeDict.clipTrim, emptyHide: true },
							{ label: '备注', key: 'remark', type: 'textarea', isHide: farmingType != farmingTypeDict.clipTrim, emptyHide: true },

							{ label: '肥料类型', key: 'farmingProcessType', type: 'text', isHide: farmingType != farmingTypeDict.applyFertilizer },
							{ label: '肥料名称', key: 'fertilizerName', type: 'text', isHide: farmingType != farmingTypeDict.applyFertilizer, emptyHide: true },
							{ label: '使用量', key: 'dosage', type: 'text', isHide: farmingType != farmingTypeDict.applyFertilizer, emptyHide: true, suffixText: 'kg' },
							{ label: '备注', key: 'remark', type: 'textarea', isHide: farmingType != farmingTypeDict.applyFertilizer, emptyHide: true },

							{ label: '农药名称', key: 'pesticideName', type: 'text', isHide: farmingType != farmingTypeDict.medicine },
							{ label: '使用量', key: 'dosage', type: 'text', isHide: farmingType != farmingTypeDict.medicine, emptyHide: true, suffixText: 'kg' },
							{ label: '备注', key: 'remark', type: 'textarea', isHide: farmingType != farmingTypeDict.medicine, emptyHide: true },

							{ label: '灌溉方式', key: 'farmingProcessType', type: 'text', isHide: farmingType != farmingTypeDict.irrigation },
							{ label: '灌溉水源', key: 'irrigateWaterSource', type: 'text', isHide: farmingType != farmingTypeDict.irrigation, emptyHide: true },
							{ label: '备注', key: 'remark', type: 'textarea', isHide: farmingType != farmingTypeDict.irrigation, emptyHide: true },

							{ label: '茶园码', key: 'teaGardenCode', type: 'code' },
							{ label: '工作图片', key: 'imageUrl', type: 'img' },
						]
					}
			}
			break
		// 采摘工单
		case workTypeDict.pick:
			switch (workStatus) {
				case workStatusDict.waitExecute:
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '采摘品种', key: 'pickBreed', type: 'text' },
							{ label: '采摘要求', key: 'pickRequire', type: 'text' }
						]
					}
				case workStatusDict.execute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '采摘品种', key: 'pickBreed', type: 'text' },
							{ label: '采摘要求', key: 'pickRequire', type: 'text' },
							{ label: '执行定位', key: 'address', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '开始执行时间', key: 'actualStartTime', type: 'text', filterType: "date" },
							{ label: '茶园码', key: 'teaGardenCode', type: 'code' }
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '采摘批次码', key: 'pickBatchCode', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '采摘品种', key: 'pickBreed', type: 'text' },
							{ label: '采摘要求', key: 'pickRequire', type: 'text' }
						],
						panelText: "详细信息",
						panelRender: [
							{ label: '执行定位', key: 'address', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '开始执行时间', key: 'actualStartTime', type: 'text', filterType: "date" },
							{ label: '工作完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },
							{ label: '茶园码', key: 'teaGardenCode', type: 'code' },
							{ label: '工作图片', key: 'imageUrl', type: 'img' },
						]
					}
			}
			break
		// 生产工单
		case workTypeDict.production:
			switch (workStatus) {
				case workStatusDict.waitExecute:
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
						]
					}
				case workStatusDict.execute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '生产批次码', key: 'productBatchCode', type: 'text' },
							{ label: '工作完成时间', key: 'estimateEndTime', type: 'text' },
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '生产批次码', key: 'productBatchCode', type: 'text' },
							// { label: '开始执行时间', key: 'actualStartTime', type: 'text', filterType: "date" },
							// { label: '茶青重量', key: '', type: 'text' },
							{ label: '工作完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },
							{ label: '工作图片', key: 'imageUrl', type: 'img' }
							
						]
					}
			}
			break
		case workTypeDict.qualityTesting:
			switch (workStatus) {
				case workStatusDict.waitExecute:
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '生产批次码', key: 'productBatchCode', type: 'text' },
							{ label: '工作完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },
							{ label: '检验报告', key: 'qualityReport', type: 'img' },
						]
					}
			}
			break
		case workTypeDict.productPackaging:
			switch (workStatus) {
				case workStatusDict.waitExecute:
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
						]
					}
				case workStatusDict.execute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '生产批次码', key: 'productBatchCode', type: 'text' },
							{ label: '产品数', key: 'idscodeNum', type: 'text' }
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							{ label: '生产批次码', key: 'productBatchCode', type: 'text' },
							{ label: '工作完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },
							{ label: '产品数', key: 'idscodeNum', type: 'text' }
						],
						panelText: "产品码",
						panelRender: [
							{ label: '', key: 'idsCodeList', type: 'codes' }
						]
					}
			}
			break
		case workTypeDict.secondaryPackaging:
			switch (workStatus) {
				case workStatusDict.waitExecute:
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
						]
					}
				case workStatusDict.execute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							// { label: '生产批次码', key: 'productBatchCode', type: 'text' },
							{ label: '外包装码', key: 'packageNum', type: 'text' },
							{ label: '产品码', key: 'idscodeNum', type: 'text' },
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '预计完成时间', key: 'estimateEndTime', type: 'text', filterType: "date" },
							// { label: '生产批次码', key: 'productBatchCode', type: 'text' },
							{ label: '工作完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },
							{ label: '外包装码', key: 'packageNum', type: 'text' },
							{ label: '产品码', key: 'idscodeNum', type: 'text' },
						]
					}
			}
			break
		case workTypeDict.warehousing:
			switch (workStatus) {
				case workStatusDict.waitExecute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '产品名称', key: 'productName', type: 'text' },
							{ label: '入库数量', key: 'estimateCount', type: 'text' }
						]
					}
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '产品名称', key: 'productName', type: 'text' },
							{ label: '仓库编号', key: 'warehouseNum', type: 'text' },
							{ label: '规定入库数量', key: 'estimateCount', type: 'text' }
						]
					}
				case workStatusDict.execute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '产品名称', key: 'productName', type: 'text' },
							{ label: '仓库编号', key: 'warehouseNum', type: 'text' },
							{ label: '规定入库数量', key: 'estimateCount', type: 'text' },
							{ label: '已入库数量', key: 'actualCount', type: 'text' }
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },
							{ label: '产品名称', key: 'productName', type: 'text' },
							{ label: '入库单号', key: 'warehousingCode', type: 'text' },
							{ label: '规定入库数量', key: 'estimateCount', type: 'text' },
							{ label: '实际入库数量', key: 'actualCount', type: 'text' }
						]
					}
			}
			break
		case workTypeDict.outbound:
			switch (workStatus) {
				case workStatusDict.waitExecute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '产品名称', key: 'packageNum', type: 'text' },
							{ label: '出库数量', key: 'idscodeNum', type: 'text' }
						]
					}
				case workStatusDict.overdue:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '产品名称', key: 'packageNum', type: 'text' },
							{ label: '仓库编号', key: 'idscodeNum', type: 'text' },
							{ label: '规定出库数量', key: 'idscodeNum', type: 'text' }
						]
					}
				case workStatusDict.execute:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '产品名称', key: 'packageNum', type: 'text' },
							{ label: '仓库编号', key: 'idscodeNum', type: 'text' },
							{ label: '规定出库数量', key: 'idscodeNum', type: 'text' },
							{ label: '已出库数量', key: 'idscodeNum', type: 'text' }
						]
					}
				case workStatusDict.complete:
					return {
						rows: [
							{ label: '工单编号', key: 'workNo', type: 'text' },
							{ label: '分配人员', key: 'executorName', type: 'text', isHide: roleType != roleTypeDict.enterprise },
							{ label: '完成时间', key: 'actualEndTime', type: 'text', filterType: "date" },
							{ label: '产品名称', key: 'packageNum', type: 'text' },
							{ label: '出库单号', key: 'idscodeNum', type: 'text' },
							{ label: '规定出库数量', key: 'idscodeNum', type: 'text' },
							{ label: '实际出库数量', key: 'idscodeNum', type: 'text' }
						]
					}
			}
			break
	}
}