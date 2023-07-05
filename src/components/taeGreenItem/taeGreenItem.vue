<template>
    <div class="taeGreenItem">
        <div class="taeGreenItem-title">
            <div class="taeGreenItem-title-icon"></div>
            <!-- <img src="@/components/images/taeGreenItem/title.png" alt=""> -->
            <div class="taeGreenItem-title-text">结算:&nbsp;&nbsp;{{ data.weight ? data.weight : 0 }}kg</div>
            <template v-if="['特级', 'S级'].includes(data.breedNum)">
                <div v-if="data.breedNum" class="taeGreenItem-title-breedNum">
                    <template v-if="data.breedNum == '特级'">
                        <img src="@/components/images/taeGreenItem/breedNum.png" />
                    </template>
                    <template v-if="data.breedNum == 'S级'">
                        <img src="@/components/images/taeGreenItem/sbreedNum.png" />
                    </template>
                    <span class="taeGreenItem-breedNum-text">{{ data.breedNum }}</span>
                </div>
            </template>
            <template v-else>
                <div v-if="data.breedNum" class="taeGreenItem-ntitle-breedNum">
                    <span class="taeGreenItem-breedNum-text">{{ data.breedNum }}</span>
                </div>
            </template>
        </div>
        <div class="taeGreenItem-content">
            <div v-if="data.settlerContent" class="taeGreenItem-infoItem">
                <!-- <img src="@/components/images/taeGreenItem/user.png" alt=""> -->
                <div class="taeGreenItem-infoItem-label">结算人</div>
                <!-- {{ data.assignPersonName }} -->
                <div>{{ data.settlerContent }}</div>
            </div>
            <div class="taeGreenItem-infoItem" v-if="data.operatePersonContent">
                <!-- <img src="@/components/images/taeGreenItem/worker.png" alt=""> -->
                <div class="taeGreenItem-infoItem-label">茶园工</div>
                <div>{{ data.operatePersonContent }}</div>
            </div>
            <div class="taeGreenItem-infoItem" v-if="data.estimateEndTime">
                <!-- <img src="@/components/images/taeGreenItem/tradeTime.png" alt=""> -->
                <div class="taeGreenItem-infoItem-label">结算时间</div>
                <div>{{ data.estimateEndTime }}</div>
            </div>
            <!-- <img src="@/components/images/taeGreenItem/tradeTime.png" alt=""> -->
            <Collapse v-model="activeCodeList" :border="false">
                <CollapseItem name="2">
                    <template #title>
                        <div class="taeGreenItem-infoItem" v-if="data.settlerBatchCode">
                            <div class="taeGreenItem-infoItem-label">结算批次码</div>
                            <div style="display: inline-flex;align-items: center;">
                                <div>{{ data.settlerBatchCode }}</div>
                                <div class="taeGreenItem-infoItem-arrow"><img
                                        :class="`${activeCodeList.length ? 'taeGreenItem-pickInfo-title-img-up' : ''}`"
                                        src="@/components/images/taeGreenItem/down.png" alt="" /></div>
                            </div>
                        </div>
                    </template>
                    <div class="taeGreenItem-qrcode">
                        <FcCodeToQRCode
                            :code="`https://zhiyun.cn88555.com/frontend/weixin/code?code=${decodeURI(data.settlerBatchCode)}`"
                            v-if="data.settlerBatchCode" @click="previewCodeImage"></FcCodeToQRCode>
                    </div>
                </CollapseItem>
            </Collapse>
        </div>

        <div class="taeGreenItem-pickInfo">
            <Collapse v-model="activeNameList">
                <CollapseItem name="1">
                    <template #title>
                        <div class="taeGreenItem-pickInfo-title">
                            <div>采摘信息</div>
                            <div class="taeGreenItem-pickInfo-arrow"><img
                                    :class="`${activeNameList.length ? 'taeGreenItem-pickInfo-title-img-up' : ''}`"
                                    src="@/components/images/taeGreenItem/down.png" /></div>
                        </div>
                    </template>
                    <div class="taeGreenItem-pickInfo-list">
                        <FcPickInfo :data="data"></FcPickInfo>
                    </div>
                </CollapseItem>
            </Collapse>

        </div>
    </div>
</template>

<script>
import { Collapse, CollapseItem, ImagePreview } from 'vant'
import FcPickInfo from '@/components/pickInfo/pickInfo.vue'
import FcCodeToQRCode from '@/components/codeToQRcode/codeToQRcode.vue'
export default {
    name: 'taeGreenItem',

    components: {
        Collapse,
        CollapseItem,
        FcPickInfo,
        FcCodeToQRCode
    },
    props: {
        type: {
            type: String,
            default: 'staff' // staff || enterprise
        },
        data: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            activeNameList: [],
            activeCodeList: []
        }
    },

    mounted() { },

    methods: {
        /** 
             预览码图片
            @param { Image } image 图片地址
            @return
        */
        previewCodeImage(image) {
            ImagePreview([image])
        },
    },

}

</script>

<style scoped lang='scss'>
.taeGreenItem {
    overflow: hidden;
    margin-top: 0.2rem;
    background-color: #fff;
    border-radius: 0.08rem;
    margin: 0.2rem 0.32rem;

    .taeGreenItem-qrcode {
        display: flex;
        flex-direction: row;

        // margin-right: 0.48rem;
        >img {
            // margin-left: 0.3rem;
            border: 1px solid #E1E1E1;
            margin: 0.2rem 0;
            width: 0.72rem;
            height: 0.72rem;
        }
    }

    .taeGreenItem-title {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1.02rem;
        // padding-left: 0.3rem;
        border-bottom: 1px solid #eee;

        >.taeGreenItem-title-icon {
            width: 0.08rem;
            height: 0.34rem;
            background: linear-gradient(138deg, #A0B4FA 0%, #6980E9 100%);
            border-radius: 0.08rem;
        }

        >img {
            width: 0.32rem;
            height: 0.32rem;
        }

        >.taeGreenItem-title-text {
            margin-left: 0.16rem;
            padding-left: 0.15rem;
            color: #151515;
            font-weight: bold;
        }

        .taeGreenItem-title-breedNum {
            color: #fff;
            position: absolute;
            right: 0rem;
            top: 0;
            bottom: 0;
            margin: auto 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            // padding: 0 0.26rem;
            height: 0.44rem;

            // border-radius: 0.08rem;
            // border: 1px solid #ff5b00;
            // font-size: 0.24rem;
            // line-height: 0.24rem;
            // color: #FF5B00;
            // background: #ffe7df;
            >.taeGreenItem-breedNum-text {
                position: absolute;

            }

            >img {
                width: 80%;
            }
        }
    }

    .taeGreenItem-ntitle-breedNum {
        color: #333;
        position: absolute;
        right: 0.2rem;
        top: 0;
        bottom: 0;
        margin: auto 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        // padding: 0 0.26rem;
        height: 0.44rem;

        >.taeGreenItem-breedNum-text {
            position: static;
        }
    }

    .taeGreenItem-content,
    .taeGreenItem-pickInfo {
        padding: 0.3rem;
        border-bottom: 1px solid #eee;

        /deep/ .van-collapse {
            .van-collapse-item__title {
                padding: 0.2rem 0;
            }

            .van-collapse-item__content {
                padding: 0 0.2rem 0.2rem;
            }

            i {
                display: none;
            }
        }
    }

    .taeGreenItem-infoItem {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        >img {
            position: relative;
            top: 0.06rem;
            display: block;
            width: 0.3rem;
            height: 0.3rem;
        }

        >div {
            margin-left: 0.16rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #151515;
        }

        .taeGreenItem-infoItem-arrow {
            display: inline-block;
            border-radius: 50%;
            width: 0.32rem;
            height: 0.32rem;
            background: #ECECEC;
            margin-left: 0.12rem;

            >img {
                margin-left: 0.05rem;
                width: 0.22rem;
                height: 0.15rem;
                vertical-align: 0.08rem;
                transition: transform 0.2s;
            }

            >.taeGreenItem-pickInfo-title-img-up {
                transform: rotate(180deg);
            }
        }

        >.taeGreenItem-infoItem-label {
            color: #969799;
        }
    }

    .taeGreenItem-infoItem:last-child {
        margin-bottom: 0;
    }

    .taeGreenItem-pickInfo {
        padding: 0;

        .taeGreenItem-pickInfo-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            height: 0.94rem;
            padding-left: 0.46rem;
            color: #696969;
            border-bottom: 1px solid #eee;

            div {
                font-size: 0.26rem;
            }

            .taeGreenItem-pickInfo-arrow {
                border-radius: 50%;
                width: 0.32rem;
                height: 0.32rem;
                background: #ECECEC;
                margin-left: 0.12rem;
            }

            img {
                margin-left: 0.05rem;
                width: 0.22rem;
                height: 0.15rem;
                vertical-align: 0.08rem;
                transition: transform 0.2s;
            }

            .taeGreenItem-pickInfo-title-img-up {
                transform: rotate(180deg);
            }
        }

        /deep/ .van-collapse {
            .van-collapse-item__title {
                padding: 0;
            }

            i {
                display: none;
            }

            .van-collapse-item__title--expanded::after {
                display: none;
            }

            .van-collapse-item__content {
                padding: 0;
            }
        }

        /deep/ .van-hairline--top-bottom::after {
            display: none;
        }

        .taeGreenItem-pickInfo-list {
            padding: 0 0.3rem 0.3rem;
        }
    }
}</style>