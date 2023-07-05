import { workTypeDict } from '@/utils/dict'

/**
 * 执行的api的配置
 */
export const executeApiConfig = {
	[workTypeDict.farming]: "/workOrder/updateFarmingOrder",
	[workTypeDict.pick]: "/workOrder/updatePickWorkOrder",
	[workTypeDict.production]: "/workOrder/updateProduceWorkOrder",
	[workTypeDict.qualityTesting]: "/workOrder/updateQualityWorkOrder",
	[workTypeDict.productPackaging]: "/workOrder/updatePackageWorkOrder",
	[workTypeDict.secondaryPackaging]: "/workOrder/upSecondPackage",
	[workTypeDict.warehousing]: "/workOrder/upteaWarehouseIn",
	[workTypeDict.outbound]: "/workOrder/upteaWarehouseOut"
}

