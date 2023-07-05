<template>
    <FcPage title="石台硒茶" isTitleCover :showLeft="false">
        <div class="my">
            <FcMyHeader :userData="userData">
                <div class="my-qrcode" v-if="tenantCodeImg" @click="handleShowQRCode">
                    <img :src="tenantCodeImg" alt="">
                </div>
            </FcMyHeader>
            <div class="my-content">
                <div class="my-content-title">
                    <img class="my-content-title-cover" src="@/assets/enterprise/my/my/enterprise-my.png" alt="">
                    <img class="my-content-title-text" src="@/assets/enterprise/my/my/enterprise-my-text.png" alt="">
                </div>

                <div class="my-menu-list">
                    <div class="my-menu-item" v-for="(menuItem, menuKey) in menuRenderList" :key="menuKey">
                        <img class="my-menu-item-icon" :src="menuItem.icon" alt="">
                        <div class="my-menu-item-content">
                            <div>{{ menuItem.text }}</div>
                            <img src="@/assets/common/right.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FcDialog v-model="isShowQrcode" title="身份码">
            <div class="staff-qrcode">
                <div>{{ userData.userName }}</div>
                <img :src="tenantCodeImg" alt="">
            </div>
        </FcDialog>
    </FcPage>
</template>

<script>
import FcMyHeader from '@/components/myHeader/myHeader.vue'
import { getMyMenuRenderList } from './config'
import { enterpriseUserDataStorage } from '@/utils/storage'
import { ImagePreview } from 'vant'
import QRCode from 'qrcode'
export default {
    name: 'enterpriseMy',

    components: {
        FcMyHeader
    },

    data() {
        return {
            menuRenderList: getMyMenuRenderList(),
            userData: Object.assign(enterpriseUserDataStorage.getUserData(), { roleName: '茶企管理员' }),
            tenantCodeImg: '',
            isShowQrcode: false
        }
    },

    created() {

        if (this.userData.tenantId) {
            QRCode.toDataURL(`https://zhiyun.cn88555.com/frontend/weixin/code?code=88.555.1/KITO006592496PEACE20230415`).then((url) => {
                this.tenantCodeImg = url
            })
        }
    },

    methods: {
        /**
         * 预览企业二维码
         *@param 
         *@return
         */
        handleShowQRCode() {
            this.isShowQrcode = true
        }
    },

}

</script>

<style scoped lang='scss'>
.my {
    height: 100%;
    background-color: #f5f5f5;
}

.my-qrcode {
    position: absolute;
    right: 0.3rem;
    height: 1.56rem;
    width: 1.56rem;
    top: 0;
    bottom: 0;
    margin: auto 0;
    background-image: url("~@/assets/enterprise/my/my/my-arcode-bg.png");
    background-size: 100% 100%;
    > img {
        display: block;
        width: 1.36rem;
        height: 1.36rem;
        margin: 0.1rem auto 0;
        background-color: #666;
    }
}

.my-content {
    position: relative;
    margin-top: -0.52rem;
    padding: 0 0.3rem;
    .my-content-title {
        position: relative;
        height: 1.8rem;
        .my-content-title-cover {
            width: 100%;
            height: 100%;
        }
        .my-content-title-text {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width: 3.84rem;
            height: 0.4rem;
            margin: auto;
        }
    }

    .my-menu-list {
        margin-top: 0.3rem;
    }
    .my-menu-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1.08rem;
        padding: 0 0 0 0.3rem;
        background-color: #fff;
        .my-menu-item-icon {
            width: 0.32rem;
            height: 0.32rem;
        }
        .my-menu-item-content {
            height: 100%;
            margin-left: 0.2rem;
            padding-right: 0.3rem;
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eeeeee;
            > div {
                color: #151515;
            }
            > img {
                width: 0.14rem;
                height: 0.24rem;
            }
        }
    }
}
</style>