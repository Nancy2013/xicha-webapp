<template>
    <Overlay :show="isShow" :zIndex="11">
		<div class="loading">
			<Loading :color="color" size="40px" vertical text-color="#fff">
				{{ text }}
			</Loading>
		</div>
	</Overlay>
</template>

<script>
import { Loading, Overlay  } from 'vant'
export default {
    name: '',

	components: {
		Loading,
		Overlay
	},
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		text: {
			type: String,
			default: ""
		},
		color: {
			type: String,
			default: "#fff"
		}
	},

    data() {
        return {}
    },

    mounted() { },

    methods: {},

}

</script>

<style scoped lang='scss'>
.loading {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
/deep/ .van-overlay {
	z-index: 11;
}
</style>