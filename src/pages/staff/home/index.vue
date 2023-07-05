<template>
    <FcPage title="石台硒茶" :showLeft="false">
        <div class="home">
            <div class="home-title">
                <!-- <Swipe class="home-title-swipe" :autoplay="3000" indicator-color="white">
                    <SwipeItem>
                        <div class="home-title-swipe-content" style="background-color: #5a96ec;">1</div>
                    </SwipeItem>
                    <SwipeItem>
                        <div class="home-title-swipe-content" style="background-color: #67c23a;">2</div>
                    </SwipeItem>
                    <SwipeItem>
                        <div class="home-title-swipe-content" style="background-color: #4ffeda;">3</div>
                    </SwipeItem>
                    <SwipeItem>
                        <div class="home-title-swipe-content" style="background-color: #0ff234;">4</div>
                    </SwipeItem>
                </Swipe> -->
                <img class="home-banner-title" src="@/assets/staff/home/index/banner-title.png" alt="">
                <img class="home-banner-subTitle" src="@/assets/staff/home/index/banner-subTitle.png" alt="">
            </div>

            <div :class="`home-content ${operateList.length <= 2 ? 'home-content-min' : ''}`">
                <div class="home-operateItem" v-for="(item, key) in operateList" :key="key" @click="handleClickOperate(item)">
                    <div class="home-operateItem-img">
                        <img :style="`height: ${item.imgHeight}`" :src="item.img" alt="">
                        <div v-if="key === 0 && waitExecuteCount > 0" class="home-operateItem-badge white">{{
                            waitExecuteCount }}</div>
                    </div>
                    <div class="home-operateItem-text">{{ item.text }}</div>
                </div>
            </div>

            <div class="home-bottom">
                <FcCell text="政策信息"></FcCell>
                <div class="home-bottom-essayList">
                    <div v-for="(essayItem, essayKey) in essayList" :key="essayKey" class="home-bottom-essayItem" @click="goLink(essayItem)">
                        <div class="home-bottom-essayItem-img">
                            <VanImage fit="contain" width="2rem" height="1.6rem" :src="essayItem.icon"></VanImage>
                        </div>
                        <div class="home-bottom-essayItem-content">
                            <div class="home-bottom-essayItem-title">{{ essayItem.title }}</div>
                            <div class="home-bottom-essayItem-text text_ellipsis">{{ essayItem.content }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FcPage>
</template>

<script>
import { Swipe, SwipeItem, Image as VanImage } from 'vant';
import { getOperateList } from './config'
import { isEmpty } from '@/utils/common'
import { staffUserDatatorage } from '@/utils/storage'
import { agriculturalStatusDict } from '@/utils/dict'
import { policyRenderList } from '@/pages/enterprise/home/config'
import FcCell from "@/components/cell/cell.vue"
export default {
    name: 'home',
    components: {
        Swipe,
        SwipeItem,
        VanImage,
        FcCell
    },

    data() {
        return {
            operateList: [],
            essayList: policyRenderList,
            userData: staffUserDatatorage.getUserData(),
            waitExecuteCount: 0
        }
    },

    created() {
        //localStorage.setItem("roleId", '14')
        const roleId = localStorage.getItem('roleId')
        this.operateList = getOperateList(roleId)
    },

    methods: {
        /**
            获取待执行农事数量
            @param { Number } index 点击操作项的下标
            @return
        */
        getWaitAgriculturalCount() {
            this.$axios({
                url: '/teaAction/getCountByUserIdAndStatus',
                data: {
                    operateStatus: agriculturalStatusDict.waitExecute,
                    operatePerson: this.userData.userId
                }
            }).then((res) => {
                this.waitExecuteCount = res.data.count
            })
        },
        /**
            处理点击操作项的事件
            @param { Object } item 点击操作项的数据
            @return
        */
        handleClickOperate(item) {
            if (!isEmpty(item.router)) {
                this.$router.push({
                    path: item.router,
                    query: {
                        wt: item.workType
                    }
                })
            }
        },
        /**
         去外部链接
         @param { Object } item 新闻项
         @return
         */
        goLink(item) {
            location.href = item.link
        }
    },

}

</script>

<style scoped lang='scss'>
.home {
    position: relative;
    height: 100%;
    background-color: #f5f5f5;
}

.home-title {
    height: 4rem;
    background-image: url("~@/assets/staff/home/index/banner-new.png");
    background-size: 100% 100%;

    .home-title-swipe-content {
        height: 3.76rem;
    }

    >>> .van-swipe__indicator {
        height: 0.08rem;
        width: 0.08rem;
    }

    >>> .van-swipe__indicator--active {
        width: 0.26rem;
        height: 0.08rem;
        border-radius: 0.04rem;
        background-color: #629b88 !important;
    }

    .home-banner-title {
        position: absolute;
        top: 1.24rem;
        left: 0;
        right: 0;
        margin: 0 0.3rem;
        width: 2.36rem;
        height: 0.48rem;
    }

    .home-banner-subTitle {
        position: absolute;
        top: 2.02rem;
        left: 0;
        right: 0;
        margin: 0 0.35rem;
        width: 2.84rem;
        height: 0.3rem;
    }
}

.home-content {
    height: 2.6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0.4rem 0.2rem 0;
    background-color: #fff;
    margin: -0.8rem 0.32rem;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    opacity: 1;

    .home-operateItem {
        // width: 1.76rem;
        .home-operateItem-img {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 0.96rem;
            height: 0.96rem;
            box-shadow: 0px 0.08rem 0.32rem 0px rgba(0,0,0,0.08);
            border-radius: 50%;

            // img {
            //     width: 0.84rem;
            // }
            .home-operateItem-badge {
                position: absolute;
                padding: 0 0.04rem;
                right: 0.04rem;
                top: 1px;
                height: 0.44rem;
                min-width: 0.44rem;
                border-radius: 0.22rem;
                font-size: 0.26rem;
                line-height: 0.44rem;
                text-align: center;
                background-color: #f15132;
            }
        }

        .home-operateItem-text {
            margin-top: 0.2rem;
            font-size: 0.28rem;
            text-align: center;
            color: #191919;
        }
    }
}

.home-content-min {
    padding-left: 0.78rem;
    justify-content: flex-start;
    .home-operateItem {
        margin-right: 0.72rem;
    }
}

.home-bottom {
    overflow: auto;
    position: absolute;
    top: 6rem;
    bottom: 0;
    left: 0;
    right: 0;

    // background-color: #fff;
    .home-bottom-essayList {
        overflow: auto;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 1rem;
        top: 0.8rem;
        margin: 0.2rem;
        padding: 0.2rem 0.2rem 0;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);

        .home-bottom-essayItem {
            display: flex;
            flex-direction: row;
            padding: 0 0.3rem 0;

            .home-bottom-essayItem-img {
                overflow: hidden;
                width: 2rem;
                height: 2.2rem;
                padding: 0.3rem 0rem;
                border-radius: 0.08rem;
            }

            .home-bottom-essayItem-content {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 0.3rem;
                padding: 0.3rem 0;
                flex: 1;
                border-bottom: 1px solid #eeeeee;

                .home-bottom-essayItem-title {
                    line-height: 0.42rem;
                    color: #191919;
                }

                .home-bottom-essayItem-text {
                    width: 4.56rem;
                    font-size: 0.24rem;
                    line-height: 0.34rem;
                    color: rgba(25, 25, 25, 0.6);
                }
            }
        }

        .home-bottom-essayItem:last-child {
            .home-bottom-essayItem-content {
                border-bottom: none;
            }
        }
    }
}
</style>