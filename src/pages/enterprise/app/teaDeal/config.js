/**
 获取新增茶青交易表单的渲染数据    
 @param 
 @return { Array } 茶青交易表单的渲染数据
 */
 export const getAddFormRenderList = () => {
	return [
		{
			label: '茶园工码',
			placeholder: '',
			type: 'upload',
			key: 'code',
			required: true
		},
		{
			label: '茶叶品级',
			placeholder: '请填写茶叶品级',
			type: 'input',
			key: 'breedNum',
			required: true
		},
		{
			label: '茶青重量',
			placeholder: '请填写茶青重量',
			type: 'input',
			key: 'weight',
			required: true,
			suffixText: 'kg',
			inputType: 'float'
		}
	]
}

export const getStatisticsRenderList = () => {
	return [
		{
			label: '收购重量',
			key: 'weight',
			unit: 'kg'
		},
		{
			label: '收购单数',
			key: 'count',
			unit: ''
		}
	]
}