<template>
    <div :class="`fcChecked ${isError ? 'formItem-error' : ''}`">
       <div class="fcChecked-content">
          <div class="formItem-label">
             <img v-if="required" src="@/components/images/form/require.png" alt="" />
             <div>{{ label }}</div>
          </div>
          <div class="formItem-content">
            <div class="formItem-switch" v-if="value" @click="handleChecked">
                <span class="switch-y">是</span>
                <img :src="ySwitchImg" />
            </div>
            <div class="formItem-switch" v-else  @click="handleChecked">
                <span class="switch-n">否</span>
                <img :src="nSwitchImg" />
            </div>
          </div>
       </div>
    </div>
</template>
<script>
import nSwitchImg from '@/assets/sys/apply/nSwitch.png'
import ySwitchImg from '@/assets/sys/apply/ySwitch.png'
export default {
    name: 'fcchecked',
    components: {},
    props: {
        label: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            isError: false,
            componentValue: '',
            nSwitchImg,
            ySwitchImg
        }
    },
    methods: {
        /**
         * 处理选择框事件
         */
        handleChecked() {
            this.$emit('change', !this.value)
        }
    }
}
</script>
<style scoped lang="scss">
.fcChecked {
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    transition: all 0.15s;
    .fcChecked-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1rem;
        .formItem-content {
            position: relative;
            .formItem-switch {
                text-align: right;
                > img {
                 width: 50%;
              }
            }
            .switch-y {
                position: absolute;
                right: 0.6rem;
                top: 0.1rem;
                color: #fff;
            }
            .switch-n {
                position: absolute;
                right: 0.2rem;
                top: 0.1rem;
                color: #fff;
            }
        }
    }
}
</style>