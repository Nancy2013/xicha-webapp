<template>
    <FcPage title="工单管理" class="workOrderPage">
        <div class="workOrderList">
            <div class="workOrder-title whiteBg">
                <FcSearch v-model="searchData.executorName" placeholder="请输入员工姓名或手机号" @change="handleSearchChange"></FcSearch>
                <FcTabs class="workOrder-tabs" isFilter :options="tabOptions" v-model="activeTab" @confirm="handleSearchConfirm" @change="handleChangeTab"></FcTabs>
            </div>
            <div class="workOrder-content">
                <FcList :count="total" :page="pageNum" :limit="pageSize" :loaded="isLoad" @scrolltolower="handleScrolltolower">
                    <div>
                        <workOrderItem v-for="(workItem) in workList" :key="workItem.id" :data="workItem" @handle="handleExecute"></workOrderItem>
                    </div>
                </FcList>
            </div>
        </div>

        <div class="workOrder-add" @click="handleAdd">
            <img src="@/assets/common/add.png" alt="" />
        </div>
    </FcPage>
</template>

<script>
import FcSearch from '@/components/search/search.vue'
import FcTabs from '@/components/tabs/tabs.vue'
import FcList from '@/components/list/list.vue'
import workOrderItem from '@/components/workOrderItem/workOrderItem.vue'
import { workOrderOptions } from '@/utils/config'
import { workStatusDict, workTypeDict } from '@/utils/dict'
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
                executorName: "",
                startDate: "",
                endDate: "",
                workStatus: ""
            },
            tabOptions: workOrderOptions,
            activeTab: 1,
            pageNum: 1,
            pageSize: 20,
            total: 0,
            isLoad: false,
            workList: []

        }
    },

    mounted() { },

    created() {
        this.getWorkList()
    },
    methods: {
        /**
         获取工单列表
         @param 
         @return
         */
        getWorkList(callback) {
            this.isLoad = false
            const { executorName, startDate, endDate, workStatus } = this.searchData
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                type: this.activeTab,
                executorName: executorName,
                operateStatus: workStatus
            }
            if (startDate) {
                params.beginTime = `${startDate} 00:00:00`
            }
            if (endDate) {
                params.endTime = `${endDate} 23:59:59`
            }
            this.$axios({
                url: '/workOrder/queryByAssign',
                method: 'POST',
                data: params
            }).then((res) => {
                if (Array.isArray(res.rows)) {
                    const rows = res.rows.map((item) => {
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
                this.isLoad = true
                callback && typeof callback === 'function' && callback()
            }).catch(() => {
                this.isLoad = true
                callback && typeof callback === 'function' && callback()
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
        },

        /**
         点击新增按钮触发
         @param 
         @return
         */
        handleAdd() {
            this.$router.push(`/enterprise/workOrderManage/add/${this.activeTab}`)
        },
        /**
         处理点击执行按钮时触发
        @param { Object } data 工单数据
        @return
        */
        handleExecute(data) {
            switch (data.operateStatus) {
                case workStatusDict.complete:
                    switch (data.workType) {
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
         切换tab时触发
         @param
         @return
         */
        handleChangeTab() {
            this.pageNum = 1
            this.getWorkList()
        },

        /**
         处理搜索改变事件
         @param
         @return
         */
        handleSearchChange() {
            this.pageNum = 1
            this.getWorkList()
        },

        /**
         list页面触底事件
         @param
         @return
         */
        handleScrolltolower(callback) {
            this.pageNum++
            this.getWorkList(callback)
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
</style>