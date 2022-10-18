import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import { Table, Input } from 'antd'
const { TextArea } = Input
import ReactEcharts from 'echarts-for-react';
import { authStore } from 'src/stores'
import { dataWholeAysi } from './DataWholeAysi';
interface Props {
	// 输入框
	textArea1_1: string,
	textArea1_2: string,
	textArea1_3: string,
	textArea1_4: string,
	textArea2_1: string,
	textArea3_1: string,
	textArea4_1: string,
	textArea5_1: string,
	setTextArea1_1: Function,
	setTextArea1_2: Function,
	setTextArea1_3: Function,
	setTextArea1_4: Function,
	setTextArea2_1: Function,
	setTextArea3_1: Function,
	setTextArea4_1: Function,
	setTextArea5_1: Function,

	propsData: any,

	pageData: Array<any>,
	currentPage: Object,
	isPrint: Boolean,
	quarterRate: String,
	deductionData: Array<any>,
	text: string,
	setText: Function,
}
const PrintContent = (props: Props) => {

	const { textArea1_1,
		textArea1_2,
		textArea1_3,
		textArea1_4,
		textArea2_1,
		textArea3_1,
		textArea4_1,
		textArea5_1, } = props
	const { setTextArea1_1, setTextArea1_2, setTextArea1_3, setTextArea1_4,
		setTextArea2_1,
		setTextArea3_1,
		setTextArea4_1,
		setTextArea5_1, } = props
	const { pageData, isPrint, quarterRate, deductionData, text, setText, propsData } = props
	// const [chartsImg1, setChartsImg1]: any = useState('')
	// const [chartsImg2, setChartsImg2]: any = useState('')
	// const [chartsImg3, setChartsImg3]: any = useState('')
	// const [chartsImg4, setChartsImg4]: any = useState('')
	// const [chartsImg5, setChartsImg5]: any = useState('')
	// const [chartsImg6, setChartsImg6]: any = useState('')
	// const [chartsImg7, setChartsImg7]: any = useState('')
	// const [chartsImg8, setChartsImg8]: any = useState('')

	const [chartsImgList, setChartsImgList] = useState([] as any); //柱状图打印的图片实例
	
	// const [tempHideCharts, setTempHideCharts] = useState(false);//临时隐藏柱状图，调试时候使用
	
	// const [gridLeft, setGridLeft] = useState('12%');
	const [gridRight, setGridRight] = useState('12%');



	useEffect(() => {
		//数据改变时将canvas的画面用img保存用于打印
		setTimeout(() => {
			let tempCavans = null
			let classTag = ''
			let tempImgUrlList = [] as any
			let tempUrl = null
			if(dataWholeAysi.chartMapKey.length>0){
				dataWholeAysi.chartMapKey.map((it:any,idx:number)=>{
					classTag='.canvas'+(idx+1)+' canvas'
					tempCavans = document.querySelector(classTag) as any
					
					if (tempCavans) {
						tempUrl = tempCavans.toDataURL()

						tempImgUrlList.push(tempUrl)
					}
				})
				setChartsImgList(tempImgUrlList)
			}
		}, 1000);
		
		
	}, [dataWholeAysi.chartMapKey])
	

	const getEchartsTitle =(index:number)=> {
		let titleMode = {left: 'center',
		bottom: 0,
		// subtext: dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][1].length>,
		textStyle: {
			//文字颜色
			color: '#111',
			//字体风格,'normal','italic','oblique'
			fontStyle: 'normal',
			//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
			fontWeight: 'normal',
			//字体系列
			fontFamily: 'sans-serif',
			//字体大小
			fontSize: 12
		}

		} as any
		
		if(dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][1].length<5){
			// 标题上移一点
			titleMode.subtext = ''
		}
		return titleMode

	}

	// x轴文字换行，6个一行
	const xAxisSetting =(index:number)=>{
		return{type: 'category',
		axisTick: { show: false },
		axisLabel: {
			interval: 0,  //控制X轴刻度全部显示
			formatter: function (value: any) {
				let len = value.length;
				let length = 15; //控制一行显示个数，默认15个
				if(dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][1].length===3){
					// x轴的字段有几个？如果大于5个，1行就显示10个
					length = 11
				}else if(dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][1].length===4){
					// x轴的字段有几个？如果大于5个，1行就显示10个
					length = 9
				}else if(dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][1].length===5){
					// x轴的字段有几个？如果大于5个，1行就显示10个
					length = 7
				}else if(dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][1].length>7){
					length = 4
				}
				
				let num = Math.ceil(len / length);//循环次数
				if (num > 1) {
					let str = '';
					for (let i = 0; i < num; i++) {
						str += value.substring(i * length, (i + 1) * length) + '\n';
					}
					return str;
				} else {
					return value;
				}
			}

		}

		}
		
	}

	// x轴文字显示，不换行
	// const xAxisSettingNoWrap = {
	// 	type: 'category',
	// 	axisTick: { show: false },
	// 	axisLabel: {
	// 		interval: 0,  //控制X轴刻度全部显示
	// 	}
	// }

	const yAxisSetting = {
		type: 'bar',
		animation: false,
		barGap: 0,
		label: {
			show: true,
			position: 'top'
		},
	}

	/**y轴样式 */
	const yAxisSettingRate= (index:number)=> {
		return {type: 'bar',
			animation: false,
			barMaxWidth: 60, // 柱子宽度
			barGap: 0,
			label: {
				show: true,
				position: 'top',
				formatter: (val: any, idx: number) => {
					if(dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][0][0]=='2'){
						return Math.floor(val?.value * 10000) / 100 + '%'
					}else{
						return val?.value
					}
					
				}
			},
		}
		
	}



	// table数据
	const getTableData = () => {
		
		return dataWholeAysi.rowList
	}
// 动态合并单元格
const mergeCells = (text: string, data: any, key: string, index: number) => {
	if (text == '') {
		// 没有code值的时候
		return 1
	}
	if (index !== 0 && text === data[index - 1][key]) {
		return 0
	}
	let rowSpan = 1

	for (let i = index + 1; i < data.length; i++) {
		if (text !== data[i][key]) {
			break;
		}
		rowSpan++
	}
	return rowSpan
}
// 表格头部
	const getTableColumns2 = (data: any) => {
		let columns: any = [

			{
				title: ' 指标分类 ',
				key: 'classification',
				dataIndex: 'classification',
				align: 'center',
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: value,
						props: {},
					} as any;
					obj.props.rowSpan = mergeCells(row.classification, dataWholeAysi.rowList, 'classification', index)
					return obj
				}
			},
			{ title: ' 指标名称 ', key: 'itemName', dataIndex: 'itemName', align: 'center' },
			{
				title: '例',
				children: [
					{
						title: () => {
							return (
								// <span>{dataWholeAysi.master.belongsYear}</span>
								<span>{dataWholeAysi.currentCycleMessage}</span>
							)
						}, key: 'currentCount', dataIndex: 'currentCount', align: 'center',
						render: (text: any, record: any, rowIndex: number) =>{
							if(record.itemType=='2'){
								return ''
							}else{
								return <>{text}</>
							}
						},
						onCell(record: any, rowIndex: any) {
							if (record.itemType=='2') {
								return {
									className: 'hua-line',
								}
							}
						}
					}
				]
			},
			{
				title: '率',
				children: [
					{
						title: () => {
							return (
								<span>{dataWholeAysi.currentCycleMessage}</span>
							)
						}, key: 'currentRate', dataIndex: 'currentRate', align: 'center',
						render: (text: any, record: any, rowIndex: number) =>{
							if(record.itemType=='1'){
								return ''
							}else{
								return <>{Number(text)>0?Number(text)*10000/100+'%':0}</>
							}
						},
						onCell(record: any, rowIndex: any) {
							if (record.itemType=='1') {
								return {
									className: 'hua-line',
								}
							}
						}
					}
				]
			},
			{
				title: '例',
				children: [
					{
						title: () => {
							return (
								// <span>{dataWholeAysi.master.belongsYear - 1}</span>
								<span>{dataWholeAysi.preCycleMessage}</span>
							)
						}, key: 'preCount', dataIndex: 'preCount', align: 'center',
						render: (text: any, record: any, rowIndex: number) =>{
							if(record.itemType=='2'){
								return ''
							}else{
								return <>{text}</>
							}
						},
						onCell(record: any, rowIndex: any) {
							if (record.itemType=='2') {
								return {
									className: 'hua-line',
								}
							}
						}
					}
				]
			},
			{
				title: '率',
				children: [
					{
						title: () => {
							return (
								// <span>{dataWholeAysi.master.belongsYear - 1}</span>
								<span>{dataWholeAysi.preCycleMessage}</span>
							)
						}, key: 'preRate', dataIndex: 'preRate', align: 'center',
						render: (text: any, record: any, rowIndex: number) =>{
							if(record.itemType=='1'){
								return ''
							}else{
								return <>{Number(text)>0?Number(text)*10000/100+'%':0}</>
							}
						},
						onCell(record: any, rowIndex: any) {
							if (record.itemType=='1') {
								return {
									className: 'hua-line',
								}
							}
						}
					}
				]
			},
		]
		return columns
	}


	// 柱状图
	const getBolatuOptionDiv = (index:number)=>{
		// 临床护理质量指标对比（发生例数）
		let legendData = []
		
		legendData = [dataWholeAysi.preCycleMessage,dataWholeAysi.currentCycleMessage]

		// console.log(legendData,xAxisList,currentList,prevList)

		return {
			title: {
				text: dataWholeAysi.chartMapKey[index],
				...getEchartsTitle(index),
			},
			legend: {
				data: legendData
			},
			grid: {
				// left:gridLeft,
				// bottom: '100px',
				// containLabel: false,
				right: gridRight,
			},
			xAxis: [
				{
					data: dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][1],
					...xAxisSetting(index),
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: legendData[0],
					...yAxisSettingRate(index),
					data: dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][3]
				},
				{
					name: legendData[1],
					...yAxisSettingRate(index),
					data: dataWholeAysi.chartMap[dataWholeAysi.chartMapKey[index]][2]
				},
			]
		}
	}
	return <Wrapper>
		<div className="first-content-box">
			<div className='first-title'>{`${propsData.title}`}</div>
			<div className='title-m'>一、计划阶段</div>
			<div className='title-s'>(一)通过{dataWholeAysi.currentCycleMessage}及{dataWholeAysi.preCycleMessage}专科临床护理及护理工作质量/管理指标的数据对比（见表1，图1-图{dataWholeAysi.chartMapKey.length}），发现主要存在问题：</div>
			{(!isPrint && authStore.isDepartment) && <Input.TextArea onChange={(e: any) => setTextArea1_1(e.target.value)} disabled={!authStore.isDepartment} className='print-page__ipt' value={textArea1_1} placeholder='字数上限2000字' autosize={{ minRows: 3 }} maxLength={2000} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_1}</p>}
			<div className='second-content-box'>
				<div className='second-content-table'>
					{/* <div className='second-content-table-title'>{`第${pageData ? handleNumQuarter(pageData) : '一'}季度护士长节假日/夜查房频次`}</div> */}
					<div className='second-content-table-table' style={{ width: '600px', margin: '0 auto' }}>
						<Table className='print-table'
							bordered dataSource={getTableData()}
							columns={getTableColumns2(pageData)} pagination={false} />
					</div>
					<p style={{ textAlign: 'center', fontSize: '12px', marginTop: '10px' }}>表1 全年临床护理及护理工作质量/管理指标数情况汇总表</p>
				</div>
			</div>
		</div>
		{/* 柱状图表  不就知道有几个 */}
		{dataWholeAysi.chartMapKey.length>0 && <div className='second-content-bolatu'>
			{
				dataWholeAysi.chartMapKey.map((it:any,idx:number)=>{
					return (<div className='second-content-bolatu-bolatu' key={idx}>
							{!isPrint && <ReactEcharts className={'canvas'+(idx+1)} style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOptionDiv(idx)} />}
							{isPrint && chartsImgList[idx] && <img src={chartsImgList[idx]} alt="" />}
						</div>)
				})
			}
			{/* <div className='second-content-bolatu-bolatu'>
				{!isPrint && dataWholeAysi.chartMapKey.length>0 && <ReactEcharts className='canvas1' style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption(deductionData)} />}

				{isPrint && deductionData && chartsImg1 && <img src={chartsImg1} alt="" />}
			</div> */}
		</div>}

		<div>
			<div className='title-s'>（二）针对存在的护理质量问题进行原因分析：</div>
			{(!isPrint && authStore.isDepartment) && <TextArea className='print-page__ipt' placeholder='字数上限2000字'
				value={textArea1_2} onChange={(e: any) => setTextArea1_2(e.target.value)}
				maxLength={2000}
				rows={3}
				autosize={{ minRows: 3 }} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_2}</p>}
		</div>

		<div>
		{dataWholeAysi.master.reportType=='2' && <div className='title-s'>（三）确定下个年护理质量改进目标为：</div>}
		{dataWholeAysi.master.reportType=='1' && <div className='title-s'>（三）确定下个季度护理质量改进目标为：</div>}
			{dataWholeAysi.master.reportType=='0' && <div className='title-s'>（三）确定下个月护理质量改进目标为：</div>}
			{(!isPrint && authStore.isDepartment) && <TextArea  className='print-page__ipt' placeholder='字数上限2000字' value={textArea1_3} onChange={(e: any) => setTextArea1_3(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_3}</p>}

		</div>

		<div>
			<div className='title-s'>（四）针对各存在问题发生的原因，结合护理质量改进目标，制定详细的质量改进计划：</div>
			{(!isPrint && authStore.isDepartment) && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea1_4} onChange={(e: any) => setTextArea1_4(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_4}</p>}

		</div>

		<div>
			<div className='title-m mb-15'>二、实施阶段（Do）：</div>
			{(!isPrint && authStore.isDepartment) && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea2_1} onChange={(e: any) => setTextArea2_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea2_1}</p>}

		</div>

		<div>
			<div className='title-m mb-15'>三、检查阶段（Check）：</div>
			{(!isPrint && authStore.isDepartment) && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea3_1} onChange={(e: any) => setTextArea3_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea3_1}</p>}

		</div>

		<div>
			<div className='title-m mb-15'>四、处理阶段(Action)：</div>
			{(!isPrint && authStore.isDepartment) && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea4_1} onChange={(e: any) => setTextArea4_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea4_1}</p>}

		</div>
		<div>
			<div className='title-m mb-15'>五、护理部审核意见(Comment)：</div>
			{(!isPrint && authStore.isDepartment) && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea5_1} onChange={(e: any) => setTextArea5_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{(isPrint || !authStore.isDepartment) && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea5_1}</p>}

		</div>
		
	</Wrapper>
}
export default PrintContent
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
  .first-content-box{
    /* margin-bottom:35px; */
  }
  .print-table.ant-table-wrapper td{
	box-sizing: border-box;
    padding: 0 8px;
    font-size: 13px !important;
    height: 30px !important;
    word-break: break-all;
  }
  .hua-line {
	background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) calc(50% - 1px),
    rgba(230,230,230, 1) 50%,
    rgba(0, 0, 0, 0) calc(50% + 1px),
    rgba(0, 0, 0, 0) 100%
  ) !important;
		/* background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIxMDAlIiB5MT0iMCIgeDI9IjAiIHkyPSIxMDAlIiBzdHJva2U9IiNlOGU4ZTgiIHN0cm9rZVdpZHRoPSIwLjMiIC8+PC9zdmc+) no-repeat 100% center !important;    */
		box-sizing: border-box;
	}
	.print-page__ptext{
		white-space:normal; 
		word-break:break-all;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		padding: 2px;
		min-height: 60px;
		/* word-wrap: break-word; */
	}
	.ant-table-tbody{
        > tr:hover:not(.ant-table-expanded-row) > td,.ant-table-row-hover,.ant-table-row-hover>td{
		/* background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIxMDAlIiB5MT0iMCIgeDI9IjAiIHkyPSIxMDAlIiBzdHJva2U9IiNjY2MiIHN0cm9rZVdpZHRoPSIwLjUiIC8+PC9zdmc+) no-repeat 100% center !important;    */
			background-color: #fff !important;
        //这里是将鼠标移入时的背景色取消掉了
        }
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

	textarea {
		display: block;
		overflow: hidden;
		min-height: 73px;  //最小高度，字体设置为了14px，这里是两行左右的高度
		font-size: 14px;  
		font: 14px/0.2;  //0.2表示的是行距
		line-height: 18px;  //行高
		padding:2px; 
		resize: vertical;  //表示可以上下拉伸不可左右拉动
	}

  .first-title{
    font-size:20px;
    text-align: center;
    font-weight:bold;
    margin-bottom:15px;
	margin-top: 15px;
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
    /* border:1px solid #ddd; */
    margin: 0 auto;
	/* margin-bottom: 20px; */
    /* border-top: none; */
  }
  .print-page__ipt {
    margin: 0px 60px 15px;
    resize: none;
    width: calc(100% - 120px);
		line-height: 1.5;
  }

  /* 标题 */
  .title-m{
    font-family: STHeiti !important;
    margin-left: 10px;
    font-weight: bold;
    font-size: 16px;
	&::before{
		content: "";
		display: inline-block;
		height: 18px;
		width: 5px;
		background: rgb(112, 182, 3);
		vertical-align: sub;
		margin-right: 10px;
	}
  }
  .title-s{
    font-family: STHeiti !important;
    margin-left: 57px;


	box-sizing: border-box;
    padding-right: 50px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .mb-15{
	margin-bottom: 15px;
  }
`