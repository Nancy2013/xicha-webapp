<template>
    <FcPage :title="title">
        <div class="addAgricultural">
            <div class="addAgricultural-content">
                <div class="addAgricultural-form">
                    <FcForm ref="FcForm" :renderList="formList" v-model="formData"></FcForm>
                </div>

            </div>
            <div class="submit">
                <div class="submit-submit bgColor white" @click="handleSubmit">提交</div>
            </div>
        </div>
        <FcLoading :isShow="loaded"></FcLoading>
    </FcPage>
</template>

<script>
import dayjs from 'dayjs'
import FcForm from '@/components/form/form.vue'
import FcLoading from '@/components/loading/loading.vue'
import { userDatatorage } from '@/utils/storage'
export default {
    name: '',
    components: {
        FcForm,
        FcLoading,
    },

    data() {
        return {
            formList: [],
            formData: {
                workOrderType: this.$route.params.type, // 通过路由参数获取
            },
            userData: userDatatorage.getUserData(),
            type: this.$route.params.type, // 通过路由参数获取
            title: '添加工单',
            componentType: 1, // 1代表添加工单，2代表执行工单
            loaded: false,
        }
    },

    created() {
        this.getOrderType(this.type);
    },

    computed: {
        orderType() {
            return this.formData.workOrderType
        }
    },
    watch: {
        orderType(newVal, oldVal) {
            const { orderType } = this;
            this.getOrderType(orderType);
            this.formData = { // 重置工单
                workOrderType: orderType,
            }
            this.$refs.FcForm.resetForm();
        }
    },
    mounted() { },
    methods: {
        // 查询工单
        getOrderType(type) {
            const { componentType, userData } = this;
            console.log(userData)
            const { enterpriseId } = userData; // TODO企业id
            const params = {
                type,
                componentType,
            };
            this.loaded = true;
            this.$axios({
                url: '/work-order/get-order-type',
                data: params,
            }).then(res => {
                const { code, data } = res;
                if (code === 200) {
                    const { list } = data;
                    this.formList = this.generateFormList(list);
                    console.log('----getOrderType----', this.formList);
                }
                this.loaded = false;
            }).catch(e => {
                this.loaded = false;
                console.error(e)
            })
        },

        // 生成form列表
        generateFormList(list) {
            if (list) {
                const filter = list.filter(v => v.id !== 'submit') // 过滤提交按钮
                    .sort((a, b) => a.order - b.order); // 根据order排序
                filter.forEach(v => {
                    const { type, id, options, inputType } = v;
                    v.label = v.name; // 标签
                    v.key = id;
                    v.type = type.toLowerCase();

                    if (v.type === 'select') { // select组件
                        if (Array.isArray(options)) {
                            options.map(k => {
                                k.text = k.name;
                            })
                        }
                        if (v.multiple) {
                            v.type = 'multipleSelect' // selectMultiple组件
                        }
                    }
                    if (inputType) {
                        // 文本框
                        v.inputType = inputType.toLowerCase();
                        if (v.inputType === 'textarea') {
                            v.type = 'textarea'
                        }
                    }
                    if (id === 'completeTime') { // dateTimePicker时间插件
                        v.type = 'dateTimePicker';
                    }
                    if (id === 'productLine') {
                        // 默认为1号产线
                        if (options.length > 0) {
                            this.formData = {
                                ...this.formData,
                                productLine: options[0].value
                            }
                        }
                    }
                })
                return filter;
            }
        },

        // 提交
        handleSubmit() {
            this.$refs.FcForm.validateForm().then((formData) => {
                const { completeTime, assignStaff } = formData;
                let formatAsignStaff = [];  // 分配人员支持多选
                if (completeTime) {
                    formData.completeTime = dayjs(formData.completeTime).format("YYYY-MM-DD HH:mm:ss")
                }
                if (assignStaff) {
                    formatAsignStaff = assignStaff.map(v => ({ id: v }))
                }
                this.loaded = true;
                const { userData } = this
                this.$axios({
                    url: '/work-order/save',
                    data: {
                        ...formData,
                        assignerId: userData.userId,
                        assignerName: userData.name,
                        assignStaff: formatAsignStaff,
                    }
                }).then((res) => {
                    const { code } = res;
                    if (code === 200) {
                        this.$toast("提交成功")
                        setTimeout(() => {
                            this.$router.back(-1)
                        }, 500)
                    }
                    this.loaded = false;
                }).catch(e => {
                    this.loaded = false;
                    console.error(e)
                })
            })
        }
    },
}

</script>

<style scoped lang='scss'>
.addAgricultural {
    position: relative;
    min-height: 100%;
    padding-top: 0.2rem;
    background-color: #f7f8fa;

    /deep/ .form .formItem:last-child > div {
        border-color: #eeeeee;
    }

    /deep/ .textarea {
        border: none;
        padding-bottom: 0;
    }
}

.addAgricultural-content {
    background-color: #fff;
    padding-bottom: 1.5rem;
}
.submit {
    position: fixed;
    bottom: 1rem;
    width: 100%;
    > div {
        background: #3d71f6;
        margin: 0 0.32rem;
        height: 0.96rem;
        border-radius: 0.04rem;
        border-width: 1px;
        line-height: 0.96rem;
        color: #e1e1e1;
        text-align: center;
    }
}
</style>