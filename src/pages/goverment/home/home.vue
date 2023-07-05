<template>
    <FcPage title="石台硒产业生态数字大脑" ref="homePage" :showLeft="false">
        <div class="home">
            <!-- 介绍 -->
            <div class="home-introduction">
                <div class="home-introduction-text">
                    <p>
                        <span class="home-introduction-name">张丽丽</span>
                        <img src="@/assets/goverment/home/oval-icon.png" />
                        <label class="home-introduction-tag">政府管理员</label>
                    </p>
                    <p>
                        <label>上次登录:&nbsp;</label>
                        <span>2023/05/30</span>
                    </p>
                    <p>
                        <label>发放码量:&nbsp;</label>
                        <span>20,000</span>
                    </p>
                </div>
                <div class="home-introduction-img">
                    <img src="@/assets/goverment/home/back-icon.png" />
                </div>
            </div>
            <!-- 主内容 -->
            <div class="home-main">
                <!-- 我的待办 -->
                <div class="home-main-db">
                    <div class="main-db-text">
                        <img src="@/assets/goverment/home/text-icon.png" />
                        <span class="db-text-tag">茶企认证</span>
                        <span class="db-text-label">1条认证待审核</span>
                    </div>
                    <div class="main-db-num">
                        <span class="db-num-text">1</span>
                    </div>
                </div>
                <!-- 数据总览 -->
                <div class="home-main-zl">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>数据总览</label>
                    </div>
                    <div class="home-main-cards">
                        <div class="cards-item" v-for="(item, index) in sjzlInfos" :key="index"
                            :style="`background:${item.background}`">
                            <div class="cards-item-text">
                                <p><span>{{ item.title }}</span></p>
                                <p><label>{{ item.num }}</label><span>{{ item.unit }}</span></p>
                            </div>
                            <div class="cards-item-img">
                                <img :src="item.img" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 企业认证 -->
                <div class="home-main-rz">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>企业认证</label>
                    </div>
                    <div class="home-main-container">
                        <div class="home-main-echarts">
                            <div class="echarts-left-tooltip">
                                <div class="tooltip-item" v-for="(item, index) in rzinfos" :key="index">
                                    <div class="tooltip-item-icon" :style="`background:${item.icon}`"></div>
                                    <div class="tooltip-item-label">{{ item.type }}</div>
                                    <div class="tooltip-item-num">{{ item.num }}</div>
                                </div>
                            </div>
                            <div class="echarts-right-bar">
                                <div class="bar-item" v-for="(item, index) in rzinfos" :key="index">
                                    <div class="bar-item-active"
                                        :style="`background:${item.icon};height:${(item.num / item.count) * 100}%`"></div>
                                    <div class="bar-item-text">{{ item.type }}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 认证情况分析 -->
                        <div>
                            <div class="home-main-title" style="margin-top:0">
                                <img src="@/assets/goverment/home/angle-icon.png" />
                                <label>认证情况分析</label>
                            </div>
                            <div class="home-main-echarts">
                                <div class="echarts-linear" id="rzLinear"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 地块确权 -->
                <div class="home-main-qq">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>地块确权</label>
                    </div>
                    <div class="home-main-echarts home-main-background">
                        <div class="echarts-linear" id="dkLinear"></div>
                    </div>
                </div>
                <!-- 品牌及码量 -->
                <div class="home-main-ml">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>品牌及码量</label>
                    </div>
                    <div class="home-main-echarts home-main-background">
                        <div class="echarts-tabs">
                            <div :class="['echarts-tabs-item', item.active]" v-for="(item, index) in mlInfos" :key="index"
                                @click="() => activeChange(index, 'mlInfos')">
                                <span>{{ item.title }}</span>
                            </div>
                        </div>
                        <div class="echarts-circle" id="mlCircle"></div>
                    </div>
                </div>
                <!-- 品牌价值分析 -->
                <div class="home-main-cl">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>品牌价值分析</label>
                    </div>
                    <div class="home-main-echarts home-main-background">
                        <div class="echarts-linear" id="ppLinear"></div>
                    </div>
                </div>
                <!-- 销量分析 -->
                <div class="home-main-xl">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>销量分析</label>
                    </div>
                    <div class="home-main-echarts home-main-background">
                        <div class="echarts-tabs echarts-tabs-noFlex">
                            <div :class="['echarts-tabs-item', item.active]" v-for="(item, index) in xlInfos" :key="index"
                                @click="() => activeChange(index, 'xlInfos')">
                                <span>{{ item.title }}</span>
                            </div>
                        </div>
                        <div class="echarts-circle" id="xlCricle"></div>
                        <div class="echarts-title">
                            <img src="@/assets/goverment/home/angle-icon.png" />
                            <label>销量分析</label>
                        </div>
                        <div class="echarts-linear" id="xlLinear"></div>
                    </div>
                </div>
                <!-- 溯源数据分析 -->
                <div class="home-main-sy">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>溯源数据分析</label>
                    </div>
                    <div class="home-main-echarts home-main-background">
                        <div class="echarts-circle" id="syCricle"></div>
                        <div class="echarts-title">
                            <img src="@/assets/goverment/home/angle-icon.png" />
                            <label>认证情况分析</label>
                        </div>
                        <div class="echarts-linear" id="syLinear"></div>
                    </div>
                </div>
                <!-- 文旅活动 -->
                <div class="home-main-wl">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>文旅活动</label>
                    </div>
                    <div class="home-main-panels">
                        <div class="panels-item" v-for="(item, index) in wlhdInfos" :key="index"
                            :style="`background:url(${item.img})`">
                            <div class="panels-item-remark">
                                <span>{{ item.remark }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 热门浏览 -->
                <div class="home-main-ll">
                    <div class="home-main-title">
                        <img src="@/assets/goverment/home/angle-icon.png" />
                        <label>热门浏览</label>
                    </div>
                    <div class="home-main-panels">
                        <div class="panels-item" v-for="(item, index) in rmllInfos" :key="index"
                            :style="`background:url(${item.img})`">
                            <div class="panels-item-remark" style="height:0.8rem">
                                <span>{{ item.remark }}</span>
                            </div>
                            <template v-if="item.tag">
                                <div class="panels-item-tag">
                                    <span>{{ item.tag }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FcPage>
</template>

<script>
import CqzsIcon from '@/assets/goverment/home/cqzs-icon.png'
import CyzsIcon from '@/assets/goverment/home/cyzs-icon.png'
import PpzsIcon from '@/assets/goverment/home/ppzs-icon.png'
import ClzsIcon from '@/assets/goverment/home/clzs-icon.png'
import GrzsIcon from '@/assets/goverment/home/grzs-icon.png'
import wlhdOneImg from '@/assets/goverment/home/wlhd1-img.png'
import wlhdTwoImg from '@/assets/goverment/home/wlhd2-img.png'
import rmllOneImg from '@/assets/goverment/home/rmll1-img.png'
import rmllTwoImg from '@/assets/goverment/home/rmll2-img.png'
import { rzLinearCharts, dkLinearCharts, mlCircleCharts, ppLinearCharts, xlCircleCharts, xlLinearCharts, syLinearCharts, syCircleCharts } from './echarts'
export default {
    name: 'govermentHome',
    data() {
        return {
            wlhdInfos: [
                {
                    img: wlhdOneImg,
                    remark: '当520遇上519，爱在石台 这些景区福利惊...'
                },
                {
                    img: wlhdTwoImg,
                    remark: '春未尽，夏初临，来石台，领略山河美好'
                }
            ],
            rmllInfos: [
                {
                    img: rmllOneImg,
                    remark: '牯牛降景区',
                    tag: '￥90'
                },
                {
                    img: rmllTwoImg,
                    remark: '仙寓山景区',
                    tag: '￥30起'
                }
            ],
            sjzlInfos: [
                {
                    img: CqzsIcon,
                    title: '茶企总数',
                    num: 300,
                    unit: '家',
                    background: 'linear-gradient(138deg, #5565EF 0%, #5569ED 100%)'
                },
                {
                    img: CyzsIcon,
                    title: '茶园总数',
                    num: 8,
                    unit: '座',
                    background: 'linear-gradient(136deg, #03BBD8 0%, #0AB9D9 100%)'
                },
                {
                    img: PpzsIcon,
                    title: '品牌总数',
                    num: 56,
                    unit: '个',
                    background: 'linear-gradient(141deg, #61BDFF 0%, #61BBFE 100%)'
                },
                {
                    img: ClzsIcon,
                    title: '茶农总数',
                    num: 3060,
                    unit: '人',
                    background: 'linear-gradient(141deg, #61BDFF 0%, #61BBFE 100%)'
                },
                {
                    img: GrzsIcon,
                    title: '工人总数',
                    num: 2180,
                    unit: '人',
                    background: 'linear-gradient(138deg, #9494FF 0%, #808CF4 100%)'
                }
            ],
            rzinfos: [
                {
                    icon: '#6699FF',
                    type: '待认证',
                    num: 3,
                    count: 77
                },
                {
                    icon: '#52CCA3',
                    type: '已认证',
                    num: 58,
                    count: 77
                },
                {
                    icon: '#9580FF',
                    type: '已驳回',
                    num: 16,
                    count: 77
                }
            ],
            mlInfos: [
                {
                    active: 'active',
                    key: 'ppqys',
                    title: '品牌企业数'
                },
                {
                    active: '',
                    key: 'yspml',
                    title: '已审批码量'
                },
                {
                    active: '',
                    key: 'dspml',
                    title: '待审批码量'
                }
            ],
            xlInfos: [{ active: 'active', title: '按月' }, { active: '', title: '按年' }]
        }
    },
    mounted() {
        rzLinearCharts('rzLinear')
        dkLinearCharts('dkLinear')
        mlCircleCharts('mlCircle')
        ppLinearCharts('ppLinear')
        xlCircleCharts('xlCricle')
        xlLinearCharts('xlLinear')
        syCircleCharts('syCricle')
        syLinearCharts('syLinear')
    },
    methods: {
        activeChange(value, key) {
            this[key] = this[key].map((item, index) => {
                item.active = value == index ? 'active' : ''
                return item
            })
        }
    }
}
</script>
<style scoped lang="scss">
.active {
    background: #3D71F6 !important;
    color: #fff !important;
}

.home {
    overflow-y: auto;
    height: 100%;
    background-color: #f7f8fa;
}

.home-introduction {
    width: 7.5rem;
    height: 3.04rem;
    background: url('../../../assets/goverment/home/introduction-icon.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .home-introduction-text {
        >p {
            padding: 0 0 0 0.3rem;
            margin: 0 0 0.2rem 0;
            color: #fff;
            position: relative;
            letter-spacing: 0.01rem;

            .home-introduction-name {
                font-weight: 600;
                font-size: 0.4rem;
            }

            .home-introduction-tag {
                position: absolute;
                font-size: 0.2rem;
                width: 1.5rem;
                top: 0.35rem;
                right: 0.2rem;
            }

            >img {
                width: 60%;
                vertical-align: -0.3rem;
            }
        }
    }

    .home-introduction-img {
        >img {
            width: 70%;
            margin: 0 0 0 0.8rem;
        }
    }
}

.home-main {
    width: 7.5rem;
    margin: 0 0 0.6rem 0;
    background: #F7F8FA;
    box-shadow: 0 0.04rem 0.12rem 0.04rem rgba(241, 241, 241, 0.5);
    border-radius: 0.16rem;
}

// 我的待办
.home-main-db {
    margin: 0.34rem 0.32rem;
    padding: 0 0.2rem;
    background: #fff;
    border-radius: 0.04rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .main-db-text {
        padding: 0.2rem 0;
        display: inline-flex;
        align-items: center;

        >img {
            width: 0.7rem;
            margin: 0 0.2rem 0 0;
            border-right: 1px solid #d8d8d8;
            padding: 0 0.2rem 0 0;
        }

        >span {
            padding: 0.1rem 0.2rem;
        }

        .db-text-tag {
            background: #F4F4F4;
            border-radius: 0.04rem;
            color: #3D71F6;
        }

        .db-text-label {
            color: #666666;
        }
    }

    .main-db-num {
        width: 0.36rem;
        height: 0.36rem;
        text-align: center;
        background: #E03943;
        border-radius: 50%;
        color: #fff;
    }
}

.home-main-title {
    margin: 0.34rem 0.32rem;

    >img {
        width: 4%;
    }

    >label {
        vertical-align: 0.04rem;
    }
}

// 数据总览
.home-main-zl {
    .home-main-cards {
        display: flex;
        flex-wrap: wrap;
        margin: 0.3rem 0.32rem;

        .cards-item {
            width: 2.16rem;
            height: 2.6rem;
            margin: 0 0.19rem 0.2rem 0;
            border-radius: 0.16rem;
            position: relative;

            &:nth-child(3n) {
                margin-right: 0;
            }

            .cards-item-text {
                padding: 0 0 0 0.24rem;
                color: #fff;

                >p {
                    >label {
                        font-size: 0.4rem;
                        padding: 0 0.1rem 0 0;
                        font-weight: 600;
                    }
                }
            }

            .cards-item-img {
                position: absolute;
                bottom: -0.08rem;
                left: 0;
                text-align: right;

                >img {
                    width: 60%;
                }
            }
        }
    }
}

.home-main-container {
    background: #FFFFFF;
    margin: 0 0.34rem;
    box-shadow: 0 0.04rem 0.12rem 0.04rem rgba(241, 241, 241, 0.5);
    border-radius: 0.04rem;
}

.home-main-background {
    background: #FFFFFF;
    margin: 0 0.34rem;
    box-shadow: 0 0.04rem 0.12rem 0.04rem rgba(241, 241, 241, 0.5);
    border-radius: 0.04rem;
}

.home-main-echarts {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .echarts-left-tooltip {
        width: 45%;

        .tooltip-item {
            display: flex;
            align-items: center;
            padding: 0.16rem 0.4rem;

            .tooltip-item-icon {
                width: 0.18rem;
                height: 0.18rem;
                border-radius: 50%;
                margin: 0 0.2rem 0 0;
            }

            .tooltip-item-label {
                color: #969799;
                margin: 0 0.38rem 0 0;
            }
        }
    }

    .echarts-right-bar {
        display: flex;
        justify-content: space-around;
        width: 55%;

        .bar-item {
            position: relative;
            height: 2.6rem;
            width: 0.48rem;
            background: #EBEEF5;
            border-radius: 0.04rem;
            margin: 0.52rem 0 1.04rem 0;

            .bar-item-active {
                position: absolute;
                width: 100%;
                height: 1rem;
                bottom: 0;
                border-radius: 0.04rem;
            }

            .bar-item-text {
                position: absolute;
                bottom: -0.52rem;
                left: -0.32rem;
                width: 1rem;
                color: #969799;
            }
        }
    }

    .echarts-linear {
        width: 100%;
        height: 5rem;
    }

    .echarts-tabs-noFlex {
        justify-content: flex-start !important;
    }

    .echarts-tabs {
        margin: 0.36rem 0.2rem;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        .echarts-tabs-item {
            background: #F4F4F4;
            color: #333;
            padding: 0.14rem 0.2rem;
            border-radius: 0.04rem;
            border: none;
            cursor: pointer;
            margin: 0 0.1rem;

            >span {
                font-size: 0.28rem;
            }
        }
    }

    .echarts-circle {
        width: 100%;
        height: 4rem;
    }

    .echarts-title {
        margin: 0.34rem 0.32rem;

        >img {
            width: 0.3rem;
        }

        >label {
            vertical-align: 0.04rem;
        }
    }
}

.home-main-panels {
    height: 3.22rem;
    background: #FFFFFF;
    box-shadow: 0px 0.04rem 0.12rem 0.04rem rgba(241, 241, 241, 0.5);
    border-radius: 0.04rem;
    margin: 0 0.34rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    >.panels-item {
        margin: 0.16rem 0.14rem;
        width: 3.2rem;
        height: 2.9rem;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        position: relative;

        >.panels-item-remark {
            position: absolute;
            width: 100%;
            bottom: 0.06rem;
            background: rgba(238, 243, 255, 0.7);
            height: 1.2rem;
            display: flex;
            align-items: center;

            >span {
                font-size: 0.28rem;
                padding: 0 0.1rem;
                letter-spacing: 0.01rem;
            }
        }

        >.panels-item-tag {
            position: absolute;
            background: url('./../../../assets/goverment/home/rectangle-icon.png');
            height: 1.2rem;
            background-size: contain;
            background-repeat: no-repeat;
            width: 1rem;
            right: 0;
            display: flex;
            justify-content: center;
            padding: 0.14rem 0 0 0;

            >span {
                font-size: 0.25rem;
                color: #fff;
            }
        }
    }
}</style>
