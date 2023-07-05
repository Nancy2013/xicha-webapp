<template>
    <div class="teaConfirmItem">
        <div class="teaConfirmItem-item-box">
            <div class="teaConfirmItem-tip">
                <img src="@/assets/enterprise/app/teaConfirmList/tip.png" alt="">
            </div>
            <FcItemTitle :title="data.teaGardenName">
                <template #sub>
                    <div class="teaConfirmItem-subTitle">
                        <img v-if="confirmStatusData.img" :src="confirmStatusData.img" alt="">
                        <span v-if="confirmStatusData.text">{{ confirmStatusData.text }}</span>
                    </div>
                </template>
            </FcItemTitle>
            <div class="teaConfirmItem-content">
                <FcItemCell label="茶园面积：" :text="`${data.teaGardenArea}亩`"></FcItemCell>
                <FcItemCell label="茶园地址：" :text="`${data.teaGardenAddress}`"></FcItemCell>
                <FcItemCell v-if="data.authorizedStatus == teaConfirmStatusDict.complate" label="确权时间：" :text="`${data.applyTime}`"></FcItemCell>
                <FcItemCell v-if="data.authorizedStatus == teaConfirmStatusDict.reject" :text="`驳回原因：${data.personInCharge}`"></FcItemCell>
                <!-- <FcEdit v-if="data.status == teaConfirmStatusDict.wait" @edit="handleEdit(data)"></FcEdit> -->

            </div>

            <div class="teaConfirmItem-handle" v-if="data.authorizedStatus == teaConfirmStatusDict.unconfirmed">
                <div>
                    <FcButton customStyle="font-size: 0.28rem" plain text="删除" @click="handleDelete"></FcButton>
                </div>
                <div>
                    <FcButton customStyle="font-size: 0.28rem" plain text="编辑" @click="handleEdit"></FcButton>
                </div>
                <div>
                    <FcButton customStyle="font-size: 0.28rem" text="申请确权" @click="handleApply"></FcButton>
                </div>
            </div>

            <div class="teaConfirmItem-handle" v-if="data.authorizedStatus == teaConfirmStatusDict.wait">
                <div>
                    <FcButton customStyle="font-size: 0.28rem" text="查看" @click="handleView"></FcButton>
                </div>
            </div>

            <div class="teaConfirmItem-handle" v-if="data.authorizedStatus == teaConfirmStatusDict.complate">
                <div>
                    <FcButton customStyle="font-size: 0.28rem" plain text="编辑" @click="handleEdit"></FcButton>
                </div>
                <div>
                    <FcButton customStyle="font-size: 0.28rem" text="查看" @click="handleView"></FcButton>
                </div>
            </div>

            <div class="teaConfirmItem-handle" v-if="data.authorizedStatus == teaConfirmStatusDict.reject">
                <div>
                    <FcButton customStyle="font-size: 0.28rem" plain text="编辑" @click="handleEdit"></FcButton>
                </div>
                <div>
                    <FcButton customStyle="font-size: 0.28rem" text="申请确权" @click="handleApply"></FcButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant'
import FcButton from '@/components/button/button.vue'
import { teaConfirmStatusDict } from '@/utils/dict'
import FcItemTitle from '@/components/itemTitle/itemTitle.vue'
import FcEdit from '@/components/edit/edit.vue'
import FcEmpty from '@/components/empty/empty.vue'
import FcItemCell from '@/components/itemCell/itemCell.vue'
import waitImg from '@/components/images/teaConfirmList/wait.png'
import complateImg from '@/components/images/teaConfirmList/complate.png'
import rejectImg from '@/components/images/teaConfirmList/reject.png'
import { confirmStatusRenderConfig } from './config'
export default {
    name: 'teaConfirmList',

    components: {
        FcEmpty,
        FcButton,
        FcItemTitle,
        FcItemCell,
        FcEdit,
        Dialog
    },
    props: {
        data: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            statusImgObj: {
                '0': waitImg,
                '1': complateImg,
                '2': rejectImg
            },
            confirmStatusData: {},
            teaConfirmStatusDict: teaConfirmStatusDict
        }
    },
    computed: {
        /**
            是否显示已加载全部
            @param 
            @return { Boolean } 是否显示已加载全部
        */
        showAll() {
            if (this.count > 0) {
                if (this.count <= this.page * this.limit) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    },

    mounted() {
        this.confirmStatusData = confirmStatusRenderConfig[this.data.authorizedStatus] || {}
    },

    methods: {
        /**
            自定义滑动单元格关闭时的行为
            @param { Object } object 事件参数对象 
            @param { Object } item 点击的工单项数据 
            @param { Number } key 点击工单项的下标 
            @return
        */
        beforeSwipeCellClose({ name, position, instance }) {
            switch (position) {
                case 'right':
                    Dialog.confirm({
                        message: '确定删除吗？',
                    }).then(() => {
                        this.$emit('delete', {
                            callback: () => { instance.close() }
                        })

                    });
                    break;
            }
        },

        /**
            点击删除按钮时触发
            @param { Object } item 确权项
            @return
        */
        handleDelete() {
            Dialog.confirm({
                message: '确定删除吗？',
            }).then(() => {
                this.$emit('delete')
            });
        },

        /**
            点击申请确权按钮时触发
            @param { Object } item 确权项
            @return
        */
        handleApply() {
            Dialog.confirm({
                message: '确定开始确权申请吗？',
            }).then(() => {
                this.$emit('apply')
            });
        },

        /**
            处理点击编辑事件
            @param { Object } item 工单项
            @return
        */
        handleEdit(item) {
            this.$emit('edit', item)
        },

        /**
            处理点击申请确权事件
            @param
            @return
        */
        handleApply() {
            Dialog.confirm({
                message: '确定申请确权该茶园？',
            }).then(() => {
                this.$emit('apply')
            });
        },

        /**
            处理点击查看事件
            @param
            @return
        */
        handleView() {
            this.$emit('view')
        }
    },

}

</script>

<style scoped lang='scss'>
.teaConfirmList {
    padding: 0 0.3rem;
}
.teaConfirmItem {
    overflow: hidden;
    margin: 0 0.32rem 0.2rem;
    border-radius: 0.04rem;
    background-color: #fff;
    box-shadow: 0 0.04rem 0.12rem 0.04rem rgba(241, 241, 241, 0.5);
}

.teaConfirmItem-item-box {
    position: relative;
    padding: 0 0.24rem;
    /deep/ .itemTitle {
        padding: 0;
    }
}

.teaConfirmItem-tip {
    position: absolute;
    left: 0;
    top: 0.32rem;
    width: 0.08rem;
    height: 0.3rem;
    img {
        width: 100%;
        height: 100%;
    }
}

.teaConfirmItem-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 1.02rem;
    border-bottom: 1px solid #eee;
    > div {
        font-weight: 600;
    }
    > img {
        width: 1.36rem;
        height: 0.44rem;
    }
}

.teaConfirmItem-subTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
        width: 0.46rem;
        height: 0.46rem;
    }
    span {
        margin-left: 0.16rem;
        font-size: 0.32rem;
        color: #222;
        font-weight: 400;
    }
}

.teaConfirmItem-content {
    overflow: hidden;
    padding: 0.24rem 0 0.32rem;
    border-bottom: 1px solid #eeeeee;
    .teaConfirmItem-infoItem {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.2rem;
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
    }
    .teaConfirmItem-infoItem:last-child {
        margin-bottom: 0;
    }
}

.teaConfirmItem {
    .agricultural-item-delete {
        width: 1.04rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #cf3723;
        > img {
            width: 0.4rem;
            height: 0.4rem;
        }
    }
}

.teaConfirmItem-handle {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.24rem 0.24rem 0.28rem 0;
    height: 1.08rem;
    > div {
        margin-left: 0.12rem;
        width: 1.72rem;
        height: 0.56rem;
    }
}
</style>