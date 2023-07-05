<template>
    <div class="authorItem whiteBg">
        <SwipeCell :before-close="beforeSwipeCellClose" :name="data.id" :disabled="data.status != authorStatusDict.wait">
            <div class="authorItem-item-box">
                <FcItemTitle :title="`申请码量 ${filterKilobitSplit(data.applyCount)}`" :img="statusImgObj[data.status]"></FcItemTitle>
                <div class="authorItem-content">
                    <FcItemCell :text="`申请品牌：${data.brand}`" :img="require('@/components/images/taeGreenItem/desc.png')"></FcItemCell>
                    <FcItemCell :text="`申请时间：${data.createTime}`" :img="require('@/components/images/taeGreenItem/complateTime.png')"></FcItemCell>
                    <FcItemCell v-if="data.status == authorStatusDict.reject" :text="`驳回原因：${data.reason}`" :img="require('@/components/images/taeGreenItem/workCode.png')"></FcItemCell>
                    <div class="authorItem-other" v-if="data.status == authorStatusDict.charge">
                        <FcItemCell color="#629B88" :text="`实际授权：${data.actualCount}`" :img="require('@/components/images/authorItem/realCharge.png')"></FcItemCell>
                        <FcItemCell color="#629B88" :text="`授权时间：${data.updateTime}`" :img="require('@/components/images/authorItem/chargeTime.png')"></FcItemCell>
                    </div>
                    <FcEdit v-if="data.status == authorStatusDict.wait" @edit="handleEdit(data)"></FcEdit>
                </div>
            </div>

            <template #right>
                <div class="agricultural-item-delete">
                    <img src="@/components/images/agriculturalList/delete.png" alt="">
                </div>
            </template>
        </SwipeCell>
    </div>
</template>

<script>
import { SwipeCell, Dialog } from 'vant'
import { authorStatusDict } from '@/utils/dict'
import FcItemCell from '@/components/itemCell/itemCell.vue'
import FcEdit from '@/components/edit/edit.vue'
import FcItemTitle from '@/components/itemTitle/itemTitle.vue'
import waitImg from '@/components/images/teaConfirmList/wait.png'
import chargeImg from '@/components/images/authorItem/charge.png'
import rejectImg from '@/components/images/teaConfirmList/reject.png'
import { filterKilobitSplit } from "@/utils/filters"
export default {
    name: 'authorList',

    components: {
        FcEdit,
        FcItemCell,
        SwipeCell,
        FcItemTitle,

    },
    props: {
        data: {
            type: Object,
            default: () => { }
        },
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
    data() {
        return {
            authorStatusDict: authorStatusDict,
            filterKilobitSplit: filterKilobitSplit,
            statusImgObj: {
                '0': waitImg,
                '1': chargeImg,
                '2': rejectImg
            }
        }
    },

    mounted() { },

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
            处理点击编辑事件
            @param { Object } item 工单项
            @return
        */
        handleEdit(item) {
            this.$emit('edit', item)
        },
    },

}

</script>

<style scoped lang='scss'>
.authorItem {
    overflow: hidden;
    margin-bottom: 0.2rem;
    border-radius: 0.08rem;
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
.authorItem-content {
    padding: 0.3rem 0.3rem 0;
}

.authorItem-item-box {
    padding-bottom: 0.3rem;
}

.authorItem-other {
    border-top: 1px dashed #EEEEEE;
    padding-top: 0.18rem;
}
</style>