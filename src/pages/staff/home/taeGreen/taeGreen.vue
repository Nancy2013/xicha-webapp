<template>
    <FcPage title="茶青结算" isBorder>
        <div class="taeGreen" ref="taeGreen" @scroll="handleScroll">
            <div class="taeGreen-title">
                <FcMonthPicker @confirm="handleMonthConfirm"></FcMonthPicker>
            </div>
            <div class="taeGreen-content" ref="taeGreen-content">
                <div class="taeGreen-statistics">
                    <div class="taeGreen-statistics-item">
                        <div class="taeGreen-statistics-item-label white">收购重量</div>
                        <div class="taeGreen-statistics-item-value white">{{ totalData.weight ? totalData.weight : 0 }} kg</div>
                        <div class="taeGreen-statistics-item-icon">
                            <img src="@/components/images/taeGreenItem/weightIcon.png" />
                        </div>
                    </div>
                    <div class="taeGreen-statistics-item">
                        <div class="taeGreen-statistics-item-label white">收购单数</div>
                        <div class="taeGreen-statistics-item-value white">{{ totalData.count ? totalData.count : 0 }}</div>
                        <div class="taeGreen-statistics-item-icon">
                            <img src="@/components/images/taeGreenItem/workOrderIcon.png" />
                        </div>
                    </div>
                </div>
                <div class="taeGreen-list">
                    <div v-for="(item, key) in settlementList" :key="key">
                        <FcTaeGreenItem :data="item"></FcTaeGreenItem>
                    </div>
                    <FcEmpty v-if="!settlementList.length && loaded"></FcEmpty>
                    <div class="taeGreen-all" v-if="isAll">已加载全部</div>
                </div>
            </div>
        </div>
    </FcPage>
</template>

<script>
import FcMonthPicker from '@/components/monthPicker/monthPicker.vue'
import FcTaeGreenItem from '@/components/taeGreenItem/taeGreenItem.vue'
import FcLoading from '@/components/loading/loading.vue'
import { staffUserDatatorage } from '@/utils/storage'
import { throttleFnc } from '@/utils/common'
import FcEmpty from '@/components/empty/empty.vue'
import dayjs from 'dayjs'
export default {
    name: 'taeGreen',

    components: {
		FcEmpty,
		FcLoading,
        FcMonthPicker,
        FcTaeGreenItem
    },

    data() {
        return {
            userData: staffUserDatatorage.getUserData(),
            settlementList: [],
            page: 1,
            currPage: 0,
            limit: 15,
            count: 0,
            roleId: '',
            userId: '',
            totalData: {},
            loaded: false,
            month: dayjs(new Date()).format("YYYY-MM")
        }
    },

    created() {
        this.roleId = localStorage.getItem('roleId')
        this.userId = JSON.parse(localStorage.getItem('userData')).userId
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
                url: '/teaSettle/getTotalByUserId',
                data: {
                    month: `${this.month}-01`,
                    settlerId: this.roleId == 3 ? this.userId : undefined,
                    executorId: this.roleId == 11 ? this.userId : undefined
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
            this.getTeaDealData()
            this.getTeaDealTotalData()
        },

        /**
            查询茶青结算工单信息
            @param 
            @return
        */
        getTeaDealData(callback) {
            this.loaded = false
            this.$axios({
                url: '/teaSettle/querySettleList',
                data: {
                    pageNum: this.page,
                    pageSize: this.limit,
                    settlerId: this.roleId == 3 ? this.userId : undefined, // (角色: 个人)
                    executorId: this.roleId == 11 ? this.userId : undefined, // (角色: 企业)
                    month: `${this.month}-01`
                },
                type: 'post'
            }).then((res) => {
                console.log('res', res)
                if (Array.isArray(res.rows)) {
					if (this.page == 1) {
                        this.settlementList = res.rows
                    } else {
                        this.settlementList = this.settlementList.concat(res.rows)
                    }
                } else {
                    if (this.page == 1) {
                        this.settlementList = []
                    }
                }
                this.currPage = this.page
                this.loaded = true
                this.count = res.count || 0
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
    padding-top: 1rem;
    height: 100%;
    background-color: #f5f5f5;
}

.taeGreen-title {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1rem;
    padding: 0.16rem 0.32rem;
    background-color: #fff;
}

.taeGreen-content {
    //padding: 0.2rem 0.3rem 0.3rem;
}

.taeGreen-statistics {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 2rem;
    padding: 0.18rem 0.32rem 0.22rem;
    border-top: 1px solid #E7E7E7;
    background-color: #fff;
    .taeGreen-statistics-item {
        position: relative;
        padding: 0.34rem 0 0.38rem 0.3rem;
        padding-bottom: 0.38rem;
        width: 3.32rem;
        border-radius: 0.04rem;
        background: #428DFD;
        .taeGreen-statistics-item-value {
            margin-top: 0.04rem;
            font-size: 0.3rem;
            line-height: 0.42rem;
        }
        .taeGreen-statistics-item-label {
            font-size: 0.3rem;
            line-height: 0.42rem;
        }
        .taeGreen-statistics-item-icon {
            position: absolute;
            top: 0;
            right: 0;
            > img {
                width: 1.6rem;
                padding: 0.2rem;
            }
        }
    }
    .taeGreen-statistics-item:nth-child(2) {
        border-radius: 0.04rem;
        background: linear-gradient(90deg, #3E68F2 0%, #5C82F5 100%);
        .taeGreen-statistics-item-value {
            // color: #a9ae44;
        }
    }
}
.taeGreen-all {
	margin-top: 0.3rem;
    font-size: 0.26rem;
    text-align: center;
    color: #999;
}
</style>