<template>
  <div class="panel">
    <div class="header">
      <div class="role">
        <span :class="even?'text2':'text1'">{{ data.roleName }}</span>
      </div>
      <div :class="`auth ${data.authStatus === 2 ? 'error' : ''}`">
        <img :src="authIcon" alt="" v-if="data.authStatus === 3" /><span>{{
          data.authStatusName
        }}</span>
      </div>
    </div>
    <div class="content">
      <div class="content-box">
        <div class="info">{{ data.name }}</div>
        <div class="phone">
          <img :src="phone" alt="" /><span>{{ data.phone }}</span>
        </div>
      </div>
      <div class="code">
        <img :src="data.demandCodeUrl" alt="" v-if="data.demandCodeUrl" />
      </div>
    </div>
    <div class="footer">
      <div>
        <span class="btn left" @click="detail(data)">查看</span>
        <span class="btn" @click="update(data)">修改</span>
      </div>
    </div>
  </div>
</template>

<script>
import phone from "@/assets/enterprise/enterprise/phone.png";
import authIcon from "@/assets/enterprise/enterprise/authStatus.png";
export default {
  name: "userItem",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    even: {
      type: Boolean,
      default: false
    }
  },
  components: "",
  data() {
    return {
      phone,
      authIcon,
      authStatus:{
        0:'驳回',
        1:'待审核',
        2:'未认证',
        3:'已认证',
      },
    };
  },
  computed: {},
  mounted() {},
  methods: {
    /**
     * @description: 查看详情
     * @param {*} item
     * @return {*}
     */
    detail(item) {
      this.$emit("detail", item);
    },

    /**
     * @description: 修改
     * @param {*} item
     * @return {*}
     */
    update(item) {
      this.$emit("update", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  background: #ffffff;
  border-radius: 0.12rem;
  box-shadow: 0px 2px 3px 1px rgba(183, 183, 183, 0.08);
  font-size: 0.28rem;
  .header,
  .content,
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header {
    padding: 0.2rem 0;
    padding-right: 0.3rem;
    .role {
      padding-right: 0.18rem;
      position: relative;
      .left {
        position: absolute;
        width: 0.08rem;
        height: 0.62rem;
        left: -0.06rem;
      }

      .text1,
      .text2 {
        font-size: 0.28rem;
        display: inline-block;
        height: 0.52rem;
        line-height: 0.52rem;
        color: #ffffff;
        border-radius: 0px 0.52rem 0.52rem 0px;
        padding: 0 0.2rem;
      }
      .text1::before,
      .text2::before {
        display: inline-block;
        position: absolute;
        content: "";
        width: 0.08rem;
        height: 0.62rem;
        left: -0.08rem;
      }
      .text1 {
        background: #2580fd;
        &::before {
          background: url(~@/assets/enterprise/enterprise/bg_left_1.png);
          background-size: contain;
        }
      }
      .text2{
        background: #8685FD;
        &::before {
        background: url(~@/assets/enterprise/enterprise/bg_left_2.png);
        background-size: contain;
      }
      }
    }

    .auth {
      font-size: 0.28rem;
      img {
        width: 0.38rem;
        height: 0.32rem;
        vertical-align: middle;
        margin-right: 0.1rem;
      }
      span {
        vertical-align: middle;
      }
    }
  }
  .content {
    font-size: 0.32rem;
    margin: 0 0.12rem;
    border-top: 1px solid #eeeeee;
    .content-box {
      padding: 0.24rem 0.18rem;
      padding-right: 0;
      .phone {
        padding-top: 0.2rem;

        img {
          width: 0.44rem;
          height: 0.44rem;
          vertical-align: middle;
          margin-right: 0.16rem;
        }
        span {
          vertical-align: middle;
        }
      }
    }
    .code {
      padding-right: 0.18rem;
      align-self: flex-start;
      img {
        margin-top: 0.24rem;
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .footer {
    font-size: 0.3rem;
    padding: 0 0.3rem;
    padding-bottom: 0.36rem;
    justify-content: flex-end;

    .btn {
      padding: 0.08rem 0.3rem;
      background: #f5f7ff;
      color: #185ef0;

      &.left {
        margin-right: 0.2rem;
      }
    }
  }
}

.error {
  color: #ff4237;
}
</style>
