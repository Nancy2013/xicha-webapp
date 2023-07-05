<template>
    <FcPage :title="pageTitle" isBorder>
        <div :class="`complateConfirm ${workType == workTypeDict.secondaryPackaging || workType == workTypeDict.productPackaging || workType == workTypeDict.warehousing ? 'complateConfirm-bottom' : ''}`">
            <div class="complateConfirm-secondaryPackaging" v-if="workType == workTypeDict.secondaryPackaging">
                <div class="complateConfirm-secondaryPackaging-item whiteBg" v-for="(renderItem, renderKey) in renderFormList" :key="renderKey">
                    <div class="complateConfirm-secondaryPackaging-title">
                        <img src="@/assets/staff/home/complateConfirm/close.png" alt="" @click="handleDelete(renderKey)">
                    </div>
                    <FcForm :ref="`FcForm${renderKey}`" :renderList="renderItem" v-model="formDataList[renderKey]"></FcForm>
                </div>
                <img class="complateConfirm-secondaryPackaging-add" src="@/assets/common/add.png" alt="" @click="handleAdd">

                <div class="complateConfirm-secondaryPackaging-bottom">
                    <div class="color whiteBg" @click="handleComplateSP('batch')">分批完成</div>
                    <div class="white bgColor" @click="handleComplateSP('confirm')">确认完成</div>
                </div>
            </div>
            <div class="complateConfirm-content" v-else>
                <div v-if="workType == workTypeDict.warehousing && operateStatus == workStatusDict.execute">
                    <FcForm ref="FcFormExecute" :renderList="warehousingExecuteRenderFormList" v-model="formExecuteData"></FcForm>
                </div>
                <FcForm ref="FcForm" :renderList="renderFormList" v-model="formData" @suffixIcon="handleClickSuffixIcon" @submit="handleComplate"></FcForm>
                <div class="complateConfirm-secondaryPackaging-bottom" v-if="workType == workTypeDict.productPackaging || workType == workTypeDict.warehousing">
                    <div class="color whiteBg" @click="handleComplatePackage('batch')">分批完成</div>
                    <div class="white bgColor" @click="handleComplatePackage('confirm')">确认完成</div>
                </div>
            </div>

            <FcLoading :isShow="loading" :text="loadingText"></FcLoading>
        </div>
    </FcPage>
</template>

<script>
import { workTypeDict, workStatusDict, productStepDict } from '@/utils/dict'
import FcLoading from '@/components/loading/loading.vue'
import { initWeChat } from '@/main'
import { executeApiConfig } from '../executeConfirm/config'
import { renderFormConfig, getProductRenderFormConfig, warehousingExecuteRenderFormList } from './config'
import photographImg from '@/assets/staff/home/complateConfirm/photograph.png'
import FcForm from '@/components/form/form.vue'
export default {
    name: 'complateConfirm',

    components: { FcForm, FcLoading },

    data() {
        return {
            workType: "",
            pageTitle: "",
            farmingType: "",
            id: "",
            workNo: "",
            operateStatus: "",
            productStep: "",
            renderFormList: [],
            formData: {},
            formExecuteData: {},
            workTypeDict: workTypeDict,
            workStatusDict: workStatusDict,
            formDataList: [{}],
            loading: false,
            loadingText: '',
            produceBatchOptions: [],
            warehousingExecuteRenderFormList: []
        }
    },

    created() {
        const { id } = this.$route.query
        this.loadingText = '正在获取工单数据...'
        this.loading = true
        this.$axios({
            url: '/workOrder/queryByExcutor',
            method: 'POST',
            data: { id: id }
        }).then((res) => {
            this.loadingText = ''
            this.loading = false
            const { estimateCount, wareId, operateStatus, actualCount, warehousingCodeTime, createdTime, warehousingCode, imageUrl, workType, productBatchCode, productStep, farmingType, settlerBatchCode } = res.rows[0]
            this.id = id
            this.workType = workType
            this.farmingType = farmingType
            this.operateStatus = operateStatus
            this.productStep = productStep
            if (workType == workTypeDict.farming) {
                this.pageTitle = "完成确认"
                this.getFormRenderList()
            } else if (workType == workTypeDict.secondaryPackaging) {
                this.pageTitle = "执行二次包装"
                renderFormConfig[workType][0].dedupFun = this.validateCode()
                renderFormConfig[workType][1].dedupFun = this.validateCode()
                this.renderFormList.push(renderFormConfig[workType])
            } else if (workType == workTypeDict.productPackaging) {
                const renderFormList = renderFormConfig[workType][this.operateStatus]
                renderFormList[1].dedupFun = this.validateCode()
                this.renderFormList = renderFormList
            } else if (workType == workTypeDict.production) {
                if (productStep == productStepDict.automation) {
                    if (operateStatus == workStatusDict.waitExecute) {
                        this.pageTitle = "开始执行"
                    } else if (operateStatus == workStatusDict.execute) {
                        this.pageTitle = "完成确认"
                    }
                } else {
                    this.pageTitle = "完成确认"
                }
                switch (Number(productStep)) {
                    case productStepDict.feedKill:
                    case productStepDict.automation:
                        this.getSettleList()
                        break
                    default:
                        this.getProduceBatchList()
                        break
                }
                if (operateStatus == workStatusDict.execute) {
                    this.$set(this.formData, 'settlerBatchCode', settlerBatchCode)
                }
                this.renderFormList = getProductRenderFormConfig(productStep, operateStatus)
            } else if (workType == workTypeDict.warehousing) {
                this.pageTitle = "库存工单（入库）"
                this.$set(this.formData, 'estimateCount', estimateCount)
                this.$set(this.formData, 'wareId', wareId)
                if (operateStatus === workStatusDict.execute) {
                    this.formExecuteData = {
                        estimateCount: estimateCount,
                        actualCountPre: actualCount,
                        warehousingCodeTimePre: warehousingCodeTime,
                        warehousingCodePre: warehousingCode,
                        uploadFilePre: imageUrl ? imageUrl.split(',') : []
                    }
                    this.warehousingExecuteRenderFormList = warehousingExecuteRenderFormList
                    this.$set(this.formData, 'estimateCountPre', estimateCount - actualCount)
                }
                const renderFormList = renderFormConfig[workType][this.operateStatus]
                renderFormList[2].minDate = new Date(createdTime)
                this.renderFormList = renderFormList
            } else {
                this.pageTitle = "完成确认"
                this.renderFormList = renderFormConfig[workType]
            }
            if (workType == workTypeDict.productPackaging) {
                this.getProduceBatchList()
                if (operateStatus == workStatusDict.waitExecute) {
                    this.pageTitle = "包装确认"
                } else if (operateStatus == workStatusDict.execute) {
                    this.$set(this.formData, 'productBatchCode', productBatchCode)
                    this.pageTitle = "继续包装"
                }
            }
            if (workType == workTypeDict.qualityTesting) {
                this.getProduceBatchList()
            }
        })




        //const { wt, ft, id, st, pbc, ps } = this.$route.query


    },

    mounted() {

    },

    methods: {
        /**
            获取生产批次码数据
            @param 
            @return
        */
        validateCode() {
            const id = this.id
            return function (qrcode) {
                return new Promise((resolve, reject) => {
                    this.$axios({
                        url: '/workOrder/checkPagecode',
                        method: 'GET',
                        data: {
                            idsCode: qrcode,
                            workId: id
                        }
                    }).then(() => {
                        resolve()
                    }).catch(() => { reject() })
                })
            }
        },

        // /**
        //     初始化入库工单
        //     @param { String } id 工单id
        //     @return
        // */
        // initWarehousing(id) {
        //     this.loadingText = '正在获取工单数据...'
        //     this.loading = true
        //     this.$axios({
        //         url: '/workOrder/queryByExcutor',
        //         method: 'POST',
        //         data: { id: id, type: this.wt }
        //     }).then((res) => {
        //         const { estimateCount, wareId, operateStatus, actualCount, warehousingCodeTime, createdTime, warehousingCode, imageUrl } = res.rows[0]
        //         this.$set(this.formData, 'estimateCount', estimateCount)
        //         this.$set(this.formData, 'wareId', wareId)
        //         if (operateStatus === workStatusDict.execute) {
        //             this.formExecuteData = {
        //                 estimateCount: estimateCount,
        //                 actualCountPre: actualCount,
        //                 warehousingCodeTimePre: warehousingCodeTime,
        //                 warehousingCodePre: warehousingCode,
        //                 uploadFilePre: imageUrl ? imageUrl.split(',') : []
        //             }
        //             this.warehousingExecuteRenderFormList = warehousingExecuteRenderFormList
        //             this.$set(this.formData, 'estimateCountPre', estimateCount - actualCount)
        //         }
        //         const renderFormList = renderFormConfig[this.workType][this.operateStatus]
        //         renderFormList[2].minDate = new Date(createdTime)
        //         this.renderFormList = renderFormList
        //         this.loadingText = ''
        //         this.loading = false
        //     })
        // },

        /**
            处理点击suffixIcon事件
            @param { Object } data 子组件传输数据
            @return
        */
        handleClickSuffixIcon(data) {
            const { item: { key } } = data
            if (key === "warehousingCode") {
                if (this.$isReadyWeChat) {
                    getWeChatQrcode().then(async (result) => {
                        this.$set(this.formData, key, result)
                    })
                } else {
                    initWeChat().then(() => {
                        getWeChatQrcode().then(async (result) => {
                            this.$set(this.formData, key, result)
                        })
                    })
                }
            }
        },
        /**
            获取生产批次码数据
            @param 
            @return
        */
        getProduceBatchList() {
            this.$axios({
                url: '/teaSettle/produceList',
                method: 'GET',
                data: {}
            }).then((res) => {
                if (Array.isArray(res.data) && res.data.length) {
                    const renderFormItem = { ...this.renderFormList[0] }
                    renderFormItem.options = res.data.map((item) => {
                        return {
                            text: item,
                            value: item
                        }
                    })
                    this.$set(this.renderFormList, 0, renderFormItem)
                }
            })
        },

        /**
            获取结算批次码数据
            @param 
            @return
        */
        getSettleList() {
            this.$axios({
                url: '/teaSettle/settleList',
                method: 'GET',
                data: {}
            }).then((res) => {
                if (Array.isArray(res.data) && res.data.length) {
                    this.$set(this.renderFormList[0], 'options', res.data.map((item) => {
                        return {
                            text: item,
                            value: item
                        }
                    }))
                }
            })
        },
        /**
            获取完成确认表单数据
            @param 
            @return
        */
        getFormRenderList() {
            this.$axios({
                url: '/work-order/get-order-type',
                data: {
                    enterpriseId: "10006",
                    type: this.farmingType,
                    componentType: 2,
                },
            }).then((res) => {
                if (Array.isArray(res.data.list)) {
                    this.renderFormList = res.data.list.map((item) => {
                        item.isHide = item.hidden
                        item.label = item.name
                        item.key = item.id
                        switch (item.type) {
                            case "SELECT":
                                if (item.multiple) {
                                    item.type = 'multipleSelect'
                                } else {
                                    item.type = 'select'
                                }
                                item.options = item.options.map((option) => {
                                    return {
                                        text: option.name,
                                        value: option.value
                                    }
                                })
                                break
                            case 'INPUT':
                                if (item.inputType === "FILE") {
                                    item.type = 'upload'
                                    item.multiple = true
                                    item.overlay = photographImg
                                    item.title = "立即拍照"
                                } else if (item.inputType === "TEXTAREA") {
                                    item.type = 'textarea'
                                } else {
                                    item.type = 'input'
                                }

                                break
                            default:
                                item.type = item.type.toLowerCase()
                        }
                        if (item.inputType !== 'BUTTON') {
                            item.inputType = item.valueType
                        }
                        return item

                    })
                } else {
                    this.renderFormList = []
                }

            })
        },

        /**
            点击新增按钮时触发
            @param 
            @return
        */
        handleAdd() {
            this.formDataList.push({})
            this.renderFormList.push(renderFormConfig[this.workType])
        },

        /**
            点击删除按钮时触发
            @param { Number } index 删除表单的下标
            @return
        */
        handleDelete(index) {
            if (this.renderFormList.length > 1) {
                this.formDataList.splice(index, 1)
                this.renderFormList.splice(index, 1)
            } else {
                this.$toast("至少有一项数据")
            }

        },

        /**
            点击确认完成时触发
            @param { String } type 按钮类型
            @return
        */
        handleComplatePackage(type) {
            this.$refs[`FcForm`].validateForm().then((formData) => {
                const params = { ...formData }
                if (formData.uploadFile) {
                    params.imageUrl = formData.uploadFile.join(',')
                    delete params.uploadFile
                }
                if (type === 'batch') {
                    params.operateStatus = workStatusDict.execute
                } else if (type === 'confirm') {
                    params.operateStatus = workStatusDict.complete
                    if (this.workType == workTypeDict.warehousing) {
                        const { estimateCountPre, actualCount, estimateCount } = params
                        if ((this.operateStatus == workStatusDict.waitExecute && estimateCount != actualCount) || (this.operateStatus == workStatusDict.execute && estimateCountPre != actualCount)) {
                            this.$dialog.confirm({
                                content: '实际入库数量与规定数量不符，是否确认完成？'
                            }).then(() => {
                                this.$dialog.close()
                                this.executeMultiStepFarming(params, type)
                            })
                            return
                        }
                    }
                }
                this.executeMultiStepFarming(params, type)
            })
        },

        /**
            执行多步骤工单
            @param { Object } params 执行数据
            @param { String } type 类型 分批/全部完成
            @return
        */
        executeMultiStepFarming(params, type) {
            this.loading = true
            const { id } = this
            this.$axios({
                url: executeApiConfig[this.workType],
                data: {
                    id,
                    ...params
                },
            }).then((res) => {
                this.loading = false
                if (type === 'batch') {
                    this.$toast("开始执行成功")
                } else if (type === 'confirm') {
                    this.$toast("工单完成成功")
                }
                setTimeout(() => {
                    this.$router.back()
                }, 500)
            }).catch(() => {
                this.loading = false
            })
        },

        /**
            点击确认完成时触发
            @param { String } type 按钮类型
            @return
        */
        handleComplateSP(type) {
            const { id } = this, promistList = []
            for (let i = 0; i < this.renderFormList.length; i++) {
                promistList.push(this.$refs[`FcForm${i}`][0].validateForm())
            }
            Promise.all(promistList).then((result) => {
                this.loading = true
                const secondPackageList = result.map((item) => {
                    return {
                        idisCode: item.idisCode[0],
                        idisCodeList: item.idisCodeList
                    }
                })
                this.$axios({
                    url: executeApiConfig[workTypeDict.secondaryPackaging],
                    data: {
                        id,
                        operateStatus: type === 'batch' ? workStatusDict.execute : type === 'confirm' ? workStatusDict.complete : '',
                        secondPackageList: secondPackageList
                    },
                }).then((res) => {
                    this.loading = false
                    if (type === 'batch') {
                        this.$toast("开始执行成功")
                    } else if (type === 'confirm') {
                        this.$toast("工单完成成功")
                    }
                    setTimeout(() => {
                        this.$router.back()
                    }, 500)
                }).catch(() => {
                    this.loading = false
                })
            })
        },

        /**
            点击确认完成时触发
            @param { Object } formData 表单数据
            @return
        */
        handleComplate(formData) {
            this.loading = true
            const { workType, id, farmingType, productStep } = this, params = { ...formData }
            if (this.operateStatus == workStatusDict.waitExecute) {
                params.operateStatus = workStatusDict.execute
            } else if (this.operateStatus == workStatusDict.execute) {
                params.operateStatus = workStatusDict.complete
            }
            if (formData.uploadFile) {
                params.imageUrl = formData.uploadFile.join(',')
                delete params.uploadFile
            }
            if (workType == workTypeDict.qualityTesting) {
                if (formData.qualityReport) {
                    params.qualityReport = formData.qualityReport.join(',')
                }
                params.operateStatus = workStatusDict.complete
            } else if (workType == workTypeDict.production) {
                switch (Number(productStep)) {
                    case productStepDict.automation:
                        break
                    default:
                        params.operateStatus = workStatusDict.complete
                        break
                }
            }
            this.$axios({
                url: executeApiConfig[workType],
                data: {
                    id,
                    workType: workType,
                    farmingType: farmingType,
                    ...params
                },
            }).then((res) => {
                this.loading = false
                if (params.operateStatus == workStatusDict.execute) {
                    this.$toast("开始执行成功")
                } else if (params.operateStatus == workStatusDict.complete) {
                    this.$toast("工单完成成功")
                }
                if (workType == workTypeDict.pick) {
                    this.$router.replace({
                        path: '/staff/taeGreenCode',
                        query: {
                            code: res.data.pickBatchCode
                        }
                    })
                } else {
                    setTimeout(() => {
                        this.$router.back()
                    }, 500)
                }

            }).catch(() => {
                this.loading = false
            })

        }
    },

}

</script>

<style scoped lang='scss'>
.complateConfirm {
    overflow-y: auto;
    padding-top: 0.2rem;
    height: 100%;
    background-color: #f7f8fa;
    /deep/ .scan-icon {
        width: 0.26rem !important;
        height: 0.24rem !important;
    }
}
.complateConfirm-bottom {
    padding-bottom: 3.6rem;
}
.complateConfirm-content {
    background-color: #fff;
}

.complateConfirm-secondaryPackaging {
    padding-bottom: 4.2rem;
}

.complateConfirm-secondaryPackaging-title {
    height: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.26rem;
    border-bottom: 1px solid #eeeeee;
    > img {
        width: 0.4rem;
        height: 0.4rem;
    }
}

.complateConfirm-secondaryPackaging-add {
    position: fixed;
    right: 0.22rem;
    bottom: 4rem;
    width: 1.18rem;
    height: 1.2rem;
}

.complateConfirm-secondaryPackaging-item {
    margin-bottom: 0.2rem;
}

.complateConfirm-secondaryPackaging-bottom {
    z-index: 2;
    position: fixed;
    left: 0.32rem;
    right: 0.32rem;
    bottom: 1rem;
    > div {
        height: 0.96rem;
        text-align: center;
        line-height: 0.96rem;
        border-radius: 0.04rem;
    }
    > div:first-child {
        margin-bottom: 0.32rem;
        border: 1px solid #a0ceff;
    }
}
</style>