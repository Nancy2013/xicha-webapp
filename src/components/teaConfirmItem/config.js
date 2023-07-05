import { teaConfirmStatusDict } from '@/utils/dict'
import waitImg from '@/assets/enterprise/app/teaConfirmList/wait.png'
import complateImg from '@/assets/enterprise/app/teaConfirmList/complate.png'
import rejectImg from '@/assets/enterprise/app/teaConfirmList/reject.png'

/**
 * 渲染确权状态渲染配置数据
 */
export const confirmStatusRenderConfig = {
	[teaConfirmStatusDict.wait]: {
		text: teaConfirmStatusDict[teaConfirmStatusDict.wait],
		img: waitImg
	},
	[teaConfirmStatusDict.complate]: {
		text: teaConfirmStatusDict[teaConfirmStatusDict.complate],
		img: complateImg
	},
	[teaConfirmStatusDict.reject]: {
		text: teaConfirmStatusDict[teaConfirmStatusDict.reject],
		img: rejectImg
	}
}