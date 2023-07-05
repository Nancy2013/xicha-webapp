<template>
    <div class="submit">
        <div class="submit-back whiteBg" @click="handleBack">返回</div>
        <div class="submit-submit bgColor white" @click="handleSubmit">提交</div>
    </div>
</template>

<script>

export default {
    name: '',

    components: {},

    data() {
        return {}
    },

    mounted() { },

	methods: {
		/**
            点击返回的处理事件
            @param 
            @return
        */
        handleBack() {
            this.$emit('back')
        },

        /**
            点击提交的处理事件
            @param 
            @return
        */
		handleSubmit() {
			this.$emit('submit')
		}
	},

}

</script>

<style scoped lang='scss'>
.submit {
    position: fixed;
    bottom: 0.8rem;
    left: 0.3rem;
    right: 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > div {
        width: 3.1rem;
        height: 0.8rem;
        border-radius: 0.08rem;
        border-width: 1px;
        border-style: solid;
        text-align: center;
        line-height: 0.76rem;
    }
    .submit-back {
        border-color: #e1e1e1;
    }
}
</style>