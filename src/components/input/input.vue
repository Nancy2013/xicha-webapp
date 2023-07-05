<template>
    <div :class="`fcInput ${isError ? 'formItem-error' : ''} fcInput-${className}`">
        <div class="fcInput-content">
            <div class="formItem-label">
                <div>{{ label }}</div>
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""/> -->
                <span v-if="required">*</span>
            </div>
            <div :class="`formItem-content ${disabled ? 'formItem-content-disabled' : ''}`">
                <input type="text" v-model="componentValue" :placeholder="placeholder" @focus="isError = false" @input="handleInput" :maxlength="maxlength" :disabled="disabled" @change="handleChange">
				<slot name="suffix">
					<span class="fcInput-suffix color" v-if="suffixText">{{ suffixText }}</span>
                    <img :class="`fcInput-suffixIcon ${suffixIconClass}`" v-if="suffixIcon" :src="suffixIcon" alt="" @click="handleClickSuffixIcon">
				</slot>
            </div>
        </div>
    </div>
</template>

<script>
import { filterNum, filterFloat } from "@/utils/filters"
export default {
    name: 'fcInput',
    components: {

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
            type: String | Number,
            default: ''
		},
		suffixText: {
			type: String,
			default: ""
        },
        suffixIcon: {
            type: String,
			default: ""
        },
        suffixIconClass: {
            type: String,
            default: ""
        },
		inputType: {
			type: String,
			default: ''  // int || float
        },
        decimalLen: {
            type: Number | String,
            default: 2
        },
        maxlength: {
            type: Number | String,
            default: -1
        },
        filterFnc: {
            type: Function,
            default: null
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        className: {
			type: String,
			default: ''
		},
        min: {
            type: Number,
            default: null
        },
        max: {
            type: Number,
            default: null
        },
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isError: false,
            componentValue: ''
        }
    },

    created() {
        this.componentValue = this.value
    },

	methods: {
		/**
            处理输入框输入事件
            @param 
            @return
        */
        handleInput(event) {
			let value = event.target.value
			if (this.inputType === 'int') {
				value = filterNum(value)
            }
            
            if (this.inputType === 'float') {
                value = filterFloat(value, this.decimalLen)
            }
            if (this.filterFnc && typeof this.filterFnc === 'function') {
                value = this.filterFnc(value)
            }
			this.componentValue = value
			this.$emit('change', value)
        },

        /**
            处理点击suffixIcon事件
            @param 
            @return
        */
        handleClickSuffixIcon() {
            if (!this.disabled) {
                this.$emit('suffixIcon')
            }
            
        },

        /**
         * 处理input更新事件
         * @param {*} event 
         */
        handleChange(event){
            let value = event.target.value
            const {inputType,min,max}=this;
            if (inputType === 'int') {
                value = filterNum(value)
                if(value!==''){
                    if(min&&value<min){
                        this.componentValue=min;
                        return;
                    }
                    if(max&&value>max){
                        this.componentValue=max;
                    }
                }
            }
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
.fcInput {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    transition: all 0.15s;
    .fcInput-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.9rem;
		input {
			//font-size: 0.28rem;
			text-align: right;
			border: none;
			outline: none;
			transition: all .15s;
		}
		.fcInput-suffix {
			margin-left: 0.16rem;
			font-size: 0.32rem;
		}
        .fcInput-suffixIcon {
            margin-left: 0.16rem;
            width: 0.24rem;
            height: 0.32rem;
        }
    }

    .formItem-content-disabled {
        input {
            color: #999;
        }
    }
}
</style>