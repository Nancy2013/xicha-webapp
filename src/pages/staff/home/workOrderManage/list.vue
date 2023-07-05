<template>
    <FcPage :title="title" class="workOrderPage">
        <div :class="`workOrderList ${workType == workTypeDict.farming ? '' : 'workOrderList-hideSearch'}`">
            <div :class="`workOrder-title whiteBg`">
                <FcSearch v-if="workType == workTypeDict.farming" type="select" v-model="farmingType" placeholder="请选择工单类型" @change="handleSearchName" :options="farmingTypeOptions"></FcSearch>
                <FcTabs ref="fcTabs" class="workOrder-tabs" :options="tabOptions" v-model="activeTab" @confirm="handleSearchConfirm" @change="handleChangeTab" :nums="tabNums"></FcTabs>
            </div>
            <div class="workOrder-content">
                <FcList :count="total" :page="pageNum" :limit="pageSize" :loaded="loaded" @scrolltolower="handleScrolltolower">
                    <workOrderItem v-for="(workItem) in workList" isHandle :key="workItem.key" :data="workItem" @handle="handleExecute"></workOrderItem>
                </FcList>
            </div>
        </div>
    </FcPage>
</template>

<script>
import FcSearch from '@/components/search/search.vue'
import FcTabs from '@/components/tabs/tabs.vue'
import FcList from '@/components/list/list.vue'
import { userDatatorage } from '@/utils/storage'
import workOrderItem from '@/components/workOrderItem/workOrderItem.vue'
import { workStatusOptions, farmingTypeOptions } from '@/utils/config'
import { workStatusDict, workTypeDict } from '@/utils/dict'
import { getLinkQuery, isEmpty } from '@/utils/common'
import { getWeChatQrcode } from '@/utils/wechat'
import { initWeChat } from '@/main'
export default {
    name: 'workOrderList',

    components: {
        workOrderItem,
        FcSearch,
        FcTabs,
        FcList
    },

    data() {
        return {
            searchData: {
                executorName: ""
            },
            workTypeDict: workTypeDict,
            title: "",
            tabOptions: [{ label: '全部', value: "" }].concat(workStatusOptions),
            activeTab: "",
            pageNum: 1,
            pageSize: 20,
            farmingTypeOptions: [{ text: '全部', value: "" }].concat(farmingTypeOptions),
            farmingType: "",
            total: 0,
            loaded: false,
            workList: [],
            workType: "",
            tabNums: {},
            userData: userDatatorage.getUserData(),
            tabsKey: Math.random()
        }
    },

    created() {
        this.workType = this.$route.query.wt || ""
        const workType = Number(this.workType)
        switch (workType) {
            case workTypeDict.farming:
                this.title = "工单管理"
                break
            case workTypeDict.productPackaging:
                this.title = "产品包装"
                break
            case workTypeDict.secondaryPackaging:
                this.title = "二次包装"
                break
            case workTypeDict.pick:
                this.title = "采摘工单"
                break
            case workTypeDict.production:
                this.title = "生产工单"
                break
            case workTypeDict.warehousing:
                this.title = "库存工单（入库）"
                break
            case workTypeDict.outbound:
                this.title = "库存工单（出库）"
                break

        }
        this.activeTab = this.$route.params.type || ""
        this.getWorkList()
        this.getWorkNum()
    },
    methods: {
        /**
         获取工单列表
         @param 
         @return
         */
        getWorkList(callback) {
            this.loaded = false
            const { farmingType } = this
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                operateStatus: this.activeTab,
                executorId: this.userData.userId
            }
            if (farmingType == -1) {
                params.type = workTypeDict.pick
            } else {
                params.type = this.workType
                params.farmingType = farmingType
            }
            this.$axios({
                url: '/workOrder/queryByExcutor',
                method: 'POST',
                data: params
            }).then((res) => {
                if (Array.isArray(res.rows)) {
                    const rows = res.rows.map((item, key) => {
                        item.key = `${item.id}${key}`
                        item.teaGardenCode = `https://xi.cn88555.com/weixin.html#/code?code=${item.teaGardenId}`
                        return item
                    })
                    if (this.pageNum === 1) {
                        this.workList = rows
                    } else {
                        this.workList = this.workList.concat(rows)
                    }
                }
                this.total = res.total
                this.loaded = true
                callback && typeof callback === 'function' && callback()
            }).catch(() => {
                this.loaded = true
                callback && typeof callback === 'function' && callback()
            })
        },

        /**
         获取工单数量
         @param 
         @return
         */
        getWorkNum() {
            const params = {
                operateStatus: this.activeTab,
                type: this.workType,
                executorId: this.userData.userId,
                farmingType: this.farmingType
            }
            this.$axios({
                url: '/workOrder/queryByTypeStatus',
                method: 'POST',
                data: params
            }).then((res) => {
                this.tabNums = Object.assign(res.data, {
                    "": res.data[5]
                })
                this.$refs.fcTabs.tabsResize()
            })
        },

        /**
         处理筛选确认事件
         @param  { Object } searchData 筛选数据
         @return
         */
        handleSearchConfirm(searchData) {
            this.pageNum = 1
            this.searchData = Object.assign(this.searchData, searchData)
            this.getWorkList()
            this.getWorkNum()
        },

        /**
         通过姓名手机号筛选
         @param  { String } value 输入框的值
         @return
         */
        handleSearchName(value) {
            this.pageNum = 1
            this.getWorkList()
            this.getWorkNum()
        },

        /**
         切换tab时触发
         @param
         @return
         */
        handleChangeTab() {
            this.pageNum = 1
            this.getWorkList()
            this.getWorkNum()
        },
        /**
         list页面触底事件
         @param
         @return
         */
        handleScrolltolower(callback) {
            this.pageNum++
            this.getWorkList(callback)
        },

        /**
         处理点击执行按钮时触发
         @param { Object } data 工单数据
         @return
         */
        handleExecute(data) {
            switch (data.operateStatus) {
                case workStatusDict.waitExecute:
                    switch (data.workType) {
                        case workTypeDict.farming:
                        case workTypeDict.pick:
                            this.handleExecuteFarming(data)
                            break
                        case workTypeDict.qualityTesting:
                        case workTypeDict.productPackaging:
                        case workTypeDict.secondaryPackaging:
                        case workTypeDict.production:
                        case workTypeDict.warehousing:
                        case workTypeDict.outbound:
                            this.handleExecuteQualityTesting(data)
                            break

                    }
                    break
                case workStatusDict.execute:
                    this.$router.push({
                        path: "/staff/complateConfirm",
                        query: {
                            id: data.id,
                        }
                    })
                    break
                case workStatusDict.complete:
                    switch (data.workType) {
                        case workTypeDict.pick:
                            this.$router.push({
                                path: '/staff/taeGreenCode',
                                query: {
                                    code: data.pickBatchCode,
                                    type: 'view'
                                }
                            })
                            break
                        case workTypeDict.secondaryPackaging:
                            this.$router.push({
                                path: "/staff/packDetail",
                                query: {
                                    id: data.id
                                }
                            })
                            break

                    }
                    break
            }
        },


        /**
         处理执行农事工单
         @param { Object } data 工单数据
         @return
         */
        handleExecuteFarming(data) {
            if (this.$isReadyWeChat) {
                getWeChatQrcode().then((result) => {
                    this.handleScanCode(result, data)
                })
            } else {
                initWeChat().then(() => {
                    getWeChatQrcode().then((result) => {
                        this.handleScanCode(result, data)
                    })
                })
            }
        },

        /**
         处理执行质量检验工单
         @param { Object } data 工单数据
         @return
         */
        handleExecuteQualityTesting(data) {
            this.$router.push({
                path: "/staff/complateConfirm",
                query: {
                    id: data.id,
                }
            })
        },

        /**
         处理扫码结果
         @param { Object } result 扫码结果
         @param { Object } workOrderData 工单数据
         @return
         */
        handleScanCode(result, workOrderData) {
            const queryData = getLinkQuery(result.resultStr)
            if (isEmpty(queryData.code)) {
                this.$toast("茶园码不正确")
                return
            }
            this.$router.push({
                path: '/staff/executeConfirm',
                query: {
                    code: queryData.code,
                    id: workOrderData.id,
                    wt: workOrderData.workType
                }
            })
        }
    },

}

</script>

<style scoped lang='scss'>
.workOrderPage {
    /deep/ .page-content {
        background-color: #f7f8fa;
    }
}
.workOrder-title {
    padding-top: 0.16rem;
}

.workOrder-tabs {
    margin-top: 0.1rem;
}

.workOrder-content {
    position: absolute;
    top: 2.22rem;
    bottom: 0;
    left: 0;
    right: 0;
}

.workOrder-add {
    position: fixed;
    right: 0.3rem;
    bottom: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    > img {
        width: 100%;
        height: 100%;
    }
}

.workOrderList-hideSearch {
    .workOrder-title {
        padding-top: 0;
    }
    .workOrder-tabs {
        margin-top: 0;
    }
    .workOrder-content {
        top: 1.26rem;
    }
}
</style>