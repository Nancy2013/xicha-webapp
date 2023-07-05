<template>
    <div class="login">
        <div class="login-header">
            <!-- <img class="login-header-bg" :src="require('@/assets/sys/login/login-header-bg.png')" alt=""> -->
            <!-- <img class="login-header-text" :src="require('@/assets/sys/login/login-header-text.png')" alt=""> -->

        </div>

        <div class="login-header-overlay"></div>

        <div class="login-content">
            <div class="login-title">用户登录
                <div class="login-title-line">
                    <div></div>
                </div>
            </div>
            <div class="login-item">
                <div class="login-inputBox">
                    <img :src="require('@/assets/sys/login/username.png')" alt="">
                    <input type="text" placeholder="请输入用户名" maxlength="11" v-model="userInfo.phone" @input="handleInput($event, 'phone')">
                </div>
            </div>

            <!-- <div class="login-item">
                <div class="login-inputBox">
                    <img :src="require('@/assets/sys/login/password.png')" alt="">
                    <input type="text" placeholder="请输入密码">
                </div>
            </div> -->

            <div class="login-item">
                <div class="login-inputBox">
                    <img :src="require('@/assets/sys/login/code.png')" alt="">
                    <input type="text" placeholder="短信验证码" maxlength="6" v-model="userInfo.validateCode" @input="handleInput($event, 'validateCode')">
                    <div class="login-getCode color" @click="getCode">{{ countDown === 0 ? '获取验证码' : countDown+ ' s' }}</div>
                </div>
                <!-- <div class="login-getCode">
                    <FcButton  :text="countDown === 0 ? '获取' : countDown+ ' s'" @click="getCode"></FcButton>
                </div> -->
            </div>

            <div class="login-forget" @click="handleForget">
                <img v-if="!isForget" src="@/assets/sys/login/forget.png" alt="">
                <img v-else src="@/assets/sys/login/forget-active.png" alt="">
                <div class="color">记住账号</div>
            </div>

            <div style="clear: both;"></div>

            <div class="login-submit">
                <FcButton customStyle="letter-spacing: 0.04rem;" text="登录" @click="handleSubmit"></FcButton>
            </div>
            <!-- <div class="login-apply color">暂无账号，立即申请</div> -->
        </div>

    </div>
</template>

<script>
import FcButton from '@/components/button/button.vue';
import { throttleFnc } from '@/utils/common'
import { validPhone, validCode } from '@/utils/reg'
import { filterNum_str } from '@/utils/filters'
import { userDatatorage, userPhoneStorage } from '@/utils/storage'
import { approveStatusDict, accountTypeDict } from "@/utils/dict"
export default {
    name: 'login',
    components: {
        FcButton
    },

    data() {
        return {
            userInfo: {
                phone: '',  //'13951018139',   //'18212341234',
                validateCode: ''
            },
            isForget: false,
            codeTimer: null,
            countDown: 0,
            isDialog: false,
            active: 0,
            code: "",
            type: ""
        }
    },

    created() {
        this.code = this.$route.query.code || ""
        this.type = this.$route.query.type
        const userPhone = userPhoneStorage.getUserPhone()
        if (userPhone) {
            this.$set(this.userInfo, 'phone', userPhone)
            this.isForget = true
        }
    },

    methods: {
        /**
            点击获取验证码时触发
            @param 
            @return
        */
        getCode: throttleFnc(function (callback) {
            if (validPhone(this.userInfo.phone)) {
                this.$axios({
                    url: '/getValidateCode',
                    method: 'GET',
                    data: {
                        phoneNumber: this.userInfo.phone
                    },
                    baseUrl: '/api/base'
                }).then((res) => {
                    this.$toast("验证码已发送")
                    if (this.codeTimer) {
                        clearInterval(this.codeTimer)
                        this.codeTimer = null
                    }
                    this.countDown = 60
                    this.codeTimer = setInterval(() => {
                        this.countDown = this.countDown - 1
                        if (this.countDown <= 0) {
                            clearInterval(this.codeTimer)
                            this.codeTimer = null
                            callback()
                        }
                    }, 1000)
                }).catch(() => {
                    callback()
                })
            } else {
                this.$toast("请输入正确的账号")
                callback()
            }
        }),

        /**
            输入框输入事件处理函数
            @param { Event } event input事件参数
            @param { String } type 类型 phone || code
            @return
        */
        handleInput(event, type) {
            this.$set(this.userInfo, type, filterNum_str(event.target.value))
        },

        /**
            点击记住账号时触发
            @param 
            @return
        */
        handleForget() {
            this.isForget = !this.isForget
        },

        /**
            提交的事件处理方法
            @param 
            @return
        */
        handleSubmit() {
            if (!validPhone(this.userInfo.phone)) {
                this.$toast("请输入正确的账号")
                return
            }
            if (!validCode(this.userInfo.validateCode)) {
                this.$toast("请输入正确的短信验证码")
                return
            }
            this.$axios({
                url: '/sms/login/register',
                method: 'GET',
                data: {
                    phoneNumber: this.userInfo.phone,
                    validateCode: this.userInfo.validateCode
                },
                baseUrl: '/api/base'
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                this.getUserAuthStatus().then((result) => {
                    userDatatorage.setUserData(res.data)
                    switch (result.currentAccountType) {
                        case accountTypeDict.tourist:
                            this.getTouristInfo().then((touristInfo) => {
                                // TODO 此处跳转游客首页
                            }).catch(() => {
                                this.$router.push('/sys/staffApply')
                            })
                            break
                        case accountTypeDict.enterprise:
                            switch (result.approvalStatus) {
                                case approveStatusDict.unAuthentication:
                                    this.$router.push('/sys/apply')
                                    break
                                case approveStatusDict.waitingApprove:
                                case approveStatusDict.disallow:
                                    this.$router.push('/sys/detail')
                                    break
                                case approveStatusDict.authenticated:
                                    this.$router.push('/enterprise')
                                    break
                            }
                            break
                        case accountTypeDict.teaGarden:
                            console.log(result.approvalStatus)
                            switch (result.approvalStatus) {
                                case approveStatusDict.unAuthentication:
                                    this.$router.push('/enterprise/teaConfirm/add')
                                    break
                                default: 
                                    this.$router.push('/enterprise/teaConfirm/list')
                                    break
                            }
                            break
                        case accountTypeDict.other:
                            this.$router.push('/staff/home')
                            break
                    }
                }).catch(() => {
                    localStorage.removeItem('token')
                })
            })
        },



        /**
         * 获取用户认证状态
         * @param
         * @return
         */
        getUserAuthStatus() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    url: '/auth/current/account/type/auth',
                    method: 'GET',
                    data: {}
                }).then((res) => {
                    resolve(res.data)
                }).catch(() => {
                    reject()
                })
            })
        },

        /**
         * 获取散客的信息
         * @param
         * @return
         */
        getTouristInfo() {
            return new Promise((resolve, reject) => {
                this.$axios({
                    url: '/staff/current',
                    method: 'GET',
                    data: {},
                    hideNote: true
                }).then((res) => {
                    resolve(res.data)
                }).catch((err) => {
                    console.log(err)
                    reject()
                })
            })
        }
    },

}

</script>

<style scoped lang='scss'>
.login {
    position: relative;
    padding-bottom: 0.64rem;
    overflow: hidden;
}
.login-header {
    position: relative;
    height: 5.56rem;
    background-size: 100% 100%;
    background-image: url(~@/assets/sys/login/login-header-bg.png);
    .login-header-bg {
        width: 100%;
        height: 100%;
    }
    .login-header-text {
        position: absolute;
        left: 0;
        right: 0;
        top: 1.2rem;
        width: 4.74rem;
        height: 2.08rem;
        margin: 0 auto;
    }
}
.login-header-overlay {
    z-index: 9;
    position: absolute;
    top: 0.64rem;
    right: -1.46rem;
    width: 6.38rem;
    height: 4.6rem;
    background-size: 100% 100%;
    background-image: url(~@/assets/sys/login/login-header-overlay.png);
}
.login-title {
    text-align: left;
    font-size: 0.32rem;
    line-height: 0.44rem;
    .login-title-line {
        position: relative;
        margin-top: 0.18rem;
        margin-bottom: 0.7rem;
        height: 1px;
        width: 100%;
        background: rgba(0, 0, 0, 0.1);
        div {
            left: 0;
            top: 0;
            bottom: 0;
            width: 1.28rem;
            height: 0.04rem;
            margin: auto 0;
            background: #333333;
        }
    }
}

.login-content {
    z-index: 2;
    position: relative;
    //top: -1.68rem;
    overflow: hidden;
    margin: -1.68rem 0.28rem 0;
    padding: 0.72rem 0.28rem;
    box-shadow: 1px 0.06rem 0.22rem 0.04rem rgba(231, 231, 231, 0.5);
    border-radius: 0.18rem;
    background-color: #fff;
    .login-item {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.4rem;
        .login-inputBox {
            position: relative;
            flex: 1;
            height: 1rem;
            padding-left: 0.78rem;
            border-radius: 0.08rem;
            background-color: #f4f6f8;
            img {
                display: block;
                position: absolute;
                width: 0.56rem;
                height: 0.56rem;
                left: 0.22rem;
                top: 0;
                bottom: 0;
                margin: auto 0;
            }
            input {
                width: 100%;
                height: 100%;
                padding-left: 0.2rem;
                border: none;
                outline: none;
                color: #333;
                background-color: transparent;
            }
        }
        .login-getCode {
            position: absolute;
            right: 0.24rem;
            top: 0;
            bottom: 0;
            line-height: 1rem;
        }
    }

    .login-forget {
        float: left;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.28rem;
        height: 0.4rem;
        > img {
            width: 0.36rem;
            height: 0.36rem;
        }
        > div {
            margin-left: 0.08rem;
            font-size: 0.28rem;
        }
    }

    .login-apply {
        float: right;
        margin-top: 0.2rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        text-decoration: underline;
    }
}

.login-submit {
    width: 5.7rem;
    height: 0.84rem;
    margin: 0.78rem auto 0;
}
.dialog-item {
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    text-align: center;
    &:last-child {
        padding-bottom: 0.5rem;
    }
    > p {
        margin: 0;
        width: 200px;
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        border: 1px solid #e2e2e2;
    }
}
</style>