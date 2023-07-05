/**
 * 农事执行状态说明
 */
export const agriculturalStatusDict = {
	/**
	 * 待执行
	 */
	waitExecute: 0,
	/**
	 * 执行中
	 */
	execute: 1,
	/**
	 * 已完成
	 */
	complete: 2,
	/**
	 * 已逾期
	 */
	overdue: 3,
	/**
	 * 待完成(待执行+执行中)
	 */
	waitComplete: 4,
	/**
	 * 待执行
	 */
	'0': 'waitExecute',
	/**
	 * 执行中
	 */
	'1': 'execute',
	/**
	 * 已完成
	 */
	'2': 'complete',
	/**
	 * 已逾期
	 */
	'3': 'overdue',
	/**
	 * 待完成(待执行+执行中)
	 */
	'4': 'waitComplete'
}

/**
 * 农事类型说明
 */
export const farmingTypeDict = {
	/**
	 * 除草农事
	 */
	"weeding": 1,

	/**
	 * 翻土农事
	 */
	"turnTheSoil": 2,
	/**
	 * 修剪农事
	 */
	"clipTrim": 3,
	
	/**
	 * 施肥农事
	 */
	"applyFertilizer": 4,
	/**
	 * 施药农事
	 */
	"medicine": 5,
	/**
	 * 茶园灌溉
	 */
	"irrigation": 6,
	/**
	 * 除草农事
	 */
	"1": "除草农事",
	/**
	 * 
	 */
	"2": "翻土农事",
	/**
	 * 修剪农事
	 */
	"3": "修剪农事",
	/**
	 * 施肥农事
	 */
	"4": "施肥农事",
	/**
	 * 施药农事
	 */
	"5": "施药农事",
	/**
	 * 茶园灌溉
	 */
	"6": "茶园灌溉"
}

/**
 * 茶园确权状态说明
 */
export const teaConfirmStatusDict = {
	/**
	 * 未确权
	 */
	unconfirmed: '0',
	/**
	 * 待审核
	 */
	wait: "1",
	/**
	 * 已通过
	 */
	complate: '2',
	/**
	 * 已驳回
	 */
	reject: '3',
	/**
	 * 
	 */
	'0': '',
	/**
	 * 申请中
	 */
	'1': '申请中',
	/**
	 * 已确权
	 */
	'2': '已确权',
	/**
	 * 已驳回
	 */
	'3': '已驳回'
}


/**
 * 授权申请状态说明
 */
export const authorStatusDict = {
	/** 
	* 待审核
	*/
	wait: 0,
	/**
	 * 已授权
	 */
	charge: 1,
	/**
	 * 已驳回
	 */
	reject: 2
}


/**
 * 角色类型说明
 */
export const roleTypeDict = {
	/**
	 * 新账户
	 */
	new: 0,
	/**
	 * 茶园工
	 */
	teaGardener: 11,
	/**
	 * 产茶工
	 */
	teaWorker: 12,
	/**
	 * 检验工
	 */
	inspector: 13,
	/**
	 * 包装工
	 */
	packer: 14,
	/**
	 * 企业账户
	 */
	enterprise: 3,
	/**
	 * 政府账号
	 */
	gov: 19
}

/**
 * 认证申请状态说明
 */
export const approveStatusDict = {
	/**
	 * 未认证
	 */
	unAuthentication: 0,
	/**
	 * 待审核
	 */
	waitingApprove: 1,
	/**
	 * 已认证
	 */
	authenticated: 2,
	/**
	 * 已驳回
	 */
	disallow: 3,
}

/**
 * 工单类型的说明
 */
export const workTypeDict = {
	/**
	 * 农事工单
	 */
	farming: 1,
	/**
	 * 采摘工单
	 */
	pick: 2,
	/**
	 * 生产工单
	 */
	production: 3,
	/**
	 * 质量检验
	 */
	qualityTesting: 4,
	/**
	 * 产品包装
	 */
	productPackaging: 5,
	/**
	 * 二次包装
	 */
	secondaryPackaging: 6,
	/**
	 * 入库
	 */
	warehousing: 7,
	/**
	 * 出库
	 */
	outbound: 8,
	/**
	 * 农事工单
	 */
	'1': '农事工单',
	/**
	 * 采摘工单
	 */
	'2': '采摘工单',
	/**
	 * 生产工单
	 */
	'3': '生产工单',
	/**
	 * 质量检验
	 */
	'4': '质量检验',
	/**
	 * 产品包装
	 */
	'5': '产品包装',
	/**
	 * 二次包装
	 */
	'6': '二次包装',
	/**
	 * 入库
	 */
	'7': '入库',
	/**
	 * 出库
	 */
	'8': '出库'
}

/**
 * 生产工单工序的说明
 */
export const productStepDict = {
	/**
	 * 自动化生产
	 */
	automation: 9,
	/**
	 * 烘干去水
	 */
	drying: 7,
	/**
	 * 滚筒炒香
	 */
	roller: 6,
	/**
	 * 理条解块
	 */
	striping: 5,
	/**
	 * 揉捻
	 */
	kneadRoll: 4,
	/**
	 * 回潮
	 */
	regainTide: 3,
	/**
	 * 冷却去杂
	 */
	cooling: 2,
	/**
	 * 上料杀青
	 */
	feedKill: 1,
	/**
	 * 摊放降温
	 */
	spreadCooling: 8
}

/**
 * 工单状态的说明
 */
export const workStatusDict = {
	/**
	 * 待执行
	 */
	waitExecute: 1,
	/**
	 * 执行中
	 */
	execute: 2,
	/**
	 * 已完成
	 */
	complete: 3,
	/**
	 * 已逾期
	 */
	overdue: 4,
	/**
	 * 待执行
	 */
	'1': '待执行',
	/**
	 * 执行中
	 */
	'2': '执行中',
	/**
	 * 已完成
	 */
	'3': '已完成',
	/**
	 * 已逾期
	 */
	'4': '已逾期'
}


/**
 * 茶青结算状态说明
 */
export const settleStatusDict = {
	/**
	 * 未结算
	 */
	unsettled: 0,
	/**
	 * 已结算
	 */
	settled: 1,
	/**
	 * 未结算
	 */
	'0': '未结算',
	/**
	 * 已结算
	 */
	'1': '已结算'
}

/**
 * 账户类型
 */
export const accountTypeDict = {
	/**
	 * 游客
	 */
	tourist: 1,
	/**
	 * 茶企
	 */
	enterprise: 2,
	/**
	 * 茶园主
	 */
	teaGarden: 3,
	/**
	 * 其他
	 */
	other: 4
}