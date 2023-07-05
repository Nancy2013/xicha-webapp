<template>
	<Popup v-model="isShow" :close-on-click-overlay="false" @click-overlay="handleClickOverlay">
		<div class="dialog">
			<div class="dialog-title">
				<div class="dialog-close" @click="handleCancel">
					<img :src="close" />
				</div>
				<slot name="title">
					{{ title }}
				</slot>
			</div>
			<div class="dialog-content">
				<slot>

				</slot>
			</div>
			<div class="dialog-bottom">
				<slot name="bottom">
					<div class="submit bgColor white" @click="handleConfirm">
						{{ confirmText }}
					</div>
				</slot>
			</div>
		</div>
	</Popup>
</template>

<script>
import close from "@/assets/enterprise/app/securityAlarm/close.png";
import { Popup } from 'vant';
export default {
	name: 'FcDialog',
	components: {
		Popup,
	},
	model: {
		prop: 'isShow',
		event: 'handle'
	},
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '提示'
		},
		confirmText: {
			type: String,
			default: '确定'
		},
		clickOverlay: { // 遮罩图层是否可点击
			type: Boolean,
			default: false
		},

	},
	data() {
		return {
			close,
		}
	},

	mounted() { },

	methods: {
		/**
		 * 处理
		*/
		handleConfirm() {
			this.$emit('confirm', false)
		},

		/**
		 * 关闭
		*/
		handleCancel() {
			this.$emit('cancel', false)
		},

		/**
		 * 点击遮罩层时触发时触发
		*/
		handleClickOverlay() {
			const { clickOverlay } = this;
			if (clickOverlay) {
				this.$emit('cancel')
			}
		}
	},

}

</script>

<style scoped lang='scss'>
.van-popup {
	border-radius: 0.24rem;
}

.dialog {
	width: 6.3rem;
	border-radius: 0.24rem;
	padding: .26rem;
	background: linear-gradient(180deg, #DDE7FF 0%, rgba(210, 232, 255, 0) 100%);

	.dialog-title {
		padding: 0.3rem 0;
		text-align: center;
		line-height: 0.42rem;
		font-weight: 600;
		color: #222222;
		font-size: .4rem;
		position: relative;
		background: url(~@/assets/enterprise/app/securityAlarm/infoIcon.png) no-repeat;
		background-size: contain;
		background-position: right .46rem top 0;
		.dialog-close {
			position: absolute;
			right:0;
			top:0;
			img {
				width: .46rem;
				height: .46rem;
			}
		}
	}

	.dialog-bottom {
		display: flex;
		flex-direction: row;

		div {
			flex: 1;
			width: 100%;
			height: .8rem;
			border-radius: .08rem;
			border-width: .02rem;
			border-style: solid;
			text-align: center;
			line-height: .76rem;
			background-color: #3D71F6;
		}
	}
}</style>