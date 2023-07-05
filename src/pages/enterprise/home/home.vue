<template>
    <FcPage title="石台硒茶" ref="homePage" :showLeft="false">
        <div class="home" @scroll="hanldeHomeScroll">
            <div class="home-title">
                <div class="home-title-content">
                    <!-- <img src="@/assets/staff/my/index/avatar.png" alt=""> -->
                    <div class="home-info">
                        <div class="home-name">
                            <div class="text_ellipsis">Hi {{ userData.userName }}</div>
                        </div>
                        <div class="home-role">西黄山茶企茶园工</div>
                    </div>
                </div>
                <div class="home-title-shadow"></div>
            </div>

            <div class="home-content" ref="home-content">
                <div class="home-app">
                    <div class="home-app-item" v-for="(item, key) in appRenderList" :key="key" @click="handleClickMenu(item)">
                        <div class="home-app-item-icon">
                            <img :style="{ width: item.width, height: item.height }" :src="item.icon" alt="">
                        </div>
                        <div class="home-app-item-text">{{ item.text }}</div>
                    </div>
                </div>

                <div class="home-pending whiteBg shadow radius">
                    <div class="home-pending-content">
                        <div class="home-pending-title">
                            <div>我的</div>
                            <div>代办</div>
                        </div>
                        <Swipe :show-indicators="false" vertical autoplay="3000" duration="200">
                            <SwipeItem v-for="(item, key) in pendingList" :key="key">
                                <div class="home-pending-item">
                                    <div>
                                        <div class="home-pending-item-title">【石台香芽】
                                            <div class="home-pending-item-dot dangerBg"></div>
                                        </div>
                                        <div class="home-pending-item-remake">1条生产工单待审批</div>
                                    </div>
                                    <div class="home-pending-item-btn">待审批</div>
                                    <!-- <img src="@/assets/enterprise/home/home/waitApproval.png" alt=""> -->
                                </div>
                            </SwipeItem>
                        </Swipe>
                    </div>
                </div>

                <div class="home-overview">
                    <FcCell text="数据总览" isBold></FcCell>
                    <div class="home-overview-list">
                        <div class="home-overview-item" :style="`background-image: url(${item.icon})`" v-for="(item, key) in overviewRenderList" :key="key">
                            <div class="home-overview-item-title">{{ item.title }}</div>
                            <div class="home-overview-item-value">
                                <span>{{ overviewData[item.titleKey] }}</span>
                                <span>{{ item.unit }}</span>
                            </div>
                            <div class="home-overview-item-subtitle">{{ item.subtitle }}{{ overviewData[item.subtitleKey] }}{{ item.unit }}</div>
                            <!-- <div class="home-overview-item-subtitle">{{ item.subtitle }}</div>
                            <div class="home-overview-item-value" v-if="item.subtitle">
                                <span class="color">{{ overviewData[item.subtitleKey] }}</span>
                                <span>{{ item.unit }}</span>
                            </div> -->
                        </div>

                        <div class="home-overview-item home-overview-item-hidden " v-for="(item, index) in replenishNum" :key="index+ 'a'"></div>
                    </div>
                </div>

                <div class="home-video">
                    <FcCell text="实时视频" isBold :subtitle="`${serialList.length ? `(${serialList.length})` : ''}`"></FcCell>
                    <div class="home-video-list">
                        <div class="home-video-item" v-for="(item, key) in  serialList" :key="key">
                            <div class="home-video-item-coverBox" @click="playLive(item)">
                                <VanImage fit="cover" width="2.96rem" height="2.12rem" :src="item.coverImg"></VanImage>
                                <img class="home-video-item-play" src="@/assets/enterprise/home/home/play.png" alt="">
                            </div>
                            <div class="home-video-item-detail">
                                <img src="@/assets/enterprise/home/home/location.png" alt="">
                                <div class="text_ellipsis">西黄山1号茶园</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 异常信息 -->
                <div class="home-unusual">
                    <FcCell text="异常信息" isBold subtitle="(2)"></FcCell>
                    <div class="home-unusual-list">
                        <div class="home-unusual-item radius shadow whiteBg" v-for="(item, key) in 2" :key="key">
                            <div class="home-unusual-item-left">
                                <img class="home-unusual-item-img" src="@/assets/enterprise/home/home/warning-red.png" alt="" />
                                <div class="home-unusual-item-desc">
                                    <div>土壤湿度过低</div>
                                    <div :class="`${key ? 'home-unusual-item-desc-low' : 'home-unusual-item-desc-high'}`">超过预警值3℃</div>
                                </div>
                            </div>
                            <div class="home-unusual-item-location">
                                <div class="text_ellipsis">温度大棚1</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="home-device radius">
                    <FcCell text="设备运行" isBold></FcCell>
                    <div class="home-device-list radius shadow whiteBg">
                        <div class="home-device-item radius" v-for="(item, key) in deviceRenderList" :key="key">
                            <img class="home-device-item-img" :src="item.bgImg" alt="">
                            <div class="home-device-item-value">{{ deviceData[item.key] }}</div>
                            <div class="home-device-item-label">{{ item.text }}</div>
                        </div>
                    </div>
                    <!-- <div class="home-device-bottom">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div> -->
                </div>

                <div class="home-prod">
                    <FcCell text="实时生产" isBold></FcCell>
                    <div class="home-prod-content whiteBg radius">
                        <div order="1" class="home-prod-charts" ref="home-prod-charts"></div>
                        <!-- <div class="home-prod-list" order="2">
                            <div class="home-prod-item">
                                <div class="home-prod-item-row">
                                    <div>石台香芽</div>
                                    <div class="home-prod-item-label">75%</div>
                                </div>
                                <div class="home-prod-item-row">
                                    <div>原料 200kg</div>
                                    <div>产出 150kg</div>
                                </div>
                            </div>
                            <div class="home-prod-item">
                                <div class="home-prod-item-row">
                                    <div>石台富硒茶</div>
                                    <div class="home-prod-item-label">25%</div>
                                </div>
                                <div class="home-prod-item-row">
                                    <div>原料 200kg</div>
                                    <div>产出 50kg</div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>

                <div class="home-sales whiteBg radius">
                    <FcCell text="销售分析" isBold>
                        <template slot="right"></template>
                    </FcCell>
                    <div class="home-sales-charts" ref="home-sales-charts"></div>
                </div>

                <div class="home-policy">
                    <FcCell text="政策信息" isBold></FcCell>
                    <div class="home-policy-list whiteBg radius shadow">
                        <div class="home-policy-item" v-for="(item, key) in policyRenderList" :key="key" @click="goLink(item)">
                            <div class="home-policy-item-img">
                                <VanImage fit="contain" width="1.56rem" height="1.56rem" :src="item.icon"></VanImage>
                            </div>
                            <div class="home-policy-item-text">
                                <div class="home-policy-item-title text_ellipsis3">{{ item.title }}</div>
                                <div class="home-policy-item-content text_ellipsis">{{ item.content }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="home-travel">
                    <FcCell text="文旅活动" isBold></FcCell>
                    <div class="home-travel-list">
                        <div class="home-travel-item whiteBg radius" v-for="(item, key) in travelRenderList" :key="key" @click="goLink(item)">
                            <!-- <img src="" alt=""> -->
                            <VanImage fit="cover" width="3.3rem" height="2.9rem" :src="item.icon"></VanImage>
                            <div class="home-travel-item-title">
                                <span class="text_ellipsis2">{{ item.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="deviceSerial-player" class="deviceSerial-player"></div>
            <FcLoading :isShow="isShowLoading" text="正在获取监控资源..."></FcLoading>
        </div>
    </FcPage>
</template>

<script>
import FcCell from '@/components/cell/cell.vue'
import { Swipe, SwipeItem, Image as VanImage } from 'vant';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, TitleComponent, ToolboxComponent, GridComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { enterpriseUserDataStorage } from '@/utils/storage'
import FcLoading from "@/components/loading/loading.vue"
import liveCoverImg1 from "@/assets/enterprise/home/home/liveCover_1.png"
import liveCoverImg2 from "@/assets/enterprise/home/home/liveCover_2.png"
echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    TitleComponent,
    ToolboxComponent,
    GridComponent,
    LineChart,
    UniversalTransition
]);
import { getOverviewRenderList, getAppRenderList, getDeviceRenderList, overviewData, deviceData, getProdChartData, salesChartData, policyRenderList, travelRenderList } from './config'
export default {
    name: 'enterpriseHome',

    components: {
        VanImage,
        FcCell,
        Swipe,
        SwipeItem,
        FcLoading
    },

    data() {
        return {
            userInfo: { name: '111' },
            overviewRenderList: [],
            appRenderList: getAppRenderList(),
            deviceRenderList: getDeviceRenderList(),
            replenishNum: 0,
            pendingList: [1],
            homeContentTop: 0,
            overviewData: overviewData,
            deviceData: deviceData,
            userData: enterpriseUserDataStorage.getUserData(),
            serialList: [],
            policyRenderList: policyRenderList,
            travelRenderList: travelRenderList,
            Aliplayer: null,
            isShowLoading: false
        }
    },
    created() {
        const overviewRenderList = getOverviewRenderList()
        const renderLen = overviewRenderList.length, remainder = renderLen % 2
        this.replenishNum = remainder ? 2 - remainder : 0
        this.overviewRenderList = overviewRenderList
        this.getYSToken()
    },
    mounted() {
        this.homeContentTop = this.$refs['home-content'].offsetTop || 170
        const prodChart = echarts.init(this.$refs['home-prod-charts'])
        const salesChart = echarts.init(this.$refs['home-sales-charts'])
        prodChart.setOption(getProdChartData())
        salesChart.setOption({
            ...salesChartData
        })
    },

    methods: {
        /**
         * 获取萤石云Token
         *@param 
         *@return
         */
        getYSToken() {
            this.$axios({
                url: 'fcapi/ys/sensor/video/serial',
                method: "GET",
                baseUrl: '/'
            }).then((res) => {
                if (Array.isArray(res.data) && res.data.length) {
                    this.serialList = res.data.map((item, key) => {
                        return {
                            ...item,
                            coverImg: key % 2 ? liveCoverImg2 : liveCoverImg1
                        }
                    })
                    //this.getYSLive(res.data[0].deviceSerial, 0)
                } else {
                    this.serialList = []
                }
            })
        },
        /**
         * 播放实时视频
         *@param 
         *@return
         */
        playLive(item) {
            let vm = this
            vm.isShowLoading = true
            this.$axios({
                url: '/fcapi/ys/sensor/video/address',
                method: "GET",
                data: {
                    deviceSerial: item.deviceSerial
                }
            }).then((res) => {
                if (this.Aliplayer) {   //如果存在播放数据 销毁之前的播放数据
                    this.Aliplayer.dispose()
                    this.Aliplayer = null
                }
                this.$nextTick(() => {
                    new Aliplayer({
                        id: `deviceSerial-player`,
                        isLive: true,
                        autoplay: true,
                        width: '100%',
                        height: "100%",
                        source: res.data,
                        enableSystemMenu: true
                    }, function (player) {
                        vm.Aliplayer = player
                        player.play()
                        player.on("playing", function () {
                            vm.isShowLoading = false
                            setTimeout(() => {
                                player.fullscreenService.requestFullScreen()
                            }, 100)
                        })
                        player.on("cancelFullScreen", function () {
                            vm.Aliplayer.dispose()
                            vm.Aliplayer = null
                        })

                    })

                })
            }).catch(() => {
                vm.isShowLoading = false
            })
        },
        /**
         处理home页面滚动事件
         @param { Event } event 滚动事件参数
         @return
         */
        hanldeHomeScroll(event) {
            const scrollTop = event.target.scrollTop || 0, ratio = scrollTop / this.homeContentTop
            const bgAlpha = ratio >= 1 ? 1 : ratio
            let color = ""
            if (ratio >= 0.5) {
                color = `rgba(0, 0, 0, ${bgAlpha})`
            } else {
                color = `rgba(255, 255, 255, ${1 - ratio})`
            }
            this.$refs.homePage.setTitleColor(`rgba(255, 255, 255, ${bgAlpha})`, color)
        },

        /**
         去外部链接
         @param { Object } item 新闻项
         @return
         */
        goLink(item) {
            location.href = item.link
        },

        /**
         处理点击应用事件
         @param { Object } item 应用项
         @return
         */
        handleClickMenu(item) {
            if (item.route === "more") {
                this.$emit("goApp", "app")
            } else {
                this.$router.push(item.route)
            }
        }
    },

}

</script>

<style scoped lang='scss'>
.home {
    overflow-y: auto;
    height: 100%;
    background-color: #f7f8fa;
    .title {
        padding-left: 0.24rem;
        padding-bottom: 0.2rem;
    }
}
.home-title {
    position: relative;
    width: 100%;
    height: 4.04rem;
    background-image: url("~@/assets/enterprise/home/home/home-title.png");
    background-size: 100% 100%;
    .home-title-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        top: 1.06rem;
        left: 0.3rem;
        .home-info {
            margin-left: 0.32rem;
        }
        .home-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            > div:nth-child(1) {
                max-width: 5.2rem;
                font-size: 0.48rem;
                line-height: 0.62rem;
                color: #fff;
            }
        }
        .home-role {
            margin-top: 0.14rem;
            font-size: 0.24rem;
            color: #fff;
        }
    }

    .home-title-shadow {
        position: absolute;
        bottom: -0.32rem;
        left: 0;
        right: 0;
        width: 6.86rem;
        height: 1.42rem;
        margin: 0 auto;
        border-radius: 0.04rem;
        background-color: rgba(241, 248, 255, 0.33);
        transform: rotate(5.26deg);
    }
}

.home-content {
    position: relative;
    top: -1.2rem;
    padding: 0 0.3rem 0.4rem;
}

.home-overview {
    margin-top: 0.2rem;
    padding: 0 0 0.06rem 0;
    border-radius: 0.08rem;
    .home-overview-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        //padding: 0 0.3rem;
    }
    .home-overview-item {
        width: 3.32rem;
        padding: 0.2rem 0 0.24rem 0.26rem;
        margin-bottom: 0.2rem;
        //background-image: url("~@/assets/enterprise/home/home/overviewItem-bg.png");
        background-size: 100% 100%;
        .home-overview-item-title {
            font-size: 0.24rem;
            line-height: 0.37rem;
            color: #fff;
        }
        .home-overview-item-value {
            overflow: hidden;
            margin-top: -0.04rem;
            margin-left: 0.04rem;
            color: #fff;
            > span:nth-child(1) {
                float: left;
                font-size: 0.32rem;
                line-height: 0.37rem;
                font-weight: bold;
            }
            > span:nth-child(2) {
                position: relative;
                float: left;
                top: 0.04rem;
                margin-left: 1px;
                font-size: 0.24rem;
                line-height: 0.36rem;
            }
        }
        .home-overview-item-subtitle {
            display: inline-block;
            margin-top: 0.2rem;
            margin-left: 1px;
            padding: 0.04rem 0.14rem;
            border-radius: 0.46rem;
            font-size: 0.24rem;
            line-height: 0.34rem;
            border: 1px solid rgba(255, 255, 255, 0.5);
            color: #fff;
            background: rgba(255, 255, 255, 0.22);
        }
    }

    .home-overview-item-hidden {
        visibility: hidden;
    }
}

.home-pending {
    //padding-bottom: 0.26rem;
    margin-top: 0.32rem;
    height: 1rem;
    border-radius: 0.04rem;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 0, 0, 0.08);
    background-color: #f1f8ff;
    .home-pending-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1rem;
        overflow: hidden;
        .home-pending-title {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 0.92rem;
            height: 1rem;
            background-image: url(~@/assets/enterprise/home/home/pending-icon.png);
            background-size: 100% 100%;
            > div {
                font-size: 0.24rem;
                line-height: 0.34rem;
                color: #fff;
            }
            > div:nth-child(1) {
                margin-bottom: 0.02rem;
            }
        }

        /deep/ .van-swipe {
            flex: 1;
        }
        .home-pending-item {
            padding: 0 0.24rem 0 0.22rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            width: 100%;
            > div {
                position: relative;
            }
            .home-pending-item-title {
                position: relative;
                display: inline;
                font-size: 0.28rem;
                line-height: 0.4rem;
                color: #151515;
                .home-pending-item-dot {
                    position: absolute;
                    width: 0.1rem;
                    height: 0.1rem;
                    right: -0.12rem;
                    top: -0.06rem;
                    border-radius: 50%;
                }
            }
            .home-pending-item-remake {
                margin-top: 0.08rem;
                margin-left: 0.14rem;
                font-size: 0.24rem;
                color: #666;
            }
            .home-pending-item-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 0.56rem;
                padding: 0 0.3rem;
                border-radius: 0.04rem;
                font-size: 0.28rem;
                color: #fff;
                background-color: #185ef0;
            }
        }
    }
}

.home-app {
    z-index: 2;
    position: relative;
    padding: 0.32rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0.04rem;
    background-color: #fff;
    .home-app-item {
        width: 0.96rem;
    }
    .home-app-item-icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 0.96rem;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0px 0.08rem 0.32rem 0 rgba(0, 0, 0, 0.08);
        > img {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
    .home-app-item-text {
        margin-top: 0.2rem;
        font-size: 0.24rem;
        line-height: 0.26rem;
        text-align: center;
        color: #222;
    }
}

.home-video {
    .title {
        padding-top: 0.12rem;
    }
    .home-video-list {
        width: 100%;
        overflow-x: auto;
        display: flex;
        flex-direction: row;
        min-height: 2.12rem;
    }
    .home-video-item {
        position: relative;
        margin-right: 0.2rem;
        .home-video-item-coverBox {
            overflow: hidden;
            position: relative;
            width: 2.96rem;
            height: 2.12rem;
            border-radius: 0.08rem;
            // .home-video-item-cover {
            //     width: 100%;
            //     height: 100%;
            //     background-color: rgba(103, 194, 58, 0.5);
            // }
            .home-video-item-play {
                z-index: 2;
                position: absolute;
                left: 0;
                top: 0.5rem;
                right: 0;
                width: 0.62rem;
                height: 0.6rem;
                margin: auto;
            }
        }
        .home-video-item-detail {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin-top: 0.16rem;
            height: 0.62rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background: rgba(238,243,255,0.8);
            backdrop-filter: blur(0.06rem);
            > img {
                width: 0.2rem;
                height: 0.28rem;
            }
            > div {
                max-width: 1.6rem;
                margin-left: 0.24rem;
                font-size: 0.24rem;
                line-height: 0.24rem;
                color: #222;
            }
        }
    }

    .home-video-item:last-child {
        margin-right: 0;
    }
}

.home-unusual {
    .home-unusual-list {
        //padding: 0 0.3rem 0.2rem 0.48rem;
    }
    .home-unusual-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        height: 1.5rem;
        padding: 0 0.24rem 0 0.56rem;
        .home-unusual-item-img {
            width: 0.68rem;
            height: 0.7rem;
        }
        .home-unusual-item-desc {
            margin-left: 0.32rem;
            > div:nth-child(1) {
                margin-bottom: 0.16rem;
                font-size: 0.28rem;
                line-height: 0.4rem;
                color: #151515;
            }
            > div:nth-child(2) {
                font-size: 0.24rem;
                line-height: 0.34rem;
            }
            .home-unusual-item-desc-low {
                color: #da2626;
            }
            .home-unusual-item-desc-high {
                color: #2c72ff;
            }
        }
        .home-unusual-item-left {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .home-unusual-item-location {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0.12rem 0.3rem;
            background-color: #185ef0;
            > div {
                font-size: 0.28rem;
                line-height: 0.4rem;
                color: #fff;
            }
        }
    }
    .home-unusual-item:last-child {
        margin-bottom: 0.18rem;
    }
}

.home-device {
    overflow: hidden;
    .home-device-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.28rem 0.1rem 0.48rem 0.12rem;
    }
    .home-device-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 2.08rem;
        width: 2.08rem;
        padding-top: 0.18rem;
        background-color: #F7F7F7;
        .home-device-item-img {
            width: 0.9rem;
            height: 0.84rem;
            margin-bottom: 0.06rem;
        }
        .home-device-item-value {
            //margin-bottom: 0.12rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            font-weight: bold;
            color: #00B77A;
        }
        .home-device-item-label {

            font-size: 0.26rem;
            line-height: 0.36rem;
            color: #151515;
        }
    }

    .home-device-bottom {
        margin-top: 0.38rem;
        height: 0.14rem;
        display: flex;
        flex-direction: row;
        > div:nth-child(1) {
            width: 3.72rem;
            background-color: #629b88;
        }
        > div:nth-child(2) {
            width: 2.08rem;
            background-color: #a9ae44;
        }
        > div:nth-child(3) {
            flex: 1;
            background-color: #11d8c5;
        }
    }
}

.home-prod {
    margin-top: 0.2rem;
    .home-prod-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 5.08rem;
        padding-right: 0.3rem;
        padding-bottom: 0.3rem;
    }
    .home-prod-charts {
        flex: 1;
        //height: 2.44rem;
        height: 5.08rem;
    }
    .home-prod-list {
        .home-prod-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 3.8rem;
            height: 1.16rem;
            margin-bottom: 0.12rem;
            padding: 0 0.16rem 0 0.48rem;
            background-image: url("~@/assets/enterprise/home/home/prodItemBg-1.png");
            background-size: 100% 100%;
            .home-prod-item-row {
                .home-prod-item-label {
                    font-size: 0.36rem;
                    line-height: 0.5rem;
                    color: #629b88;
                }
            }
        }
        > div:nth-child(2) {
            margin-bottom: 0;
            background-image: url("~@/assets/enterprise/home/home/prodItemBg-2.png");
            .home-prod-item-label {
                color: #a9ae44;
            }
        }
        .home-prod-item-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .home-prod-item-row:nth-child(1) {
            margin-bottom: 0.12rem;
            > div {
                font-size: 0.26rem;
                line-height: 0.36rem;
                color: #151515;
            }
        }
        .home-prod-item-row:nth-child(2) {
            > div {
                font-size: 0.26rem;
                line-height: 0.36rem;
                color: rgba(21, 21, 21, 0.65);
            }
        }
    }
}

.home-sales {
    margin-top: 0.2rem;
    .home-sales-charts {
        height: 5.16rem;
    }
}

.home-policy {
    .home-policy-list {
        padding-top: 0.54rem;
        //margin-top: 0.08rem;
    }
    .home-policy-item {
        display: flex;
        flex-direction: row;
        
        padding-left: 0.3rem;
        margin-bottom: 0.48rem;
        .home-policy-item-img {
            width: 1.56rem;
            height: 1.56rem;
        }
        .home-policy-item-text {
            margin-left: 0.16rem;
            width: 4rem;
            flex: 1;
            height: 1.9rem;
            padding-bottom: 0.3rem;
            padding-right: 0.3rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            //justify-content: space-between;
            //border-bottom: 1px solid #eeeeee;
            .home-policy-item-title {
                line-height: 0.42rem;
                color: #191919;
            }
            .home-policy-item-content {
                margin-top: 0.16rem;
                font-size: 0.24rem;
                line-height: 0.34rem;
                color: rgba(21, 21, 21, 0.6);
            }
        }
    }
    .home-policy-item:last-child {
        .home-policy-item-text {
            border-bottom: none;
        }
    }
}

.home-travel {
    .home-travel-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .home-travel-item {
        position: relative;
        width: 3.3rem;
        margin-bottom: 0.2rem;
        // > img {
        //     display: block;
        //     height: 1.6rem;
        //     background-color: #629b88;
        // }
        .home-travel-item-title {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 0.8rem;
            padding: 0 0.16rem;
            background: rgba(238,243,255,0.8);
            backdrop-filter: blur(0.1rem);
            // background-size: 100% 100%;
            // background-image: url(~@/assets/enterprise/home/home/travel-cover.png);
            span {
                font-size: 0.28rem;
                line-height: 0.4rem;
                color: #191919;
            }
        }
    }
}

.deviceSerial-player {
    position: fixed;
    left: -9999px;
}
</style>