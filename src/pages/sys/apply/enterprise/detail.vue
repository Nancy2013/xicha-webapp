<template>
    <FcPage title="我的认证申请" isBorder>
        <div class="apply-header" v-if="formData.approvalStatus===1">
            <div class="info">
                <div class="status">
                    <span>认证申请中</span>
                </div>
                <div class="reason text_ellipsis2">预计1-3个工作日内通过，请耐心等待</div>
            </div>
            <div class="icon">
                <img :src="stautsIcon1" />
            </div>
        </div>
        <div class="apply-header" v-if="formData.approvalStatus===2">
            <div class="info">
                <div class="status">
                    <span>已认证</span>
                </div>
            </div>
            <div class="icon">
                <img :src="stautsIcon1" />
            </div>
        </div>
        <div class="apply-header" v-if="formData.approvalStatus===3">
            <div class="info">
                <div class="status">
                    <span>已驳回</span><img :src="close" />
                </div>
                <div class="reason text_ellipsis2">驳回原因：{{ formData.reason }}</div>
            </div>
            <div class="icon">
                <img :src="stautsIcon2" />
            </div>
        </div>
        <div class="addApply">
            <div :class="`addApply-main ${formData.approvalStatus?'top':''}`">
                <div class="addApply-content">
                    <FcCell text="企业基本信息"></FcCell>
                    <div class="addApply-form">
                        <div class="addApply-form-line"></div>
                        <FcForm ref="FcForm1" :renderList="addFormFundInfoList" v-model="formData"></FcForm>
                    </div>
                </div>
            </div>
            <div class="addApply-main">
                <div class="addApply-content">
                    <FcCell text="核心信息"></FcCell>
                    <div class="addApply-form">
                        <div class="addApply-form-line"></div>
                        <FcForm ref="FcForm2" :renderList="addCoreInfoList" v-model="formData"></FcForm>
                    </div>
                </div>
            </div>
            <div class="addApply-main">
                <div class="addApply-content">
                    <FcCell text="联系信息"></FcCell>
                    <div class="addApply-form">
                        <div class="addApply-form-line"></div>
                        <FcForm ref="FcForm3" :renderList="addContactInfoList" v-model="formData"></FcForm>
                    </div>
                </div>
            </div>
            <!-- 认证后，个人中心入口进入可以编辑 -->
            <div class="addApply-bottom" v-if="formData.approvalStatus === approveStatusDict.disallow || formData.approvalStatus === approveStatusDict.authenticated">
                <div class="addApply-submit bgColor white" @click="handleEdit">
                    编辑
                </div>
            </div>
        </div>
        <FcLoading :isShow="loaded"></FcLoading>
    </FcPage>
</template>

<script>
import fileImg from "@/assets/enterprise/app/agriculturalManage/add/file.png";
import contactImg from "@/assets/sys/apply/contact.png";
import coreImg from "@/assets/sys/apply/core.png";
import FcCell from "@/components/cell/cell.vue";
import FcForm from "@/components/form/form.vue";
import FcInput from "@/components/input/input.vue";
import stautsIcon1 from "@/assets/sys/apply/header_apply1.png";
import stautsIcon2 from "@/assets/sys/apply/header_apply2.png";
import close from "@/assets/sys/apply/close.png";
import { approveStatusDict } from '@/utils/dict'
import {
    getAddFormFundInfoList,
    getAddCoreInfoList,
    getAddContactInfoList,
    getToObject,
    handleSwitch,
} from "./config";
import FcLoading from "@/components/loading/loading.vue";
export default {
    name: "apply",
    components: {
        FcCell,
        FcForm,
        FcInput,
        FcLoading
    },

    data() {
        return {
            fileImg,
            contactImg,
            coreImg,
            addFormFundInfoList: getAddFormFundInfoList(),
            addCoreInfoList: getAddCoreInfoList(),
            addContactInfoList: getAddContactInfoList(),
            formData: {},
            tenantPhone: "",
            loaded: false,
            approveStatusDict: approveStatusDict,
            stautsIcon1,
            stautsIcon2,
            close,
        };
    },

    computed: {
        teaGardenSelf() {
            // 是否自有茶园
            return this.formData.teaGardenSelf;
        },
        brandSelf() {
            // 是否自有品牌
            return this.formData.brandSelf;
        }
    },

    created() {
        this.tenantPhone = this.$route.query.tenantPhone;
        this.getOrganizeTypeList()
        this.query();
        this.formatFormList();
    },
    watch: {
        teaGardenSelf: {
            handler(newVal, oldVal) {
                const linkKeys = {
                    teaGardenSelf: ['plantingArea'],
                }
                const addCoreInfoList = handleSwitch(this.addCoreInfoList, this.formData, linkKeys);
                this.addCoreInfoList = Object.assign([], addCoreInfoList);
            },
        },
        brandSelf: {
            handler(newVal, oldVal) {
                const linkKeys = {
                    brandSelf: ['brandUrl', 'brandName'],
                }
                const addCoreInfoList = handleSwitch(this.addCoreInfoList, this.formData, linkKeys);
                this.addCoreInfoList = Object.assign([], addCoreInfoList);
            },
        },
    },

    methods: {
        /**
         * @description: 获取组织类型选项
         * @return {*}
         */
        getOrganizeTypeList() {
            this.$axios({
                url: '/dict/listDictsByCode',
                method: 'GET',
                baseUrl: '/api/base',
                data: { dictTypeCode: 'COMPANY_TYPE' }
            }).then((res) => {
                if (Array.isArray(res.data) && res.data.length) {
                    this.$set(this.addFormFundInfoList[2], 'options', res.data.map((item) => {
                        return {
                            text: item.name,
                            value: item.code
                        }
                    }))
                }
                
            })
        },
        /**
         * @description: 设置Form不可用
         * @return {*}
         */
        formatFormList() {
            const { addFormFundInfoList, addCoreInfoList, addContactInfoList } = this;
            addFormFundInfoList.forEach(v => {
                v.disabled = true;
            })
            this.addFormFundInfoList = Object.assign([], addFormFundInfoList);

            addCoreInfoList.forEach(v => {
                v.disabled = true;
            })
            this.addCoreInfoList = Object.assign([], addCoreInfoList);

            addContactInfoList.forEach(v => {
                v.disabled = true;
            })
            this.addContactInfoList = Object.assign([], addContactInfoList);
        },

        /**
         * @description: 获取认证数据
         * @return {*}
         */
        query() {
            this.loaded = true;
            this.$axios({
                url: '/auth/current/user',
                method: 'GET',
            }).then(res => {
                const { code, data } = res;
                const { addFormFundInfoList, addCoreInfoList } = this;
                const newData = getToObject(data, addFormFundInfoList, addCoreInfoList);
                if (code === 200) {
                    this.formData = Object.assign({}, { ...newData });
                }
                this.loaded = false;
            }).catch(e => {
                this.loaded = false;
            });
        },

        /**
         * 点击编辑处理事件
         * @param
         * @return
         */
        handleEdit() {
            this.$router.push({ path: "/sys/apply" });
        }
    },
};
</script>

<style scoped lang="scss">
.apply-header {
    display: flex;
    background: url(~@/assets/sys/apply/bg_apply_header.png) no-repeat;
    background-size: cover;
    padding: 0.4rem;
    justify-content: space-between;
    align-items: center;
    .info {
        color: #fff;
        .status {
            margin-bottom: 0.1rem;
            span {
                vertical-align: middle;
                font-size: 0.4rem;
                font-weight: 500;
            }
            img {
                width: 0.5rem;
                height: 0.5rem;
                margin-left: 0.12rem;
                vertical-align: middle;
            }
        }
        .reason {
            font-size: 0.3rem;
        }
    }

    .icon {
        width: 2.04rem;
        height: 1.94rem;
        flex-shrink: 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.addApply {
    background-color: #f5f5f5;
    padding-bottom: 0.8rem;
    border: 1px solid transparent;
}
.addApply-main {
    position: relative;
    min-height: 100%;
    background-color: #fff;
    margin-top: 0.1rem;
    &.top {
        padding: 0;
        margin-top: -0.28rem;
        border-radius: 0.26rem 0.26rem 0 0;
    }
}

.addApply-content {
    .addApply-form-line {
        height: 0.02rem;
        background-color: #eee;
    }

    /deep/ .fcSwitch {
        &.fcSwitch-teaGardenSelf {
            border-bottom: none;
        }
    }
}

/deep/ .upload {
    &.upload-seleniumContentReport
        .upload-content
        .formItem-content-item
        .formItem-uploader {
        width: 110px;
        height: 136px;
    }
}

/deep/ .upload-brandUrl {
    .formItem-uploader {
        width: 1.6rem !important;
        height: 1.6rem !important;
    }
    .formItem-title {
        margin-top: 0.16rem !important;
        color: #999999 !important;
    }
}
/deep/ .fcSwitch-brandSelf {
    border-bottom: none !important;
}

.addApply-main-brandName {
    padding-right: 0.3rem;
    /deep/ .fcInput-content {
        flex: 1;
        .formItem-content {
            width: 100%;
            input {
                width: 100%;
            }
        }
    }
}

.addApply-bottom {
    position: relative;
    padding: 0.8rem 0.28rem 0 0.28rem;
    > div {
        &:first-child {
            width: 100%;
            height: 0.8rem;
            border-radius: 0.08rem;
            border-width: 0.02rem;
            border-style: solid;
            text-align: center;
            line-height: 0.76rem;
        }
    }
}
</style>
