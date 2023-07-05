<template>
    <div class="my-header">
        <div class="my-header-content">
            <img src="@/assets/staff/my/index/avatar.png" alt="">
            <div class="my-header-info">
                <div class="my-header-name">
                    <div>{{ userData.userName }}</div>
                    <div class="color">{{ userData.roleName }}</div>
                </div>
                <div class="my-header-phone">{{ userData.phone }}</div>
                <div class="my-header-enterprise">{{ userData.tenantName }}</div>
            </div>
			<slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'myHeader',

	components: {},
	props: {
		userData: {
			type: Object,
			default: ()=> {}
        },
	},
    data() {
        return {}
    },

    mounted() { },

    methods: {},

}

</script>

<style scoped lang='scss'>
.my-header {
    position: relative;
    width: 100%;
    height: 3.92rem;
    background-image: url("~@/assets/staff/my/index/my-title-bg.png");
    background-size: 100% 100%;
    .my-header-content {
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 1rem;
        left: 0.3rem;
		right: 0.3rem;
        > img {
            width: 1.44rem;
            height: 1.44rem;
        }
        .my-header-info {
            margin-left: 0.32rem;
        }
        .my-header-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            > div:nth-child(1) {
                font-size: 0.28rem;
                line-height: 0.4rem;
                color: #fff;
            }
            > div:nth-child(2) {
                min-width: 1rem;
                margin-left: 0.24rem;
                padding: 0 0.08rem;
                height: 0.36rem;
                border-radius: 0.2rem;
                text-align: center;
                line-height: 0.36rem;
                font-size: 0.24rem;
                background-color: #fff;
            }
        }
        .my-header-phone {
            margin-top: 0.24rem;
            font-size: 0.26rem;
            line-height: 0.36rem;
            font-weight: lighter;
            color: rgba(255, 255, 255, 0.75);
        }
        .my-header-enterprise {
            max-width: 3.2rem;
            margin-top: 0.08rem;
            font-size: 0.26rem;
            line-height: 0.36rem;
            color: rgba(255, 255, 255, 0.75);
        }
    }
}
</style>