<template>
    <div class="monthPicker">
        <div class="monthPicker-title" @click="showMonthPicker">
            <img class="monthPicker-title-icon" src="@/components/images/workOrderItem/wait.png" alt="">
            <div class="monthPicker-title-month">{{ selectMonthText }}</div>
            <img :class="`monthPicker-title-down ${isShow ? 'monthPicker-title-up' : ''}`" src="@/components/images/monthPicker/down.png" alt="">
        </div>

        <Popup v-model="isShow" position="bottom">
            <DatetimePicker v-model="nextDate" type="year-month" title="选择年月" :min-date="minDate" :max-date="maxDate" @cancel="handleCancel" @confirm="handleConfirm" :formatter="formatter" />
        </Popup>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { Popup, DatetimePicker } from 'vant'
export default {
    name: 'monthPicker',

    components: {
        Popup,
        DatetimePicker
    },
    computed: {
        selectMonthText() {
            const month = dayjs(this.date).month() + 1, dayNum = dayjs(this.date).daysInMonth()
            if (dayjs().format("YYYY/MM") === dayjs(this.date).format("YYYY/MM")) {
                const day = new Date().getDate()
                return `本月(${month}月1日~${month}月${day}日)`
            } else {
                return `${dayjs(this.date).format("YYYY年MM月")}(${month}月1日~${month}月${dayNum}日)`
            }
        }
    },

    data() {
        return {
            isShow: false,
            minDate: new Date("2023/01/01"),
            nextDate: new Date(),
            date: new Date(),
            maxDate: new Date(),
        }
    },

    mounted() { },

    methods: {
        /**
            格式化年月数据的方法
            @param 
            @return {String} 格式化后的年月数据
        */
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        },
        /**
            显示年月选择器
            @param 
            @return
        */
        showMonthPicker() {
            this.isShow = true
        },

        /**
            处理选择年月点击取消事件
            @param 
            @return
        */
        handleCancel() {
            this.isShow = false
            this.nextDate = this.date
        },

        /**
            处理选择年月点击确认事件
            @param 
            @return
        */
        handleConfirm(value) {
            this.date = new Date(value)
            this.$emit("confirm", dayjs(value).format("YYYY-MM"))
            this.isShow = false
        },

        /**
            获取日期区间
            @param 
            @return { Array } 日期区间
        */
        getDateInterval() {
            const dayNum = dayjs(this.date).daysInMonth()
            const monthFormat = dayjs(this.date).format("YYYY-MM")
            if (dayjs().format("YYYY-MM") === monthFormat) {
                const day = dayjs().format("DD")
                return [`${monthFormat}-01 00:00:00`, `${monthFormat}-${day} 23:59:59`]
            } else {
                return [`${monthFormat}-01 00:00:00`, `${monthFormat}-${dayNum} 23:59:59`]
            }
        }
    },

}

</script>

<style scoped lang='scss'>
.monthPicker {
    .monthPicker-title {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.68rem;
        padding: 0 0.18rem;
        border-radius: 0.04rem;
        background-color: #F0F2F5;
    }
    .monthPicker-title-icon {
        width: 0.46rem;
        height: 0.46rem;
        margin-right: 0.14rem;
    }
    .monthPicker-title-month {
        font-size: 0.28rem;
        color: #151515;
    }

    .monthPicker-title-down {
        position: absolute;
        width: 0.28rem;
        height: 0.28rem;
        right: 0.18rem;
        top: 0;
        bottom: 0;
        margin: auto 0;
        transition: transform .15s;
    }
    .monthPicker-title-up {
        transform: rotate(180deg);
    }
}
</style>