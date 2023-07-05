<template>
  <div class="panel">
    <div class="header">
      <div class="left">
        <div v-if="data.handleStatus===1">
          <img :src="checked" alt=""/><span class="status">已处理</span>
        </div>
        <div v-else>
          <img :src="uncheck" alt=""/><span class="status">未处理</span>
        </div>
      </div>
      <div class="right" @click="detail">
        <span>详情</span>
        <img :src="arrowR" alt=""/>
      </div>
    </div>
    <div class="content">
      <div class="content-box">
        <div class="info">
          <div class="label">区域地址</div>
          <div class="value">{{ data.regionName }}</div>
        </div>
        <div class="info">
          <div class="label">产品名称</div>
          <div class="value">{{ data.productName }}</div>
        </div>
        <div class="info">
          <div class="label">产品批次</div>
          <div class="value">{{ data.batchNo }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div><span class="label">预警时间：</span><span class="value">{{ data.createTime }}</span></div>
    </div>
  </div>
</template>

<script>
import checked from "@/assets/enterprise/app/securityAlarm/checked.png";
import uncheck from "@/assets/enterprise/app/securityAlarm/uncheck.png";
import arrowR from "@/assets/enterprise/app/securityAlarm/arrowR.png";
export default {
  name: "panel",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
  },
  components: "",
  data() {
    return {
      uncheck,
      checked,
      arrowR,
      status: {
        0: '未处理',
        1: '已处理',
      },
    };
  },
  computed: {},
  mounted() { },
  methods: {
    /**
     * @description: 查看详情
     * @param {*} item
     * @return {*}
     */
    detail() {
      this.$emit("detail", this.data);
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
  border-radius: 2px;
  box-shadow: 0rem .04rem .12rem .04rem rgba(241, 241, 241, 0.5);
  font-size: 15px;
  padding: 0 .3rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    padding: 12px 0;
    font-size: 16px;
    .left {
      img{
        width: 23px;
        height: 23px;
        vertical-align: middle;
        margin-right:.16rem;
      }
      span {
        vertical-align: middle;
      }
    }

    .right{
      color:#696969;
      img {
        width: .32rem;
        height: .32rem;
        vertical-align: middle;
        margin-right: 5px;
      }
      span {
        vertical-align: middle;
      }
    }
  }

  .content {
    border-top: .02rem solid #eeeeee;
    border-bottom: .02rem solid #eeeeee;
    padding: .24rem 0;
    font-size: 15px;
    .content-box {
      .info {
        display: flex;
        justify-content: space-between;
        line-height: 1.5;

        .label {
          color: #969799;
        }

        .value {
          color: #333333;
        }
      }
    }
  }

  .footer {
    padding: 12px 0;

    .label {
      color: #969799;
    }

    .value {
      color: #333333;
    }
  }
}</style>
