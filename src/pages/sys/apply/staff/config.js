import IDFrontImg from '@/assets/sys/apply/ID-front.png'
import IDContraryImg from '@/assets/sys/apply/ID-contrary.png'
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
		},
        {
            label: '身份证件',
            type: 'upload',
            key: 'certificate',
            required: true,
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
        },
    ];
    return formList;
};