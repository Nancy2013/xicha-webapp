<template>
    <FcPage :title="title" isBorder showLeft>
        <div class="addAuthor">
            <div class="addTeaConfirm-content" v-for="(formItem, formKey) in formRenderList" :key="formKey">
                <FcCell text="授权申请" isBold :icon="fileImg">
                    <img @click="handleDeleteFormItem(formKey)" class="addAuthor-deleteForm" src="@/assets/enterprise/app/author/add/close.png" alt="">
                </FcCell>
                <div class="addTeaConfirm-form">
                    <div class="addTeaConfirm-form-line"></div>
                    <FcForm :ref="`FcForm${formKey}`" :renderList="formItem" v-model="formDataList[formKey]"></FcForm>
                </div>
            </div>

            <div class="addAuthor-add" v-if="!id">
                <div class="bgColor" @click="addFormItem">
                    <span class="white">添加</span>
                    <img src="@/assets/enterprise/app/author/add/add.png" alt="">
                </div>
            </div>
            <FcSubmit @back="handleBack" @submit="handleSubmit"></FcSubmit>
        </div>
    </FcPage>
</template>

<script>
import FcCell from '@/components/cell/cell.vue'
import fileImg from '@/assets/enterprise/app/agriculturalManage/add/file.png'
import FcForm from '@/components/form/form.vue'
import FcSubmit from '@/components/submit/submit.vue'
import { getAddFormItemRenderList } from './config'
import { throttleFnc } from '@/utils/common'
import { enterpriseUserDataStorage } from '@/utils/storage'
import { filterKilobitSplit } from '@/utils/filters'
export default {
    name: 'addAuthor',

    components: {
        FcCell,
        FcForm,
        FcSubmit
    },

    data() {
        return {
            title: "",
            userData: enterpriseUserDataStorage.getUserData(),
            fileImg: fileImg,
            formDataList: [{}],
            formRenderList: [
                getAddFormItemRenderList()
            ],
            id: ""
        }
    },

    created() {
        const id = this.$route.query.id
        if (id) {
            this.title = '修改授权申请'
            this.id = id
            this.getAuthorData()
        } else {
            this.title = '添加授权申请'
        }
    },

    methods: {
        /**
            获取授权申请数据
            @param 
            @return
        */
        getAuthorData() {
            this.$axios({
                url: `/tea/auth/codeApplicationInfo/${this.id}`,
                method: "GET",
                data: {}
            }).then((res) => {
                this.formDataList = [
                    {
                        brand: res.data.brand,
                        applyCount: filterKilobitSplit(res.data.applyCount)
                    }
                ]
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
            点击提交的处理事件
            @param 
            @return
        */
        handleSubmit: throttleFnc(function (callback) {

            const promiseList = []
            for (let i = 0; i < this.formRenderList.length; i++) {
                promiseList.push(this.$refs[`FcForm${i}`][0].validateForm())
            }
            Promise.all(promiseList).then((formDataList) => {
                const { brand, applyCount } = formDataList[0]
                const { tenantName, userName, phone, shortName } = this.userData
                if (this.id) {
                    this.$axios({
                        url: '/tea/auth/updateCodeApplication',
                        data: {
                            brand: brand,
                            applyCount: applyCount.replace(",", ""),
                            id: this.id,
                            tenantName: tenantName,
                            applicant: userName,
                            phone: phone,
                            shortName: shortName,
                            status: 0
                        },
                    }).then((res) => {
                        this.$toast("修改成功")
                        setTimeout(() => {
                            callback && typeof callback === 'function' && callback()
                            this.$router.back(-1)
                        }, 200)
                    }).catch(() => {
                        callback && typeof callback === 'function' && callback()
                    })
                } else {
                    this.$axios({
                        url: '/tea/auth/addCodeApplication',
                        data: {
                            "teaCodeApplications": formDataList.map((item) => {
                                return {
                                    brand: item.brand,
                                    applyCount: item.applyCount.replace(",", ""),
                                    tenantName: tenantName,
                                    applicant: userName,
                                    phone: phone,
                                    shortName: shortName,
                                    status: 0
                                }
                            })
                        }
                    }).then((res) => {
                        this.$toast("新增成功")
                        setTimeout(() => {
                            callback && typeof callback === 'function' && callback()
                            this.$router.back(-1)
                        }, 200)
                    }).catch(() => {
                        callback && typeof callback === 'function' && callback()
                    })
                }

            }).catch((err) => {
                callback && typeof callback === 'function' && callback()
            })
        }),

        /**
            添加表单项
            @param { Number } formKey 表单项的下标
            @return
        */
        addFormItem() {
            this.formDataList.push({})
            this.formRenderList.push(getAddFormItemRenderList())
        },

        /**
            处理删除表单项
            @param { Number } formKey 表单项的下标
            @return
        */
        handleDeleteFormItem(formKey) {
            if (this.formRenderList.length > 1) {
                this.formDataList.splice(formKey, 1)
                this.formRenderList.splice(formKey, 1)
            } else {
                this.$toast("最少有一项授权申请")
            }

        }
    },

}

</script>

<style scoped lang='scss'>
.addAuthor {
    min-height: 100%;
    padding: 0.3rem 0.3rem 2.4rem;
    background-color: #f5f5f5;
    .addTeaConfirm-form-line {
        margin: 0 0.3rem;
        height: 1px;
        background-color: #eee;
    }

    .addAuthor-deleteForm {
        z-index: 2;
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        right: 0;
        top: 0;
    }
}

.addTeaConfirm-content {
    position: relative;
    margin-bottom: 0.16rem;
    background-color: #fff;
}

.addAuthor-add {
    margin-top: 0.34rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 1.16rem;
        height: 0.56rem;
        border-radius: 0.08rem;
    }
    span {
        font-size: 0.26rem;
    }
    img {
        width: 0.32rem;
        height: 0.32rem;
    }
}
</style>