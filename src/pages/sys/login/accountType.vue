<template>
	<FcPage title="账户类型" isTitleCover className="accountType-page">
		<div class="accountType">
			<div class="accountType-header">
				<div></div>
			</div>
			<div class="accountType-content">
				<div class="accountType-content-title">请选择账号类型</div>
				<div class="accountType-item accountType-staff whiteBg" @click="goApply('staff')">
					<img class="accountType-item-icon" :src="staff" alt="">
					<span>个人账号</span>
					<img class="accountType-item-right" :src="right" alt="">
				</div>
				<div class="accountType-item accountType-enterprise whiteBg" @click="goApply('enterprise')">
					<img class="accountType-item-icon" :src="enterprise" alt="">
					<span>企业账号</span>
					<img class="accountType-item-right" :src="right" alt="">
				</div>
				<div class="accountType-item accountType-tea whiteBg" @click="goApply('teaPlanter')">
					<img class="accountType-item-icon" :src="teaPlanter" alt="">
					<span>茶园主账号</span>
					<img class="accountType-item-right" :src="right" alt="">
				</div>
			</div>
		</div>
	</FcPage>
</template>

<script>
import staff from '@/assets/sys/accountType/staff.png'
import enterprise from '@/assets/sys/accountType/enterprise.png'
import teaPlanter from '@/assets/sys/accountType/teaPlanter.png'
import right from '@/assets/sys/accountType/right.png'
export default {
	name: 'accountType',
	components: {},
	data() {
		return {
			staff,
			enterprise,
			teaPlanter,
			right,
		}
	},
	mounted() { },
	methods: {
		/**
		 * 申请界面
		 * @param {*} accountType 账号类型
		 */
		async goApply(accountType) {
			let path;
			switch (accountType) {
				case 'staff':
					path = '/sys/staffApply';
					break;
				case 'enterprise':
					path = '/sys/apply';
					break;
				case 'teaPlanter':
					const total = await this.pageQuery();
					path = total > 0 ? '/enterprise/teaConfirm/list' : '/enterprise/teaConfirm/add'; // 有茶园时跳转到列表，无茶园跳转到添加茶园
					break;

			}
			this.$router.push({ path });
		},


		/**
		 * 查询茶园列表
		 */
		async pageQuery() {
			const params = {
				"pageNum": 1,
				"pageSize": 10,
			}
			const res = await this.$axios({
				url: "/authorized/page-query",
				data: params
			})
			const { code, data } = res;
			if (code == 200) {
				let { total=0 } = data
				return total;
			}
			return 0;
		},
	},
}

</script>

<style scoped lang='scss'>
.accountType-page {
	/deep/ .page-content {
		bottom: 0 !important;
		background-color: #FCFCFC;
	}

	/deep/ .page-title-content {
		color: #222222 !important;
	}
}

.accountType {
	position: relative;
	height: 100%;
	background-color: #FCFCFC;
}

.accountType-header {
	height: 4.64rem;
	margin-top: -0.88rem;
	background: linear-gradient(179deg, #E6EFFE 0%, #FFFFFF 100%);

	>div {
		width: 4.74rem;
		height: 3.46rem;
		margin-left: 2.48rem;
		background-image: url(~@/assets/sys/accountType/accountType-title-bg.png);
		background-size: 100% 100%;
	}
}

.accountType-content {
	position: absolute;
	top: 2.36rem;
	left: 0.32rem;
	right: 0.32rem;

	&-title {
		margin-bottom: 0.48rem;
		font-size: 0.36rem;
		line-height: 0.5rem;
		font-weight: 500;
		color: #222;
	}
}

.accountType-item {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 1.7rem;
	margin-bottom: 0.4rem;
	border-radius: 0.16rem;
	box-shadow: 0px 0px 0.16rem 1px rgba(237, 236, 236, 0.5);

	&-icon {
		margin-left: 0.16rem;
		width: 1.2rem;
		height: 1.16rem;
	}

	&-right {
		position: absolute;
		right: 0.24rem;
		top: 0;
		bottom: 0;
		width: 0.2rem;
		height: 0.36rem;
		margin: auto 0;
	}

	span {
		margin-right: 0.2rem;
	}
}
</style>