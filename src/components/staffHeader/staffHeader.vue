<template>
    <div class="my-header">
        <div class="my-header-content">
            <img class="my-header-content-avatar" src="@/assets/staff/my/index/avatar.png" alt="" />
            <div class="my-header-info">
                <div class="my-header-name">
                    <div>{{ userData.name }}</div>
                    <div class="color">{{ userData.roleName }}</div>
                </div>
                <div class="my-header-phone">{{ userData.phone }}</div>
                <!-- <div class="my-header-enterprise">{{ userData.tenantName }}</div> -->
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

    mounted() {
        
    },

    methods: {},

}

</script>

<style scoped lang='scss'>
.my-header {
    position: relative;
    width: 100%;
    height: 4.04rem;
    background-image: url("~@/components/images/staffHeader/bg.png");
    background-size: 100% 100%;
    .my-header-content {
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 1.08rem;
        left: 0.3rem;
		right: 0.3rem;
        .my-header-content-avatar {
            position: absolute;
            right: 0;
            top: -0,08rem;
            width: 1.28rem;
            height: 1.28rem;
        }
        .my-header-info {
            margin-left: 0.32rem;
        }
        .my-header-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            > div:nth-child(1) {
                font-size: 0.48rem;
                line-height: 0.68rem;
                color: #222;
            }
            > div:nth-child(2) {
                padding: 0 0.2rem 0 0.22rem;
                margin-left: 0.24rem;
                height: 0.46rem;
                border-radius: 0.2rem;
                text-align: center;
                line-height: 0.46rem;
                font-size: 0.26rem;
                color: #fff;
                background-color: #185EF0;
            }
        }
        .my-header-phone {
            margin-top: 0.16rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            font-weight: lighter;
            color: #666;
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