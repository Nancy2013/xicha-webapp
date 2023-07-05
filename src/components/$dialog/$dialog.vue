<template>
    <Popup v-model="isShow" @closed="handleClosed">
        <div class="fc-dialog">
            <div class="fc-dialog-icon"></div>
            <div class="fc-dialog-title">{{ title }}</div>
            <div class="fc-dialog-content">{{ content }}</div>

            <div :class="`${isError ? 'fc-dialog-input-error' : ''} fc-dialog-input`">
                <textarea :placeholder="placeholder" v-model="value" @focus="handleFocus"></textarea>
            </div>

            <div :class="`fc-dialog-bottom fc-dialog-bottom-${type}`">
                <div class="fc-dialog-cancel color" @click="cancel">{{ cancelText }}</div>
                <div class="fc-dialog-confirm bgColor white" @click="confirm">{{ confirmText }}</div>
            </div>

        </div>
    </Popup>
    <!-- <div class="fc-dialog">

	</div> -->
</template>

<script>
import FcTextarea from '../textarea/textarea.vue'
import { Popup } from 'vant';
export default {
    name: '',

    components: {
        Popup,
        FcTextarea
    },


    data() {
        return {
            isShow: false,
            type: 'alert',
            title: '提示',
            content: '',
            placeholder: '请填写',
            cancelText: '取消',
            confirmText: '确定',
            value: '',
            required: true,
            validFnc: null,
            isError: false,
        }
    },

    mounted() {
        //this.isShow = true
    },

    methods: {
        /**
             * 关闭dialog且动画结束后触发
             * @param
             * @return
             */
        handleClosed() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },

        /**
             * 处理文本框获取焦点事件
             * @param
             * @return
             */
        handleFocus() {
            this.isError = false
        }
    }

}

</script>

<style scoped lang='scss'>
body {
    .van-popup {
        border-radius: 0.16rem;
    }
}
.fc-dialog {
    position: relative;
    width: 6.54rem;
    padding: 0.64rem 0.2rem;
    background: linear-gradient(
        180deg,
        #dde7ff 0%,
        rgba(210, 232, 255, 0) 100%
    );
    background-size: 100% 2.4rem;
    background-repeat: no-repeat;
    // > div {

    // }
    .fc-dialog-icon {
        position: absolute;
        left: 4.22rem;
        top: 0.3rem;
        width: 1.82rem;
        height: 1.34rem;
        background-image: url(~@/components/images/dialog/prompt.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
.fc-dialog-title {
    font-size: 0.4rem;
    line-height: 0.56rem;
    text-align: center;
    color: #222;
}
.fc-dialog-content {
    width: 4.48rem;
    margin: 0.6rem auto 0;
    line-height: 0.54rem;
    text-align: center;
    color: #222;
}

.fc-dialog-bottom {
    margin-top: 0.6rem;
}

.fc-dialog-bottom-confirm,
.fc-dialog-bottom-prompt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.fc-dialog-cancel {
    width: 2.88rem;
    height: 0.94rem;
    border-radius: 0.04rem;
    border: 1px solid #a0ceff;
    line-height: 0.9rem;
    text-align: center;
}

.fc-dialog-confirm {
    width: 2.88rem;
    height: 0.94rem;
    border-radius: 0.04rem;
    border: 1px solid #3d71f6;
    line-height: 0.9rem;
    text-align: center;
}

.fc-dialog-input {
    height: 2.4rem;
    padding: 0.34rem 0.32rem;
    border-radius: 0.04rem;
    border: 1px solid #a0ceff;
    transition: border-color .15s;
    textarea {
        width: 100%;
        height: 100%;
        font-size: 0.3rem;
        border: none;
        resize: none;
        transition: color .15s;
    }
    textarea::-webkit-input-placeholder {
        color: #969799;
        transition: color .15s;
    }
    textarea::-moz-placeholder {
        color: #969799;
        transition: color .15s;
    }
}

.fc-dialog-input-error {
    border-color: #cf3723;
    textarea {
        color: #cf3723;
    }
    textarea::-webkit-input-placeholder {
        color: #cf3723;
    }
    textarea::-moz-placeholder {
        color: #cf3723;
    }
}
</style>