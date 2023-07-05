<template>
    <div :class="`dateTimePicker ${isError ? 'formItem-error' : ''} ${disabled ? 'dateTimePicker-disabled' : ''}`">
        <div class="dateTimePicker-content" @click="showDateTimePicker">
            <div class="formItem-label">
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""> -->
                <div>{{ label }}</div>
                <span v-if="required">*</span>
            </div>
            <div class="formItem-content">
                <div class="formItem-value" v-if="value">{{ formatDate }}</div>
                <div v-else class="formItem-placeholder">{{ placeholder }}</div>
                <img class="formItem-icon" src="@/assets/common/time.png" alt="">
            </div>
        </div>
        <Popup v-model="isShow" position="bottom">
            <DatetimePicker v-model="componentValue" :minDate="minDate" type="datetime" :title="title || placeholder" :formatter="formatter" @confirm="handleConfirm" @cancel="handleCancel"></DatetimePicker>

        </Popup>
    </div>
</template>

<script>
import { Popup, DatetimePicker } from 'vant';
import dayjs from 'dayjs'
export default {
    name: 'fcDateTimePicker',

    components: {
        Popup,
        DatetimePicker
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: String | Number,
            default: ""
        },
        title: {
            type: String,
            default: ''
        },
        minDate: {
            type: Date,
            default: () => {
                return new Date()
            }
        }
    },
    computed: {
        formatDate() {
            return dayjs(this.value).format('YYYY-MM-DD HH:mm')
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isShow: false,
            componentValue: '',
            isError: false
        }
    },

    mounted() {

    },
    created() {
        this.componentValue = this.value
    },

    methods: {
        /**
            显示日期时间选择器
            @param 
            @return
        */
        showDateTimePicker() {
            if (!this.disabled) {
                this.isError = false
                this.isShow = true
            }
        },
        /**
            处理时间选择器选中事件
            @param 
            @return
        */
        handleConfirm() {
            this.isShow = false
            this.$emit('change', this.componentValue)
        },

        /**
            点击dateTimepicker取消事件
            @param 
            @return
        */
        handleCancel() {
            this.isShow = false
            this.componentValue = this.value
        },
        /**
            格式化时间选择器函数
            @param { String } type 类型 
            @param { String } val 数值 
            @return
        */
        formatter(type, val) {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            if (type === 'hour') {
                return val + '时';
            }
            if (type === 'minute') {
                return val + '分';
            }
            return val;
        },
    },
    watch: {
        value(newValue) {
            this.componentValue = newValue
        }
    }

}

</script>

<style scoped lang='scss'>
.dateTimePicker {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    .dateTimePicker-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.9rem;
    }

    .formItem-content {
        .formItem-icon {
            width: 14px;
            height: 14px;
        }
    }
}

.dateTimePicker-disabled {
    .formItem-content {
        .formItem-value {
            color: #999;
        }
    }
}
</style>