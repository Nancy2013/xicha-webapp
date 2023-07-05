<template>
    <div :class="`select ${disabled ? 'select-disabled' : ''} ${isError ? 'formItem-error' : ''}`">
        <div class="select-content" @click="!disabled && handleClickSelect()">
            <div class="formItem-label">
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""> -->
                <div>{{ label }}</div>
                <span v-if="required">*</span>
            </div>
            <div class="formItem-content">
                <div class="formItem-value text_ellipsis" v-if="activeName">{{ activeName }}</div>
                <div v-else class="formItem-placeholder">{{ placeholder }}</div>
                <img class="formItem-icon" src="@/assets/common/right.png" alt="">
            </div>
        </div>
        <Popup v-model="isShow" position="bottom" @open="handlePopupOpen">
            <Picker :default-index="defaultIndex" :title="title || placeholder" show-toolbar :columns="options || []" @confirm="handleConfirm" @cancel="handleCancel" @change="handlePickerChange"></Picker>
        </Popup>
    </div>
</template>

<script>
import { Popup, Picker } from 'vant';
export default {
    name: 'FcSelect',
    components: {
        Popup,
        Picker
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
        options: {
            type: Array,
            default: () => {
                return []
            }
        },
        value: {
            type: String | Number,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        activeName() {
            if (Array.isArray(this.options)) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].value === this.value) {
                        return this.options[i].text
                    }
                }
                return this.value
            } else {
                return this.value
            }
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isShow: false,
            isError: false,
            defaultIndex: ''
        }
    },

    methods: {
        /**
            处理点击select事件
            @param 
            @return
        */
        handleClickSelect() {
            this.isError = false
            this.isShow = true
        },

        /**
            处理select选择事件
            @param { Object } item 选择的select项
            @param { index } index 选择的select下标
            @return
        */
        handleConfirm(item, index) {
            this.isShow = false
            this.$emit('change', item.value)
        },

        /**
            点击picker取消事件
            @param 
            @return
        */
        handleCancel() {
            this.isShow = false
        },
        /**
            处理poup打开事件
            @param 
            @return
        */
        handlePopupOpen() {
            if (Array.isArray(this.options)) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].value === this.value) {
                        this.defaultIndex = i
                    }
                }
            }

        },

        /**
            处理picker选择事件
            @param { Object } item 选择的select项
            @param { index } index 选择的select下标
            @return
        */
        handlePickerChange(dom, item, index) {
            this.defaultIndex = index
        },
    }

}

</script>

<style scoped lang='scss'>
.select {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    transition: all 0.15s;
    .select-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.9rem;
    }
}

.select-disabled {
    .formItem-content {
        overflow: hidden;
        .formItem-value {
            color: #c8c9cc !important;
        }
        > img {
            opacity: 0.8;
        }
    }
}
</style>