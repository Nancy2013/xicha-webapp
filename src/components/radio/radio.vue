<template>
    <div class="fcRadio">
        <div class="fcRadio-list">
            <div :class="`fcRadio-item ${radioItem.value == value ? 'fcRadio-item-active' : ''}`" v-for="(radioItem, radioKey) in options" :key="radioKey" @click="handleChange(radioItem, radioKey)">
                <span>{{ radioItem.label }}</span>
				<img src="@/components/images/radio/radio-active.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'fcRadio',

    components: {},
    props: {
        options: {
            type: Array,
            default: () => {
                return []
            }
        },
        value: {
            type: String | Number,
            default: ""
		},
		isCancel: {   //是否可以再次点击取消
			type: Boolean,
			default: false
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
		console.log(this.value)	
	},

	methods: {
		/**
            处理点击单选框选项事件
            @param { Object } radioItem 单款框数据
			@param { Number } radioKey 单款框下标
            @return
        */
		handleChange(radioItem, radioKey) {
			if (radioItem.value !== this.value) {
				this.$emit('change', radioItem.value)
			} else {
				if (this.isCancel) {
					this.$emit('change', undefined)
				}
			}
			
		}
	},

}

</script>

<style scoped lang='scss'>
.fcRadio-list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	.fcRadio-item {
		position: relative;
		width: 1.8rem;
		height: 0.72rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-right: 0.2rem;
		margin-top: 0.2rem;
		border-radius: 0.04rem;
		border: 1px solid #EEEEEE;
		transition: all .15s;
		>span {
			font-size: 0.28rem;
			color: #333;
		}
		>img {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 0.4rem;
			height: 0.32rem;
			opacity: 0;
			transition: all .15s;
		}
	}
	.fcRadio-item-active {
		background-color: #E7F1FF;
		border-color: rgba(238,238,238,0);
		>img {
			opacity: 1;
		}
	}
	.fcRadio-item:nth-child(3n) {
		margin-right: 0;
	}
}
</style>