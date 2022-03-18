import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Table, Input } from 'antd'
import { message, } from 'src/vendors/antd'
import ReactEcharts from 'echarts-for-react';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import { badEventReportService } from '../services/BadEventReportService'
interface Props {
  pageData: Array<any>,
  currentPage: Object,
  isPrint: Boolean,
  quarterRate: String,
  quarterquery: String,
}
export default function PageContent(props: Props) {
  const { pageData, isPrint, quarterRate, quarterquery } = props
  const [chartsImg, setChartsImg]: any = useState([])
  const [deduction, getdeduction]: any = useState("")
  const [newPageData, setnewPageData]: any = useState([])
  const [isInput, getinput]: any = useState(false)
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
    let value1 = Object.values(data.dataMap).map((item: any) => item['扣分项目'])
    let value2 = Object.values(data.dataMap).map((item: any) => item['累计百分比'].split('%')[0])
    console.log(data);

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
        data: ['扣分项目', '百分比'],
        bottom: 0
      },
      grid: {
        containLabel: true,
        height: 300
      },
      xAxis: [
        {
          type: 'category',
          data: data.keys,
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        }, {
          type: 'category',
          show: false,
          data: data.keys
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
        name: '扣分项目',
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
    return data
  }
  const onPressEnter = (e: any, data: any) => {
    data = e.value

  }
  const onhandleBlur = (e: any, data: any) => {
    getinput(false)
    data.actualCheckNum = parseInt(e.value);
    data.checkRate = ((data.actualCheckNum / data.shouldCheckNum) * 100) == 100 ? (data.actualCheckNum / data.shouldCheckNum) * 100 + '%' : (((data.actualCheckNum / data.shouldCheckNum) * 100).toFixed(2)) + '%'

    let newdata: any = [];
    pageData.map(item => {
      newdata.push(item.checkRate)
    })
    let strCheckRate: number = 0
    strCheckRate = newdata.reduce((pre: any, cur: any) => {
      cur = cur.replace('%', '')
      return pre + +cur
    }, 0)
    console.log((strCheckRate / 3) + '%', "blurdata")
    getdeduction((strCheckRate / 3).toFixed(2) + '%')
    let params: any = null
    params = { list: pageData, rateId: quarterquery }
    badEventReportService.saveReport(params).then((res) => {
      message.success('保存成功')
      // setTimeout(() => {
      //   appStore.history.push('/checkWard/quarterScoringRecord')
      // }, 500)
    })
  }
  const toggleEdit = () => {
    console.log(isInput);

    getinput(true)

  }
  const getTableColumns = (data: any) => {
    // console.log(data, "data")
    let columns: any = [
      { title: ' 月份 ', key: 'month', dataIndex: 'month', align: 'center' },
      { title: '应查护士长数', key: 'shouldCheckNum', dataIndex: 'shouldCheckNum', align: 'center' },
      {
        title: '实查护士长数', key: 'actualCheckNum', dataIndex: 'actualCheckNum', align: 'center',
        render: (datas: any, record: any) => {
          return (isInput ? <Input onPressEnter={(e) => onPressEnter(e.target, datas)} onBlur={(e) => onhandleBlur(e.target, record)} className={'editIput'} defaultValue={datas} /> :
            <div className={'divlist'} onClick={toggleEdit}>{datas}</div>
          )
        }
      },
      { title: '月查房率', key: 'checkRate', dataIndex: 'checkRate', align: 'center' },
    ];
    // (data.reportItem == '事件发生主要原因') && (columns.push({ title: '累积百分比', key: '累计百分比', dataIndex: '累计百分比', width: 100, align: 'center' }))
    return columns
  }
  const handleNumQuarter = (data: any) => {
    if (!data[0]) return
    let month = pageData[0].month
    let num: any = null;
    switch (month) {
      case month.split('-')[1] = '01':
        num = '一';
        break;
      case month.split('-')[1] = '04':
        num = '二';
        break;
      case month.split('-')[1] = '07':
        num = '三';
        break;
      case month.split('-')[1] = '10':
        num = '四';
        break;
      default: num = '一';
    }
    return num;
  }
  return <Wrapper>
    {/* {pageData.map((item: any, index: any) => { */}
    {/* return ( */}
    <div className="first-content-box">
      <div className='first-title'>{`一、护士长实际查房率(表格)`}</div>
      <div className='second-content-box'>
        <div className='second-content-table'>
          <div className='second-content-table-title'>{`第${handleNumQuarter(pageData)}季度护士长节假日/夜查房频次`}</div>
          <div className='second-content-table-table' style={{ width: '500px', margin: '0 auto' }}>
            {/* <Table size='small' pagination={false} dataSource={getTableData(item)} columns={getTableColumns(item)} /> */}
            <Table
              // components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={getTableData(pageData)}
              columns={getTableColumns(pageData)}
              pagination={false}
              footer={() => {
                return (<div>
                  <span>季度查房率:</span>
                  <span>{deduction ? deduction : quarterRate}</span>
                </div>)
              }}
            />
          </div>
        </div>
      </div>
    </div>
    {/* <div className='first-title'>{`二、夜查房发现科室存在的主要问题`}</div>
          <div className='second-content-table'>
            <div className='second-content-table-title'>{`2.1夜查房主要扣分项(表格)`}</div>
            <div className='second-content-table-table' style={{ width: '500px', margin: '0 auto' }}>
              {!isPrint && <Table size='small' pagination={false} dataSource={getTableData(item)} columns={getTableColumns(item)} />}
              {isPrint && chartsImg.length && <img src={chartsImg[index]} alt="" />}

            </div>
          </div> */}
    {/* {<div className='second-content-bolatu'>
            <div className='second-content-bolatu-title'>{`2.2夜查房主要扣分项(图表-柏拉图)`}</div>
            <div className='second-content-bolatu-bolatu'>
              {!isPrint &&  <ReactEcharts style={{ height: 400 }} option={getBolatuOption(item)} />}
              {isPrint && chartsImg.length && <img src={chartsImg[index]} alt="" />}
            </div>
          </div>} */}

    {/* })} */}
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
  .second-content-table-title{
    text-align:center
  }
  .ant-table-body{
    margin:0!important;
  }
  .ant-table-thead{
    background:#258ff1;
    .ant-table-column-title{
      color:#000;
    }
  }
  .ant-table-row{
    background:none;
  }
  .editIput{
    width: 80px;
    border: none;
    background-color: transparent;
    outline: none;
    text-align: center;
  }
  .divlist{
    width:100%;
    height:100%;
  }
`