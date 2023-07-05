<template>
    <div class="itemTitle">
        <div>{{ title }}</div>
        <slot name="sub">
            <img v-if="img" :src="img" alt="" />
        </slot>
		
        <!-- <img v-if="item.status == authorStatusDict.wait" src="@/components/images/teaConfirmList/wait.png" alt="">
        <img v-if="item.status == authorStatusDict.charge" src="@/components/images/authorItem/charge.png" alt="">
        <img v-if="item.status == authorStatusDict.reject" src="@/components/images/teaConfirmList/reject.png" alt=""> -->
    </div>
</template>

<script>

export default {
    name: 'itemTitle',

	components: {},
	props: {
		title: {
			type: String, 
			default: ''
		},
		img: {
			type: String,
			default: ""
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
.itemTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 1.02rem;
    padding: 0 0.3rem;
    border-bottom: 1px solid #eee;
    > div {
        font-weight: 600;
    }
    > img {
        width: 1.36rem;
        height: 0.44rem;
    }
}
</style>