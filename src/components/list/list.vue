<template>
    <div class="fcList" ref="fcList" @scroll="handleScoll">
        <slot></slot>
        <FcEmpty v-if="!count && loaded"></FcEmpty>
        <div class="taeGreen-all" v-if="showAll">已加载全部</div>
        <Overlay :show="!loaded" :zIndex="11" class-name="fcList-overlay">
            <div class="loading">
                <Loading color="#fff" size="40px" vertical text-color="#fff">加载中...</Loading>
            </div>
        </Overlay>
    </div>
</template>

<script>
import FcEmpty from '@/components/empty/empty.vue'
import FcLoading from '@/components/loading/loading.vue'
import { throttleFnc } from '@/utils/common'
import { Overlay, Loading } from 'vant'
export default {
    name: 'fcList',

    components: {
        Overlay,
        FcEmpty,
        FcLoading,
        Loading
    },
    props: {
        count: {   // 分页总数
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 0
        },
        loaded: {
            type: Boolean,
            default: false
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
                if (this.loaded && this.count <= this.page * this.limit) {
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
            loading: true
        }
    },

    mounted() { },

    methods: {
        /**
            处理容器滚动事件
            @param 
            @return
        */
        handleScoll: throttleFnc(function (callback, event) {
            if (event.target.scrollTop >= event.target.scrollHeight - (event.target.clientHeight + 150)) {
                if (this.page * this.limit < this.count) {
                    this.$emit("scrolltolower", callback)
                } else {
                    callback()
                }
            } else {
                callback()
            }
        })
    },

}

</script>

<style scoped lang='scss'>
.fcList {
    padding: 0 0 0.3rem;
    height: 100%;
    overflow-y: auto;
    .fcList-overlay {
        position: absolute;
    }
    .loading {
        padding-top: 1rem;
    }
}
</style>