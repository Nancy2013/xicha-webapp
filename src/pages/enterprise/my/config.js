import messageImg from '@/assets/common/message.png'
import accountSafetyImg from '@/assets/common/accountSafety.png'
import customerServiceImg from '@/assets/common/customerService.png'

/**
 获取我的页面渲染菜单列表数据
 @param
 @return
 */
export const getMyMenuRenderList = () => {
	return [
		{
			text: '系统消息',
			icon: messageImg,
			router: ''
		},
		{
			text: '账号安全',
			icon: accountSafetyImg,
			router: ''
		},
		{
			text: '联系客服',
			icon: customerServiceImg,
			router: ''
		}
	]
}