<template>
  <FcPage title="查看人员" class="userDetailPage">
    <div class="content">
      <FcForm ref="FcForm" :renderList="formList" v-model="formData" disabled></FcForm>
    </div>
    <FcLoading :isShow="loaded"></FcLoading>
  </FcPage>
</template>

<script>
import FcForm from '@/components/form/form.vue'
import FcLoading from '@/components/loading/loading.vue'
import { getFormList, ROLE_PARENT_ID } from "./config";
export default {
  name: "userDetail",
  components: {
    FcForm,
    FcLoading,
  },
  data() {
    return {
      id:this.$route.params.id,
      formList:getFormList(),
      formData:{},
      roleList:[],
      loaded:false,
    };
  },
  created(){
    this.getById();
    this.getRoleList();
    this.formatFormList();
  },
  mounted() {},
  methods: {
    /**
     * @description: 设置Form不可用
     * @return {*}
     */
    formatFormList(){
      const {formList}=this;
      formList.forEach(v=>{
        v.disabled=true;
      })
      this.formList = Object.assign([], formList);
    },
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
  }
};
</script>
<style lang="scss" scoped>
.userDetailPage {
    background: #F7F8FA ;
    .content{
        margin-top: .2rem;
        background: #fff;
    }
}
</style>
