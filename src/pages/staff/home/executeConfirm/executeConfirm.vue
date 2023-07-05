<template>
    <FcPage title="执行确认" isBorder>
        <div class="executeConfirm">
            <div class="executeConfirm-content">
                <div class="executeConfirm-qrcode">
                    <div class="executeConfirm-qrcode-content">
                        <FcQrcode height="5rem" width="5rem" :code="this.code"></FcQrcode>
                    </div>
                </div>

                <div class="executeConfirm-name">{{ teaGardenData.name }}</div>
            </div>

            <div class="executeConfirm-start white bgColor" @click="handleExecute">开始执行</div>

			<FcLoading :isShow="loading"></FcLoading>
        </div>
    </FcPage>
</template>

<script>
import FcQrcode from '@/components/codeToQRcode/codeToQRcode.vue'
import FcLoading from '@/components/loading/loading.vue'
import { executeApiConfig } from './config'
import { getRegeoFromTude } from '@/utils/common'
import { workStatusDict } from '@/utils/dict'
import { getLocation } from '@/utils/wechat'
import { initWeChat } from '@/main'
export default {
    name: 'executeConfirm',

    components: { FcQrcode, FcLoading },

    data() {
        return {
            queryData: {},
            code: "",
			teaGardenData: {},
			loading: false
        }
    },
    created() {
        this.queryData = this.$route.query || {}
        const code = this.$route.query.code
        if (code) {
            this.code = `https://xi.cn88555.com/weixin.html#/code?code=${code}`
            this.getTeaGardenInfo(code)
		}
		

    },
    mounted() {
    },

    methods: {
        /**
         获取茶园信息
         @param { String } code 溯源码
         @return
         */
        getTeaGardenInfo(code) {
            this.$axios({
                url: '/wx/codeInformation',
                method: 'GET',
                data: { codeId: code },
                baseUrl: '/api/node'
            }).then((res) => {
                const teaGardenData = {}, codeData = res.data.code
                teaGardenData.name = codeData.boName
                if (Array.isArray(codeData.businessObjectAttrBOList) && codeData.businessObjectAttrBOList.length) {
                    for (let i = 0; i < codeData.businessObjectAttrBOList.length; i++) {
                        const item = codeData.businessObjectAttrBOList[i]
                        if (item.attrNameEn === 'tea_garden_id') {
                            teaGardenData.teaGardenId = item.attrValue
                        }
                    }
                }
                this.teaGardenData = teaGardenData
            }).catch(() => {
                setTimeout(() => {
                    this.$router.back()
                })
            })
        },

        /**
         点击开始执行
         @param 
         @return
         */
		handleExecute() {
            const { teaGardenId } = this.teaGardenData
            if (!teaGardenId) {
                this.$toast("茶园信息错误")
                return
			}
			this.loading = true
            if (this.$isReadyWeChat) {
                this.startExecute()
			} else {
				initWeChat().then(() => {
					this.startExecute()
				}).catch(() => {
					this.loading = false
				})
            }
        },
        /**
         开始执行的处理方法
         @param 
         @return
         */
        startExecute() {
            const { id, wt, code } = this.queryData
            getLocation().then((res) => {
				getRegeoFromTude(res.longitude, res.latitude).then((address) => {
                    this.$axios({
                        url: executeApiConfig[wt],
                        method: 'POST',
                        data: {
                            id,
                            operateStatus: workStatusDict.execute,
                            teaGardenId: code,
                            address: address
                        }
					}).then((res) => {
						this.$toast("开始执行成功")
						this.$router.back()
						this.loading = false
					}).catch(() => {
						this.loading = false
					})
				}).catch(() => {
					this.loading = false
				})
			}).catch(() => {
				this.loading = false
			})

        }
    },

}

</script>

<style scoped lang='scss'>
.executeConfirm {
    height: 100%;
    padding-top: 1.06rem;
}
.executeConfirm-content {
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    width: 6.84rem;
    height: 8.5rem;
    background-image: url(~@/assets/staff/home/executeConfirm/qrcode-bg.png);
    background-size: 6.52rem 8.18rem;
    background-repeat: no-repeat;
    background-position: 0.16rem 0;
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
}

.executeConfirm-name {
    height: 1.72rem;
    padding: 0 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    color: #333;
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