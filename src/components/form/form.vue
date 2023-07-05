<template>
    <div class="form">
        <div :class="`formItem formItem-${formItem.type}`" v-for="(formItem, formKey) in renderList" :key="formKey">
            <FcSelect :ref="`formItem-${formKey}`" v-model="formData[formItem.key]" v-if="formItem.type === 'select' && !formItem.isHide" :required="formItem.required" :disabled="disabled || formItem.disabled" :label="formItem.label" :formKey="formItem.key" :placeholder="formItem.placeholder" :options="formItem.options" @change="handleChange($event, formItem, formKey)"></FcSelect>

            <FcSelectProvince :ref="`formItem-${formKey}`" v-model="formData[formItem.key]"
                v-if="formItem.type === 'selectProvince' && !formItem.isHide" :required="formItem.required"
                :formKey="formItem.key" :label="formItem.label" :placeholder="formItem.placeholder"
                :options="formItem.options" :disabled="disabled || formItem.disabled"></FcSelectProvince>

            <FcTextarea :ref="`formItem-${formKey}`" v-model="formData[formItem.key]"
                v-if="formItem.type === 'textarea' && !formItem.isHide" :required="formItem.required"
                :formKey="formItem.key" :disabled="disabled || formItem.disabled" :label="formItem.label" :placeholder="formItem.placeholder"
                :className="formItem.className"></FcTextarea>

            <FcDateTimePicker :ref="`formItem-${formKey}`" v-model="formData[formItem.key]"
                v-if="formItem.type === 'dateTimePicker' && !formItem.isHide" :required="formItem.required"
                :formKey="formItem.key" :minDate="formItem.minDate" :label="formItem.label" :disabled="disabled || formItem.disabled" :placeholder="formItem.placeholder"></FcDateTimePicker>

            <FcUpload :ref="`formItem-${formKey}`" :accept="formItem.accept" v-model="formData[formItem.key]"
                v-if="formItem.type === 'upload' && !formItem.isHide" :overlay="formItem.overlay" :title="formItem.title"
                :multiple="formItem.multiple" :max="formItem.max" :required="formItem.required" :uploadMode="formItem.uploadMode" :capture="formItem.capture"
                :formKey="formItem.key" :label="formItem.label" :placeholder="formItem.placeholder"
                :uploadList="formItem.uploadList" :disabled="disabled || formItem.disabled"></FcUpload>


            <FcInput :ref="`formItem-${formKey}`" v-model="formData[formItem.key]"
                v-if="formItem.type === 'input' && formItem.inputType !== 'BUTTON' && !formItem.isHide"
                :required="formItem.required" :maxlength="formItem.maxlength" :formKey="formItem.key"
                :label="formItem.label" :suffixIconClass="formItem.suffixIconClass" :placeholder="formItem.placeholder" :inputType="formItem.inputType"
                :suffixText="formItem.suffixText" :suffixIcon="formItem.suffixIcon" :filterFnc="formItem.filterFnc"
                @suffixIcon="handleClickSuffixIcon(formItem, formKey)" :disabled="disabled || formItem.disabled"
                :className="formItem.className" :min="formItem.min" :max="formItem.max"></FcInput>

            <FcChecked :ref="`formItem-${formKey}`" v-model="formData[formItem.key]"
                v-if="formItem.type === 'checked' && !formItem.isHide" :required="formItem.required" :formKey="formItem.key"
                :label="formItem.label" :disabled="disabled || formItem.disabled" @change="handleChange($event, formItem, formKey)"></FcChecked>

            <FcSwitch :ref="`formItem-${formKey}`" v-model="formData[formItem.key]"
                v-if="formItem.type === 'switch' && !formItem.isHide" :required="formItem.required" :formKey="formItem.key"
                :label="formItem.label" @change="handleChange($event, formItem, formKey)" :disabled="disabled || formItem.disabled">
            </FcSwitch>

            <FcStepper :ref="`formItem-${formKey}`" v-model="formData[formItem.key]"
                v-if="formItem.type === 'stepper' && !formItem.isHide" :min="formItem.min" :max="formItem.max" :required="formItem.required" :formKey="formItem.key"
                :label="formItem.label" @change="handleChange($event, formItem, formKey)"  :disabled="disabled || formItem.disabled">
            </FcStepper>

            <FcMultipleSelect :ref="`formItem-${formKey}`" v-model="formData[formItem.key]" v-if="formItem.type === 'multipleSelect' && !formItem.isHide" :required="formItem.required" :placeholder="formItem.placeholder" :options="formItem.options" :formKey="formItem.key" :label="formItem.label" :disabled="disabled || formItem.disabled" @change="handleChange($event, formItem, formKey)"></FcMultipleSelect>

            <FcScanCode :ref="`formItem-${formKey}`" :disabled="disabled || formItem.disabled" :multiple="formItem.multiple" v-model="formData[formItem.key]" :isDedup="formItem.isDedup" :dedupFun="formItem.dedupFun" v-if="formItem.type === 'scanCode' && !formItem.isHide" :required="formItem.required" :remark="formItem.remark" :placeholder="formItem.placeholder" :formKey="formItem.key" :label="formItem.label" :isSubTitle="formItem.isSubTitle" @change="handleChange($event, formItem, formKey)"></FcScanCode>

            <div :ref="`formItem-${formKey}`" class="formItem-submit bgColor white"
                v-if="formItem.type === 'input' && formItem.inputType === 'BUTTON'" @click="handleSubmit">{{ formItem.label
                }}</div>
        </div>
    </div>
</template>
 
<script>
import FcSelect from '@/components/select/select.vue'
import FcSelectProvince from '@/components/selectProvince/selectProvince.vue'
import FcTextarea from '@/components/textarea/textarea.vue'
import FcDateTimePicker from '@/components/dateTimePicker/dateTimePicker.vue'
import FcUpload from '@/components/upload/upload.vue'
import FcInput from '@/components/input/input.vue'
import FcChecked from '@/components/checked/checked.vue'
import FcSwitch from '@/components/switch/switch.vue'
import FcStepper from '@/components/stepper/stepper.vue'
import FcMultipleSelect from '@/components/multipleSelect/multipleSelect.vue'
import FcScanCode from '../sacnCode/sacnCode.vue'
import { isEmpty } from '@/utils/common'
export default {
    name: 'FcForm',

    components: {
        FcInput,
        FcSelect,
        FcUpload,
        FcTextarea,
        FcDateTimePicker,
        FcSelectProvince,
        FcMultipleSelect,
        FcChecked,
        FcSwitch,
        FcStepper,
        FcScanCode
    },
    props: {
        renderList: {
            type: Array,
            default: () => []
        },
        formData: {
            type: Object,
            default: () => { }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'formData',
        event: 'change'
    },
    data() {
        return {}
    },

    mounted() { },

    methods: {
        /**
            校验表单
            @param 
            @return
        */
        validateForm() {
            return new Promise((resolve, reject) => {
                if (Array.isArray(this.renderList)) {
                    let isError = false
                    for (let i = 0; i < this.renderList.length; i++) {
                        const renderItem = this.renderList[i];
                        const value = this.formData[renderItem.key]
                        // 如果表单项被隐藏 不进行校验
                        if (renderItem.isHide || (renderItem.type === 'input' && renderItem.inputType === 'BUTTON')) {
                            continue
                        } else {
                            if (renderItem.type === 'upload' && this.$refs[`formItem-${i}`][0].uploading) {
                                this.$toast(`请等待上传结束`)
                                isError = true
                            }
                            if (renderItem.type === 'scanCode' && this.$refs[`formItem-${i}`][0].validating) {
                                this.$toast(`请等待扫码结束`)
                                isError = true
                            }
                            // 如果为必填项
                            if (renderItem.required) {
                                if (renderItem.type === 'upload' && Array.isArray(renderItem.uploadList)) {
                                    for (let j = 0; j < renderItem.uploadList.length; j++) {
                                        const uploadItem = renderItem.uploadList[j]
                                        if (isEmpty(uploadItem.img)) {
                                            isError = true
                                            this.$refs[`formItem-${i}`][0].isError = true
                                            this.$toast(`请上传${renderItem.label}`)
                                        }
                                    }
                                } else {
                                    if (isEmpty(value)) {
                                        isError = true
                                        this.$refs[`formItem-${i}`][0].isError = true
                                    }
                                }

                                if (renderItem.validFnc && typeof renderItem.validFnc === 'function') {
                                    if (!renderItem.validFnc(value)) {
                                        isError = true
                                        this.$refs[`formItem-${i}`][0].isError = true
                                    }
                                }
                            } else {
                                // 如果不为必填项 且存在校验方法 且value不为空时检验
                                if (renderItem.validFnc && typeof renderItem.validFnc === 'function' && !isEmpty(value)) {
                                    if (!renderItem.validFnc(value)) {
                                        isError = true
                                        this.$refs[`formItem-${i}`][0].isError = true
                                    }
                                } else {
                                    continue
                                }
                            }
                        }
                    }
                    if (!isError) {
                        resolve(this.formData)
                    } else {
                        reject(false)
                    }
                } else {
                    throw '表单渲染列表数据错误'
                }
            })
        },

        /**
            重置表单
            @param 
            @return
        */
        resetForm() {
            const { renderList } = this;
            if (Array.isArray(renderList)) {
                renderList.forEach((v, index) => {
                    if (v.required) {
                        this.$refs[`formItem-${index}`][0].isError = false;
                    }
                })
            }
        },


        /**点击提交按钮时触发
             @param 
             @return
        */
        handleSubmit() {
            this.validateForm().then((formData) => {
                this.$emit('submit', formData)
            }).catch((err) => {
                console.log(err)
            })
        },
        /**  表单数据改变时触发
            @param { String } value 表单数据
            @param { Object } formItem 表单项渲染数据
            @param { Number } formKey 表单项index
            @return
        */
        handleChange(value, formItem, formKey) {
            this.$emit('onChange', {
                value: value,
                formItem: formItem,
                formKey: formKey
            })
        },
        /**
            处理点击suffixIcon事件
            @param { Object } formItem 表单项数据
            @param { Number } formKey 表单项index
            @return
        */
        handleClickSuffixIcon(formItem, formKey) {
            this.$emit('suffixIcon', {
                item: formItem,
                key: formKey
            })
        }
    },

}

</script>
 
<style scoped lang='scss'>
.form {
    padding: 0 0.3rem;
    transition: all 0.15s;

    .formItem {
        display: flex;
        flex-direction: row;
        align-items: center;

        /deep/ .formItem-label {
            display: flex;
            flex-direction: row;
            position: relative;

            >div {
                color: #151515;
            }

            >img {
                position: relative;
                // left: -0.14rem;
                width: 0.12rem;
                height: 0.12rem;
                // top: -1px;
            }

            >span {
                font-size: 0.32rem;
                color: #e03943;
            }
        }
    }

    .formItem:last-child>div {
        border-color: transparent;
    }

    /deep/ .formItem-content {
        margin-left: 0.3rem;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        .formItem-placeholder {
            //font-size: 0.26rem;
            // color: rgba(21, 21, 21, 0.5);
            color: #696969;
        }

        .formItem-value {
            color: rgb(21, 21, 21);
        }

        .formItem-icon {
            width: 0.14rem;
            height: 0.24rem;
            margin-left: 0.2rem;
        }
    }

    /deep/ .formItem-error {
        border-color: #cf3723 !important;

        .formItem-placeholder {
            color: #cf3723;
        }

        .formItem-value {
            color: #cf3723;
        }
        // .formItem-multiple-title {
        //     color: #cf3723 !important;
        // }
        .formItem-multiple-upload {
            //border-style: solid !important;
            border-color: #cf3723 !important;
        }
        input {
            color: #cf3723;
        }

        input::-webkit-input-placeholder,
        textarea::-webkit-input-placeholder {
            color: #cf3723;
        }

        input::-moz-placeholder,
        textarea::-moz-placeholder {
            color: #cf3723;
        }
    }

    .formItem-submit {
        position: fixed;
        left: 0.32rem;
        right: 0.32rem;
        bottom: 1rem;
        height: 0.96rem;
        border-radius: 0.04rem;
        text-align: center;
        line-height: 0.96rem;
    }
}
</style>