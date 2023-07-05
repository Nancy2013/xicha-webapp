<template>
    <div class="agricultural-tabs">
        <div class="agricultural-tabItem" v-for="(item, key) in renderList" :key="key" @click="handleClickTab(item)">
            <div class="agricultural-tabItem-img">
                <img v-show="item.type == value" :src="item.activeIcon" alt="">
                <img v-show="item.type != value" :src="item.icon" alt="">
            </div>
            <div class="agricultural-tabItem-text">{{ item.text }} {{ totalData[item.totalDataKey] }}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'agriculturalTab', 
	components: {},
	props: {
		renderList: {
			type: Array,
			default: ()=> []
		},
		value: {
			type: Number | String,
			default: ''
        },
        totalData: {
            type: Object,
            default: () => {
                return {}
            }
        }
	},
	model: {
		prop: 'value',
		event: 'change'
	},
    data() {
        return {}
    },

    mounted() { 
        
    },

	methods: {
		/**
            处理点击tab事件
            @param { Object } tabItem 点击操作项的数据
            @return
        */
        handleClickTab(tabItem) {
            if (tabItem.type !== this.value) {
                this.$emit('change', tabItem.type)
            }
		}
	},

}

</script>

<style scoped lang='scss'>
.agricultural-tabs {
    height: 2.4rem;
    padding: 0 0.3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #eee;
    background-color: #fff;
}

.agricultural-tabItem {
    .agricultural-tabItem-img {
        width: 1.16rem;
        height: 1.16rem;
        > img {
            width: 100%;
            height: 100%;
        }
    }
    .agricultural-tabItem-text {
        margin-top: 0.2rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        text-align: center;
        color: #151515;
    }
}
</style>