<template>
  <FcPage title="预警记录" class="listPage">
    <div class="list">
      <div class="list-title">
        <div class="search">
          <FcSearch v-model="searchValue" placeholder="请输入关键字"></FcSearch>
          <div class="btn" @click="handleSearch">搜索</div>
        </div>
      </div>
      <div class="list-content">
        <FcList :count="total" :page="pageNum" :limit="pageSize" :loaded="loaded" @scrolltolower="handleScrolltolower">
          <Panel v-for="(item) in list" :key="item.id" :data="item" class="item"
            @detail="detail"/>
        </FcList>
      </div>
    </div>
  </FcPage>
</template>

<script>
import FcSearch from "@/components/search/search.vue";
import FcList from "@/components/list/list.vue";
import Panel from "./components/panel.vue";

export default {
  name: "list",
  components: {
    Panel,
    FcSearch,
    FcList,
  },

  data() {
    return {
      searchValue: "",
      pageNum: 1,
      pageSize: 20,
      total: 0,
      loaded: true,
      list: [],
    };
  },

  mounted() { },

  created() {
    this.query();
  },
  methods: {
    /** 
     * 查询
    */
    query(callback) {
      const { pageNum, pageSize, searchValue, } = this;
      const params = {
        pageNum,
        pageSize,
        regionName: searchValue,
      };
      this.loaded = false;
      this.$axios({
        url: "/securityRecord/thermalListPhone",
        method: "POST",
        data: params,
        baseUrl: '/api/node'
      })
        .then(res => {
          const {code,rows,total=0}=res;
          if (code === 200) {
            if (this.pageNum === 1) {
              this.list = rows;
            } else {
              this.list = this.list.concat(rows);
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
      this.query(callback)
    },

    /**
     * @description: 搜索
     * @return {*}
     */
    handleSearch() {
      this.initPagination();
      this.query();
    },

    /**
     * @description: 详情
     * @param {*} item
     * @return {*}
     */
    detail(item) {
      const { id } = item;
      this.$router.push({ path: "/enterprise/securityAlarm/detail", query: { id } });
    }
  }
};
</script>

<style scoped lang="scss">
.listPage {
  /deep/ .page-content {
    background-color: #f7f8fa;
  }

  .list-title {
    padding-top: 0.16rem;
    background: #fff;
    .search {
      position: relative;
      padding-bottom: 0.16rem;

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

  .list-content {
    position: absolute;
    top: 1rem;
    bottom: 0;
    left: 0;
    right: 0;

    .item {
      margin: 0 .32rem;
      margin-top: 0.2rem;
    }
  }
}
</style>
