import './style.css';
import * as React from "react";
import * as echarts from "echarts";
import HttpClient from "../../services/HttpClient";


interface IndexProps {
  lineDatas: any
}

class StatisticsEchartsLine extends React.Component<IndexProps, {}> {

  componentDidUpdate() {
    const line = echarts.init(document.getElementById('container-echarts-line')); // canvas容器

    const datas: any = this.props.lineDatas; // 接收父组件数据，用于折线图渲染
    const names: string[] = [];              // 类名数组
    const counts_single: number[] = [];      // 单像素数量数组
    const counts_multi: number[] = [];       // 多像素数量数组
    const counts_section: number[] = [];     // 切图图形数量数组
    datas.forEach((value, index) => {
      names.push(value.typeName);
      counts_single.push(value.pixel_wise);
      counts_multi.push(value.patch_wise);
      counts_section.push(value.image_wise);
    });
    const option_line = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: { // 标题分类
        data: ['单像素', '多像素', '切片图形']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [{ // 坐标轴放缩工具
        show: true,
        start: 25,
        end: 75,
        xAxisIndex: [0]
      }, {
        type: 'inside',
        start: 25,
        end: 75,
        xAxisIndex: [0]
      }],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: names
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '单像素',
          type: 'line',
          stack: '总量',
          data: counts_single
        },
        {
          name: '多像素',
          type: 'line',
          stack: '总量',
          data: counts_multi
        },
        {
          name: '切片图形',
          type: 'line',
          stack: '总量',
          data: counts_section
        }
      ],
      color: ['#83a9e6', '#6fc7aa', '#f6d8a6'] // 供选择的颜色集
    };

    line.setOption(option_line);
  }

  render() {
    return (
      <div id='container-echarts-line' className='container-echarts-line' />
    );
  }
}

export default StatisticsEchartsLine;