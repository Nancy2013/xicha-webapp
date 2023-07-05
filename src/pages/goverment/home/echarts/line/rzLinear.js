import { linearGrandient } from './../config.js';
import * as echarts from 'echarts';
// 认证情况分析
export const rzLinearCharts = dom => {
  let charts = echarts.init(document.getElementById(dom));
  charts.setOption({
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(245,245,245,0.8)",
      formatter: params => {
        var relVal = params[0].name + "年";
        for (var i = 0, l = params.length; i < l; i++) {
          relVal =
            relVal +
            "<br/>" +
            params[i].marker +
            params[i].seriesName +
            "&nbsp;&nbsp;&nbsp;" +
            params[i].value;
        }
        return relVal;
      }
    },
    color: ["#6699FF", "#52CCA3", "#9580FF"],
    legend: {
      itemGap: 30,
      data: ["待认证", "已认证", "已驳回"],
      bottom: "3%"
    },
    grid: {
      left: "5%",
      right: "6%",
      top: "3%",
      bottom: "15%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      axisTick: {
        show: false,
        lineStyle: {
          width: 1,
          color: "#EDEDED"
        }
      }
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed"
        }
      }
    },
    series: [
      {
        name: "待认证",
        type: "line",
        stack: "Total",
        smooth: true,
        symbol: "none",
        data: [30, 32, 15, 34, 60, 30, 40],
        lineStyle: {
          width: 3,
          color: linearGrandient(
              "rgba(102, 153, 255, 0)",
              "rgba(102, 153, 255, 1)"
            )
        }
      },
      {
        name: "已认证",
        type: "line",
        stack: "Total",
        smooth: true,
        symbol: "none",
        data: [20, 82, 91, 34, 90, 30, 10],
        lineStyle: {
          width: 3,
          color: linearGrandient(
              "rgba(82, 204, 163, 0)",
              "rgba(82, 204, 163, 1)"
            )
        }
      },
      {
        name: "已驳回",
        type: "line",
        stack: "Total",
        smooth: true,
        symbol: "none",
        data: [50, 32, 1, 54, 90, 30, 10],
        lineStyle: {
          width: 3,
          color: linearGrandient(
              "rgba(127, 100, 255, 0)",
              "rgba(127, 100, 255, 1)"
            )
        }
      }
    ]
  });
};
