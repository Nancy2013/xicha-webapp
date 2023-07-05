import homeImg from '@/assets/staff/index/homeTab.png'
import homeActiveImg from '@/assets/staff/index/homeTab-select.png'
import qrcodeImg from '@/assets/staff/index/qrcodeTab.png'
import qrcodeActiveImg from '@/assets/staff/index/qrcodeTab-select.png'
import myImg from '@/assets/staff/index/settingTab.png'
import myActiveImg from '@/assets/staff/index/settingTab-select.png'

const getTabbarRenderList = () => {
	return [
		{
			text: '首页',
			icon: homeImg,
			activeIcon: homeActiveImg,
			route: '/staff/home'
		},
		{
			routeType: 1, // type: 0 或 undefined 有路由跳转 , 1: 无路由跳转
			text: '身份码',
			icon: qrcodeImg,
			activeIcon: qrcodeActiveImg,
			route: '/staff/home'
		},
		{
			text: '我的',
			icon: myImg,
			activeIcon: myActiveImg,
			route: '/staff/my'
		}
	]
}

export {
	getTabbarRenderList
}