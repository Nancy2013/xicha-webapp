import IDFrontImg from '@/assets/sys/apply/ID-front.png'
import IDContraryImg from '@/assets/sys/apply/ID-contrary.png'
import { validPhone } from '@/utils/reg'
/**
 * @description: Form表单项
 * @return {*}
 */
export const getFormList=()=>{
    const formList=[
        {
			label: '区域地址',
			placeholder: '',
			type: 'input',
			key: 'regionName',
			required: false,
            disabled:true,
		},
        {
			label: '产品名称',
			placeholder: '',
			type: 'input',
			key: 'productName',
			required: false,
            disabled:true,
		},
        {
			label: '产品批次',
			placeholder: '',
			type: 'input',
			key: 'batchNo',
			required: false,
            disabled:true,
		},
        {
			label: '窜货时间',
			placeholder: '',
			type: 'input',
			key: 'createTime',
			required: false,
            disabled:true,
		},
        {
			label: '处理状态',
			placeholder: '',
			type: 'input',
			key: 'handleStatus',
			required: false,
            disabled:true,
		},
        {
			label: '处理人',
			placeholder: '',
			type: 'input',
			key: 'handlePerson',
			required: false,
            disabled:true,
		},
        {
			label: '处理结果',
			placeholder: '',
			type: 'textarea',
			key: 'handleRemark',
			required: false,
            disabled:true,
		},
        {
			label: '处理时间',
			placeholder: '',
			type: 'input',
			key: 'updatedTime',
			required: false,
            disabled:true,
		},
    ];
    return formList;
};