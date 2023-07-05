<template>
    <FcPage title="认证申请" isBorder>
        <div class="addApply">
            <div class="addApply-main">
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
            <div class="addApply-bottom">
                <div class="addApply-submit bgColor white" @click="handleSubmit">
                    提交
                </div>
                <div class="addApply-tip">
                    <span>预计1-3个工作日内通过，请耐心等待</span>
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
import {
    getAddFormFundInfoList,
    getAddCoreInfoList,
    getAddContactInfoList,
    sendToJSON,
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
            loaded: false,
            id: this.$route.query.id,
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
        this.query();
        this.getOrganizeTypeList()
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
         * @description: 查询
         * @return {*}
         */
        query() {
            this.loaded = true;
            this.$axios({
                url: '/auth/current/user',
                method: 'GET'
            }).then(res => {
                const { code, data } = res;
                const { addFormFundInfoList, addCoreInfoList } = this;
                const newData = getToObject(data, addFormFundInfoList, addCoreInfoList);
                if (code === 200) {
                    this.formData = Object.assign({}, { ...newData });
                }
                this.loaded = false;
            })
                .catch(e => {
                    this.loaded = false;
                    console.error(e);
                });
        },

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


        handleLinkedKeys() {
            const { teaGardenSelf, brandSelf } = this.formData;
            if (!teaGardenSelf) {
                // 非自有茶园
                this.formData.plantingArea = 0;
            }
            if (!brandSelf) {
                // 非自有品牌
                const { brandUrl } = this.formData;
                if (brandUrl) {
                    brandUrl[0].img = '';
                }
                this.formData.brandName = '';
                this.formData.brandUrl = brandUrl;
            }
        },

        /**
         * 点击提交处理事件
         * @param
         * @return
         */
        handleSubmit() {
            const promiseList = [
                this.$refs.FcForm1.validateForm(),
                this.$refs.FcForm2.validateForm(),
                this.$refs.FcForm3.validateForm()
            ];
            Promise.all(promiseList).then(formData => {
                this.handleLinkedKeys();
                const { id } = this;
                const params = {
                    ...sendToJSON(formData),
                    id,
                }
                console.log("-----handleSubmit--params--", params);
                this.loaded = true;

                const url = id ? "/modify" : "/save";
                this.$axios({
                    url,
                    data: params,
                })
                    .then(res => {
                        this.$toast("提交成功");
                        const { code, data } = res;
                        if (code === 200) {
                            this.$router.replace({
                                path: "/sys/detail",
                                query: { id: data || id }
                            });
                        }
                        this.loaded = false;
                    })
                    .catch(e => {
                        this.loaded = false;
                        console.error(e);
                    });
            });
        }
    },
};
</script>

<style scoped lang="scss">
.addApply {
    background-color: #f5f5f5;
}
.addApply-main {
    position: relative;
    min-height: 100%;
    padding: 0.1rem 0 0;
}

.addApply-content {
    background-color: #fff;

    .addApply-form-line {
        height: 1px;
        background-color: #eee;
    }

    /deep/ .fcInput-detailAddress {
        input {
            width: 100%;
        }
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
    padding: 0.8rem 0.28rem;
    > div {
        &:first-child {
            width: 100%;
            height: 0.8rem;
            border-radius: 0.08rem;
            border-width: 1px;
            border-style: solid;
            text-align: center;
            line-height: 0.76rem;
        }
    }
    .addApply-tip {
        text-align: center;
        padding-top: 0.3rem;
        color: #191919a8;
        span {
            font-size: 0.26rem;
        }
    }
}
</style>
