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
  deductionData: Array<any>,
}
export default function PageContent(props: Props) {
  const { pageData, isPrint, quarterRate, deductionData } = props
  const [chartsImg, setChartsImg]: any = useState([])
  const [deduction, getdeduction]: any = useState("")
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

  }, [deductionData])

  const getBolatuOption = (data: any) => {
    let value3 = deductionData.map((item: any) => item['pointFrequency'])
    let value1 = deductionData.map((item: any) => item['pointItem'])
    let value2 = deductionData.map((item: any) => item['percentage'].split('%')[0])
    // console.log(value1, value2, value3);

    return !value1.length ? {} : {
      title: {
        text: '夜查房主要扣分项',
        left: '50%',
        textAlign: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        bottom: 0,
        selectedMode: false,
        data: ['扣分项目', '百分比']
      },

      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          // prettier-ignore
          data: value1,
          // axisLabel: {
          //   interval: 0,
          //   rotate: 40
          // }
        }
      ],
      yAxis: [
        {
          type: 'value',
          position: 'right',
          alignTicks: true,
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          },
          axisLabel: {
            formatter: '{value} %'
          }
        },
        {
          type: 'value',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#666'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
        // min: 0,
        //     max: Max2*2,
        //     splitNumber: 6,
        //     interval: (Max2*2 - 0) / 6
      ],
      series: [
        {
          name: '百分比',
          type: 'line',
          label: {
            show: true,
            position: [-15, -15],
            formatter: '{c}%',
          },
          lineStyle: {
            color: "rgba(255, 42, 0, 1)",
            width: 1,
          },
          itemStyle: {
            color: "rgba(255, 42, 0, 1)"
          },
          data: value2,

        },

        {
          name: '扣分项目',
          type: 'bar',
          data: value3,
          yAxisIndex: 1,
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
        }
      ]
    };

  }
  const getTableData = (data: any) => {
    return data
  }
  const getDeductionData = (data: any) => {
    let sumList = 0
    let sumPercen = 0
    let point = null;
    data.map((item: any) => {
      sumList += item.pointFrequency
      sumPercen += parseFloat(item.percentage.split('%')[0])
    })

    point = [...data, { pointItem: '总计', pointFrequency: sumList, percentage: sumPercen + '%', percentages: '' }]
    return point
  }
  const getDeductionColumns = (data: any) => {
    let columns: any = [
      { title: ' 扣分项 ', key: 'pointItem', dataIndex: 'pointItem', align: 'center' },
      { title: '扣分频次', key: 'pointFrequency', dataIndex: 'pointFrequency', align: 'center' },
      { title: '百分比（%）', key: 'percentage', dataIndex: 'percentage', align: 'center', },
      { title: '累积百分比（%）', key: 'percentages', dataIndex: 'percentages', align: 'center' },
    ];

    return columns
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
    getdeduction((strCheckRate / 3).toFixed(2) + '%')
  }
  const toggleEdit = () => {
    getinput(true)
  }
  const getTableColumns = (data: any) => {
    let columns: any = [
      { title: ' 月份 ', key: 'month', dataIndex: 'month', align: 'center' },
      { title: '应查护士长数', key: 'shouldCheckNum', dataIndex: 'shouldCheckNum', align: 'center' },
      {
        title: '实查护士长数', key: 'actualCheckNum', dataIndex: 'actualCheckNum', align: 'center',
        render: (datas: any, record: any) => {
          return (isInput ? <Input onPressEnter={(e) => onhandleBlur(e.target, record)} onBlur={(e) => onhandleBlur(e.target, record)} className={'editIput'} defaultValue={datas} /> :
            <div className={'divlist'} onClick={toggleEdit}>{datas}</div>
          )
        }
      },
      { title: '月查房率', key: 'checkRate', dataIndex: 'checkRate', align: 'center' },
    ];

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
    <div className="first-content-box">
      <div className='first-title'>{`一、护士长实际查房率(表格)`}</div>
      <div className='second-content-box'>
        <div className='second-content-table'>
          <div className='second-content-table-title'>{`第${handleNumQuarter(pageData) ? handleNumQuarter(pageData) : '一'}季度护士长节假日/夜查房频次`}</div>
          <div className='second-content-table-table' style={{ width: '600px', margin: '0 auto' }}>
            <Table rowClassName={() => 'editable-row'} bordered dataSource={getTableData(pageData)} columns={getTableColumns(pageData)} pagination={false} footer={() => {
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
    {<div className='second-content-bar'>
      <div className='first-title'>{`二、夜查房发现科室存在的主要问题`}</div>
      <div className='first-content-box'>
        <div className='second-content-table-title'>{`2.1夜查房主要扣分项(表格)`}</div>
        <div className='second-content-table-table' style={{ width: '600px', margin: '0 auto' }}>
          {<Table bordered pagination={false} dataSource={getDeductionData(deductionData)} columns={getDeductionColumns(deductionData)} rowClassName={() => 'editable-row'} />}
          {/* {isPrint && chartsImg.length && <img src={chartsImg[1]} alt="" />} */}
        </div>
      </div>
    </div>}
    {<div className='second-content-bolatu'>
      <div className='second-content-table-title'>{`2.2夜查房主要扣分项(图表-柏拉图)`}</div>
      <div className='second-content-bolatu-bolatu'>
        {!isPrint && deductionData && <ReactEcharts style={{ height: 450, width: 680, margin: '0 auto' }} option={getBolatuOption(deductionData)} />}
        {isPrint && deductionData && chartsImg.length && <img src={chartsImg[0]} alt="" />}
      </div>
    </div>}

    {/* })} */}
  </Wrapper>
}
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
  .first-content-box{
    margin-bottom:35px;
  }
  .first-title{
    font-size:20px;
    font-weight:bold;
  }
  .first-title,
  .second-content-table-title,
  .second-content-bar-title,
  .second-content-bolatu{
    line-height:30px;
    font-family: STHeiti !important;
    text-indent:20px;
    margin-bottom:35px;
    font-size:16px;

  }
  .second-content-table-title{
    text-align:center;
    
  }
  .ant-table-body{
    margin:0!important;
  }
  .ant-table-thead{
    background:#fff;
    .ant-table-column-title{
      color:#000;
      font-size:14px;
      font-family: simsun !important;
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
  .second-content-bolatu-bolatu{
    border:1px solid #ddd;
    margin: '0 auto';
  }
`