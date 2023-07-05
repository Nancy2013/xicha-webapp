import { validPhone,validSpecialKey } from '@/utils/reg'
import IDFrontImg from '@/assets/sys/apply/ID-front.png'
import IDContraryImg from '@/assets/sys/apply/ID-contrary.png'
import businessLicenseImg from '@/assets/sys/apply/businessLicense.png'
import productionLicenseImg from '@/assets/sys/apply/productionLicense.png'
import uploadBrandImg from '@/assets/sys/apply/uploadBrand.png'
import reportImg from '@/assets/sys/apply/report.png'

/**
 * 获取新增认证申请表单的渲染数据
 * @param
 * @return { Array } 企业基本信息
 */
export const getAddFormFundInfoList = () => {
    return [
        {
            label: '企业名称',
            placeholder: '请输入企业名称',
            type: 'input',
            key: 'companyName',
            required: true,
            maxlength: 10,
        },
        {
            label: '企业简称',
            placeholder: '请输入企业简称',
            type: 'input',
            key: 'shortName',
            required: true
        },
        {
            label: '组织类型',
            placeholder: '请选择组织类型',
            type: 'select',
            key: 'organizeType',
            required: true,
            options: []
        },
        {
            label: '注册地址',
            placeholder: '选择省市区',
            type: 'selectProvince',
            key: 'registerAddress',
            required: false
        },
        {
            label: '',
            placeholder: '请输入详细地址',
            type: 'input',
            key: 'detailAddress',
            required: false,
            className: 'detailAddress'
        },
        {
            label: '法人身份证',
            placeholder: '请输入法人身份证',
            type: 'upload',
            key: 'certificate',
            required: true,
            uploadList: [
                {
                    id: 'frontImg',
                    key: 'identityPortraitUrl',
                    title: '正面照片',
                    img: "",
                    overlay: IDFrontImg
                },
                {
                    id: 'reverseImg',
                    key: 'nationalEmblemUrl',
                    title: '背面照片',
                    img: "",
                    overlay: IDContraryImg
                }
            ]
        },
        {
            label: '营业执照',
            placeholder: '请上传企业营业执照',
            type: 'upload',
            key: 'businessLicense',
            required: true,
            uploadList: [
                {
                    id: 'businessLicense',
                    key: 'businessLicense',
                    img: "",
                    value: '',
                    overlay: businessLicenseImg
                }
            ]
        },
        {
            label: '硒含量检测报告',
            placeholder: '请上传硒含量检测报告',
            type: 'upload',
            key: 'seleniumContentReport',
            required: true,
            uploadList: [
                {
                    id: 'seleniumContentReport',
                    key: 'seleniumContentReport',
                    img: "",
                    value: '',
                    overlay: reportImg
                }
            ],
        },
        {
            label: '生产许可证',
            placeholder: '请上传生产许可证',
            type: 'upload',
            key: 'permitUrl',
            required: false,
            uploadList: [
                {
                    id: 'permitUrl',
                    key: 'permitUrl',
                    img: "",
                    value: '',
                    overlay: productionLicenseImg
                }
            ]
        }
    ]
}

/**
 * @param
 * @return { Array } 核心信息
 */
export const getAddCoreInfoList = () => {
    return [
        {
            label: '是否自有茶园',
            placeholder: '',
            type: 'switch',
            key: 'teaGardenSelf',
            required: false,
            className:'teaGardenSelf',
        },
        {
            label: '',
            placeholder: '请输入种植面积',
            type: 'input',
            key: 'plantingArea',
            required: false,
            inputType: 'float',
            suffixText: '亩',
            isHide: true,
        },
        {
            label: '年产量',
            placeholder: '请输入年产量',
            type: 'input',
            key: 'production',
            required: false,
            suffixText: 'kg',
            inputType: 'float'
        },
        {
            label: '产线数',
            placeholder: '请输入产线数',
            type: 'input',
            key: 'productionLineNum',
            required: false,
            inputType: 'int',
            min:1,
        },
        {
            label: '工人数',
            placeholder: '请输入工人数',
            type: 'input',
            key: 'staffNum',
            required: false,
            inputType: 'int',
            min:1,
        },
        {
            label: '是否自有品牌',
            placeholder: '',
            type: 'switch',
            key: 'brandSelf',
            required: false
        },
        {
            label: '',
            placeholder: '请上传品牌logo',
            type: 'upload',
            key: 'brandUrl',
            required: false,
            isHide: true,
            uploadList: [
                {
                    id: 'brandUrl',
                    key: 'brandUrl',
                    title: '上传品牌logo',
                    value: '',
                    overlay: uploadBrandImg
                }
            ]
        },
        {
            label: '',
            placeholder: '请输入品牌或商标名称',
            type: 'input',
            key: 'brandName',
            required: false,
            isHide: true,
        },
    ]
}

/**
 * @param
 * @return { Array } 联系信息
 */
export const getAddContactInfoList = () => {
    return [
        {
            label: '联系人',
            placeholder: '请输入联系人',
            type: 'input',
            key: 'contactsName',
            required: true,
            maxlength: 20,
            validFnc:validSpecialKey,
        },
        {
            label: '联系电话',
            placeholder: '请输入联系人的电话',
            type: 'input',
            key: 'contactsPhone',
            required: true,
            validFnc: validPhone,
            maxlength: 11
        },
        {
            label: '微信号',
            placeholder: '请输入微信号',
            type: 'input',
            key: 'wechatId',
            required: false,
            maxlength: 30,
            
        }
    ]
}


/**
 * @description: 界面对象数据转换成接口JSON结构
 * @param {*} formData
 * @return {*}
 */
export const sendToJSON=(formData)=>{
    if(formData){
        const [fundInfo,coreInfo]=formData;

        // 注册地址
        const { detailAddress,registerAddress,certificate,} = fundInfo;
        let address = { detailAddress };
        if (registerAddress) {
          const [provinceId, cityId, districtId] = registerAddress;
          address = {
            ...address,
            provinceName:provinceId.name,
            provinceId: provinceId.code,
            cityName:cityId.name,
            cityId: cityId.code,
            districtName:districtId.name,
            districtId: districtId.code
          };
        }

        // 法人身份证 | 企业营业执照 | 生产许可证 | 硒含量
        const identityPortraitUrl=certificate[0].img
        const nationalEmblemUrl=certificate[1].img
        const businessLicense=fundInfo.businessLicense[0].img;
        const permitUrl=fundInfo.permitUrl[0].img || '';
        const seleniumContentReport=fundInfo.seleniumContentReport[0].img;
    
        // 是否自有茶园 | 是否自有品牌
        const {teaGardenSelf,brandSelf}=coreInfo;
        // 种植面积 | 年产量
        const {plantingArea,production}=coreInfo;
        // 产线数 | 工人数
        const {productionLineNum,staffNum}=coreInfo;

        // 品牌logo
        let brandUrl;
        if(coreInfo.brandUrl&&coreInfo.brandUrl.length>0){
            const brandImg=coreInfo.brandUrl[0].img;
            brandUrl=brandImg?brandImg:'';
        }

        const result={
            // 企业基本信息
            ...formData[0],

            // 核心信息
            ...formData[1],
        
            // 联系信息
            ...formData[2],

            address,
            identityPortraitUrl,
            nationalEmblemUrl,
            businessLicense,
            seleniumContentReport,
            permitUrl,
            brandUrl,
            teaGardenSelf:teaGardenSelf?1:0,
            brandSelf:brandSelf?1:0,
            plantingArea:plantingArea?parseFloat(plantingArea):0,
            production:production?parseFloat(production):0,
            productionLineNum:productionLineNum?parseInt(productionLineNum):'',
            staffNum:staffNum?parseInt(staffNum):'',
        }
        return result;
    }
};


/**
 * @description: 初始化注册地址
 * @param {*} list
 * @param {*} key
 * @param {*} data
 * @return {*}
 */
const setAddress=(key,data)=>{
    const {provinceName,provinceId,cityName,cityId,districtName,districtId,detailAddress}=data.address;
    const address={
        [key]:[
            {
                code:provinceId,
                name:provinceName,
            },
            {
                code:cityId,
                name:cityName,
            },
            {
                code:districtId,
                name:districtName,
            },
        ],
        detailAddress,
    };
    return address;
}

/**
 * @description: 初始化图片
 * @param {*} list
 * @param {*} key
 * @param {*} data
 * @return {*}
 */
const setImgs=(list,key,data)=>{
    const pos = list.findIndex(v => v.key === key);
    const {uploadList}=list[pos];
    uploadList.forEach(v=>{
        v.img=data[v.key];
    })

    return uploadList;
}


/**
 * @description:  初始化显示item
 * @param {*} list 数据列表
 * @param {*} data 当前状态
 * @param {*} linkedKeys 联动keys
 * @return {*}
 */
export const handleSwitch=(list,data,linkedKeys)=>{
    const keys=Object.keys(linkedKeys);
    keys.forEach(v=>{
        const value=data[v];
        const changeKey=linkedKeys[v];
        if(Array.isArray(changeKey)){
            changeKey.forEach(k=>{
                const pos=list.findIndex(m => m.key === k);
                const item=list[pos];
                if(value){
                    item.isHide=false;
                }else{
                    item.isHide=true;
                }
            })
        }
    });
    return list;
}

/**
 * @description: 查询到的数据转换成界面对象结构
 * @param {*} data
 * @return {*}
 */
export const getToObject = (data,fundInfoList,coreInfoList) => {
  if (data) {
     // 法人身份证 | 企业营业执照 | 生产许可证 | 品牌logo
    const pos = fundInfoList.findIndex(v => v.key === "certificate");
    const {uploadList}=fundInfoList[pos];
    const [frontImg, reverseImg] = uploadList;
    frontImg.img = data[frontImg.key];
    reverseImg.img = data[reverseImg.key];

    // 是否自有茶园 | 是否自有品牌
    const teaGardenSelf=data.teaGardenSelf===1?true:false;
    const brandSelf=data.brandSelf===1?true:false;

    const result = {
      ...data,
      certificate:uploadList,
      businessLicense:setImgs(fundInfoList,'businessLicense',data),
      permitUrl:setImgs(fundInfoList,'permitUrl',data),
      seleniumContentReport:setImgs(fundInfoList,'seleniumContentReport',data),
      brandUrl:setImgs(coreInfoList,'brandUrl',data),
      teaGardenSelf,
      brandSelf,
      ...setAddress('registerAddress',data),
    };

    console.log('------getToObject-----',result);
    return result;
  }
};

export const authStatus={
    // 0 未认证 1待审核 2已认证 3已驳回
    0:'未认证',
    1:'待审核',
    2:'已认证',
    3:'驳回',
}