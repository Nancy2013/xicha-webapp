<template>
    <div :class="`fcTabs ${isFilter ? 'fcTabs-filter-content' : ''}`">
        <Tabs ref="fcTabs" :swipe-threshold="swipeThreshold" title-active-color="#3D71F6" v-model="activeTabValue" @change="handleTabChange">
            <Tab v-for="(tabItem, tabKey) in options" :key="tabKey" :name="tabItem.value" :title="tabItem.label">
                <template #title>
                    <div class="fcTab-title">
                        <span>{{ tabItem.label }}</span>
                        <span v-if="!isEmpty(nums[tabItem.value])">({{ nums[tabItem.value] }})</span>
                    </div>
                </template>
            </Tab>
        </Tabs>
        <div class="fcTabs-overlay" v-if="isFilter">
        </div>
        <div v-if="isFilter" class="fcTabs-filter" @click="isShow = true">
            <img src="@/components/images/tabs/tabs-filter.png" alt="">
        </div>

        <Popup v-model="isShow" position="right" style="height: 100%">
            <div class="fcFilter">
                <div class="fcFilter-item" v-if="!hideFilterStatus">
                    <div class="fcFilter-title">工作状态</div>
                    <FcRadio isCancel v-model="activeWorkStatusValue" :options="workStatusOptions"></FcRadio>
                </div>
                <!-- <div class="fcFilter-item">
                    <div class="fcFilter-title">工单类型</div>
                    <FcRadio v-model="activeWorkOrderValue" :options="workOrderOptions"></FcRadio>
                </div> -->
                <div class="fcFilter-item" v-if="!hideFilterDate">
                    <div class="fcFilter-title">完成时间</div>
                    <FcRangPicker v-model="dates" @selectStartDate="isShowStartDatePicker = true" @selectEndDate="isShowEndDatePicker = true" @close="handleRangPickerClose"></FcRangPicker>
                </div>

                <div class="fcFilter-bottom">
                    <div class="fcFilter-cancel" @click="handleCancel">取消</div>
                    <div class="fcFilter-confirm bgColor white" @click="handleConfirm">确认</div>
                </div>
            </div>
        </Popup>

        <Popup v-model="isShowStartDatePicker" position="bottom">
            <DatetimePicker v-model="pickerDates[0]" type="date" :title="`请选择开始时间`" @cancel="isShowStartDatePicker = false" @confirm="handleConfirmDatePicker($event, 'startDate')" :minDate="startMinDate" :maxDate="startMaxDate"></DatetimePicker>
        </Popup>

        <Popup v-model="isShowEndDatePicker" position="bottom">
            <DatetimePicker v-model="pickerDates[1]" type="date" :title="`请选择结束时间`" @cancel="isShowEndDatePicker = false" @confirm="handleConfirmDatePicker($event, 'endDate')" :minDate="endMinDate" :maxDate="endMaxDate"></DatetimePicker>
        </Popup>
    </div>
</template>

<script>
import { Tabs, Tab, Popup, DatetimePicker } from 'vant'
import FcRadio from '../radio/radio.vue'
import dayjs from 'dayjs'
import FcRangPicker from '../rangePicker/rangePicker.vue'
import { isEmpty } from '@/utils/common'
import { workStatusOptions, workOrderOptions } from '@/utils/config'
export default {
    name: 'fcTabs',
    components: {
        Tabs,
        Tab,
        Popup,
        FcRadio,
        FcRangPicker,
        DatetimePicker
    },
    props: {
        options: {
            type: Array,
            default: () => {
                return []
            }
        },
        value: {
            type: Number | String,
            default: ""
        },
        isFilter: {
            type: Boolean,
            default: false
        },
        hideFilterStatus: {
            type: Boolean,
            default: false
        },
        hideFilterDate: {
            type: Boolean,
            default: false
        },
        nums: {
            type: Object,
            default: () => {
                return {}
            }
        },
        swipeThreshold: {
            type: Number | String,
            default: 1
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isShow: false,
            isShowStartDatePicker: false,
            isShowEndDatePicker: false,
            workStatusOptions,
            workOrderOptions,
            activeTabValue: "",
            activeWorkStatusValue: '',
            dates: [],
            pickerDates: [],
            startMinDate: new Date('2023/01/01'),
            startMaxDate: new Date(),
            endMinDate: new Date('2023/01/01'),
            endMaxDate: new Date(),
            isEmpty: isEmpty
        }
    },

    mounted() {
        this.activeTabValue = this.value
    },

    methods: {
        /**
            处理tab改变事件
            @param {  }
            @return
        */
        handleTabChange(value) {
            this.$emit('change', value)
        },

        /**
            重绘tabs
            @param 
            @return
        */
        tabsResize() {
            this.$refs.fcTabs.resize()
        },

        /**
            处理时间选择器确定事件
            @param { Date } date 选中的时间
            @param { String } type 类型(开始时间或结束时间)
            @return
        */
        handleConfirmDatePicker(date, type) {
            if (type === 'startDate') {
                this.$set(this.dates, 0, date)
                this.endMinDate = new Date(date)
                this.isShowStartDatePicker = false
            } else if (type === 'endDate') {
                this.$set(this.dates, 1, date)
                this.startMaxDate = new Date(date)
                this.isShowEndDatePicker = false
            }
        },

        /**
            处理选择器点击关闭按钮事件
            @param { String } type 类型(开始时间或结束时间)
            @return
        */
        handleRangPickerClose(type) {
            if (type === 'startDate') {
                this.$set(this.dates, 0, null)
                this.endMinDate = new Date('2023/01/01')
            } else if (type === 'endDate') {
                this.$set(this.dates, 1, null)
                this.startMaxDate = new Date()
            }
        },

        /**
            处理点击取消事件
            @param
            @return
        */
        handleCancel() {
            this.isShow = false
        },

        /**
            处理点击确认事件
            @param
            @return
        */
        handleConfirm() {
            const searchData = {
                workStatus: this.activeWorkStatusValue,
            }
            if (this.dates[0]) {
                searchData.startDate = dayjs(this.dates[0]).format('YYYY-MM-DD')
            }
            if (this.dates[1]) {
                searchData.endDate = dayjs(this.dates[1]).format('YYYY-MM-DD')
            }
            this.isShow = false
            this.$emit('confirm', searchData)
        }
    },
    watch: {
        value(newValue) {
            this.activeWorkOrderValue = newValue
        }
    }

}

</script>

<style scoped lang='scss'>
.fcTabs {
    position: relative;
    /deep/ .van-tabs--line {
        .van-tabs__wrap {
            height: 1.08rem;
        }
        .van-tabs__line {
            width: 1.2rem;
            height: 0.04rem;
            background-color: #3d71f6;
        }
    }
    .fcFilter {
        position: relative;
        width: 6.6rem;
        padding: 0.8rem 0 0;
        height: 100%;
        .fcFilter-item {
            padding: 0.4rem 0.32rem 0.32rem;
            border-bottom: 1px solid #eeeeee;
        }
        .fcFilter-title {
            line-height: 0.44rem;
            color: #333333;
        }
        .fcFilter-bottom {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 0.94rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            div {
                width: 3.2rem;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 0.04rem;
            }
            .fcFilter-cancel {
                border: 1px solid #a0ceff;
            }
        }
    }
}

.fcTabs-filter-content {
    /deep/ .van-tabs--line {
        .van-tabs__wrap {
            padding-right: 1.3rem;
        }
    }
}
.fcTab-title {
    font-size: 0.32rem;
}
.fcTabs-content {
    position: relative;
    margin: 0 0.28rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    .fcTabs-list {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 0.32rem 0;
        height: 100%;
        .fcTabs-item {
            padding: 0 0.28rem;
            flex-shrink: 0;
            > span {
                line-height: 0.44rem;
                color: #333333;
            }
        }
        .fcTabs-item:first-child {
            padding-left: 0;
        }

        .fcTabs-item:last-child {
            padding-right: 0;
        }
    }
    .fcTabs-slide {
        z-index: 3;
        position: absolute;
        left: 0rem;
        bottom: 0.04rem;
        width: 1.2rem;
        height: 0.04rem;
        transition: all 0.15s;
    }
}

.fcTabs-overlay {
    z-index: 2;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 1.88rem;
    height: 0.94rem;
    background-image: url(~@/components/images/tabs/tabs-overlay.png);
    background-size: 100% 100%;
    pointer-events: none;
}
.fcTabs-filter {
    z-index: 3;
    position: absolute;
    right: 0.18rem;
    bottom: 0.26rem;
    width: 0.58rem;
    height: 0.52rem;
    padding: 0.1rem;
    > img {
        width: 100%;
        height: 100%;
    }
}
.fcTabs-content::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
</style>