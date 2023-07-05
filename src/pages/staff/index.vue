<template>
    <div class="staff">
        <router-view />
        <FCTabbar :renderList="tabbarRenderList" @clickTab="handleClickTab" v-model="tabIndex" @showQrcode="handleShowQrcode" isShowQrcode></FCTabbar>
		<FcDialog v-model="isShowQrcode" title="身份码">
			<div class="staff-qrcode">
				<div>{{ userData.name }}</div>
				<img :src="userCodeSrc" alt="">
			</div>
		</FcDialog>
    </div>
</template>

<script>
import Home from '@/pages/staff/home/index.vue'
import My from '@/pages/staff/my/index.vue'
import FCTabbar from '@/components/tabbar/tabbar.vue'
import { getTabbarRenderList } from './config'
import { userDatatorage } from '@/utils/storage'
import QRCode from 'qrcode'
export default {
    name: 'staff',
	components: {
		Home,
		My,
		FCTabbar
	},
    data() {
        return {
			tabIndex: 0,
			isShowQrcode: false,
			tabbarRenderList: getTabbarRenderList(),
			userData: userDatatorage.getUserData(),
			userCodeSrc: ""
        }
	},

	created() {
		this.initPage()
		const { userId } = this.userData
		if (userId) {
			QRCode.toDataURL("https://zhiyun.cn88555.com/frontend/weixin/code?code=88.555.1%2F2023041500007").then((url) => {
                this.userCodeSrc = url
            })
		}
	},

	methods: {
		/**
            初始化页面
            @param { Object } item 点击tabbar的项
            @return
        */
		initPage() {
			const path = this.$route.path
			for (let i = 0; i < this.tabbarRenderList.length; i++) {
				if (this.tabbarRenderList[i].route === path) {
					this.tabIndex = i
					return
				}
			}
		},
		/**
            tabbar项改变时触发
            @param { Object } item 点击tabbar的项
            @return
        */
		handleClickTab(item) {
			this.$router.replace(item.route)
		},
		/**
            点击显示qrcode
            @param
            @return
        */
		handleShowQrcode() {
			this.isShowQrcode = true
		}
	},

}

</script>

<style scoped lang='scss'>
.staff {
	height: 100%;
	padding-bottom: 1rem;
	/deep/ .tabbar {
		padding: 0;
	}
}
</style>