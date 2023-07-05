<template>
    <div :class="`page ${isTitleCover ? 'page-titleCover' : ''} ${className}`">
		<div :class="`page-title ${isBorder || !isTitleCover ? 'page-title-border' : ''}`" v-if="!isWechat">
			<div class="page-title-left" v-if="showLeft" @click="handleClickLeft">
				<slot name="left">
					<img v-if="leftType === 'back'" src="@/components/images/page/left.png" alt="">
					<img v-if="leftType === 'home'" src="@/components/images/page/home.png" alt="">
				</slot>
			</div>
			<div ref="page-title-content" class="page-title-content">{{ title }}</div>
			<div class="page-title-right" v-if="showRight">
				<slot name="right">
					<img src="@/components/images/page/close.png" alt="">
				</slot>
			</div>
		</div>
		<div :class="`page-content ${isWechat ? 'page-content-wechat' : ''}`">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { is_weixin } from '@/utils/common.js'
export default {
    name: '',

	components: {},
	props: {
		title: {
			type: String,
			default: ""
		},
		showLeft: {
			type: Boolean,
			default: true
		},
		leftType: {
			type: String,
			default: 'back'  // back, home
		},
		showRight: {
			type: Boolean,
			default: false
		},
		className: {
			type: String,
			default: ""
		},
		isBorder: {
			type: Boolean,
			default: false
		},
		isTitleCover: {
			type: Boolean,
			default: false
		}

	},
    data() {
		return {
			isWechat: is_weixin()
		}
    },

	mounted() { 
		if (this.isWechat) {
			document.title = this.title
		} else {
			
		}
	},

	methods: {
		/**
            设置title的颜色、
            @param { String } bgcolor title的背景颜色
			@param { String } color title的字体颜色
            @return
        */
		setTitleColor(bgcolor, color) {
			const titleConentEle = this.$refs['page-title-content']
			titleConentEle.style.backgroundColor = bgcolor
			titleConentEle.style.color = color
		},

		/**
            点击左侧按钮时触发
            @param 
            @return
        */
		handleClickLeft() {
			if (this.leftType === 'back') {
				this.$router.back(-1)
			}
			this.$emit('clickLeft')
		}
	},

}

</script>

<style scoped lang='scss'>
.page {
	height: 100%;
}
.page-title {
	z-index: 9;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 0.88rem;
	background-color: #fff;
}
.page-title-border {
	border-bottom: 1px solid #eee;
}
.page-title-left {
	position: absolute;
	left: 0.3rem;
	top: 0;
	bottom: 0;
	display: flex;
	min-width: 0.8rem;
	flex-direction: row;
	align-items: center;
	img {
		width: 0.4rem;
		height: 0.4rem;
	}
}

.page-title-content {
	font-size: 0.34rem;
	line-height: 0.88rem;
	text-align: center;
	color: #191919;

}

.page-title-right {
	position: absolute;
	right: 0.3rem;
	top: 0;
	bottom: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.page-content {
	position: absolute;
	top: 0.88rem;
	left: 0;
	right: 0;
	bottom: 0;
	min-height: 12rem;
}
.page-content-wechat {
	top: 0;
}

.page-titleCover {
	.page-title {
		background-color: transparent;
	}
	.page-content  {
		top: 0;
	}
	.page-title-content {
		color: #fff;
	}
	.page-content {
		bottom: 1rem;
		border-top: none;
	}
}
</style>