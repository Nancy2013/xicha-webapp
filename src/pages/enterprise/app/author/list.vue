<template>
    <FcPage title="授权申请" isBorder showLeft>
        <div class="authorList" ref="authorList">
            <div class="authorList-title">
                <FCstatistics :renderList="statisticsRenderList" :data="totalData"></FCstatistics>
                <FcMonthPicker ref="FcMonthPicker" @confirm="handleMonthConfirm"></FcMonthPicker>
                <FcAgriculturalTab v-model="tabIndex" :renderList="renderList" @change="handleChangeTab" :totalData="totalData"></FcAgriculturalTab>
            </div>
            <div class="authorList-content" ref="authorList-content">
                <FcList :page="currPage" :limit="limit" :count="count" :loaded="loaded" @scrolltolower="handleScrolltolower">
                    <div class="authorList-list">
                        <FcAuthorItem v-for="(item, key) in authorList" :key="key" :data="item" @delete="handleDelete(item, key, $event)" @edit="handleEdit"></FcAuthorItem>
                    </div>
                </FcList>

            </div>
            <div class="authorList-apply" @click="handleClickApply">
                <img src="@/assets/enterprise/app/teaConfirmList/apply.png" alt="">
            </div>
        </div>
    </FcPage>
</template>

<script>
import FCstatistics from '@/components/statistics/statistics.vue'
import FcAgriculturalTab from '@/components/agriculturalTab/agriculturalTab.vue'
import FcMonthPicker from '@/components/monthPicker/monthPicker.vue'
import { getStatisticsRenderList, getTeaConfirmTabsRenderList } from "./config"
import { enterpriseUserDataStorage } from '@/utils/storage'
import FcAuthorItem from '@/components/authorItem/authorItem.vue'
import FcList from '@/components/list/list.vue'

export default {
    name: 'authorList',

    components: {
        FcList,
        FcAuthorItem,
        FCstatistics,
        FcMonthPicker,
        FcAgriculturalTab
    },

    data() {
		return {
			userData: enterpriseUserDataStorage.getUserData(),
            tabIndex: -1,
            totalData: {},
            statisticsRenderList: getStatisticsRenderList(),
            renderList: getTeaConfirmTabsRenderList(),
			authorList: [],
            limit: 15,
            page: 1,
            currPage: 0,
            count: 0,
            loaded: false
        }
    },

	mounted() {
        this.getAuthorList()
        this.getAuthorTotalData()
	},

	methods: {
		/**
            获取授权申请统计数据
            @param 
            @return
        */
        getAuthorTotalData() {
            const dateList = this.$refs.FcMonthPicker.getDateInterval()
			this.$axios({
                url: '/tea/auth/listCodeApplication',
                data: {
                    tenantId: this.userData.tenantId,
                    startTime: dateList[0],
				    endTime: dateList[1]
                }
			}).then((res) => {
				this.totalData = res.data
			})
		},
        /**
            获取授权申请列表
            @param 
            @return
        */
        getAuthorList(callback) {
			this.loaded = false
			const dateList = this.$refs.FcMonthPicker.getDateInterval()
            const params = {
                limit: this.limit,
                page: this.page,
                tenantName: this.userData.tenantName,
				startTime: dateList[0],
				endTime: dateList[1]
                
            }
            if (this.tabIndex != -1) {
                params.status = this.tabIndex
            }
            this.$axios({
                url: '/tea/auth/pageCodeApplication',
                data: {
                    ...params
                }
            }).then((res) => {
                if (Array.isArray(res.data)) {
                    if (this.page == 1) {
                        this.authorList = res.data
                    } else {
                        this.authorList = this.authorList.concat(res.data)
                    }
                } else {
                    if (this.page == 1) {
                        this.authorList = []
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
                    this.authorList = []
                }
                callback && typeof callback === 'function' && callback()
            })
        },

        /**
            处理容器滚动事件
            @param 
            @return
        */
        handleScrolltolower(callback) {
            this.page++
            this.getAuthorList(callback)
        },

        /**
            处理选择月份事件
            @param { String } month YYYY-MM的月份数据
            @return
        */
		handleMonthConfirm(month) {
			this.page = 1
            this.getAuthorList()
            this.getAuthorTotalData()
        },

        /**
            处理点击编辑事件
            @param { Object } item 工单项
            @return
        */
		handleEdit(item) {
			this.$router.push({
				path: '/enterprise/author/add',
				query: {
					id: item.id
				}
			})
        },

        /**
            处理点击删除时触发
            @param { Object } item 授权数据项
            @param { Number } key 授权数据项下标
            @param { Event } objecct 子组件传递的事件参数
            @return
        */
        handleDelete(item, key, { callback }) {
            this.$axios({
                url: `/tea/auth/delApplication/${item.id}`,
                method: 'GET',
                data: {}
            }).then((res) => {
                this.$toast("删除成功")
                this.authorList.splice(key, 1)
                callback()
            })
        },

        /**
            处理点击申请页面
            @param 
            @return
        */
        handleClickApply() {
            this.$router.push({ path: '/enterprise/author/add' })
        },

        /**
            处理顶部tabs改变事件
            @param 
            @return
        */
        handleChangeTab() {
            this.page = 1
            this.getAuthorList()
            this.getAuthorTotalData()
        }
    },

}

</script>

<style scoped lang='scss'>
.authorList {
    min-height: 100%;
    background-color: #f5f5f5;
    .agricultural-tabs {
        height: 2.3rem;
        border-top: none;
    }
    /deep/ .monthPicker .monthPicker-title {
        background-color: #f5f5f5;
    }
}

.authorList-content {
    position: absolute;
    top: 5.56rem;
    left: 0;
    right: 0;
    bottom: 0;
}
.authorList-apply {
    z-index: 9;
    position: fixed;
    right: 0.3rem;
    bottom: 0.6rem;
    > img {
        width: 1.04rem;
        height: 1.04rem;
    }
}
</style>