<template>
    <FcPage title="茶青交易" isBorder showLeft :leftType="prevType ? 'home' : 'back'" @clickLeft="handlePageLeft">
        <div class="taeGreen" ref="taeGreen" @scroll="handleScroll">
            <div class="taeGreen-title">
                <FcMonthPicker @confirm="handleMonthConfirm"></FcMonthPicker>
            </div>

            <div class="taeGreen-content" ref="taeGreen-content">
                <FCstatistics :renderList="statisticsRenderList" :data="totalData"></FCstatistics>

                <div class="taeGreen-list">
                    <div v-for="(item, key) in settlementList" :key="key">
                        <FcTaeGreenItem type="enterprise" :data="item"></FcTaeGreenItem>
                    </div>
                    <FcEmpty v-if="!settlementList.length && loaded"></FcEmpty>
                    <div class="taeGreen-all" v-if="isAll">已加载全部</div>
                </div>
            </div>
        </div>
    </FcPage>
</template>

<script>
import { throttleFnc } from "@/utils/common"
import FcMonthPicker from '@/components/monthPicker/monthPicker.vue'
import FcTaeGreenItem from '@/components/taeGreenItem/taeGreenItem.vue'
import FCstatistics from '@/components/statistics/statistics.vue'
import { enterpriseTabStorage, enterpriseUserDataStorage } from '@/utils/storage'
import { getStatisticsRenderList } from './config'
import dayjs from 'dayjs'
import FcEmpty from '@/components/empty/empty.vue'
export default {
    name: 'taeGreen',

    components: {
        FCstatistics,
        FcMonthPicker,
        FcTaeGreenItem,
        FcEmpty
    },

    data() {
        return {
            userData: enterpriseUserDataStorage.getUserData(),
            statisticsRenderList: getStatisticsRenderList(),
            settlementList: [],
            page: 1,
            currPage: 0,
            limit: 15,
            count: 0,
            prevType: '',
            totalData: {},
            loaded: false,
            month: dayjs(new Date()).format("YYYY-MM")
        }
    },
    created() {
        this.prevType = this.$route.query.type
        this.getTeaDealData()
        this.getTeaDealTotalData()
    },

    computed: {
        isAll() {
            if (this.count > 0 && this.loaded && this.currPage * this.limit > this.count) {
                return true
            }
            return false
        }
    },


    methods: {
        /**
            获取茶青交易统计数据
            @param 
            @return
        */
        getTeaDealTotalData() {
            this.$axios({
                url: '/teaAction/getTotalByUserId',
                data: {
                    month: `${this.month}-01`,
                    settlerId: this.userData.userId
                }
            }).then((res) => {
                this.totalData = res.data
            })
        },
        /**
            处理选择月份事件
            @param { String } month YYYY-MM的月份数据
            @return
        */
        handleMonthConfirm(month) {
            this.page = 1
            this.month = month
            this.$refs.taeGreen.scrollTop = 0
            this.getTeaDealData()
            this.getTeaDealTotalData()
        },

        /**
            获取茶青交易结算数据
            @param 
            @return
        */
        getTeaDealData(callback) {
            this.loaded = false
            this.$axios({
                url: '/teaAction/getFarmingSettle',
                data: {
                    page: this.page,
                    limit: this.limit,
                    settlerId: this.userData.userId,
                    month: `${this.month}-01`
                }
            }).then((res) => {
                if (Array.isArray(res.data)) {
                    if (this.page == 1) {
                        this.settlementList = res.data
                    } else {
                        this.settlementList = this.settlementList.concat(res.data)
                    }
                } else {
                    if (this.page == 1) {
                        this.settlementList = []
                    }
                }
                this.currPage = this.page
                this.loaded = true
                this.count = res.count
                callback && typeof callback === 'function' && callback()
            }).catch(() => {
                this.loaded = true
                this.count = 0
                if (this.page == 1) {
                    this.settlementList = []
                }
                callback && typeof callback === 'function' && callback()
            })
        },

        /**
            点击页面顶部左侧按钮时触发
            @param 
            @return
        */
        handlePageLeft() {
            if (this.prevType) {
                enterpriseTabStorage.removeTabIndex()
                this.$router.replace('/enterprise')
            }
        },

        /**
            处理页面滚动事件
            @param 
            @return
        */
        handleScroll: throttleFnc(function (callback, event) {
            if (this.page * this.limit < this.count) {
                if (event.target.scrollTop + event.target.clientHeight > this.$refs['taeGreen-content'].clientHeight - 100) {
                    this.page++
                    this.getTeaDealData(callback)
                } else {
                    callback()
                }
            } else {
                callback()
            }


        })
    },

}

</script>

<style scoped lang='scss'>
.taeGreen {
    overflow: auto;
    padding-top: 0.88rem;
    height: 100%;
    background-color: #f5f5f5;
}

.taeGreen-title {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
}

.taeGreen-content {
    padding: 0.2rem 0.3rem 0.7rem;
}

</style>