<template>
    <FcPage title="添加结算" isBorder>
        <div class="addTaeGreen" v-if="!loading">
            <div class="addTaeGreen-form" >
                <FcForm ref="FcForm" :renderList="renderFormList" v-model="formData"></FcForm>
            </div>
            <div class="addTaeGreen-rows">
                <WorkOrderRow v-for="(item, index) in orderRows" :key="index" :value="item.value" :label="item.label"
                    :type="item.type" />
            </div>
            <div class="addTaeGreen-btns">
                <div class="addTaeGreen-btns-item">
                    <Button type="info" text="提交" block @click="() => updateSettleWorkOrder(submitInfo)" />
                </div>
                <div class="addTaeGreen-btns-item">
                    <Button type="info" plain text="返回" block @click="() => this.$router.go(-1)" />
                </div>
            </div>
        </div>
        <FcLoading :isShow="loading" text="获取采摘数据..."></FcLoading>
    </FcPage>
</template>
<script>
import { renderFormList } from './config'
import { Button, Dialog } from 'vant'
import FcLoading from '@/components/loading/loading.vue'
import FcForm from '@/components/form/form.vue'
import WorkOrderRow from '@/components/workOrderRow/workOrderRow.vue'
export default {
    name: 'addTaeGreen',
    components: { Button, FcForm, WorkOrderRow, FcLoading },
    data() {
        return {
            renderFormList,
            formData: {},
            orderRows: [],
            submitInfo: {},
            loading: true
        }
    },
    methods: {
        /**
         * 获取采摘批次码信息
         * @param
         * @return
         */
        getQuerySettleInfo() {
            let pickBatchCode = this.$route.query.code
            this.$axios({
                url: '/workOrder/queryByPickInfo',
                data: {
                    pickBatchCode
                },
                method: 'GET'
            }).then((res) => {
                if (res.data) {
                    this.loading = false
                    console.log('res.data', res.data)
                    let { data: { executorName, imageUrl, executorId, pickBatchCode, workNo, estimateEndTime, pickBreed, pickRequire, actualStartTime, actualEndTime, teaGardenId } } = res
                    this.formData = { executorId: [executorId] }
                    this.submitInfo = res.data
                    this.orderRows = [
                        // 茶园工
                        {
                            type: 'text',
                            label: '茶园工',
                            value: executorName
                        },
                        // 采摘批次码
                        {
                            type: 'text',
                            label: '采摘批次码',
                            value: pickBatchCode
                        },
                        // 工单编码
                        {
                            type: 'text',
                            label: '工单编码',
                            value: workNo
                        },
                        // 完成时间
                        {
                            type: 'text',
                            label: '完成时间',
                            value: estimateEndTime
                        },
                        // 采摘品种
                        {
                            type: 'text',
                            label: '采摘品种',
                            value: pickBreed
                        },
                        // 采摘要求
                        {
                            type: 'text',
                            label: '采摘要求',
                            value: pickRequire
                        },
                        // 开始执行时间
                        {
                            type: 'text',
                            label: '开始执行时间',
                            value: actualStartTime
                        },
                        // 工作完成时间
                        {
                            type: 'text',
                            label: '工作完成时间',
                            value: actualEndTime
                        },
                        // 茶园码
                        {
                            type: 'code',
                            label: '茶园码',
                            value: [teaGardenId]
                        },
                        // 工作图片
                        {
                            type: 'img',
                            label: '工作图片',
                            value: imageUrl
                        }
                    ];
                } else {
                    this.loading = false
                }
            }).catch(() => {
                this.loading = false
            })
        },
        /**
         * 执行结算工单
         * @param
         * @return
         */
        updateSettleWorkOrder(data) {
            this.$refs.FcForm.validateForm().then((formData) => {
                // settlerId 登录时获取的id值 (角色: 企业)
                if (localStorage.getItem('userData')) {
                    let { weight, breedNum } = formData
                    let { id, tenantId, assignerId, executorId, operateStatus, actualEndTime, workType, productBatchCode, pickBatchCode } = data
                    this.$axios({
                        url: '/workOrder/updateSettleWorkOrder',
                        data: {
                            id,
                            settlerId: JSON.parse(localStorage.getItem('userData')).userId,
                            tenantId,
                            assignerId,
                            executorId,
                            operateStatus,
                            actualEndTime,
                            workType,
                            productBatchCode,
                            pickBatchCode,
                            weight,
                            breedNum
                        },
                        method: 'POST'
                    }).then((res) => {
                        if (res.code == 200) {
                            this.$toast("结算成功!")
                            this.$router.push('/staff/taeGreen')
                        }
                    })
                } else {
                    Dialog.confirm({
                        title: '登录',
                        message: '未获取到用户信息，请先登录!'
                    }).then(() => {
                        this.$router.push({ path: '/', query: { type: 'tg' } })
                    })
                }
            })
        }
    },
    created() {
        console.log('roleId', localStorage.getItem('roleId'))
        this.getQuerySettleInfo()
    }
}
</script>
<style lang="scss" scoped>
.addTaeGreen {
    background: #F7F8FA;
    padding: 0.18rem 0 0;

    >.addTaeGreen-form {
        background: #fff;
    }

    >.addTaeGreen-rows {
        margin: 0.18rem 0 0;
        padding: 0.2rem 0.3rem;
        background: #fff;
    }

    >.addTaeGreen-btns {
        >.addTaeGreen-btns-item {
            padding: 0.32rem;

            &:last-child {
                padding-top: 0;
            }
        }
    }
}
</style>
