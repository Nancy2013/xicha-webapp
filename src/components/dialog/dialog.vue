<template>
    <Popup v-model="isShow" :close-on-click-overlay="false" @click-overlay="handleClickOverlay">
		<div class="dialog">
			<div class="dialog-title">
				<slot name="title">
					{{ title }}
				</slot>
			</div>
			<div class="dialog-content">
				<slot></slot>
			</div>
			<div class="dialog-bottom">
				<slot name="bottom">
					<button v-if="type === 'confirm'" class="dialog-cancel" @click="handleCancel">{{ cancelText }}</button>
					<button class="dialog-confirm" @click="handleConfirm">{{ confirmText }}</button>
				</slot>
			</div>
		</div>
	</Popup>
</template>

<script>
import { Popup } from 'vant';
export default {
    name: 'FcDialog',
	components: {
		Popup
	},
	model: {
		prop: 'isShow',
		event: 'change'
	},
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		type: {
			type: 'alert' | 'confirm', // alert, confirm
			default: 'alert'
		},
		title: {
			type: String,
			default: '提示'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		confirmText: {
			type: String,
			default: '确定'
		}

	},
    data() {
		return {
			
		}
    },

    mounted() { },

	methods: {
		/**
            点击确认按钮时触发
            @param 
            @return
        */
		handleConfirm() {
			if (this.type === 'alert') {
				this.$emit('change', false)
			}
			this.$emit('confirm')
		},

		/**
            点击取消按钮时触发
            @param 
            @return
        */
		handleCancel() {
			this.$emit('change', false)
			this.$emit('cancel')
		},

		/**
            点击遮罩层时触发时触发
            @param 
            @return
        */
		handleClickOverlay() {
			this.$emit('change', false)
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
	.dialog-title {
		padding: 0.3rem 0;
		text-align: center;
		line-height: 0.42rem;
		font-weight: 600;
	}
	.dialog-bottom {
		display: flex;
		flex-direction: row;
		height: 0.86rem;
		border-top: 1px solid #E7E7E7;
		>button {
			flex: 1;
			border: none;
			background-color: #fff;
		}
		.dialog-cancel {
			border-right: 1px solid #E7E7E7;
			color: rgba(21, 21, 21, .55);
		}

	}
}
</style>