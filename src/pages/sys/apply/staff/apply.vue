<template>
    <FcPage title="账号申请" class="staffApplyPage">
        <div class="content">
            <FcForm ref="FcForm" :renderList="formList" v-model="formData"></FcForm>
        </div>
        <div class="submit">
            <div class=" bgColor white" @click="handleSubmit">提交</div>
        </div>
        <FcLoading :isShow="loaded"></FcLoading>
    </FcPage>
</template>

<script>
import FcForm from "@/components/form/form.vue";
import FcLoading from "@/components/loading/loading.vue";
import { getFormList, ROLE_PARENT_ID } from "./config";
import { userDatatorage } from '@/utils/storage'
export default {
    name: "staffApply",
    components: {
        FcForm,
        FcLoading
    },
    data() {
        return {
            id: this.$route.params.id,
            formList: getFormList(),
            formData: {},
            roleList: [],
            loaded: false,
            userData: userDatatorage.getUserData(),
        };
    },
    computed: {},
    mounted() { },
    methods: {

        /**
         * @description: 提交
         * @return {*}
         */
        handleSubmit() {
            this.$refs.FcForm.validateForm().then(formData => {

                const { roleList, userData } = this;
                const { phone } = userData; // 散客申请需要带手机号
                const role = roleList.filter(item => item.value === formData.roleId)[0] || {}; // 获取角色名称
                const params = {
                    ...formData,
                    roleName: role.text,
                    phone,
                };
                // 身份证图片
                const { certificate } = formData;
                if (certificate) {
                    let frontImg;
                    let reverseImg;
                    if (certificate && certificate.length > 0) {
                        frontImg = certificate[0];
                        reverseImg = certificate[1];
                    }
                    params[frontImg.key] = frontImg.img ? frontImg.img : "";
                    params[reverseImg.key] = reverseImg.img ? reverseImg.img : "";
                }
                this.$axios({
                    url: "/staff/save",
                    data: params
                })
                    .then(res => {
                        const { code, msg } = res;
                        if (code === 200) {
                            this.$toast("提交成功");
                            setTimeout(() => {
                                // TODO 提交成功，进入“散客”端首页（外包提供）
                            }, 500);
                        } else {
                            this.$toast(msg);
                        }
                        this.loaded = false;
                    })
                    .catch(e => {
                        this.loaded = false;
                        console.error(e);
                    });
            });
        },
    }
};
</script>
<style lang="scss" scoped>
.staffApplyPage {
    background: #f7f8fa;
    .content {
        margin-top: 0.2rem;
        background: #fff;
    }

    .submit {
        position: fixed;
        bottom: 0.4rem;
        width: 100%;
        > div {
            background: #185ef0;
            margin: 0 0.28rem;
            height: 0.96rem;
            border-radius: 0.04rem;
            line-height: 0.96rem;
            color: #e1e1e1;
            text-align: center;
        }
    }
}
</style>
