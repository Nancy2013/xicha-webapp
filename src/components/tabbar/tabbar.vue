<template>
    <div class="tabbar">
        <!-- <div class="tabbar-qrcode" @click="handleShowQrcode" v-if="isShowQrcode">
            <img :src="require('@/assets/staff/index/qrcodeTab-select.png')" alt="">
            <div>身份码</div>
        </div> -->
        <div v-for="(tabbarItem, tabbarKey) in renderList" :key="tabbarKey" class="tabbar-item" @click="hanldeClickTab(tabbarItem,tabbarKey)">
            <div :class="`tabbar-item-box`">
                <div>
                    <div class="tabbar-item-icon" :style="`width: ${tabbarItem.width}; height: ${tabbarItem.height}`">
                        <img v-show="tabIndex != tabbarKey && tabIndex != tabbarItem.key" :src="tabbarItem.icon" alt="">
                        <img v-show="tabIndex == tabbarKey || tabIndex == tabbarItem.key" :src="tabbarItem.activeIcon" alt="">
                    </div>
                </div>
                <div :class="`tabbar-item-text ${tabIndex == tabbarKey || tabIndex == tabbarItem.key ? 'color' : 'plainColor'}`">{{ tabbarItem.text }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'tabbar',

    components: {

    },
    model: {
        prop: 'tabIndex',
        event: 'change'
    },
    props: {
        renderList: {
            type: Array,
            default: () => []
        },
        tabIndex: {
            type: Number | String,
            default: 0
        },
        isShowQrcode: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {}
    },

    mounted() { },

    methods: {
        /**
            点击tabbar项时触发
			@param { Object } item 点击tabbar的数据
            @param { Number } index 点击tabbar的下标
            @return
        */
		hanldeClickTab(item, index) {
            if(item.routeType) {
               this.handleShowQrcode()
            } else {
                this.$emit('change', item.key ? item.key : index)
                this.$emit('clickTab', item)
            }
        },

        /**
            处理点击qrcode事件
            @param
            @return
        */
        handleShowQrcode() {
            this.$emit('showQrcode')
        }
    },

}

</script>

<style scoped lang='scss'>
.tabbar {
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.5rem;
    padding: 0 0.24rem;
    border-radius: 0.48rem 0.48rem 0 0 ;
    //border-top: 1px solid #eeeeee;
    //background-color: #fff;
    //backdrop-filter: blur(16px);
    background: linear-gradient(275deg, #f4f7fd 0%, #FFFFFF 36%, #FEFEFF 68%, #f4f7fd 100%, rgba(255,255,255,0) 100%);
    .color {
        color: #185EF0;
    }
    .tabbar-item {
        min-width: 1.2rem;
        position: relative;
        .tabbar-item-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
			align-items: center;
        }
        .tabbar-item-icon {
            
            width: 0.48rem;
            height: 0.48rem;
			
            img {
                width: 100%;
                height: 100%;
            }
        }
        .tabbar-item-text {
            margin-top: 1px;
            font-size: 0.24rem;
            line-height: 0.34rem;
            //zoom: 0.84;
            transition: all 0.2;
        }
    }
    .tabbar-item:last-child {
        padding-left: 0;
        
        
    }
    .tabbar-qrcode {
		z-index: 9;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1.92rem;
        height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
        margin: auto;
        img {
            width: 0.64rem;
            height: 0.64rem;
        }
    }
}
</style>