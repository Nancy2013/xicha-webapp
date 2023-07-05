<template>
    <FcPage title="应用中心" :showLeft="false">
        <div class="enterpriseApp">
			<div class="enterpriseApp-categoryItem" v-for="(categoryItem, categoryKey) in renderAppList" :key="categoryKey">
				<FcCell :text="categoryItem.title" isBold></FcCell>
				<div class="enterpriseApp-menuList">
					<div class="enterpriseApp-menuItem" v-for="(menuItem, menuKey) in categoryItem.menuList" :key="menuKey" @click="handleClickMenu(menuItem)">
						<div class="enterpriseApp-menuItem-icon">
							<img :src="menuItem.icon" alt="">
						</div>
						<div class="enterpriseApp-menuItem-text">{{ menuItem.text }}</div>
					</div>
				</div>
			</div>
        </div>
    </FcPage>
</template>

<script>
import { getRenderAppList } from './config'
import FcCell from '@/components/cell/cell.vue'
import { agriculturalTabStorage } from '@/utils/storage'
export default {
    name: 'enterpriseApp',

	components: {
		FcCell
	},

    data() {
        return {
            renderAppList: getRenderAppList()
        }
    },

    mounted() { },

	methods: {
		/**
         处理点击菜单项事件
         @param { Object } menuItem 菜单数据
         @return
         */
		handleClickMenu(menuItem) {
			if (menuItem.router) {
				agriculturalTabStorage.removeTabIndex()
				this.$router.push(menuItem.router)
			}
		}
	},

}

</script>

<style scoped lang='scss'>
.enterpriseApp {
	padding-bottom: 1rem;
}
.enterpriseApp-menuList {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	.enterpriseApp-menuItem {
		width: 1.5rem;
		margin-left: 0.3rem;
		margin-bottom: 0.3rem;
		.enterpriseApp-menuItem-icon {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: 1.5rem;
			border-radius: 0.16rem;
			box-shadow: 0 0 0.24rem 0 rgba(0,0,0,0.09);
			>img {
				width: 0.7rem;
				height: 0.7rem;
			}
		}
		.enterpriseApp-menuItem-text {
			margin-top: 0.2rem;
			font-size: 0.28rem;
			line-height: 0.4rem;
			text-align: center;
		}
	}
}
</style>