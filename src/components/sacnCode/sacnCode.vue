<template>
    <div :class="`sacnCode ${isError ? 'formItem-error' : ''}`">
        <div class="sacnCode-content">
            <div class="formItem-label">
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""> -->
                <div>{{ label }}</div>
                <span v-if="required">*</span>
            </div>
            <div class="formItem-content">
                <div class="formItem-placeholder" v-if="isSubTitle && ((!multiple && !disabled) || multiple)">{{ disabled ? '' : placeholder }}{{ !disabled && Array.isArray(value) && value.length ? '（' : '' }}{{ Array.isArray(value) && value.length ? `已扫描${value.length}`: '' }}{{ !disabled && Array.isArray(value) && value.length ? '）' : '' }}</div>
                <div class="sacnCode-list" v-if="multiple && Array.isArray(value) && value.length">
                    <div class="sacnCode-item" v-for="(codeItem, codeKey) in value" :key="codeKey">
                        <FcCodeToQRcode :code="codeItem" width="1.36rem" height="1.36rem"></FcCodeToQRcode>
                        <div v-if="!disabled" class="sacnCode-delete" @click.stop="handleDelete(codeKey)">
                            <img src="@/components/images/upload/delete.png" alt="" />
                        </div>
                    </div>
                </div>

                <div class="sacnCode-list sacnCode-list-single" v-if="!multiple && Array.isArray(value) && value.length">
                    <div class="sacnCode-item " v-for="(codeItem, codeKey) in value" :key="codeKey">
                        <FcCodeToQRcode :code="codeItem" width="1.36rem" height="1.36rem"></FcCodeToQRcode>
                        <div v-if="!disabled" class="sacnCode-delete" @click.stop="handleDelete(codeKey)">
                            <img src="@/components/images/upload/delete.png" alt="" />
                        </div>
                    </div>
                    <div class="sacnCode-remark">{{ remark }}</div>
                </div>
            </div>

            <div v-if="(!disabled && multiple || (!multiple && (!Array.isArray(value) || !value.length)))" class="sacnCode-scan white bgColor" @click="handleScan">扫码</div>

            <FcLoading :isShow="validating" text="正在获取扫码结果..."></FcLoading>
        </div>
    </div>
</template>

<script>
import FcCodeToQRcode from '../codeToQRcode/codeToQRcode.vue'
import { getWeChatQrcode } from '@/utils/wechat'
import { initWeChat } from '@/main'
import FcLoading from '../loading/loading.vue'
export default {
    name: 'sacnCode',

    components: {
        FcCodeToQRcode,
        FcLoading

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
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
        multiple: {
            type: Boolean,
            default: false
        },
        remark: {
            type: String,
            default: ""
        },
        isSubTitle: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isDedup: {
            type: Boolean,
            default: false
        },
        dedupFun: {
            type: Function,
            default: () => {
                
            }
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isError: false,
            isReadyWeChat: false,
            validating: false
        }
    },

    mounted() {

    },

    methods: {
        /**
            点击扫码按钮时触发
            @param 
            @return
        */
        handleScan() {
            if (this.$isReadyWeChat) {
                getWeChatQrcode().then(async (result) => {
                    this.handleScanSuccess(result)
                })
            } else {
                initWeChat().then(() => {
                    this.isReadyWeChat = true
                    getWeChatQrcode().then(async (result) => {
                        this.handleScanSuccess(result)
                    })
                })
            }
        },

        /**
            处理扫码成功事件
            @param 
            @return
        */
        handleScanSuccess(result) {
            const qrcode = result.resultStr
            const currValue = [...this.value]
            // 如果不需要去重
            if (this.isDedup) {
                // 先进行前端过滤
                for (let i = 0; i < currValue.length; i++) {
                    const currStr = currValue[i]
                    if (currStr === qrcode) {
                        this.$toast("已扫描此码")
                        return
                    }
                }
                // 如果有传过滤方法
                if (this.dedupFun && typeof this.dedupFun === 'function') {
                    const validateResult = this.dedupFun(qrcode)
                    if (validateResult instanceof Promise) {
                        this.validating = true
                        validateResult.then(() => {
                            currValue.push(qrcode)
                            this.$emit('change', currValue)
                            this.validating = false
                        }).catch(() => {
                            this.validating = false
                        })
                    } else if (typeof validateResult === 'boolean') {
                        if (validateResult) {
                            currValue.push(qrcode)
                            this.$emit('change', currValue)
                        } else {
                            
                        }
                    } else {
                        throw '校验方法错误'
                    }
                }
            } else {
                currValue.push(qrcode)
                this.$emit('change', currValue)
            }
        },

        /**
            点击删除按钮时触发
            @param { Number } key 点击的下标
            @return
        */
        handleDelete(key) {
            const currValue = [...this.value]
            currValue.splice(key, 1)
            this.$emit('change', currValue)
        }
    },

}

</script>

<style scoped lang='scss'>
.sacnCode {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    transition: all 0.15s;
}
.sacnCode-content {
    padding: 0.2rem 0;

    .formItem-label {
        line-height: 0.56rem;
    }
    .formItem-content {
        margin-left: 0;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .formItem-placeholder {
        font-size: 0.26rem;
        color: #969799;
        line-height: 0.56rem;
    }
}

.sacnCode-scan {
    position: absolute;
    right: 0;
    width: 1.72rem;
    height: 0.56rem;
    top: 0.48rem;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.56rem;
    border-radius: 0.04rem;
}

.sacnCode-list {
    margin-top: 0.24rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .sacnCode-item {
        position: relative;
        margin-right: 0.42rem;
        margin-bottom: 0.16rem;
        border: 1px solid #e1e1e1;
        .sacnCode-delete {
            position: absolute;
            width: 0.44rem;
            height: 0.44rem;
            right: -0.22rem;
            top: -0.22rem;
            padding: 0.08rem;
            > img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .sacnCode-item:nth-child(4n) {
        margin-right: 0;
    }
}

.sacnCode-list-single {
    width: 100%;
    flex-direction: column;
    align-items: center;
}
.sacnCode-remark {
    margin-bottom: 0.12rem;
    margin-top: 0.2rem;
}
</style>