<template>
    <div :class="`fcStepper ${isError ? 'formItem-error' : ''} ${disabled?'fcStepper-disabled':''}`">
        <div class="fcStepper-content">
            <div class="formItem-label">
                <div>{{ label }}</div>
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""/> -->
                <span v-if="required">*</span>
            </div>
            <div class="formItem-content">
                <div class="formItem-stepper">
                    <div :class="`formItem-stepper-item ${value <= min ? 'formItem-stepper-item-disabled' : ''}`" @click="!disabled&&handleSubtract()">
                        <img src="@/components/images/stepper/subtract.png" alt="" />
                    </div>
                    <div>{{ value }}</div>
                    <!-- <input type="text" > -->
                    <div :class="`formItem-stepper-item ${(max >= 0 && value >= max) ? 'formItem-stepper-item-disabled' : ''}`" @click="!disabled&&handleAdd()">
                        <img src="@/components/images/stepper/add.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'fcSwitch',

    components: {},
    props: {
        label: {
            type: String,
            default: ""
        },
        value: {
            type: String | Number,
            default: 0
        },
        required: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number | String,
            default: 0
        },
        max: {
            type: Number | String,
            default: -1
        },
        disabled:{
            type:Boolean,
            default:false,
        },
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isError: false
        }
    },

    mounted() {

    },

    methods: {
        /**
            点击减号时触发
            @param 
            @return
        */
        handleSubtract() {
            if (this.value > this.min) {
                this.$emit('change', this.value - 1)
                this.$emit('lower')
            }
        },

        /**
            点击加号时触发
            @param 
            @return
        */
        handleAdd() {
            if (this.max === -1) {
                this.$emit('change', this.value + 1)
                this.$emit('add')
            } else {
				if (this.value < this.max) {
                    this.$emit('change', this.value + 1)
                    this.$emit('add')
                }
            }
        }
    },

}

</script>

<style scoped lang='scss'>
.fcStepper {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    .fcStepper-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 0.9rem;
    }

    .formItem-stepper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 2.26rem;
        height: 0.7rem;
        padding: 0 0.06rem;
        border-radius: 0.54rem;
        border: 1px solid #f0f0f0;
    }

    .formItem-stepper-item {
        width: 0.58rem;
        height: 0.58rem;
        border-radius: 50%;
        text-align: center;
        line-height: 0.58rem;
        font-size: 0.4rem;
        > img {
            width: 100%;
            height: 100%;
        }
    }

    .formItem-stepper-item-disabled {
        opacity: 0.6;
    }

    &.fcStepper-disabled{
        .formItem-content{
            opacity: .5;
        }
    }
}
</style>