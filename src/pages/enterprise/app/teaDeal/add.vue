<template>
    <FcPage title="添加交易" v-if="loaded">
        <div class="addTeaDeal">
            <div class="addTeaDeal-content">
                <FcCell text="结算信息" isBold :icon="teaImg"></FcCell>
                <div class="addTeaDeal-form">
                    <div class="addTeaDeal-form-line"></div>
                    <FcForm ref="FcForm" :renderList="addFormRenderList" v-model="formData"></FcForm>
                </div>
            </div>

            <div class="addTeaDeal-content addTeaDeal-info">
                <FcCell text="采摘信息" isBold :icon="infoImg"></FcCell>
                <div class="addTeaDeal-form">
                    <div class="addTeaDeal-form-line"></div>
                    <div class="addTeaDeal-pickInfo">
                        <FcPickInfo :data="pickData"></FcPickInfo>
                    </div>
                </div>
            </div>

            <!-- <div class="addTeaDeal-bottom">
                <div class="addTeaDeal-back whiteBg" @click="handleBack">返回</div>
                <div class="addTeaDeal-submit bgColor white" @click="handleSubmit">提交</div>
            </div> -->
            <FcSubmit @back="handleBack" @submit="handleSubmit"></FcSubmit>
        </div>
    </FcPage>
</template>

<script>
import teaImg from '@/assets/enterprise/app/teaDeal/add/tea.png'
import infoImg from '@/assets/enterprise/app/teaDeal/add/info.png'
import FcCell from '@/components/cell/cell.vue'
import FcForm from '@/components/form/form.vue'
import FcPickInfo from '@/components/pickInfo/pickInfo.vue'
import { getAddFormRenderList } from './config'
import { enterpriseUserDataStorage } from '@/utils/storage'
import FcSubmit from '@/components/submit/submit.vue'
import QRCode from 'qrcode'
import { Dialog } from 'vant'
import { isEmpty, getLinkQuery } from '@/utils/common'
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export default {
    name: 'addTeaDeal',

    components: {
        FcCell,
        FcForm,
        FcSubmit,
        FcPickInfo
    },

    data() {
        return {
            teaImg: teaImg,
            infoImg: infoImg,
            addFormRenderList: getAddFormRenderList(),
            userData: enterpriseUserDataStorage.getUserData(),
            formData: {},
            pickData: {},
            workId: "",
            loaded: false
        }
    },
    beforeRouteEnter(form, to, next) {
        const userData = enterpriseUserDataStorage.getUserData()
        if (isEmpty(userData)) {
            Toast("请先登录")
            const queryData = getLinkQuery(location.href)
            next((vm) => {
                vm.$router.replace({
                    path: '/',
                    query: {
                        workId: queryData.workId
                    }
                })
            })
        } else {
            next()
        }
        
    },
    created() {
        this.workId = this.$route.query.workId || ""
        if (this.workId) {
            QRCode.toDataURL(`${location.origin}/#/enterprise/teaDeal/add?workId=${this.workId}`).then((url) => {
                this.$set(this.formData, 'code', [{
                    img: url
                }])
            })
            this.getPickData()
        }

    },
    methods: {
        /**
            获取采摘信息
            @param 
            @return
        */
        getPickData() {
            this.$axios({
                url: '/teaAction/getWorkRecordByWorkId',
                method: 'GET',
                data: {
                    workId: this.workId
                }
            }).then((res) => {
                this.loaded = true
                this.pickData = res.data || {}
            }).catch(() => {

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
        handleSubmit() {
            this.$refs.FcForm.validateForm().then((formData) => {
                this.$axios({
                    url: '/teaAction/addFarmingSettle',
                    data: {
                        operatePersonId: this.pickData.operatePersonId,
                        workId: this.workId,
                        settlerId: this.userData.userId,
                        weight: formData.weight,
                        breedNum: formData.breedNum
                    },
                    hideNote: true
                }).then((res) => {
                    this.$toast("交易完成")
                    setTimeout(() => {
                        this.$router.replace({
                            path: '/enterprise/teaDeal/list',
                            query: {
                                type: 'add'
                            }
                        })
                    }, 200)
                }).catch((err) => {
                    if (err.code == 20) {
                        Dialog.alert({
                            title: '提示',
                            message: `${err.message}`,
                        }).then(() => {
                            this.$router.replace({
                                path: '/enterprise/teaDeal/list',
                                query: {
                                    type: 'add'
                                }
                            })
                        })
                    } else {
                        this.$toast(`${err.message}`)
                    }
                })

            })
        }
    },

}

</script>

<style scoped lang='scss'>
.addTeaDeal {
    position: relative;
    min-height: 100%;
    padding: 0.3rem 0.3rem 2.2rem;
    background-color: #f5f5f5;
    .addTeaDeal-content {
        background-color: #fff;
        /deep/ .title-text {
            color: #629b88;
        }
        /deep/ .upload {
            padding-top: 0.18rem;
        }
        /deep/ .upload-content {
            justify-content: space-between;
            border-bottom: 1px solid #eeeeee;
            .formItem-label {
                    padding-top: 0.14rem;
                }
            .formItem-content {
                flex: auto;
                justify-content: flex-end;
                .formItem-content-item {
                    padding: 0;
                }
                .formItem-uploader {
                    width: 0.64rem;
                    height: 0.64rem;
                    padding: 0;
                    background-color: transparent;
                }
                .formItem-uploader {
                    > img {
                        width: 0.64rem !important;
                        height: 0.64rem !important;
                    }
                }
                .formItem-uploader-delete {
                    display: none !important;
                }
            }
        }
        .addTeaDeal-form-line {
            margin: 0 0.3rem;
            height: 1px;
            background-color: #eee;
        }
        .addTeaDeal-pickInfo {
            padding: 0.18rem 0.3rem 0;
        }
    }

    .addTeaDeal-info {
        margin-top: 0.2rem;
    }

    .addTeaDeal-bottom {
        position: fixed;
        bottom: 0.8rem;
        left: 0.3rem;
        right: 0.3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > div {
            width: 3.1rem;
            height: 0.8rem;
            border-radius: 0.08rem;
            border-width: 1px;
            border-style: solid;
            text-align: center;
            line-height: 0.76rem;
        }
        .addTeaDeal-back {
            border-color: #e1e1e1;
        }
    }
}
</style>