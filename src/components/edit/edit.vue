<template>
    <div class="edit-box">
        <div class="edit bgColor" @click="handleEdit">
            <div>编辑</div>
            <img src="@/components/images/agriculturalList/right-white.png" alt="">
        </div>
    </div>
</template>

<script>

export default {
    name: 'edit',

    components: {},

    data() {
        return {}
    },

    mounted() { },

	methods: {
		/**
            处理点击编辑事件
            @param 
            @return
        */
        handleEdit() {
            this.$emit('edit')
        },
	},

}

</script>

<style scoped lang='scss'>
.edit-box {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
.edit {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 0.56rem;
    width: 1.56rem;
    border-radius: 0.08rem;
    > div {
        font-size: 0.26rem;
        line-height: 0.56rem;
        color: #fff;
    }
    > img {
        margin-top: -0.04rem;
        margin-left: 0.08rem;
        width: 0.12rem;
        height: 0.22rem;
    }
}
</style>