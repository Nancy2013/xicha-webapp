<template>
    <FcPage :title="title" isBorder>
        <div class="taeGreenCode">
            <div class="taeGreenCode-title" v-if="type !== 'view'">
                <img src="@/assets/staff/home/teaGreen/taeGreenCode/success-icon.png" alt="">
                <span>采摘执行成功</span>
            </div>
            <div class="executeConfirm-content">
                <div class="executeConfirm-qrcode">
                    <div class="executeConfirm-qrcode-content">
                        <FcCodeToQRcode v-if="qrcode" height="5rem" width="5rem" :code="qrcode"></FcCodeToQRcode>
                        <div class="executeConfirm-qrcode-remark">茶青结算时需出示该码，请截图保存</div>
                    </div>
                </div>

                <div class="executeConfirm-name">
                    <div>采摘批次码</div>
                    <div>{{ code }}</div>
                </div>
            </div>
        </div>
    </FcPage>
</template>

<script>
import FcCodeToQRcode from '@/components/codeToQRcode/codeToQRcode.vue'
import { isEmpty } from '@/utils/common'
export default {
    name: 'taeGreenCode',

    components: { FcCodeToQRcode },

    data() {
        return {
            code: '',
			qrcode: '',
			type: "",
			title: ""
        }
    },
    created() {
		const { code, type } = this.$route.query
		if (type === 'view') {
			this.title = '采摘批次码'
		} else {
			this.title = "执行成功"
		}
		this.type = type
        if (isEmpty(code)) {
            this.$toast("没有采摘批次码")
            setTimeout(() => {
                this.$router.back()
            }, 1000);
        } else {
            this.code = code
            this.qrcode = `${window.location.origin}${window.location.pathname}#/staff/addTaeGreen?code=${code}`
        }
    },
    mounted() {

    },

    methods: {},

}

</script>

<style scoped lang='scss'>
.taeGreenCode {
    height: 100%;
    padding-top: 0.9rem;
}
.taeGreenCode-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
    img {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.3rem;
    }
    span {
        font-size: 0.36rem;
        color: #13121a;
    }
}
.executeConfirm-content {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    width: 6.52rem;
    height: 9.02rem;
    background-image: url(~@/assets/staff/home/executeConfirm/qrcode-bg.png);
    background-size: 6.52rem 9.02rem;
    background-repeat: no-repeat;
}
.executeConfirm-qrcode {
    position: relative;
    height: 6.3rem;
    padding-top: 0.58rem;
    .executeConfirm-qrcode-content {
        margin: 0 auto;
        width: 5rem;
        height: 5rem;
    }
    .executeConfirm-qrcode-remark {
        font-size: 0.3rem;
        color: #969799;
    }
}

.executeConfirm-name {
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    right: 0;
    height: 1.72rem;
    padding: 0 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    color: #333;
    > div {
        height: 0.56rem;
        line-height: 0.56rem;
        color: #333333;
    }
}

.executeConfirm-start {
    position: fixed;
    bottom: 1rem;
    left: 0.32rem;
    right: 0.32rem;
    border-radius: 0.04rem;
    text-align: center;
    line-height: 0.96rem;
}
</style>