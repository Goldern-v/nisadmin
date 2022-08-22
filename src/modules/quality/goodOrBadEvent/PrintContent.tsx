import React, { useState, useEffect, useRef, MutableRefObject, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'
import { Table, Input, Button } from 'antd'
const { TextArea } = Input
import ReactEcharts from 'echarts-for-react';
import { wholePrintData } from './tsData/WholePrintData'
interface Props {
	// 输入框
	textArea1_1: string,
	textArea1_2: string,
	textArea1_3: string,
	textArea1_4: string,
	textArea2_1: string,
	textArea3_1: string,
	textArea4_1: string,
	setTextArea1_1: Function,
	setTextArea1_2: Function,
	setTextArea1_3: Function,
	setTextArea1_4: Function,
	setTextArea2_1: Function,
	setTextArea3_1: Function,
	setTextArea4_1: Function,

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
		textArea4_1, } = props
	const { setTextArea1_1, setTextArea1_2, setTextArea1_3, setTextArea1_4,
		setTextArea2_1,
		setTextArea3_1,
		setTextArea4_1, } = props
	const { pageData, isPrint, quarterRate, deductionData, text, setText, propsData } = props
	const [chartsImg1, setChartsImg1]: any = useState('')
	const [chartsImg2, setChartsImg2]: any = useState('')
	const [chartsImg3, setChartsImg3]: any = useState('')
	const [chartsImg4, setChartsImg4]: any = useState('')
	const [chartsImg5, setChartsImg5]: any = useState('')
	const [chartsImg6, setChartsImg6]: any = useState('')

	const [gridLeft, setGridLeft] = useState('12%');
	const [gridRight, setGridRight] = useState('12%');
	const [gridBottom, setgridBottom] = useState('66px');
	const dataSource = [
		{ isCurNum: true, classify: '高危药物外滲的发生例数', code: "gwywwsdfsls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '发生输血反应例数', code: "fssxfyls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '胃管非计划性拔管发生率', code: "wgfjhxbgfsl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '尿管非计划性拔管发生率', code: "ngfjhxbgfsl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '中心静脉导管非计划性拔管发生率', code: "zxjmdgfjhxbgfsl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '引流管非计划性拔管发生率', code: "lygfjhxbgfsl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '尿道插管中泌尿道感染发生率', code: "ndcgzmngrfsl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '中心静脉插管中血流感染发生率', code: "zxjmcgzlxgrfsl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '新发压疮例数', code: "xfycls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '失禁性皮炎发生例数', code: "sjxpyfsls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '跌倒发生例数', code: "ddfsls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '坠床发生例数', code: "zcfsls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '患者误吸发生例数', code: "hzwxfsls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '患者走失发生例数', code: "hzzsfsls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },

		{ isRate: true, classify: '压疮高风险评估阳性率', code: "ycgfxpgyxl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '跌倒/坠床高风险评估阳性率', code: "ddzcgfxpgyxl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },

		{ isRate: true, classify: '查对制度落实合格率', code: "cdzdlshgl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '护理不良事件报告制度知晓率', code: "hlblsjbgzxl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '急救设备器材及药品完好合格率', code: "jjsbqcjypwhhgl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '无菌物品合格率', code: "wjyphgl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '依法执业合格率', code: "yfzyhgl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '核心护理制度、应急预案组织培训或演练护理人员知晓率', code: "hxhlzdyjyazzpxhylhlryzxl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '高危药物/毒麻药物的存放区域/标识和储存方法符合率', code: "gwywdmywdcfqybshccfsfhl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '高危药物/毒麻药物警示标识符合率', code: "gwywdmywjsbsfhl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '危急值报告处理流程护士知晓率', code: "wjzbgcllchszxl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isRate: true, classify: '危急值报告处理流程正确执行率', code: "wjzbgcllczqzxl", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '使用药物错误的发生例数（例）', code: "syywcwdfsls", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		{ isCurNum: true, classify: '护士锐器损伤人数（例）', code: "hsrqssrs", preYearCount: null, currentYearRate: null, currentYearCount: null, preYearRate: null },
		// {classify:'',code: "",preYearCount: null,currentYearRate: null,currentYearCount: null,preYearRate: null},
		// {classify:'',code: "",preYearCount: null,currentYearRate: null,currentYearCount: null,preYearRate: null},

	] as any

	useEffect(() => {
		//数据改变时将canvas的画面用img保存用于打印
		setTimeout(() => {
			let canvasEl = document.querySelector('.canvas1 canvas') as any
			// console.log(canvasEl)
			if (canvasEl) {
				let srcStr = canvasEl.toDataURL()
				setChartsImg1(srcStr)
			}
		}, 1000)
		setTimeout(() => {
			let canvasEl2 = document.querySelector('.canvas2 canvas') as any
			if (canvasEl2) {
				let srcStr2 = canvasEl2.toDataURL()
				setChartsImg2(srcStr2)
			}
			let canvasEl3 = document.querySelector('.canvas3 canvas') as any
			if (canvasEl3) {
				let srcStr3 = canvasEl3.toDataURL()
				setChartsImg3(srcStr3)
			}
			let canvasEl4 = document.querySelector('.canvas4 canvas') as any
			if (canvasEl4) {
				let srcStr4 = canvasEl4.toDataURL()
				setChartsImg4(srcStr4)
			}
			let canvasEl5 = document.querySelector('.canvas5 canvas') as any
			if (canvasEl5) {
				let srcStr5 = canvasEl5.toDataURL()
				setChartsImg5(srcStr5)
			}
			let canvasEl6 = document.querySelector('.canvas6 canvas') as any
			if (canvasEl6) {
				let srcStr6 = canvasEl6.toDataURL()
				setChartsImg6(srcStr6)
			}
		}, 1000)


	}, [deductionData])


	const getEchartsTitle = {
		left: 'center',
		bottom: 0,
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

	}
	const xAxisSetting = {
		type: 'category',
		axisTick: { show: false },
		axisLabel: {
			interval: 0,  //控制X轴刻度全部显示
			formatter: function (value: any) {
				let len = value.length;
				let length = 5; //控制一行显示个数
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

	const yAxisSetting = {
		type: 'bar',
		animation: false,
		barGap: 0,
		label: {
			show: true,
			position: 'top'
		},
	}
	const yAxisSettingRate = {
		type: 'bar',
		animation: false,
		barGap: 0,
		label: {
			show: true,
			position: 'top',
			formatter: (val: any, idx: number) => {
				return Math.floor(val?.value * 10000) / 100 + '%'
			}
		},
	}



	const getBolatuOption = (data: any) => {
		let currentNum = 0, prevNum = 0
		if (wholePrintData.rowList.length > 0) {
			// 有数据
			let clinicalData = dataSource.slice(0, 16)
			clinicalData.map((it: any) => {
				if (it.isCurNum) {
					// 2022
					if (it.currentYearCount != null) {
						currentNum += it.currentYearCount
					}
					// 2021
					if (it.preYearCount != null) {
						prevNum += it.preYearCount
					}
				}
			})
		}
		let dataList = [prevNum, currentNum]
		let XaxisList = [`${Number(wholePrintData.master.belongsYear) - 1}`, `${wholePrintData.master.belongsYear}`]
		return {
			title: {
				text: '图1 临床护理质量指标对比（发生例数）',
				...getEchartsTitle,
				subtext: ' ',

			},

			legend: {
				bottom: 0,
				selectedMode: false,
				data: XaxisList
			},

			grid: {
				left: gridLeft,
				bottom: gridBottom,
			},
			xAxis: [
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: XaxisList,


				}
			],
			yAxis: [
				{
					type: 'value',
				},

			],
			series: [
				{
					type: 'bar',
					animation: false,
					data: dataList,
					label: {
						show: true,
						position: 'top'
					},
				}

			]
		};

	}

	// table数据
	const getTableData = () => {
		if (wholePrintData.rowList.length > 0) {
			wholePrintData.rowList.map((it: any) => {
				for (let k = 0; k < dataSource.length; k++) {
					if (dataSource[k].code == it.code) {
						dataSource[k] = { ...dataSource[k], ...it }
						break;
					}

				}
			})
		}
		return dataSource
	}

	const getTableColumns2 = (data: any) => {
		let columns: any = [

			{
				title: ' 指标分类 ',
				key: 'code',
				dataIndex: 'code',
				align: 'center',
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: <span>{'临床护理质量指标'}</span>,
						props: { rowSpan: 0 },
					};
					if (index === 0) {
						obj.props.rowSpan = 16
					} else if (index === 16) {
						obj.children = <span>{'工作质量/管理指标'}</span>
						obj.props.rowSpan = 12
					}
					return obj
				}
			},
			{ title: ' 指标名称 ', key: 'classify', dataIndex: 'classify', align: 'center' },
			{
				title: '例',
				children: [
					{
						title: () => {
							return (
								<span>{wholePrintData.master.belongsYear}</span>
							)
						}, key: 'currentYearCount', dataIndex: 'currentYearCount', align: 'center',

						onCell(record: any, rowIndex: any) {

							if (!record.isCurNum) {
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
								<span>{wholePrintData.master.belongsYear}</span>
							)
						}, key: 'currentYearRate', dataIndex: 'currentYearRate', align: 'center',
						onCell(record: any, rowIndex: any) {
							if (!record.isRate) {
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
								<span>{wholePrintData.master.belongsYear - 1}</span>
							)
						}, key: 'preYearCount', dataIndex: 'preYearCount', align: 'center',
						onCell(record: any, rowIndex: any) {
							if (!record.isCurNum) {
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
								<span>{wholePrintData.master.belongsYear - 1}</span>
							)
						}, key: 'preYearRate', dataIndex: 'preYearRate', align: 'center',
						onCell(record: any, rowIndex: any) {
							if (!record.isRate) {
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

	// 柱状图2
	const getBolatuOption2 = () => {
		// 临床护理质量指标对比（发生例数）
		let xAxisList = [] as any, currentList = [] as any, prevList = [] as any, legendData = []
		if (wholePrintData.rowList.length > 0) {
			// 有数据
			let clinicalData = dataSource.slice(0, 16)
			clinicalData.map((it: any) => {
				if (it.isCurNum) {
					xAxisList.push(it.classify)
					currentList.push(it.currentYearCount || 0)
					prevList.push(it.preYearCount || 0)
				}
			})
		}
		legendData = [`${Number(wholePrintData.master.belongsYear) - 1}`, `${wholePrintData.master.belongsYear}`]
		return {
			title: {
				text: '图2 临床护理质量指标对比（发生例数）',
				...getEchartsTitle
			},
			grid: {
				left: gridLeft,
				right: gridRight,
			},
			legend: {
				data: legendData
			},
			xAxis: [
				{
					data: xAxisList,
					...xAxisSetting,
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
					...yAxisSetting,
					data: prevList
				},
				{
					name: legendData[1],
					...yAxisSetting,
					data: currentList
				},
			]
		}
	}
	// 柱状图3
	const getBolatuOption3 = () => {
		let currentNum = 0, prevNum = 0
		if (wholePrintData.rowList.length > 0) {
			// 有数据
			let clinicalData = dataSource.slice(0, 16)
			let rateCount = 0
			clinicalData.map((it: any) => {
				if (it.isRate) {
					// 2022
					rateCount++
					if (it.currentYearRate != null) {
						currentNum += it.currentYearRate
					}
					// 2021
					if (it.preYearRate != null) {
						prevNum += it.preYearRate
					}
				}
			})
			currentNum = Math.floor(currentNum / rateCount * 10000) / 10000
			prevNum = Math.floor(prevNum / rateCount * 10000) / 10000
		}
		let dataList = [prevNum, currentNum]
		let XaxisList = [`${Number(wholePrintData.master.belongsYear) - 1}`, `${wholePrintData.master.belongsYear}`]
		// console.log(dataList)
		return {
			title: {
				text: '图3 临床护理质量指标对比（发生率）',
				...getEchartsTitle,
				subtext: ' ',

			},

			legend: {
				bottom: 0,
				selectedMode: false,
				data: XaxisList
			},

			grid: {
				// left: gridLeft,
				bottom: gridBottom,
			},
			xAxis: [
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: XaxisList,
				}
			],
			yAxis: [
				{
					type: 'value',
				},

			],
			series: [
				{
					type: 'bar',
					animation: false,
					data: dataList,
					label: {
						show: true,
						position: 'top',
						formatter: (val: any, idx: number) => {
							// console.log(val)
							return Math.floor(val?.value * 10000) / 100 + '%'
						}
					},
				}

			]
		};
	}
	// 柱状图4
	const getBolatuOption4 = () => {
		// 临床护理质量指标对比（发生例数）
		let xAxisList = [] as any, currentList = [] as any, prevList = [] as any, legendData = []
		if (wholePrintData.rowList.length > 0) {
			// 有数据
			let clinicalData = dataSource.slice(0, 16)
			clinicalData.map((it: any) => {
				if (it.isRate) {
					xAxisList.push(it.classify)
					currentList.push(it.currentYearRate || 0)
					prevList.push(it.preYearRate || 0)
				}
			})
		}
		legendData = [`${Number(wholePrintData.master.belongsYear) - 1}`, `${wholePrintData.master.belongsYear}`]

		return {
			title: {
				text: '图4 临床护理质量指标对比（发生率）',
				...getEchartsTitle
			},
			legend: {
				data: legendData
			},
			grid: {
				// left:gridLeft,
				right: gridRight,
			},
			xAxis: [
				{
					data: xAxisList,
					...xAxisSetting
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
					...yAxisSettingRate,
					data: prevList
				},
				{
					name: legendData[1],
					...yAxisSettingRate,
					data: currentList
				},
			]
		}
	}
	// 柱状图5
	const getBolatuOption5 = () => {
		let currentNum = 0, prevNum = 0
		if (wholePrintData.rowList.length > 0) {
			// 有数据
			let clinicalData = dataSource.slice(16, 28)
			let rateCount = 0
			clinicalData.map((it: any) => {
				if (it.isRate) {
					// 2022
					rateCount++
					if (it.currentYearRate != null) {
						currentNum += it.currentYearRate
					}
					// 2021
					if (it.preYearRate != null) {
						prevNum += it.preYearRate
					}
				}
			})
			currentNum = Math.floor(currentNum / rateCount * 10000) / 10000
			prevNum = Math.floor(prevNum / rateCount * 10000) / 10000
		}
		let dataList = [prevNum, currentNum]
		let XaxisList = [`${Number(wholePrintData.master.belongsYear) - 1}`, `${wholePrintData.master.belongsYear}`]
		// console.log(dataList)
		return {
			title: {
				text: '图5 工作量及管理质量指标对比（发生率）',
				...getEchartsTitle,
				subtext: ' ',
			},
			legend: {
				bottom: 0,
				selectedMode: false,
				data: XaxisList
			},

			grid: {
				// left: gridLeft,
				bottom: gridBottom
			},
			xAxis: [
				{
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: XaxisList,
				}
			],
			yAxis: [
				{
					type: 'value',
				},

			],
			series: [
				{
					type: 'bar',
					animation: false,
					data: dataList,
					label: {
						show: true,
						position: 'top',
						formatter: (val: any, idx: number) => {
							// console.log(val)
							return Math.floor(val?.value * 10000) / 100 + '%'
						}
					},
				}

			]
		};
	}
	// 柱状图6
	const getBolatuOption6 = () => {
		// 临床护理质量指标对比（发生例数）
		let xAxisList = [] as any, currentList = [] as any, prevList = [] as any, legendData = []
		if (wholePrintData.rowList.length > 0) {
			// console.log(wholePrintData.rowList)
			// 有数据
			let clinicalData = dataSource.slice(16, 28)
			// console.log(clinicalData)
			clinicalData.map((it: any) => {
				if (it.isRate) {
					xAxisList.push(it.classify)
					currentList.push(it.currentYearRate || 0)
					prevList.push(it.preYearRate || 0)
				}
			})
		}
		legendData = [`${Number(wholePrintData.master.belongsYear) - 1}`, `${wholePrintData.master.belongsYear}`]

		// console.log(legendData,xAxisList,currentList,prevList)

		return {
			title: {
				text: '图6 工作量及管理质量指标对比（发生率）',
				...getEchartsTitle
			},
			legend: {
				data: legendData
			},
			grid: {
				// left:gridLeft,
				bottom: '120px',
				// containLabel: false,
				right: gridRight,
			},
			xAxis: [
				{
					data: xAxisList,
					type: 'category',
					axisTick: { show: false },
					axisLabel: {
						interval: 0,  //控制X轴刻度全部显示
						formatter: function (value: any) {
							let len = value.length;
							let length = 4; //控制一行显示个数
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
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: legendData[0],
					...yAxisSettingRate,
					data: prevList
				},
				{
					name: legendData[1],
					...yAxisSettingRate,
					data: currentList
				},
			]
		}
	}
	return <Wrapper>
		<div className="first-content-box">
			<div className='first-title'>{`${propsData.title}`}</div>
			<div className='title-m'>一、计划阶段</div>
			<div className='title-s'>(一)通过{wholePrintData.master.belongsYear}年及{Number(wholePrintData.master.belongsYear) - 1}年全科临床护理及护理工作质量/管理指标的数据对比（见表1，图1-图6），发现主要存在问题：</div>
			{!isPrint && <Input.TextArea onChange={(e: any) => setTextArea1_1(e.target.value)} className='print-page__ipt' value={textArea1_1} placeholder='字数上限2000字' autosize={{ minRows: 3 }} maxLength={2000} />}
			{isPrint && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_1}</p>}
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
		{<div className='second-content-bolatu'>
			<div className='second-content-bolatu-bolatu'>
				{!isPrint && deductionData && <ReactEcharts className='canvas1' style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption(deductionData)} />}

				{isPrint && deductionData && chartsImg1 && <img src={chartsImg1} alt="" />}
			</div>
			{/* <p style={{ textAlign: 'center', fontSize: '12px' }}>全年临床护理及护理工作质量/管理指标数情况汇总表</p> */}

			<div className='second-content-bolatu-bolatu'>
				{!isPrint && deductionData && <ReactEcharts className='canvas2' style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption2()} />}
				{isPrint && deductionData && chartsImg2 && <img src={chartsImg2} alt="" />}
			</div>
			<div className='second-content-bolatu-bolatu'>
				{!isPrint && deductionData && <ReactEcharts className='canvas3' style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption3()} />}
				{isPrint && deductionData && chartsImg3 && <img src={chartsImg3} alt="" />}
			</div>
			<div className='second-content-bolatu-bolatu'>
				{!isPrint && deductionData && <ReactEcharts className='canvas4' style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption4()} />}
				{isPrint && deductionData && chartsImg4 && <img src={chartsImg4} alt="" />}
			</div>
			<div className='second-content-bolatu-bolatu'>
				{!isPrint && deductionData && <ReactEcharts className='canvas5' style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption5()} />}
				{isPrint && deductionData && chartsImg5 && <img src={chartsImg5} alt="" />}
			</div>
			<div className='second-content-bolatu-bolatu'>
				{!isPrint && deductionData && <ReactEcharts className='canvas6' style={{ height: 550, width: 680, margin: '0 auto' }} option={getBolatuOption6()} />}
				{isPrint && deductionData && chartsImg6 && <img src={chartsImg6} alt="" />}
			</div>
		</div>}

		<div>
			<div className='title-s'>（二）针对存在的护理质量问题进行原因分析：</div>
			{!isPrint && <TextArea className='print-page__ipt' placeholder='字数上限2000字'
				value={textArea1_2} onChange={(e: any) => setTextArea1_2(e.target.value)}
				maxLength={2000}
				rows={3}
				autosize={{ minRows: 3 }} />}
			{isPrint && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_2}</p>}
		</div>

		<div>
			<div className='title-s'>（三）确定2021年护理质量改进目标为：</div>
			{!isPrint && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea1_3} onChange={(e: any) => setTextArea1_3(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{isPrint && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_3}</p>}

		</div>

		<div>
			<div className='title-s'>（四）针对各存在问题发生的原因，结合护理质量改进目标，制定详细的质量改进计划：</div>
			{!isPrint && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea1_4} onChange={(e: any) => setTextArea1_4(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{isPrint && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea1_4}</p>}

		</div>

		<div>
			<div className='title-m mb-15'>二、实施阶段（Do）：</div>
			{!isPrint && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea2_1} onChange={(e: any) => setTextArea2_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{isPrint && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea2_1}</p>}

		</div>

		<div>
			<div className='title-m mb-15'>三、检查阶段（Check）：</div>
			{!isPrint && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea3_1} onChange={(e: any) => setTextArea3_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{isPrint && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea3_1}</p>}

		</div>

		<div>
			<div className='title-m mb-15'>四、处理阶段(Action)：</div>
			{!isPrint && <TextArea className='print-page__ipt' placeholder='字数上限2000字' value={textArea4_1} onChange={(e: any) => setTextArea4_1(e.target.value)} maxLength={2000} autosize={{ minRows: 3 }} />}
			{isPrint && <p className='print-page__ptext print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{textArea4_1}</p>}

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