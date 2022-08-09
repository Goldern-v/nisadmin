import React, { useState, useEffect,useRef,MutableRefObject,forwardRef,useImperativeHandle } from 'react'
import styled from 'styled-components'
import { Table, Input } from 'antd'
const { TextArea } = Input
import { message, } from 'src/vendors/antd'
import ReactEcharts from 'echarts-for-react';
import { appStore } from 'src/stores';
interface Props {
	// 输入框
	textArea1_1: string,
	textArea1_2: string,
	textArea1_3: string,
	textArea1_4: string,
	textArea2_1: string,
	textArea3_1: string,
	textArea4_1: string,
	setTextArea1_1:Function,
	setTextArea1_2:Function,
	setTextArea1_3:Function,
	setTextArea1_4:Function,
	setTextArea2_1:Function,
	setTextArea3_1:Function,
	setTextArea4_1:Function,


  pageData: Array<any>,
  currentPage: Object,
  isPrint: Boolean,
  quarterRate: String,
  deductionData: Array<any>,
  text: string,
  setText: Function,
}
const PrintContent=(props: Props)=>{
	
	const {textArea1_1,
		textArea1_2,
		textArea1_3,
		textArea1_4,
		textArea2_1,
		textArea3_1,
		textArea4_1,} = props
	const {setTextArea1_1,setTextArea1_2,setTextArea1_3,setTextArea1_4,
		setTextArea2_1,
		setTextArea3_1,
		setTextArea4_1,} =props
  const { pageData, isPrint, quarterRate, deductionData, text, setText } = props
  const [chartsImg, setChartsImg]: any = useState('')
  const [deduction, getdeduction]: any = useState("")
  const [isInput, getinput]: any = useState(false)
  const colors = ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589']

 
  useEffect(() => {
    //数据改变时将canvas的画面用img保存用于打印
    setTimeout(() => {
      let canvasEl = document.querySelector('canvas') as any
      if (canvasEl) {
        let srcStr = canvasEl.toDataURL()
        setChartsImg(srcStr)
      }
    },1000)
    

  }, [deductionData])
  
  useEffect(() => {
    let data:any = pageData;
    data.map((item:any)=>{
      if(item.actualCheckNum=='0'){
        item.checkRate ="0%"
        getdeduction('0%')
      }
    })
  }, [pageData])

  const getBolatuOption = (data: any) => {
    let listData:any[] = [];
    deductionData.map((item:any) =>{
      listData.push(item["percentages"])
    })
    listData[0] = '0%'
    // listData.unshift('0%')
    // console.log(listData,'ddd');
    let value2 = listData.map((item:any)=>{
       return (item.split('%')[0])
    })
    let value1:any = []
    let value3 = deductionData.map((item: any) => item['pointFrequency']).sort((a,b)=>{
      return b-a
    })
    value3.map((item:any) =>{
      deductionData.map((items: any) => {
        if(item == items['pointFrequency']){
          value1.push(items['pointItem'])
        }
      })
    })
    value1 =Array.from(new Set(value1)) 

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
      
      grid: {
        left: '10%',
        bottom:'20%'
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          // prettier-ignore
          data: value1,
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
         
          
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
          barCategoryGap:"0%",
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

    point = [...data, { pointItem: '总计', pointFrequency: sumList, percentage: sumPercen.toFixed(2) + '%', percentages: '' }]
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
     if(parseFloat(data.actualCheckNum) > parseFloat(data.shouldCheckNum)){
      data.actualCheckNum = 0;
      message.warning('实查护士长数比应查护士长数多')
    }else if(data.actualCheckNum&&data.shouldCheckNum){
      data.checkRate = ((data.actualCheckNum / data.shouldCheckNum) * 100) == 100 ? (data.actualCheckNum / data.shouldCheckNum) * 100 + '%' : (((data.actualCheckNum / data.shouldCheckNum) * 100).toFixed(2)) + '%'
      // console.log((data.actualCheckNum / data.shouldCheckNum) * 100); 
      
      
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
    }else{
      data.checkRate = '0%'
      getdeduction(0+'%')
    }
  }
  const toggleEdit = () => {
    getinput(true)
  }
  const getTableColumns2 = (data:any)=>{
    let columns: any=[
      { title: ' 指标分类 ', key: 'eventType',  dataIndex: 'eventType',align: 'center' },
      { title: ' 指标名称 ', key: 'eventType',  dataIndex: 'eventType',align: 'center' },
      {title:'例',
        children:[
          { title: ' 2022', key: 'currentYear',  dataIndex: 'currentYear',align: 'center',}
        ]
      },
      {title:'率',
        children:[
          { title: ' 2022', key: 'currentYearPix',  dataIndex: 'currentYearPix',align: 'center',}
        ]
      },
      {title:'例',
        children:[
          { title: ' 2021', key: 'preYear',  dataIndex: 'preYear',align: 'center',}
        ]
      },
      {title:'率',
        children:[
          { title: ' 2021', key: 'preYearPix',  dataIndex: 'preYearPix',align: 'center',}
        ]
      },
    ]
    return columns
  }
  const getTableColumns = (data: any) => {
    let columns: any = [
      { title: ' 月份 ', key: 'month',  dataIndex: 'month',align: 'center' },
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
    if (pageData.length == 0) return
    let month = pageData[0].month
    let num: any = null;
    switch (month.split('-')[1]) {
      case '01':
        num = '一';
        break;
      case '02':
        num = '一';
        break;
      case '03':
        num = '一';
        break;
      case '04':
        num = '二';
        break;
      case '05':
        num = '二';
        break;
      case '06':
        num = '二';
        break;
      case '07':
        num = '三';
        break;
      case '08':
        num = '三';
        break;
      case '09':
        num = '三';
        break;
      case '10':
        num = '四';
        break;
      case '11':
        num = '四';
        break;
      case '12':
        num = '四';
        break;
      default: num;
    }
    return num;
  }
  return <Wrapper>
    <div className="first-content-box">
      <div className='first-title'>{`2022年第一季度全院护理质量汇总报告`}</div>
      <div className='title-m'><em></em>一、计划阶段</div>
      <div className='title-s'>(一)通过2021年及2020年全科临床护理及护理工作质量/管理指标的数据对比（见表1，图1-图8），发现主要存在问题：</div>
      {/* onChange={ (e: any) => setText(e.target.value)} */}
	  {['fsxt'].includes(appStore.HOSPITAL_ID) && <Input.TextArea onChange={ (e: any) => setTextArea1_1(e.target.value)} className='print-page__ipt' value={textArea1_1} placeholder='字数上限2000字' autosize={{ minRows: 3}} maxLength={2000} />}
      <div className='second-content-box'>
        <div className='second-content-table'>
          <div className='second-content-table-title'>{`第${pageData ? handleNumQuarter(pageData) : '一'}季度护士长节假日/夜查房频次`}</div>
          <div className='second-content-table-table' style={{ width: '600px', margin: '0 auto' }}>
            <Table rowClassName={() => 'editable-row'} bordered dataSource={getTableData(pageData)} columns={getTableColumns2(pageData)} />
          </div>
		  <p style={{textAlign:'center',fontSize:'12px'}}>全年临床护理及护理工作质量/管理指标数情况汇总表</p>
        </div>
      </div>
    </div>
    {<div className='second-content-bolatu'>
      <div className='second-content-table-title'>{`2.2夜查房主要扣分项(图表-柏拉图)`}</div>
      <div className='second-content-bolatu-bolatu'>
        {!isPrint && deductionData && <ReactEcharts style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption(deductionData)} />}
        {/* <img src={chartsImg} alt="" /> */}
        {isPrint && deductionData && chartsImg && <img src={chartsImg} alt="" />}
      </div>
    </div>}

	<div>
		<div className='title-s'>（二）针对存在的护理质量问题进行原因分析：</div>
		<TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea1_2} onChange={ (e: any) => setTextArea1_2(e.target.value)} maxLength={2000} autosize={{ minRows: 3}} />
	</div>

	<div>
		<div className='title-s'>（三）确定2021年护理质量改进目标为：</div>
		<TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea1_3} onChange={ (e: any) => setTextArea1_3(e.target.value)} maxLength={2000} autosize={{ minRows: 3}} />
	</div>

	<div>
		<div className='title-s'>（四）针对各存在问题发生的原因，结合护理质量改进目标，制定详细的质量改进计划：</div>
		<TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea1_4} onChange={ (e: any) => setTextArea1_4(e.target.value)} maxLength={2000} autosize={{ minRows: 3}} />
	</div>

	<div>
		<div className='title-m mb-15'><em></em>二、实施阶段（Do）：</div>
		<TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea2_1} onChange={ (e: any) => setTextArea2_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3}} />
	</div>

	<div>
		<div className='title-m mb-15'><em></em>三、检查阶段（Check）：</div>
		<TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea3_1} onChange={ (e: any) => setTextArea3_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3}} />
	</div>

	<div>
		<div className='title-m mb-15'><em></em>四、处理阶段(Action)：</div>
		<TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea4_1} onChange={ (e: any) => setTextArea4_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3}} />
	</div>
  </Wrapper>
}
export default PrintContent
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
  .first-content-box{
    margin-bottom:35px;
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
  .first-title{
    font-size:20px;
    text-align: center;
    font-weight:bold;
    margin-bottom:15px;
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
    height:16px;
  }
  .second-content-bolatu-bolatu{
    border:1px solid #ddd;
    margin: '0 auto';
  }
  .print-page__ipt {
    margin: 0px 20px 15px;
    resize: none;
    width: calc(100% - 40px);
  }

  /* 标题 */
  .title-m{
    font-family: STHeiti !important;
    margin-left: 10px;
    font-weight: bold;
    font-size: 16px;
    em{
      display: inline-block;
      width: 10px;
      height: 30px;
      background-color: #60e605;
      margin-right: 10px;
    }
  }
  .title-s{
    font-family: STHeiti !important;
    margin-left: 26px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .mb-15{
	margin-bottom: 15px;
  }
`