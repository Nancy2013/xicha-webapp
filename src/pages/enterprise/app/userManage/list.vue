<template>
  <FcPage title="人员管理" class="userListPage">
    <div class="userList">
      <div class="userList-title">
        <div class="search">
          <FcSearch v-model="searchValue" placeholder="请输入员工姓名进行搜索"></FcSearch>
          <div class="btn" @click="handleSearch">搜索</div>
        </div>
        <FcTabs class="userList-tabs" :options="roleOptions" v-model="roleId" @change="handleChangeTab"></FcTabs>
      </div>
      <div class="userList-content">
        <FcList :count="total" :page="pageNum" :limit="pageSize" :loaded="loaded" @scrolltolower="handleScrolltolower">
          <userItem v-for="(item, index) in userList" :key="item.id" :data="item" class="item" :even="index % 2 !== 0"
            @detail="detail" @update="update"></userItem>
        </FcList>
      </div>
    </div>
    <div class="userList-add" @click="handleAdd">
      <img src="@/assets/enterprise/enterprise/add.png" alt="" />
    </div>
  </FcPage>
</template>

<script>
import FcSearch from "@/components/search/search.vue";
import FcList from "@/components/list/list.vue";
import userItem from "@/components/userManage/userItem.vue";
import FcTabs from "@/components/tabs/tabs.vue";
import { ROLE_PARENT_ID } from "./config";

export default {
  name: "userList",
  components: {
    userItem,
    FcSearch,
    FcList,
    FcTabs
  },

  data() {
    return {
      searchValue: "",
      activeTab: 1,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loaded: true,
      userList: [],
      roleId: ROLE_PARENT_ID,
      roleOptions: []
    };
  },

  mounted() { },

  created() {
    this.getRoleList();
    this.getUserList();
  },
  methods: {
    /**
         获取人员列表
         @param 
         @return
         */
    getUserList(callback) {
      const { pageNum, pageSize, searchValue, roleId } = this;
      const params = {
        pageNum,
        pageSize,
        name: searchValue,
        roleId
      };
      this.loaded = false;
      this.$axios({
        url: "/staff/query",
        method: "POST",
        data: params
      })
        .then(res => {
          const { code, data } = res;
          if (code === 200) {
            const { rows, total } = data;
            if (this.pageNum === 1) {
              this.userList = rows;
            } else {
              this.userList = this.userList.concat(rows);
            }
            this.total = total;
          }
          this.loaded = true;
          callback && typeof callback === 'function' && callback()
        })
        .catch(e => {
          this.loaded = true;
          callback && typeof callback === 'function' && callback()
          console.error(e);
        });
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
          const roleOptions = [
            {
              label: "全部",
              value: ROLE_PARENT_ID
            }
          ];
          if (code === 200) {
            data.forEach(v => {
              v.label = v.name;
              v.value = v.id;
            });
            this.roleOptions = roleOptions.concat(data);
          }
        })
        .catch(e => {
          console.error(e);
        });
    },

    /**
     * @description: 初始化分页
     * @return {*}
     */
    initPagination() {
      this.pageNum = 1;
    },


    /**
     * @description: list页面触底事件
     * @param {*} callback
     * @return {*}
     */
    handleScrolltolower(callback) {
      this.pageNum++
      this.getUserList(callback)
    },

    /**
     * @description: 搜索
     * @return {*}
     */
    handleSearch() {
      this.initPagination();
      this.getUserList();
    },

    /**
     * @description: 切换tab
     * @return {*}
     */
    handleChangeTab() {
      this.initPagination();
      this.getUserList();
    },

    /**
     * @description: 添加
     * @return {*}
     */
    handleAdd() {
      this.$router.push({ name: "userAdd" });
    },

    /**
     * @description: 修改
     * @param {*} item
     * @return {*}
     */
    update(item) {
      const { id } = item;
      this.$router.push({ name: "userAdd", params: { id } });
    },

    /**
     * @description: 详情
     * @param {*} item
     * @return {*}
     */
    detail(item) {
      const { id } = item;
      this.$router.push({ name: "userDetail", params: { id } });
    }
  }
};
</script>

<style scoped lang="scss">
.userListPage {
  /deep/ .page-content {
    background-color: #f7f8fa;
  }

  .userList-title {
    padding-top: 0.16rem;
    background: #fff;

    .search {
      position: relative;
      padding-bottom: 0.12rem;

      .btn {
        position: absolute;
        color: #185ef0;
        font-weight: 400;
        font-size: 0.28rem;
        right: 0.52rem;
        top: 0;
        transform: translate(0, 50%);
      }
    }
  }

  .userList-content {
    position: absolute;
    top: 2.22rem;
    bottom: 0;
    left: 0;
    right: 0;

    .item {
      margin: 0 0.28rem;
      margin-top: 0.2rem;
    }
  }

  .userList-add {
    position: fixed;
    right: 0.1rem;
    bottom: 0.36rem;
    width: 1.2rem;
    height: 1.2rem;

    >img {
      width: 100%;
      height: 100%;
    }
  }

 /deep/   .fcList{
  padding-bottom:1.2rem
 }
}


.userList-tabs {
  /deep/ .fcTabs-overlay {
    display: none;
  }

  /deep/ &.fcTabs .van-tabs--line .van-tabs__wrap {
    padding-right: 0;
  }
}
</style>
