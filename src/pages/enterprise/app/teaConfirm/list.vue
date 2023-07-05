<template>
    <FcPage title="茶园管理" isBorder showLeft>
        <div class="teaConfirm" ref="teaConfirm">
            <div class="teaConfirm-title">
                <div class="teaConfirm-title-item" v-for="(renderItem, renderKey) in statisticsRenderList" :style="`background: ${renderItem.background}`" :key="renderKey">
                    <div>{{ renderItem.label }}</div>
                    <div>{{ totalData[renderItem.key] }}<span>{{ renderItem.unit }}</span>
                    </div>
                    <img :src="renderItem.img" alt="">
                </div>
            </div>
            <div>
                <FcTabs :swipeThreshold="4" :options="tabOptions" v-model="activeTab" :nums="tabNums" @change="handleTabChange"></FcTabs>
            </div>

            <div class="teaConfirm-content" ref="teaConfirm-content">
                <FcList :page="currPage" :limit="limit" :count="count" :loaded="loaded" @scrolltolower="handleScrolltolower">
                    <div class="teaConfirm-list">
                        <teaConfirmItem v-for="(item, key) in list" :key="key" :data="item" @delete="handleDelete(item, key)" @edit="handleEdit(item)" @apply="handleApply(item, key)" @view="handleView(item)"></teaConfirmItem>
                    </div>
                </FcList>
            </div>
            <div class="teaConfirm-apply" @click="handleClickApply">
                <img src="@/assets/common/add.png" alt="">
            </div>
        </div>
    </FcPage>
</template>

<script>
import { getStatisticsRenderList, getTeaConfirmTabsRenderList, tabOptions } from "./config"
import FCstatistics from '@/components/statistics/statistics.vue'
import { teaConfirmStatusDict } from '@/utils/dict'
import FcAgriculturalTab from '@/components/agriculturalTab/agriculturalTab.vue'
import teaConfirmItem from '@/components/teaConfirmItem/teaConfirmItem.vue'
import FcList from '@/components/list/list.vue'
import FcTabs from '@/components/tabs/tabs.vue'
import { enterpriseUserDataStorage } from '@/utils/storage'
import { isEmpty } from '@/utils/common'
import FcButton from '@/components/button/button.vue'
export default {
    name: 'teaConfirm',
    components: {
        FcTabs,
        FcList,
        FcButton,
        FCstatistics,
        FcAgriculturalTab,
        teaConfirmItem
    },

    data() {
        return {
            statisticsRenderList: getStatisticsRenderList(),
            renderList: getTeaConfirmTabsRenderList(),
            userData: enterpriseUserDataStorage.getUserData(),
            tabOptions: tabOptions,
            totalData: {},
            list: [],
            activeTab: "",
            tabNums: {},
            limit: 15,
            page: 1,
            currPage: 0,
            count: 0,
            loaded: false
        }
    },
    created() {
        this.getTeaConfirmTotalData()
        this.getTeaConfirmList()
    },

    mounted() { },

    methods: {
        /**
            获取茶园确权统计数据
            @param 
            @return
        */
        getTeaConfirmTotalData() {
            this.$axios({
                url: '/authorized/teaGardenSum',
                data: {}
            }).then((res) => {
                const data = res.data.data
                this.totalData = data
                this.tabNums = {
                    "": data.total,
                    "1": data.waitingapporve,
                    "2": data.authorized,
                    "3": data.disallow
                }
            })
        },
        /**
            获取茶园确权列表
            @param 
            @return
        */
        getTeaConfirmList(callback) {
            this.loaded = false
            const params = {
                pageSize: this.limit,
                pageNum: this.page,
                authorizedStatus: this.activeTab
            }
            this.$axios({
                url: '/authorized/page-query',
                data: {
                    ...params
                }
            }).then((res) => {
                if (Array.isArray(res.data.rows)) {
                    if (this.page == 1) {
                        this.list = res.data.rows
                    } else {
                        this.list = this.list.concat(res.data.rows)
                    }
                } else {
                    if (this.page == 1) {
                        this.list = []
                    }
                }
                this.currPage = this.page
                this.loaded = true
                this.count = res.data.total
                callback && typeof callback === 'function' && callback()
            }).catch(() => {
                this.loaded = true
                this.count = 0
                if (this.page == 1) {
                    this.list = []
                }
                callback && typeof callback === 'function' && callback()
            })
        },

        /**
            处理点击删除时触发
            @param { Object } item 确权项
            @param { Number } key 确权项的下标
            @param { Event } objecct 子组件传递的事件参数
            @return
        */
        handleDelete(item, key) {
            this.$axios({
                url: `/authorized/delById/${item.id}`,
                method: 'POST',
            }).then((res) => {
                this.$toast("删除成功")
                this.list.splice(key, 1)
            })
        },

        /**
            处理tab改变事件
            @param 
            @return
        */
        handleTabChange() {
            this.page = 1
            this.getTeaConfirmList()
        },

        /**
            处理点击申请页面
            @param 
            @return
        */
        handleClickApply() {
            this.$router.push({ path: '/enterprise/teaConfirm/add' })
        },

        /**
            处理点击编辑事件
            @param { Object } item 确权项
            @return
        */
        handleEdit(item) {
            this.$router.push({
                path: '/enterprise/teaConfirm/add',
                query: {
                    id: item.id
                }
            })
        },

        /**
            处理点击申请确权事件
            @param { Object } item 确权项
            @param { Number } key 下标
            @return
        */
        handleApply(item, key) {
            this.$axios({
                url: `/authorized/submitById/${item.id}`,
                method: 'POST',
            }).then((res) => {
                item.authorizedStatus = teaConfirmStatusDict.wait
                this.$set(this.list, key, item)
                this.$toast("操作成功")
            })
        },

        /**
            处理点击查看按钮事件
            @param { Object } item 确权项
            @return
        */
        handleView(item) {
            this.$router.push({
                path: '/enterprise/teaConfirm/add',
                query: {
                    id: item.id,
                    type: 'view'
                }
            })
        },

        /**
            处理容器滚动事件
            @param 
            @return
        */
        handleScrolltolower(callback) {
            this.page++
            this.getTeaConfirmList(callback)
        },
        /**
            处理顶部tabs改变事件
            @param 
            @return
        */
        handleChangeTab() {
            this.page = 1
            this.getTeaConfirmList()
        }
    },

}

</script>

<style scoped lang='scss'>
.teaConfirm {
    position: relative;
    height: 100%;
    background-color: #f7f8fa;
}
.teaConfirm-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.28rem 0.32rem;
    .teaConfirm-title-item {
        position: relative;
        width: 2.16rem;
        height: 1.92rem;
        padding: 0.26rem 0.28rem;
        border-radius: 0.16rem;
        div {
            z-index: 2;
            position: relative;
            color: #fff;
        }
        > div:nth-child(1) {
            font-size: 0.3rem;
            line-height: 0.42rem;
        }
        > div:nth-child(2) {
            font-size: 0.4rem;
            line-height: 0.56rem;
        }
        span {
            margin-left: 0.04rem;
            font-size: 0.24rem;
            line-height: 0.34rem;
        }
        img {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 1.4rem;
            height: 1.12rem;
        }
    }
}
.teaConfirm-content {
    overflow-y: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 3.8rem;
    bottom: 0;
    // padding-bottom: 1.08rem;
}
.teaConfirm-apply {
    z-index: 9;
    position: fixed;
    right: 0.22rem;
    bottom: 1.6rem;
    > img {
        width: 1.2rem;
        height: 1.2rem;
    }
}
</style>