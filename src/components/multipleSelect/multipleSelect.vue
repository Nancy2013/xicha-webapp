<template>
    <div :class="`multipleSelect ${isError ? 'formItem-error' : ''}`">
        <div class="select-content" @click="handleClickSelect">
            <div class="formItem-label">
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""> -->
                <div>{{ label }}</div>
                <span v-if="required">*</span>
            </div>
            <div class="formItem-content">
                <div class="formItem-value text_ellipsis2" v-if="activeName">{{ activeName }}</div>
                <div v-else class="formItem-placeholder">{{ placeholder }}</div>
                <img class="formItem-icon" src="@/assets/common/right.png" alt="">
            </div>
        </div>
        <Popup v-model="isShow" position="bottom">
            <div class="multipleSelect-popupContent">
                <div class="multipleSelect-list">
                    <div :class="`multipleSelect-item ${value.indexOf(option.value) > -1 ? 'multipleSelect-item-active' : ''}`" v-for="(option) in options" :key="option.value" @click="handleClickItem(option)">
                        <span>{{ option.text }}</span>
                        <img src="@/components/images/multipleSelect/check.png" alt="">
                    </div>
                </div>
                <div class="multipleSelect-cancel" @click="isShow = false">取消</div>
            </div>
        </Popup>
    </div>
</template>

<script>
import { Popup } from 'vant'
export default {
    name: 'multiplePicker',
    components: { Popup },
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
            default: () => []
        },
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    computed: {
        activeName() {
            const textList = []
            if (Array.isArray(this.options)) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.value.indexOf(this.options[i].value) > -1) {
                        textList.push(this.options[i].text)
                    }
                }
                
            }
            return textList.join(',')
        }
    },
    data() {
        return {
            isShow: false,
            isError: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },

    mounted() { },

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
            处理点击select选项事件
            @param { Object } item 选项数据
            @return
        */
        handleClickItem(item) {
            const currValue = [...this.value], index = currValue.indexOf(item.value)
            if (index > -1) {
                currValue.splice(index, 1)
            } else {
                currValue.push(item.value)
            }
            this.$emit('change', currValue)
        }
    },

}

</script>

<style scoped lang='scss'>
.multipleSelect {
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
.multipleSelect-popupContent {
    overflow: hidden;
    background-color: #f7f8fa;
    .multipleSelect-list {
        overflow-y: auto;
        max-height: 6rem;
        padding: 0 0.3rem;
        background-color: #fff;
    }
    .multipleSelect-item {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 1rem;
        span {
            transition: color .15s;
        }
        img {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 0.32rem;
            height: 0.32rem;
            margin: auto 0;
            opacity: 0;
            transition: opacity .15;
        }
    }

    .multipleSelect-item-active {
        span {
            color: #185EF0;
        }
        img {
            opacity: 1;
        }

    }
    .multipleSelect-cancel {
        margin-top: 0.12rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #646566;
        background-color: #fff;
    }
}
</style>