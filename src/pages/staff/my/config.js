import allWorkImg from '@/assets/staff/my/index/all.png'
import waitWorkImg from '@/assets/staff/my/index/wait.png'
import completeWorkImg from '@/assets/staff/my/index/complete.png'
import overdueWorkImg from '@/assets/staff/my/index/overdue.png'
import messageImg from '@/assets/common/message.png'
import accountSafetyImg from '@/assets/common/accountSafety.png'
import customerServiceImg from '@/assets/common/customerService.png'
import { workStatusDict, roleTypeDict } from "@/utils/dict"

export const getRenderMyWorkList = () => {
	return [
		{
			text: '全部',
			icon: allWorkImg,
			type: ""
		},
		{
			text: '待完成',
			icon: waitWorkImg,
			type: workStatusDict.waitExecute
		},
		{
			text: '已完成',
			icon: completeWorkImg,
			type: workStatusDict.complete
		},
		{
			text: '已逾期',
			icon: overdueWorkImg,
			type: workStatusDict.overdue
		}
	]
}

export const getRenderMyModuleList = () => {
	return [
		{
			text: '系统消息',
			icon: messageImg,
			status: 0
		},
		{
			text: '账号安全',
			icon: accountSafetyImg,
			status: 1
		},
		{
			text: '联系客服',
			icon: customerServiceImg,
			status: 2
		}
	]
}

/**
 * 获取角色名称
 * @param {String} roleId 角色id
 * @returns {String} 角色名称
 */
export const getRoleName = (roleId) => {
	if (roleId == roleTypeDict.teaGardener) {
		return "茶园工"
	} else if (roleId == roleTypeDict.packer) {
		return "包装工"
	} else if (roleId == roleTypeDict.enterprise) {
		return "茶企"
	} else {
		return ""
	}
}

