/**
 * 农事类型的可选数据
 */
const farmingTypeOptions = [
	{
		text: '除草农事',
		value: 1
	},
	{
		text: '翻土农事',
		value: 2
	},
	{
		text: '修剪农事',
		value: 3
	},
	{
		text: '施肥农事',
		value: 4
	},
	{
		text: '施药农事',
		value: 5
	},
	{
		text: '茶园灌溉',
		value: 6
	}
]

const workOrderOptions = [
	{
		label: '农事工单',
		value: 1
	},
	{
		label: '采摘工单',
		value: 2
	},
	{
		label: '生产工单',
		value: 3
	},
	{
		label: '质量检验',
		value: 4
	},
	{
		label: '产品包装',
		value: 5
	},
	{
		label: '二次包装',
		value: 6
	},
	{
		label: '入库',
		value: 7
	},
	{
		label: '出库',
		value: 8
	},
]

const workStatusOptions = [
	{
		label: '待执行',
		value: 1
	},
	{
		label: '执行中',
		value: 2
	},
	{
		label: '已完成',
		value: 3
	},
	{
		label: '已逾期',
		value: 4
	},
]

/**
 * 农事类型的映射数据
 */
const farmingTypeMap = {
	'1': '茶园翻土',
	'2': '茶树修剪',
	'3': '茶园除草',
	'4': '茶园施肥',
	'5': '茶园灌溉',
	'6': '茶青采摘'
	
}

export {
	farmingTypeOptions,
	farmingTypeMap,
	workOrderOptions,
	workStatusOptions
}