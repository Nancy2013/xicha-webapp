<template>
  <FcPage :title="title" class="userAddPage">
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
export default {
  name: "userAdd",
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
      enterpriseId: localStorage.getItem('enterpriseId'),
    };
  },
  created() {
    const { id } = this;
    if (id) {
      this.getById();
    }

    this.getRoleList();
  },
  computed: {
    title() {
      const { id } = this;
      const title = `${id ? "修改" : "添加"}` + "人员";
      return title;
    }
  },
  mounted() {},
  methods: {
    /**
     * @description: 查询角色
     * @return {*}
     */
    getRoleList() {
      const params = {
        id: ROLE_PARENT_ID
      };

      this.$axios({
        url: "/get-role",
        data: params
      })
        .then(res => {
          const { code, data } = res;
          if (code === 200) {
            data.forEach(v => {
              v.text = v.name;
              v.value = v.id;
            });
            this.roleList = data;
            const { formList } = this;
            formList[1].options = data;
            this.formList = Object.assign([], formList);
          }
        })
        .catch(e => {
          console.error(e);
        });
    },

    /**
     * @description: 查询人员信息
     * @return {*}
     */
    getById() {
      const { id } = this;
      const params = {
        id
      };
      this.loaded = true;
      this.$axios({
        url: "/staff/get-by-id",
        method: "GET",
        data: params
      })
        .then(res => {
          const { code, data } = res;
          if (code === 200) {
            // 初始化图片
            const { formList } = this;
            const pos = formList.findIndex(v => v.key === "certificate");
            const { uploadList } = formList[pos];
            const [frontImg, reverseImg] = uploadList;
            frontImg.img = data[frontImg.key];
            reverseImg.img = data[reverseImg.key];

            this.formData = {
              ...data,
              certificate: uploadList
            };
          }
          this.loaded = false;
        })
        .catch(e => {
          this.loaded = false;
          console.error(e);
        });
    },

    /**
     * @description: 提交
     * @return {*}
     */
    handleSubmit() {
      this.$refs.FcForm.validateForm().then(formData => {
        
        const { id, roleList,enterpriseId } = this;
        const url = id ? "/staff/update" : "/staff/save";
        const role = roleList.filter(v => v.value === formData.roleId)[0] || {}; // 获取角色名称
        const params = {
          ...formData,
          roleName: role.text,
          enterpriseId,
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
        console.log("---handleSubmit-----", params);
        this.$axios({
          url,
          data: params
        })
          .then(res => {
            const { code, msg } = res;
            if (code === 200) {
              this.$toast("提交成功");
              setTimeout(() => {
                this.$router.back(-1);
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
.userAddPage {
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
