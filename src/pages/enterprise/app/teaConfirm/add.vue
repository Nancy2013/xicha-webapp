<template>
    <FcPage :title="title" isBorder showLeft>
        <div :class="`addTeaConfirm ${isDisabled ? 'addTeaConfirm-disabled' : ''}`">
            <div class="addTeaConfirm-content">
                <div class="addTeaConfirm-form-box whiteBg">
                    <FcCell text="茶园信息"></FcCell>
                    <div class="addTeaConfirm-form" style="margin-bottom: 0.2rem">
                        <div class="addTeaConfirm-form-line"></div>
                        <FcForm :disabled="isDisabled" ref="FcForm-tea" :renderList="addFormRenderList" v-model="formData" @suffixIcon="handleClickSuffixIcon" @submit="handleSubmit"></FcForm>
                    </div>
                </div>

                <div class="addTeaConfirm-form-box whiteBg">
                    <FcCell text="茶树信息"></FcCell>
                    <div class="addTeaConfirm-form">
                        <div class="addTeaConfirm-form-line"></div>
                        <FcForm :disabled="isDisabled" ref="FcForm-teaTree" :renderList="teaTreeFormRenderList" v-model="formData" @onChange="handleTeaTreeChange"></FcForm>
                    </div>
                </div>
                <div class="addTeaConfirm-breed-item whiteBg" v-for="(renderItem, renderKey) in breedFormRenderList" :key="renderItem.id">
                    <div class="addTeaConfirm-form-line"></div>
                    <FcCell class="addTeaConfirm-cell-breed" :text="`品种${renderKey + 1}`" :icon="require('@/assets/enterprise/app/teaConfirmList/right.png')"></FcCell>
                    <FcForm :disabled="isDisabled" :ref="`FcForm-breed-${renderKey}`" :renderList="renderItem.list" v-model="breedFormDataList[renderKey]"></FcForm>
                </div>

                <div class="addTeaConfirm-form-box whiteBg">
                    <FcCell text="负责人信息"></FcCell>
                    <div class="addTeaConfirm-form">
                        <div class="addTeaConfirm-form-line"></div>
                        <FcForm :disabled="isDisabled" ref="FcForm-teaTree" :renderList="principalFormRenderList" v-model="formData"></FcForm>
                    </div>
                </div>
            </div>
            <!-- <FcSubmit @back="handleBack" @submit="handleSubmit"></FcSubmit> -->
            <FcLoading :isShow="showLoading" text="正在获取位置信息..."></FcLoading>
        </div>
    </FcPage>
</template>

<script>
import FcCell from '@/components/cell/cell.vue'
import fileImg from '@/assets/enterprise/app/agriculturalManage/add/file.png'
import { getLocation, getWeChatSignData } from '@/utils/wechat'
import FcLoading from '@/components/loading/loading.vue'
import FcForm from '@/components/form/form.vue'
import FcSubmit from '@/components/submit/submit.vue'
import { initWeChat } from '@/main'
import { getAddFormRenderList, getTeaTreeFormRenderList, getBreedFormRenderList, getPrincipalFormRenderList } from './config'
import { throttleFnc, getRegeoFromTude, isEmpty } from '@/utils/common'
import { userDatatorage } from '@/utils/storage'
export default {
    name: 'addTeaConfirm',

    components: {
        FcCell,
        FcForm,
        FcSubmit,
        FcLoading
    },

    data() {
        return {
            title: "",
            fileImg: fileImg,
            addFormRenderList: getAddFormRenderList(),
            teaTreeFormRenderList: getTeaTreeFormRenderList(),
            principalFormRenderList: getPrincipalFormRenderList(),
            formData: {
                teaCategoryNum: 1
            },
            userData: userDatatorage.getUserData(),
            breedFormDataList: [{}],
            breedFormRenderList: [{
                list: getBreedFormRenderList(),
                id: Math.random()
            }],
            isReadyWeChat: false,
            showLoading: false,
            id: "",
            isDisabled: false
        }
    },

    created() {
        //this.initWeChat()
        const { id, type } = this.$route.query
        if (type === 'view') {
            this.isDisabled = true
            this.addFormRenderList.pop()
            this.title = '茶园详情'
        } else {
            this.title = id ? '编辑茶园' : '添加茶园'
        }
        if (id) {
            this.id = id
            this.getTeaConfirmData()
        }
    },

    mounted() { },

    methods: {

        /**
            处理茶树信息改变事件
            @param 
            @return
        */
        handleTeaTreeChange(data) {
            const { value } = data
            if (value > this.breedFormRenderList.length) {
                this.breedFormRenderList.push({
                    list: getBreedFormRenderList(),
                    id: Math.random()
                })
                this.breedFormDataList.push({})
            } else if (value < this.breedFormRenderList.length) {
                this.breedFormRenderList.pop()
                this.breedFormDataList.pop()
            }
        },
        /**
            获取茶园确权数据
            @param 
            @return
        */
        getTeaConfirmData() {
            this.$axios({
                url: '/authorized/query', //`/tea/auth/authorizeInfo/${this.id}`,
                method: "POST",
                data: {
                    id: this.id
                }
            }).then((res) => {
                console.log(res)
                const { teaGardenName, teaGardenArea, teaGardenAddress, selenium, latitudeLongitude, altitude, introduce, head, headPhone, teaCategoryList } = res.data
                const imageUrl = typeof res.data.imageUrl === 'string' ? res.data.imageUrl.split(',') : []
                let teaCategoryNum = 1
                if (Array.isArray(teaCategoryList) && teaCategoryList.length) {
                    teaCategoryNum = teaCategoryList.length
                    const breedFormRenderList = [], breedFormDataList = []
                    for (let i = 0; i < teaCategoryList.length; i++) {
                        breedFormRenderList.push({
                            list: getBreedFormRenderList(),
                            id: Math.random()
                        })
                        breedFormDataList.push(teaCategoryList[i])
                    }
                    this.breedFormRenderList = breedFormRenderList
                    this.breedFormDataList = breedFormDataList
                }
                this.formData = { teaGardenName, teaGardenArea, teaGardenAddress, selenium, latitudeLongitude, altitude, introduce, head, headPhone, imageUrl, teaCategoryNum }
            })
        },
        /**
            点击返回的处理事件
            @param 
            @return
        */
        handleBack() {
            this.$router.back(-1)
        },

        /**
            处理点击suffixIcon事件
            @param { Object } data 子组件传输数据
            @return
        */
        handleClickSuffixIcon(data) {
            this.showLoading = true
            if (this.$isReadyWeChat) {
                initWeChat().then(() => {
                    this.handleGetLocation()
                }).catch(() => {
                    this.showLoading = false
                })
            } else {
                this.handleGetLocation()
            }
        },

        /**
            处理获取地理职位的方法
            @param 
            @return
        */
        handleGetLocation() {
            getLocation().then((res) => {
                getRegeoFromTude(res.longitude, res.latitude).then((address) => {
                    this.showLoading = false
                    this.$set(this.formData, 'teaGardenAddress', address)
                }).catch(() => {
                    this.showLoading = false
                })
            }).catch(() => {
                this.showLoading = false
            })
        },
        /**
            点击提交的处理事件
            @param 
            @return
        */
        handleSubmit() {
            const { formData, breedFormDataList, userData: { enterpriseId, enterpriseName } } = this
            const teaCategoryList = []
            for (let i = 0; i < breedFormDataList.length; i++) {
                const breedFormDataItem = breedFormDataList[i]
                if (isEmpty(breedFormDataItem)) {
                    break
                }
                const breedFormData = {}
                for (let key in breedFormDataItem) {
                    if (!isEmpty(breedFormDataItem[key])) {
                        breedFormData[key] = breedFormDataItem[key]
                    }
                }
                if (!isEmpty(breedFormData)) {
                    teaCategoryList.push(Object.assign(breedFormData, this.id ? { teaGardenId: this.id } : {}))
                }
            }
            const params = {
                ...formData,
                enterpriseId: enterpriseId,
                enterpriseName: enterpriseName
            }
            if (!isEmpty(teaCategoryList)) {
                params.teaCategoryList = teaCategoryList
            }
            if (!isEmpty(params.imageUrl)) {
                params.imageUrl = params.imageUrl.join(',')
            }
            delete params.teaCategoryNum
            let requestUrl = '/authorized/save'
            if (this.id) {
                requestUrl = '/authorized/modify'
                params.id = this.id
            }
            this.$axios({
                url: requestUrl,
                data: {
                    ...params
                }
            }).then((res) => {
                if (this.id) {
                    this.$toast("编辑成功")
                } else {
                    this.$toast("新增成功")
                }
                setTimeout(() => {
                    this.$router.replace({ path: '/enterprise/teaConfirm/list' })
                }, 500)
            })
        }
        /**
            点击提交的处理事件
            @param 
            @return
        */
        // handleSubmit: throttleFnc(function (callback) {
        //     this.$refs.FcForm.validateForm().then((formData) => {
        //         if (this.id) {
        //             this.$axios({
        //                 url: '/tea/auth/updateAuthorize',
        //                 data: {
        //                     ...formData,
        //                     tenantName: this.userData.tenantName,
        //                     id: this.id
        //                 }
        //             }).then((res) => {
        //                 this.$toast("修改成功")
        //                 setTimeout(() => {
        //                     callback && typeof callback === 'function' && callback()
        //                     this.$router.back(-1)
        //                 }, 200)

        //             }).catch(() => {
        //                 callback && typeof callback === 'function' && callback()
        //             })
        //         } else {
        //             this.$axios({
        //                 url: '/tea/auth/addAuthorize',
        //                 data: {
        //                     ...formData,
        //                     tenantName: this.userData.tenantName
        //                 }
        //             }).then((res) => {
        //                 this.$toast("新增成功")
        //                 setTimeout(() => {
        //                     callback && typeof callback === 'function' && callback()
        //                     this.$router.back(-1)
        //                 }, 200)

        //             }).catch(() => {
        //                 callback && typeof callback === 'function' && callback()
        //             })
        //         }
        //     }).catch(() => {
        //         callback && typeof callback === 'function' && callback()
        //     })
        // })
    },

}

</script>

<style scoped lang='scss'>
.addTeaConfirm {
    padding: 0.2rem 0 2rem;
    min-height: 100%;
    background: #efefef;
    /deep/ .form .formItem-submit {
        z-index: 2;
        bottom: 0.6rem;
    }
    .addTeaConfirm-cell-breed {
        /deep/ .title-left {
            .title-left-icon {
                width: 0.22rem;
                height: 0.22rem;
            }
            .title-text {
                margin-left: 0.16rem;
                color: #3d71f6;
            }
        }
    }
}
.addTeaConfirm-content {
    .addTeaConfirm-form-line {
        //margin: 0 0.3rem;
        height: 1px;
        background-color: #eee;
    }
}

.addTeaConfirm-breed-item {
    margin-bottom: 0.2rem;
}

.addTeaConfirm-disabled {
    padding-bottom: 0.36rem;
    /deep/ .formItem {
        input::-webkit-input-placeholder,
        textarea::-webkit-input-placeholder {
            /* color: rgba(21, 21, 21, 0.5) */
            color: transparent !important;
        }
        input::-moz-placeholder,
        textarea::-moz-placeholder {
            /* color: rgba(21, 21, 21, 0.5); */
            color: transparent !important;
        }
        .formItem-placeholder {
            color: transparent !important;
        }
        .formItem-icon {
            display: none;
        }
        .formItem-label>div {
            color: #151515 !important;
        }
        .formItem-content .formItem-value {
            color: #151515 !important;
        }
    }
}
</style>