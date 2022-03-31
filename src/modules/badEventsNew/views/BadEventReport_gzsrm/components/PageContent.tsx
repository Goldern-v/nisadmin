import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Table } from 'antd'
import ReactEcharts from 'echarts-for-react';
interface Props {
  pageData: Array<any>,
  currentPage: Object,
  isPrint: Boolean
}
export default function PageContent(props: Props) {
  const { pageData, isPrint } = props
  const [chartsImg, setChartsImg]: any = useState([])
  const colors = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589']
  useEffect(() => {
    //数据改变时将canvas的画面用img保存用于打印
    let timer = setTimeout(() => {
      let canvasEl = document.querySelectorAll('canvas') as any
      if (canvasEl.length) {
        let arr = []
        for (let i = 0; i < canvasEl.length; i++) {
          arr.push(canvasEl[i].toDataURL())
        }
        setChartsImg(arr)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [pageData])
  const getOption = (data: any) => {
    let option = {
      title: {
        text: '',
        x: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'center',
        data: data.keys,
        show: false
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: data.dataArr,
          label: {
            show: true,
            formatter: '{b} : {c} ({d}%)'
          },
          itemStyle: {
            shadowBlur: 4,
            shadowColor: '#ccc',
            shadowOffsetX: 5,
            shadowOffsetY: 5
          },
          labelLine: { show: true }
        }
      ]
    }
    return option
  }
  const getBolatuOption = (data: any) => {
    let title:any = []
    let value2:any = []
    let value1 = Object.values(data.dataMap).filter((item: any,index:any) => {
      if(item['例数']!=0) {
        value2.push(Object.values(data.dataMap).map((item: any) => item['累计百分比'].split('%')[0])[index])
        title.push(data.keys[index])
      }
      return item['例数']!=0
    })
    .map((item:any)=>item['例数'])
    .sort((item1:any,item2:any)=>Number(item1) - Number(item2))
    
    value2[0] = 0 // 贵州需求：第一个从0%开始
    return {
      title: {
        text: ''
      },
      // tooltip : {
      //   trigger : 'axis',
      //   axisPointer : { // 坐标轴指示器，坐标轴触发有效
      //     type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      //   },
      //   formatter : function(params:any) {
      //     let str = ''
      //     params.map((item:any)=>str = item.seriesName + ' : ' + item.value )
      //     return str
      //   }
      // },
      legend: {
        selectedMode: false,
        data: ['例数', '百分比'],
        bottom: 0
      },
      grid: {
        containLabel: true,
        height: 300
      },
      xAxis: [
        {
          type: 'category',
          data: title,
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        }, {
          type: 'category',
          show: false,
          data: title
        }],
      yAxis: [{
        type: 'value',
        boundaryGap: [0, 0.1],
        splitLine: false
      }, {
        type: 'value',
        name: '',
        axisLabel: {
          formatter: '{value} %'
        },
        splitLine: false
      }],
      series: [{
        name: '例数',
        type: 'bar',
        barCategoryGap: '0%',
        itemStyle: {
          normal: {
            color: function (obj: any) {
              if (obj.dataIndex >= 0) {
                return colors[obj.dataIndex];
              }
            },
            // borderWidth : 1,
            // borderRadius : 2,
            label: {
              show: true,
              position: 'top'
            }
          }
        },
        data: value1
      }, {
        name: '百分比',
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        label: {
          show: true,
          position: [-15, -15],
          formatter: '{c}%',
        },
        data: value2,
      }

      ]
    };
  }
  const getTableData = (data: any) => {
    return data.dataArr
  }
  const getTableColumns = (data: any) => {
    let columns: any = [
      { title: data.reportItem, key: 'name', dataIndex: 'name', align: 'center' },
      { title: '例数', key: '例数', dataIndex: '例数', width: 80, align: 'center' },
      { title: '构成比', key: '占比', dataIndex: '占比', width: 80, align: 'center' },
    ];
    (data.reportItem == '事件发生主要原因') && (columns.push({ title: '累积百分比', key: '累计百分比', dataIndex: '累计百分比', width: 100, align: 'center' }))
    return columns
  }
  return <Wrapper>
    {pageData.map((item: any, index: any) => {
      return (<div className="first-content-box" key={index}>
        <div className='first-title'>{`${index + 1}.${item.reportItem}`}</div>
        <div className='second-content-box'>
          <div className='second-content-table'>
            <div className='second-content-table-title'>{`${index + 1}.1${item.reportItem}占比（表格）`}</div>
            <div className='second-content-table-table' style={{ width: '500px', margin: '0 auto' }}>
              <Table size='small' pagination={false} dataSource={getTableData(item)} columns={getTableColumns(item)} />
            </div>
          </div>
          {item.reportItem != '事件发生主要原因' && <div className='second-content-bar'>
            <div className='second-content-bar-title'>{`${index + 1}.2${item.reportItem}占比（图表-饼状）`}</div>
            <div className='second-content-bar-bar'>
              {!isPrint && <ReactEcharts style={{ height: 200 }} option={getOption(item)} />}
              {isPrint && chartsImg.length && <img src={chartsImg[index]} alt="" />}
            </div>
          </div>}
          {item.reportItem == '事件发生主要原因' && <div className='second-content-bolatu'>
            <div className='second-content-bolatu-title'>{`${index + 1}.2${item.reportItem}（图表-柏拉图）`}</div>
            <div className='second-content-bolatu-bolatu'>
              {!isPrint && <ReactEcharts style={{ height: 400 }} option={getBolatuOption(item)} />}
              {isPrint && chartsImg.length && <img src={chartsImg[index]} alt="" />}
            </div>
          </div>}
        </div>
      </div>)
    })}
  </Wrapper>
}
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
  .first-title,
  .second-content-table-title,
  .second-content-bar-title,
  .second-content-bolatu{
    font-weight:700;
    line-height:30px;
    text-indent:20px;
  }
  .ant-table-body{
    margin:0!important;
  }
  .ant-table-thead{
    background:rgba(37, 143, 241,.7);
    .ant-table-column-title{
      color:#fff;
    }
  }
  .ant-table-row{
    background:rgba(108, 183, 252,.3);
  }
  .second-content-bolatu-bolatu{
    text-indent:0;
  }
`