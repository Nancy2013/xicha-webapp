<template>
    <div class="pickInfo">
        <div class="taeGreenItem-infoItem" v-if="data.pickBatchCode">
            <!-- <img src="@/components/images/taeGreenItem/tradeTime.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">采摘批次码</div>
            <div>{{ data.pickBatchCode }}</div>
        </div>
        <div class="taeGreenItem-infoItem" v-if="data.workNo">
            <!-- <img src="@/components/images/taeGreenItem/desc.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">工单编号</div>
            <div>{{ data.workNo }}</div>
        </div>
        <div class="taeGreenItem-infoItem" v-if="data.actualEndTime">
            <!-- <img src="@/components/images/taeGreenItem/complateTime.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">完成时间</div>
            <div>{{ data.actualEndTime }}</div>
        </div>
        <div class="taeGreenItem-infoItem" v-if="data.pickBreed">
            <!-- <img src="@/components/images/taeGreenItem/complateTime.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">采摘品种</div>
            <div>{{ data.pickBreed }}</div>
        </div>
        <div class="taeGreenItem-infoItem" v-if="data.pickRequire">
            <!-- <img src="@/components/images/taeGreenItem/complateTime.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">采摘要求</div>
            <div>{{ data.pickRequire }}</div>
        </div>
        <div class="taeGreenItem-infoItem" v-if="data.actualStartTime">
            <!-- <img src="@/components/images/taeGreenItem/varieties.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">开始执行时间</div>
            <div>{{ data.actualStartTime }}</div>
        </div>
        <div class="taeGreenItem-infoItem" v-if="data.actualEndTime">
            <!-- <img src="@/components/images/taeGreenItem/varieties.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">工作完成时间</div>
            <div>{{ data.actualEndTime }}</div>
        </div>
        <div class="taeGreenItem-infoItem taeGreenItem-infoItem-noflex" v-if="data.teaGardenId">
            <!-- <img src="@/components/images/taeGreenItem/qrcode.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">茶园码</div>
            <div class="taeGreenItem-qrcode">
                <!-- <img  :src="teaGardenCodeSrc" alt=""> -->
                <FcCodeToQRCode :code="`https://zhiyun.cn88555.com/frontend/weixin/code?code=${decodeURI(data.teaGardenId)}`" v-if="data.teaGardenId" @click="previewCodeImage"></FcCodeToQRCode>
                <span class="taeGreenItem-qrcode-default" v-else>暂无图片</span>
            </div>
        </div>
        <div class="taeGreenItem-infoItem taeGreenItem-infoItem-noflex" v-if="Array.isArray(data.imageUrl.split(',')) && data.imageUrl.split(',').length">
            <!-- <img src="@/components/images/taeGreenItem/workCode.png" alt=""> -->
            <div class="taeGreenItem-infoItem-label">工作图片</div>
            <div class="taeGreenItem-workImg">
                <img v-for="(imgItem, imgKey) in data.imageUrl.split(',')" :key="imgKey" v-lazy="imgItem" alt="" @click="previewWorkImage(imgKey)">
                <span class="taeGreenItem-qrcode-default" v-if="!Array.isArray(data.imageUrl.split(',')) || !data.imageUrl.split(',').length">暂无图片</span>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { ImagePreview } from 'vant'
import FcItemCell from '@/components/itemCell/itemCell.vue'
import FcCodeToQRCode from '@/components/codeToQRcode/codeToQRcode.vue'
export default {
    name: 'pickInfo',

    components: {
        FcItemCell,
        FcCodeToQRCode
    },
    props: {
        data: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            teaGardenCodeSrc: '',
            containerCodeSrc: ''
        }
    },

    created() {
        const { teaGardenId, containerId } = this.data
        if (teaGardenId) {
            QRCode.toDataURL(teaGardenId).then((url) => {
                this.teaGardenCodeSrc = url
            })
        }

        if (containerId) {
            QRCode.toDataURL(containerId).then((url) => {
                this.containerCodeSrc = url
            })
        }

    },

    methods: {

        /** 
             预览码图片
            @param { Image } image 图片地址
            @return
        */
        previewCodeImage(image) {
            ImagePreview([image])
        },

        /** 
             预览工作中图片
            @param { Number } index 点击工作图片下标
            @return
        */
        previewWorkImage(index) {
            ImagePreview({
                images: this.data.imageUrl.split(','),
                startPosition: index
            })
        }
    },

}

</script>

<style scoped lang='scss'>
.taeGreenItem-infoItem-noflex {
        display: block !important;
    }
.taeGreenItem-infoItem {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    > img {
        position: relative;
        top: 0.06rem;
        display: block;
        width: 0.3rem;
        height: 0.3rem;
    }
    > div {
        margin-left: 0.16rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        color: #151515;
    }
    >.taeGreenItem-infoItem-label {
            color: #969799;
        }
    .taeGreenItem-qrcode {
        display: flex;
        flex-direction: row;
        // margin-right: 0.48rem;
        > img {
            // margin-left: 0.3rem;
            border: 1px solid #E1E1E1;
            margin: 0.2rem 0;
            width: 0.72rem;
            height: 0.72rem;
        }
    }

    .taeGreenItem-workImg {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        > img {
            margin-right: 0.2rem;
            margin-top: 0.24rem;
            width: 1.2rem;
            height: 0.9rem;
        }
        .taeGreenItem-qrcode-default {
            margin-bottom: 0.3rem;
        }
    }
}
.taeGreenItem-infoItem:last-child {
    margin-bottom: 0;
}
</style>