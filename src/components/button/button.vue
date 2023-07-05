<template>
    <button  :style="customStyle" :class="`button bgColor ${plain ? 'button-plain' : ''}`" @click="handleClick">{{ text }}</button>
</template>

<script>

export default {
    name: 'Button',

	components: {
		
	},

	props: {
		text: {
			type: String,
			default: ""
		},
		customStyle: {
			type: String,
			default: ""
		},
		plain: {
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
            点击按钮时触发
            @param { Event } event 点击事件事件参数
            @return
        */
		handleClick(event) {
			this.$emit('click', event)
		}
	},

}

</script>

<style scoped lang='scss'>
.button {
    width: 100%;
    height: 100%;
	border-radius: 0.08rem;
    text-align: center;
	color: #fff;
	border: none;
}

.button-plain {
	border: 1px solid #3D71F6;
	background-color: #fff;
	color: #3D71F6;
}
</style>