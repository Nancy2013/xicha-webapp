<template>
    <FcPage title="石台硒茶" :showLeft="false">
        <div class="my">
            <FcStaffHeader :userData="userData"></FcStaffHeader>
            <div class="my-content">
                <div class="my-work" v-if="roleId == roleTypeDict.teaGardener">
                    <FcCell right-text="全部工单" text="农事工单" @clickRight="handleClickRight(workTypeDict.farming)"></FcCell>
                    <div class="my-work-list">
                        <div class="my-work-item" v-for="(item, key) in myRenderList" :key="key" @click="handleClickWork(item, workTypeDict.farming)">
                            <img :src="item.icon" alt="">
                            <div>{{ item.text }}</div>
                        </div>
                    </div>
                </div>

                <div class="my-work" v-if="roleId == roleTypeDict.packer">
                    <FcCell right-text="全部工单" text="包装工单" @clickRight="handleClickRight(workTypeDict.productPackaging)"></FcCell>
                    <div class="my-work-list">
                        <div class="my-work-item" v-for="(item, key) in myRenderList" :key="key" @click="handleClickWork(item, workTypeDict.productPackaging)">
                            <img :src="item.icon" alt="">
                            <div>{{ item.text }}</div>
                        </div>
                    </div>
                </div>

                <div class="my-moduleList">
                    <div class="my-moduleItem" v-for="(item, key) in myModuleRenderList" :key="key">
                        <img class="my-moduleItem-icon" :src="item.icon" alt="">
                        <div class="my-moduleItem-box">
                            <div class="my-moduleItem-text">{{ item.text }}</div>
                            <img class="my-moduleItem-right" src="@/assets/common/right.png" alt="">
                            <div class="my-moduleItem-line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </FcPage>

</template>

<script>
import FcCell from "@/components/cell/cell.vue"
import workImg from '@/assets/staff/my/index/work.png'
import { roleTypeDict, workTypeDict } from '@/utils/dict'
import { getRenderMyWorkList, getRenderMyModuleList, getRoleName } from './config'
import FcStaffHeader from '@/components/staffHeader/staffHeader.vue'
import { userDatatorage } from '@/utils/storage'
export default {
    name: 'my',
    components: {
        FcCell,
        FcStaffHeader
    },
    data() {
        return {
            workImg: workImg,
            userData: userDatatorage.getUserData(),
            myRenderList: getRenderMyWorkList(),
            roleTypeDict: roleTypeDict,
            workTypeDict: workTypeDict,
            myModuleRenderList: getRenderMyModuleList(),
            roleId: localStorage.getItem('roleId')
        }
    },

    created() {
        this.$set(this.userData, 'roleName', getRoleName(this.roleId))
    },

    methods: {
        /**
            处理点击农事工单title事件
            @param { String } workType 工单类型
            @return
        */
        handleClickRight(workType) {
            this.$router.push({
                name: 'workOrderList', query: {
                    wt: workType
                }
            })
        },

        /**
            处理点击工单项事件
            @param { Object } item 工单项数据
            @param { String } workType 工单类型
            @return
        */
        handleClickWork(item, workType) {
            this.$router.push({
                name: 'workOrderList', params: { type: item.type }, query: {
                    wt: workType
                }
            })
        }
    },

}

</script>

<style scoped lang='scss'>
.my {
    height: 100%;
    background: #f7f8fa;
}

.my-content {
    position: relative;
    top: -1.26rem;
}

.my-work {
    z-index: 2;
    position: relative;
    margin: 0 0.3rem;

    height: 2.78rem;
    border-radius: 0.08rem;
    background-size: 100% 100%;
    background-image: url(~@/assets/staff/my/index/work-bg.png);

    /deep/ .title {
        .title-mark {
            display: none;
        }
        .title-text {
            margin-left: 0.12rem;
            font-weight: 600;
            font-size: 0.32rem;
            line-height: 0.44rem;
            color: #222;
        }
        .title-right {
            .title-right-text {
                font-size: 0.32rem;
                line-height: 0.44rem;
                color: #969799;
            }
        }
    }
    .my-work-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.2rem 0.6rem 0.32rem;
    }
    .my-work-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        //width: 1.16rem;
        img {
            width: 0.7rem;
            height: 0.7rem;
        }
        div {
            margin-top: 0.22rem;
            font-size: 0.24rem;
            line-height: 0.3rem;
            text-align: center;
            color: #191919;
        }
    }
}

.my-moduleList {
    overflow: hidden;
    position: relative;
    top: -0.04rem;
    margin: 0.24rem 0.32rem 0;
    border-radius: 0.08rem;
    background-color: #fff;
}

.my-moduleItem {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0.324rem 0 0.34rem 0.3rem;
    .my-moduleItem-icon {
        width: 0.32rem;
        height: 0.32rem;
    }

    .my-moduleItem-box {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 0.2rem;
        padding-right: 0.3rem;
        .my-moduleItem-text {
            line-height: 0.42rem;
            color: #151515;
        }
        .my-moduleItem-right {
            width: 0.14rem;
            height: 0.24rem;
        }
        .my-moduleItem-line {
            position: absolute;
            bottom: -0.32rem;
            left: 0;
            right: 0;
            height: 1px;
            background-color: #eee;
        }
    }
}

.my-moduleItem:last-child {
    .my-moduleItem-line {
        display: none;
    }
}
</style>