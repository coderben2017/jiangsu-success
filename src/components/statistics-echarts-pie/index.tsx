import * as React from "react";
import * as echarts from "echarts";
import HttpClient from "../../services/HttpClient";

interface IndexProps {
  pieDatas: any
}

class StatisticsEchartsPie extends React.Component<IndexProps, {}> {

  componentDidUpdate() {
    const pie = echarts.init(document.getElementById('container-pie')); // canvas容器

    const datas: any = this.props.pieDatas; // 接收父组件数据，用于饼状图渲染
    const names: string[] = [];             // 大类名
    const objects: any[] = [];              // 大类对象数组
    datas.forEach((value, index) => {
      names.push(value.typeName);
      objects.push({
        value: value.sum,
        name: value.typeName
      });
    });
    
    
    const option_pie = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        y: 'bottom',
        data: names
      },
      series: [
        {
          name: '大类类型',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: objects
        }
      ],
      color: ['#80dce6', '#799edb', '#f5eba9', '#55bad9', '#aaf0d0', '#6fc7aa', '#d691ae', '#f6d8a6', '#c69ffc', '#e4d0ff'] // 颜色集
    };

    pie.setOption(option_pie);
  }

  render() {
    return (
      <div className='container-table' id='container-pie' />
    );
  }
}

export default StatisticsEchartsPie;