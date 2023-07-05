<template>
    <div class="workOrderItem">
        <div class="workOrderItem-title">
            <div class="workOrderItem-status">
                <div class="workOrderItem-status-img">
                    <!-- 待执行工单 -->
                    <img v-if="data.operateStatus === workStatusDict.waitExecute" src="@/components/images/workOrderItem/wait.png" alt="" />
                    <!-- 执行中工单 -->
                    <img v-if="data.operateStatus === workStatusDict.execute" src="@/components/images/workOrderItem/execute.png" alt="" />
                    <!-- 已完成工单 -->
                    <img v-if="data.operateStatus === workStatusDict.complete" src="@/components/images/workOrderItem/complete.png" alt="" />
                    <!-- 已逾期工单 -->
                    <img v-if="data.operateStatus === workStatusDict.overdue" src="@/components/images/workOrderItem/overdue.png" alt="" />
                </div>
                <div class="workOrderItem-status-text">{{ workStatusDict[data.operateStatus] }}</div>
            </div>

            <div class="workOrderItem-handle bgColor" v-if="workHandleDict[data.operateStatus] && workHandleDict[data.operateStatus][data.workType] && isHandle || (data.workType == workTypeDict.secondaryPackaging && data.operateStatus == workStatusDict.complete)" @click="handleWork(data)">{{ workHandleDict[data.operateStatus][data.workType] }}</div>

            <div class="workOrderItem-handle bgColor" v-if="isHandle && productHandleDict[data.operateStatus] && productHandleDict[data.operateStatus][data.productStep] && data.workType == workTypeDict.production" @click="handleWork(data)">{{ productHandleDict[data.operateStatus][data.productStep] }}</div>

        </div>

        <div class="workOrderItem-content">
            <div class="workOrderItem-info">
                <div class="workOrderItem-workName">{{ data.workType | filtersWorkName(data) }}</div>
                <div class="workOrderItem-teaName" >
                    <img v-if="data.teaGardenName" src="@/components/images/workOrderItem/location.png" alt="">
                    <span v-if="data.teaGardenName" class="color">{{ data.teaGardenName }}</span>
					<span v-if="data.productLing" class="color">{{ data.productLing }}</span>
                    <span v-if="data.warehouseNum" class="color">仓库编号：{{ data.warehouseNum }}</span>
                </div>
            </div>
            <div class="workOrderItem-rows">
                <div class="workOrderItem-row">
                    <WorkOrderRow v-for="(row, rowKey) in renderData.rows" :key="rowKey" :label="row.label" :type="row.type" :value="data[row.key]" :suffixText="row.suffixText" :isHide="row.isHide || (!data[row.key] && row.emptyHide)" :filterType="row.filterType"></WorkOrderRow>
                </div>
                <div class="workOrderItem-panel" v-if="Array.isArray(renderData.panelRender) && renderData.panelRender.length">
                    <Collapse v-model="activeCollapseList" @change="handleChange">
                        <CollapseItem name="1">
                            <template #title>
                                <div class="workOrderItem-panel-title">
                                    <span>{{ renderData.panelText }}</span>
                                    <div :class="`${activeCollapseList.length ? 'workOrderItem-panel-icon-active' : ''}`">
                                        <img src="@/components/images/workOrderItem/up.png" alt="" />
                                    </div>
                                </div>
                            </template>
                            <div class="workOrderItem-panel-content">
								<WorkOrderRow v-for="(panel, panelKey) in renderData.panelRender" :key="panelKey" :label="panel.label" :type="panel.type" :suffixText="panel.suffixText" :isHide="panel.isHide || (!data[panel.key] && panel.emptyHide)" :value="data[panel.key]" :filterType="panel.filterType"></WorkOrderRow>
                            </div>
                        </CollapseItem>
                    </Collapse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { workStatusDict, workTypeDict, farmingTypeDict } from '@/utils/dict'
import { workHandleDict, workRowConfig, getWorkRenderList, productHandleDict } from './config'
import WorkOrderRow from '../workOrderRow/workOrderRow.vue'
import { Collapse, CollapseItem } from 'vant'
export default {
    name: 'workOrderItem',
    components: {
        Collapse,
        CollapseItem,
        WorkOrderRow
    },
    props: {
        data: {
            type: Object,
            default: () => {
                return {}
            }
		},
		isHandle: {
			type: Boolean,
			default: false
		}
    },
    data() {
		return {
            workStatusDict: workStatusDict,
            productHandleDict: productHandleDict,
            workTypeDict: workTypeDict,
            workHandleDict: workHandleDict,
			workRowConfig: workRowConfig,
			activeCollapseList: [],
			renderData: {},
			roleId: ""
        }
	},
	mounted() {
		const { workType, operateStatus, farmingType } = this.data
		const roleId = localStorage.getItem('roleId')
		this.roleId = roleId
		this.renderData = getWorkRenderList(workType, operateStatus, roleId, farmingType)
	},
	filters: {
		filtersWorkName(workType, data) {
			if (workType === workTypeDict.farming) {
				return farmingTypeDict[data.farmingType]
			} else if(workType === workTypeDict.production){
				return data.productProcess
            } else if (workType == workTypeDict.outbound || workType == workTypeDict.warehousing) {
                return `库存工单（${workTypeDict[workType]}）`
            } else {
                return workTypeDict[workType]
            }
		}
	},
    methods: {
        /**
            处理工单
            @param { Object } data 工单数据
            @return
        */
        handleWork(data) {
            this.$emit('handle', data)
		},

		/**
            处理面板展开事件
            @param { Object } data 工单数据
            @return
        */
		handleChange(list) {
			console.log(list)
		}
    },

}

</script>

<style scoped lang='scss'>
.workOrderItem {
    margin: 0 0.32rem 0.2rem;
    padding: 0 0.24rem 0;
    border-radius: 0.04rem;
    box-shadow: 0 0.04rem 0.12rem 0.04rem rgba(241, 241, 241, 0.5);
    background-color: #fff;
}
.workOrderItem-title {
    height: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    .workOrderItem-status {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
    }
    .workOrderItem-status-img {
        width: 0.46rem;
        height: 0.46rem;
        > img {
            width: 100%;
            height: 100%;
        }
    }
    .workOrderItem-status-text {
        margin-left: 0.18rem;
        line-height: 0.44rem;
        color: #333333;
    }
    .workOrderItem-handle {
        width: 1.72rem;
        height: 0.56rem;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.56rem;
        border-radius: 0.04rem;
        color: #fff;
    }
}

.workOrderItem-content {
    padding-top: 0.3rem;
    .workOrderItem-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .workOrderItem-workName {
            font-size: 0.36rem;
            color: #333;
            line-height: 0.5rem;
        }
        .workOrderItem-teaName {
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
                width: 0.24rem;
                height: 0.3rem;
            }
            span {
                margin-left: 0.16rem;
                font-size: 0.3rem;
                line-height: 0.42rem;
            }
        }
    }
    .workOrderItem-rows {
        margin-top: 0.24rem;
		padding-bottom: 0.32rem;
    }
	.workOrderItem-row {
		//padding-bottom: 0.32rem;
	}
	.workOrderItem-panel {
		//padding-bottom: 0.32rem;
		border-bottom: 1px solid #EEEEEE;
		/deep/ .van-cell {
			padding: 0;
			.van-icon {
				display: none;
			}
		}
		/deep/ .van-collapse-item__content {
			padding: 0;
		}
		/deep/ .van-collapse-item__title--expanded::after {
			display: none;
		}
		/deep/ .van-hairline--top-bottom::after {
			display: none;
		}
	}
    .workOrderItem-panel-title {
        height: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
		border-top: 1px solid #EEEEEE;
		//border-bottom: 1px solid #EEEEEE;
        > span {
            color: #969799;
        }
        > div {
            margin-left: 0.1rem;
            width: 0.32rem;
            height: 0.32rem;
            border-radius: 50%;
            background-color: #ececec;
			transition: all .3s;
			transform: rotate(180deg);
        }
        img {
            display: block;
            width: 0.16rem;
            height: 0.1rem;
            margin: 0.1rem auto 0;
        }
		.workOrderItem-panel-icon-active {
			transform: rotate(0deg);
		}
    }
}
</style>