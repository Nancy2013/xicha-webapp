<template>
    <div class="rangePicker">
        <div class="rangePicker-startDate" @click="handleClickStartDate">
            <span>{{ dates[0] | filterDate(startDateText)  }}</span>
            <div class="rangePicker-icon">
                <div v-show="!dates[0]">
                    <img src="@/components/images/rangPicker/date.png" alt="" />
                </div>
                <div v-show="dates[0]" @click.stop="handleClose('startDate')">
                    <img src="@/components/images/rangPicker/close.png" alt="" />
                </div>
            </div>
        </div>
        <div class="rangePicker-space">——</div>
        <div class="rangePicker-endDate" @click="handleClickEndDate">
            <span>{{ dates[1] | filterDate(endDateText) }}</span>
            <div class="rangePicker-icon">
                <div v-show="!dates[1]">
                    <img src="@/components/images/rangPicker/date.png" alt="" />
                </div>
                <div v-show="dates[1]" @click.stop="handleClose('endDate')">
                    <img src="@/components/images/rangPicker/close.png" alt="" />
                </div>
            </div>
        </div>

        <Popup v-model="isShowStartDatePicker" position="bottom">
            <DatetimePicker v-model="dates[0]" type="date" :title="`请选择${startDateText}`"></DatetimePicker>
        </Popup>

        <Popup v-model="isShowEndDatePicker" position="bottom">
            <DatetimePicker v-model="dates[1]" type="date" :title="`请选择${endDateText}`"></DatetimePicker>
        </Popup>
    </div>
</template>

<script>
import { DatetimePicker, Popup } from 'vant'
import dayjs from 'dayjs'
export default {
    name: 'rangePicker',
    components: {
        Popup,
        DatetimePicker
    },
    props: {
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
        startDateText: {
            type: String,
            default: "开始日期"
        },
        endDateText: {
            type: String,
            default: "结束日期"
        }
    },
    data() {
        return {
            isShowStartDatePicker: false,
            isShowEndDatePicker: false,
            dates: []
        }
    },
    filters: {
        filterDate(date, text) {
            if (date) {
                return dayjs(date).format("YYYY-MM-DD")
            } else {
                return text
            }

        }
    },

    mounted() {
        this.dates = this.value
    },

    methods: {
        /**
            处理点击开始时间
            @param 
            @return
        */
        handleClickStartDate() {
            this.$emit('selectStartDate')
        },
        /**
            处理点击结束时间
            @param 
            @return
        */
        handleClickEndDate() {
            this.$emit('selectEndDate')
        },
        /**
            处理点击关闭按钮事件
            @param { String } type 类型(开始时间或者结束时间)
            @return
        */
        handleClose(type) {
            this.$emit('close', type)
        }
    },
    watch: {
        value: {
            handler: (newValue) => {
                console.log(newValue)
                this.dates = newValue
            },
            deep: true
        }
    }
}

</script>

<style scoped lang='scss'>
.rangePicker {
    padding-top: 0.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    /deep/ .van-overlay {
        //left: -0.9rem;
        //width: 7.5rem;
    }
    // /deep/ .van-popup {
    //     left: -0.9rem;
    //     width: 7.5rem;
    // }
}
.rangePicker-startDate,
.rangePicker-endDate {
    width: 2.48rem;
    height: 0.72rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 0.04rem;
    border: 1px solid #eeeeee;
    span {
        margin-right: 0.16rem;
        font-size: 0.28rem;
        color: #333;
    }
    .rangePicker-icon {
        div {
            width: 0.48rem;
            height: 0.48rem;
            padding: 0.08rem;
            > img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.rangePicker-space {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0.1rem;
    height: 0.72rem;
    color: #969799;
}
</style>