<template>
    <div :class="`fcSwitch fcSwitch-${formKey} ${isError ? 'formItem-error' : ''} ${disabled?'fcSwitch-disabled':''}`">
        <div class="fcSwitch-content">
            <div class="formItem-label">
                <div>{{ label }}</div>
                <!-- <img v-if="required" src="@/components/images/form/require.png" alt=""/> -->
                <span v-if="required">*</span>
            </div>
            <div class="formItem-content" @click="!disabled&&handleChange()">
                <div :class="`formItem-switch ${value === checkedValue ? 'formItem-switc-checked' : ''}`">
                    <div class="formItem-switch-slide"></div>
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
        required: {
            type: Boolean,
            default: false
        },
        value: {
            type: String | Number | Boolean,
            default: false
        },
        checkedValue: {
            type: String | Number | Boolean,
            default: true
        },
        unCheckedValue: {
            type: String | Number | Boolean,
            default: false
        },
        formKey: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false,
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
        if (this.value !== this.unCheckedValue && this.value !== this.checkedValue) {
            this.$emit('change', this.unCheckedValue)
        }
    },

    methods: {
        /**
            切换switch
            @param 
            @return
        */
        handleChange() {
            if (!this.disabled) {
                if (this.value === this.checkedValue) {
                    this.$emit('change', this.unCheckedValue)
                } else {
                    this.$emit('change', this.checkedValue)
                }
            }
        }
    },

}

</script>

<style scoped lang='scss'>
.fcSwitch {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    .fcSwitch-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 0.9rem;
    }
    .formItem-switch {
        position: relative;
        width: 0.88rem;
        height: 0.44rem;
        border-radius: 0.22rem;
        background-color: rgba(0, 0, 0, 0.08);
        transition: all 0.15s;
    }

    .formItem-switc-checked {
        background-color: #185ef0;
        .formItem-switch-slide {
            transform: translateX(0.44rem);
        }
    }
    .formItem-switch-slide {
        position: absolute;
        left: 0.04rem;
        top: 0;
        bottom: 0;
        width: 0.36rem;
        height: 0.36rem;
        margin: auto 0;
        border-radius: 50%;
        background-color: #fff;
        transition: all 0.15s;
    }

    &.fcSwitch-disabled {
        .formItem-content {
            cursor: not-allowed;
            opacity: 0.4;
        }
    }
}
</style>