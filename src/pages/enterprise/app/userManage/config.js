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
			label: '姓名',
			placeholder: '请输入您的姓名',
			type: 'input',
			key: 'name',
			required: true,
            disabled:false,
		},
        {
			label: '角色',
			placeholder: '请选择员工角色',
			type: 'select',
			key: 'roleId',
			required: true,
			options: [],
            disabled:false,
		},
        {
			label: '手机号',
			placeholder: '请输入员工的手机号',
			type: 'input',
			key: 'phone',
			required: true,
            disabled:false,
            inputType: 'int',
            validFnc: validPhone,
            maxlength: 11
		},
        {
            label: '身份证件',
            type: 'upload',
            key: 'certificate',
            uploadList: [
                {
                    id: 'frontImg',
                    key: 'portraitUrl',
                    title: '正面照片',
                    img: "",
                    overlay: IDFrontImg
                },
                {
                    id: 'reverseImg',
                    key: 'emblemUrl',
                    title: '背面照片',
                    img: "",
                    overlay: IDContraryImg
                }
            ],
            disabled:false,
        },
    ];
    return formList;
};

export const ROLE_PARENT_ID = "1235440449318051830"; // 默认角色父级ID