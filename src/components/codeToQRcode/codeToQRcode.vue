<template>
    <img :style="`width: ${width}; height: ${height}`" v-if="imgSrc" :src="imgSrc" alt="" @click="handleClick">
</template>

<script>
import QRCode from 'qrcode'
export default {
    name: '',

    components: {},
    props: {
        code: {
            type: String | Number,
            default: ""
		},
		width: {
			type: String,
			default: '1.6rem'
		},
		height: {
			type: String,
			default: "1.6rem"
		}
    },
    data() {
        return {
            imgSrc: ""
        }
    },

    mounted() { },

	created() {
		this.handleCodeToQRCode()
    },

    methods: {
        handleCodeToQRCode() {
            if (this.code) {
                QRCode.toDataURL(`${this.code}`).then((url) => {
                    this.imgSrc = url
                })
			} else {
				this.imgSrc = ""
			}
        },

        /**
            处理点击二维码事件
            @param 
            @return
        */
        handleClick() {
            this.$emit("click", this.imgSrc)
        }
    },

    watch: {
        code: {
			handler: this.handleCodeToQRCode,
		}
    }

}

</script>

<style scoped lang='scss'>
</style>