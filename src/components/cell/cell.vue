<template>
    <div class="title">
        <div class="title-left">
            <img class="title-left-icon" v-if="icon" :src="icon" alt="">
            <div v-else class="title-mark bgColor"></div>
            <div :class="`title-text ${isBold ? 'bold' : ''}`">{{ text }}</div>
            <div class="title-subtitle" v-if="subtitle">{{ subtitle }}</div>
        </div>
        <slot name="right">
            <div class="title-right" v-if="rightText" @click="handleClickRight">
                <div class="title-right-text">{{ rightText }}</div>
                <img src="@/components/images/title/right.png" alt="">
            </div>
        </slot>

        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'cell',

    components: {},
    props: {
        text: {
            type: String,
            default: ""
        },
        rightText: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        },
        isBold: {
            type: Boolean,
            default: false
        },
        subtitle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },

    mounted() { },

    methods: {
        /**
            处理点击右侧图标事件
            @param
            @return
        */
        handleClickRight() {
            this.$emit('clickRight')
        }
    },

}

</script>

<style scoped lang='scss'>
.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.22rem 0.28rem 0.16rem;
    .title-left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
	.title-left-icon {
		position: relative;
		top: -0.02rem;
		width: 0.3rem;
		height: 0.3rem;
	}
    .title-mark {
        width: 0.06rem;
        height: 0.32rem;
        border-radius: 0.04rem;
    }
    .title-text {
        margin-left: 0.12rem;
        font-size: 0.3rem;
        line-height: 0.42rem;
        color: #696969;
    }
    .title-subtitle {
        margin-left: 0.1rem;
        font-size: 0.26rem;
        line-height: 0.36rem;
        color: rgba(21, 21, 21, 0.5);
    }
    .title-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .title-right-text {
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: rgba(21, 21, 21, 0.45);
        }
        img {
            margin-left: 0.2rem;
            width: 0.18rem;
            height: 0.32rem;
        }
    }
}
</style>