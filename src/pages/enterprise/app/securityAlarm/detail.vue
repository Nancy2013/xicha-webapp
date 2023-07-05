<template>
  <FcPage title="预警详情" class="detailPage">
    <div class="content">
      <FcForm ref="FcForm" :renderList="formList" v-model="formData" disabled></FcForm>
    </div>
    <div class="footer" v-if="formData.handleStatus === '未处理'">
      <div class="submit bgColor white" @click="handle">
        处理
      </div>
    </div>
    <FcLoading :isShow="loaded"></FcLoading>
  </FcPage>
</template>

<script>
import FcForm from '@/components/form/form.vue'
import FcLoading from '@/components/loading/loading.vue'
import { getFormList } from "./config";
import FCTextarea from "@/components/textarea/textarea.vue";
export default {
  name: "detail",
  components: {
    FcForm,
    FcLoading,
    FCTextarea,
  },
  data() {
    return {
      id: this.$route.query.id,
      formList: getFormList(),
      formData: {},
      loaded: false,
    };
  },
  created() {
    this.detail();
    this.formatFormList();
  },
  mounted() { },
  methods: {
    /**
     * @description: 查询记录详情
     * @return {*}
     */
    detail() {
      const { id } = this;
      const params = {
        id
      };
      this.loaded = true;
      this.$axios({
        url: "/securityRecord/getSecurityRecordInfoDetail",
        method: "GET",
        data: params,
        baseUrl: '/api/node'
      })
        .then(res => {
          const { code, data } = res;
          if (code === 200) {
            const { handleStatus } = data;
            this.formData = {
              ...data,
              handleStatus: handleStatus === 1 ? '已处理' : '未处理',
            }
          }
          this.formatFormList();
          this.loaded = false;
        })
        .catch(e => {
          this.loaded = false;
          console.error(e);
        });
    },

    /** 
     * 格式化数据显示
    */
    formatFormList() {
      const { formList, formData } = this;
      const hideKeys = ['handleRemark', 'updatedTime']; // 未处理时不显示处理结果、处理时间
      if (formData.handleStatus === '未处理') {
        // 未处理
        this.formList = formList.filter(item => !hideKeys.includes(item.key));
      };
    },

    /** 
     * 处理
    */
    handle() {
      this.formData.handleRemark = '';
      this.$dialog.prompt({
        title: '处理结果',
        placeholder: '请填写处理结果'
      }).then((value) => {
        this.handleOk(value);
      }).catch(e => console.error(e))
    },

    /** 
     * 确认弹窗
    */
    handleOk(value) {
      const params = {
        id: this.id,
        handleRemark: value,
      }
      this.$axios({
        url: "/securityRecord/handleRecord",
        method: "POST",
        data: params,
        baseUrl: '/api/node'
      }).then(res => {
        const { code } = res;
        if (code === 200) {
          this.$toast("处理成功");
          this.$dialog.close()
          setTimeout(() => {
            this.$router.back();
          }, 500)
        }
      }).catch(e => {
        console.error(e);
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.detailPage {
  background: #F7F8FA;

  .content {
    margin-top: .2rem;
    background: #fff;
  }

  .footer {
    position: absolute;
    padding: .8rem .28rem 0 .28rem;
    width: 100%;
    bottom: 1rem;

    div {
      width: 100%;
      height: .8rem;
      border-radius: .08rem;
      border-width: .02rem;
      border-style: solid;
      text-align: center;
      line-height: .76rem;
    }
  }

  /deep/ .dialog .textarea .textarea-content textarea {
    border: 1px solid #A0CEFF;
  }

  /deep/ .fcInput .formItem-content-disabled input {
    color: #333;
  }
}
</style>
