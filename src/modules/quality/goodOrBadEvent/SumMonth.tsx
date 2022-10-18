import React, { useEffect, useState } from 'react'
import { useRef } from 'src/types/react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import debounce from 'lodash/debounce';
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import SignColumnRender from "./SignModal";
import { clinicalApi } from './ClinicalApi';
import printing from 'printing'
import {
	ColumnProps,
	message,
	Input,
	Select,
	DatePicker,
	Popover,
	Button,
	InputNumber
} from "src/vendors/antd";
import { Table } from 'antd';
const TextArea = Input.TextArea
import { KeepAlive, Provider } from 'react-keep-alive'
import { appStore } from 'src/stores'
// import ClinicalHeaderByVicky from './ClinicalHeaderByVicky';
import SumMonthHead from './header/SumMonthHead';
import { sumData } from './tsData/SumData';
// import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
// pimport { type } from 'os';
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function SumMonth(props: Props) {

	// 搬运start
	// const [pageLoading, setPageLoading] = useState(false);
	// const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
	const [surplusHeight, setSurplusHeight]: any = useState(265);

	// const [total, setTotal] = useState(0);
	// 搬运end
	const [tableLoading, setTableLoading] = useState(false);
	const [data2, setData2] = useState([] as any);
	const [master, setMaster] = useState({} as any);
	let tempData = []//临时存放数据，更新表格数据

	const [isPrint, setIsPrint] = useState(false)
	const pageRef: any = useRef<HTMLElement>()


	const [freshData, setFreshData] = useState(Date.now());


	let dataSource = [
		{ "mainKey": "GLZB01001", "combinedKey": "GLZB01000", "isCombined": "0", weekNum: '第一周', answer: '1.查对制度落实合格率', answerSmall: '1.1医嘱查对制度(共5条款）', tips: '1.使用手腕带核对身份；2.至少同时使用姓名、住院号两项核对患者身份；3.依据《护理管理工作规范》《患者安全》查对制度4.不符合“查对制度，识别患者身份”要求或漏项；5.查对制度是否执行到位', method: '跟查护士执行情况' },
		{ "mainKey": "GLZB01002", "combinedKey": "GLZB01000", "isCombined": "0", weekNum: '', answer: '', answerSmall: '1.2服药/注射/输液查对制度(共7条）', tips: '', method: '' },
		{ "mainKey": "GLZB01003", "combinedKey": "GLZB01000", "isCombined": "0", weekNum: '第一周', answer: '', answerSmall: '1.3手术患者查对制度(共5条款）', tips: '', method: '' },
		{ "mainKey": "GLZB01004", "combinedKey": "GLZB01000", "isCombined": "0", weekNum: '', answer: '', answerSmall: '1.4配血查对制度(共5条款）', tips: '', method: '' },
		{ "mainKey": "GLZB01005", "combinedKey": "GLZB01000", "isCombined": "0", weekNum: '', answer: '', answerSmall: '1.5输血查对制度(共5条款）', tips: '', method: '' },
		{ "mainKey": "GLZB01006", "combinedKey": "GLZB01000", "isCombined": "0", weekNum: '', answer: '', answerSmall: '1.6饮食查对制度(共5条款）', tips: '', method: '' },

		{ "mainKey": "GLZB02001", "combinedKey": "GLZB02000", "isCombined": "0", weekNum: '', answer: '2.护理不良事件报告制度知晓率', answerSmall: '《非惩罚性护理不良事件报告制度》（共9条款）', tips: '护理不良事件上报率100%', method: '抽查提问' },

		{
			"mainKey": "GLZB03001", "combinedKey": "GLZB03000", "isCombined": "0",
			weekNum: '第二周', answer: '3.急救设备器材及药品完好合格率', answerSmall: '3.1除颤仪',
			tips: '1.根据《急救设备器材管理制度》、《急救药品管理制度》要求；2.设备能正常运行；3.急救物品数量或功能完好；4.急救药品数量无缺失、失效、标识不清楚',
			method: '所有急救物品及药品均检查'
		},
		{ "mainKey": "GLZB03002", "combinedKey": "GLZB03000", "isCombined": "0", weekNum: '第一周', answer: '', answerSmall: '3.2吸痰机', tips: '', method: '所有急救物品及药品均检查' },
		{ "mainKey": "GLZB03003", "combinedKey": "GLZB03000", "isCombined": "0", weekNum: '第一周', answer: '', answerSmall: '3.3气管插管', tips: '', method: '' },
		{ "mainKey": "GLZB03004", "combinedKey": "GLZB03000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '3.4喉镜', tips: '', method: '' },
		{ "mainKey": "GLZB03005", "combinedKey": "GLZB03000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '3.5其他（如呼吸机、呼吸囊、心电监护仪等）', tips: '', method: '' },
		{ "mainKey": "GLZB03006", "combinedKey": "GLZB03000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '3.6急救车、急救箱内固定物品', tips: '', method: '' },
		{ "mainKey": "GLZB03007", "combinedKey": "GLZB03000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '3.7急救车、急救箱内固定药品', tips: '', method: '' },

		{
			"mainKey": "GLZB04001", "combinedKey": "GLZB04000", "isCombined": "0",
			weekNum: '第周', answer: '4.无菌物品合格率', answerSmall: '各科无菌物品(10件以上)',
			tips: '1.储存符合要求；2.包装清洁，无污渍，包装完好，无破损；3.标签有效期准确,字迹清晰',
			method: '范围：工作车/治疗室/换药室/小手术室等'
		},
		{
			"mainKey": "GLZB05001", "combinedKey": "GLZB05000", "isCombined": "0",
			weekNum: '第周', answer: '5.依法执业合格率', answerSmall: '5.1无证护士',
			tips: '查无执业证护士/实习生有无独立完成有创护理技术操作/单独签名/独立上岗（查排班表）',
			method: '全体无证护士、实习生均检查'
		},
		{
			"mainKey": "GLZB05002", "combinedKey": "GLZB05000", "isCombined": "0",
			weekNum: '第周', answer: '', answerSmall: '5.3实习生',
			tips: '',
			method: ''
		},

		{
			"mainKey": "GLZB06001", "combinedKey": "GLZB06000", "isCombined": "0",
			weekNum: '第三周', answer: '6.核心护理制度、应急预案组织培训或演练护理人员知晓率', answerSmall: '6.1.1医嘱执行制度(共7条款）',
			tips: '病区护士知晓提问内容', method: '抽查提问'
		},
		{ "mainKey": "GLZB06002", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.1.2护嘱执行制度(共6条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06003", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.2交接班制度(共10条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06004", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.3.1医嘱查对制度(共5条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06005", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.3.2服药/注射/输液查对制度(7条', tips: '', method: '' },
		{ "mainKey": "GLZB06006", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.3.3手术患者查对制度制度(共5条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06007", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.3.4配血与输血查对制度(共12条）', tips: '', method: '' },
		{ "mainKey": "GLZB06008", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.3.5饮食查对制度(共5条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06009", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.4.1护理行政查房制度(共4条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06010", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.4.2三级护理业务查房制度（5条）', tips: '', method: '' },
		{ "mainKey": "GLZB06011", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.4.3护理教学查房制度（共3条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06012", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.5护理会诊制度(共6条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06013", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.6危重患者抢救制度(共11条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06014", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.7分级护理制度(共4条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06015", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.8护理不良事件报告处理制度(13条)', tips: '', method: '' },
		{ "mainKey": "GLZB06016", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.9患者告知制度(共13条款）', tips: '', method: '' },
		{ "mainKey": "GLZB06017", "combinedKey": "GLZB06000", "isCombined": "0", weekNum: '第周', answer: '', answerSmall: '6.10护理文书书写制度(共9条款）', tips: '', method: '' },

		{
			"mainKey": "GLZB07001", "combinedKey": "GLZB07000", "isCombined": "0",
			weekNum: '第四周', answer: '7.高危药物/毒麻药物的存放区域/标识和储存方法符合率',
			answerSmall: '7.1存放区域（整个科室药品数量）', tips: '1.按照《麻醉精神药品管理制度》、《危害药物及高危药物管理制度》要求；2.高危药物指我院公布的高危药物',
			method: '检查治疗室/冰箱/急救车/急救盒等'
		},
		{ "mainKey": "GLZB07002", "combinedKey": "GLZB07000", "isCombined": "0", weekNum: '', answer: '', answerSmall: '7.2标识', tips: '', method: '' },
		{ "mainKey": "GLZB07003", "combinedKey": "GLZB07000", "isCombined": "0", weekNum: '', answer: '', answerSmall: '7.3储存方法', tips: '', method: '' },

		{ "mainKey": "GLZB08001", "combinedKey": "GLZB08000", "isCombined": "0", weekNum: '', answer: '8.高危药物/毒麻药物警示标识符合率', answerSmall: '警示标识（护士长抽查基数）', tips: '', method: '' },

		{ "mainKey": "GLZB09001", "combinedKey": "GLZB09000", "isCombined": "0", weekNum: '第五周', answer: '9.危急值报告处理流程护士知晓率', answerSmall: '《临床实验室“危急值”报告制度》（共7条款）', tips: '', method: '抽查提问' },

		{ "mainKey": "GLZB10001", "combinedKey": "GLZB10000", "isCombined": "0", weekNum: '', answer: '10.危急值报告处理流程正确执行率', answerSmall: '', tips: '检查危急值登记本，查看医嘱，无医嘱时查护理记录', method: '' },

		{ "mainKey": "GLZB11001", "combinedKey": "GLZB11000", "isCombined": "0", weekNum: '每季', answer: '11.护理人员三基考试合格率', answerSmall: '', tips: '', method: '每季科室护士考核' },

		{ "mainKey": "GLZB12001", "combinedKey": "GLZB12000", "isCombined": "0", weekNum: '一年', answer: '12.护士继续教育达标率', answerSmall: '', tips: '', method: '科教管理平台导出', rowClassName: 'hua-line' },

	]

	// console.log(dataSource)
	const columns: ColumnProps<any>[] | any = [
		{
			title: "周数",
			dataIndex: "weekNum",
			align: "center",
			width: 50,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: { rowSpan: 0 },
				};
				if (index === 0) {
					obj.props.rowSpan = 7
				} else if (index === 7) {
					obj.props.rowSpan = 10
				} else if (index === 17) {
					obj.props.rowSpan = 17
				} else if (index === 34) {
					obj.props.rowSpan = 4
				}
				else if (index === 38) {
					obj.props.rowSpan = 2
				}
				else if (index === 40 || index === 41) {
					obj.props.rowSpan = 1
				}
				return obj
			}
		},
		{
			title: "问题",
			dataIndex: "answer",
			align: "center",
			colSpan: 2,
			width: 120,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: { rowSpan: 0 },
				};

				if (index === 0) {
					obj.props.rowSpan = 6
				} else if (index === 7) {
					obj.props.rowSpan = 7
				} else if (index === 15) {
					obj.props.rowSpan = 2
				} else if (index === 6 || index === 14 || index === 37 || index === 38 || index === 39 || index === 40 || index === 41) {
					obj.props.rowSpan = 1
				} else if (index === 17) {
					obj.props.rowSpan = 17
				} else if (index === 34) {
					obj.props.rowSpan = 3
				}
				return obj
			}
		},
		{
			title: "小问题",
			dataIndex: "answerSmall",
			align: "center",
			colSpan: 0,
			width: 120,
			render: (text: any, row: any, index: number) => {
				if (index > 38) {
					return (
						<TextArea
							autosize={{ minRows: 1 }}
							data-key="answerSmall"
							className={'focus-allow'}
							defaultValue={row['indicatorsDetails']}
							onBlur={(e: any) => row['indicatorsDetails'] = e.target.value}
							
							style={{
								lineHeight: 1.2,
								overflow: "hidden",
								padding: "9px 2px",
								textAlign: "center"
							}}
						/>
					)
				}
				return <span>{text}</span>
				// const obj = {
				// 	children: value,
				// 	props: { rowSpan: 1 },
				// };
				// return obj
			}
		},
		{
			title: "重点说明",
			dataIndex: "tips",
			align: "center",
			width: 100,
			render: (text: any, row: any, index: number) => {
				const obj = {
					children: text,
					props: { rowSpan: 1 },
				};
				if (index === 38 || index === 40 || index === 41) {
					obj.children = <TextArea
						autosize={{ minRows: 1 }}
						data-key="answerSmall"
						className={'focus-allow'}
						defaultValue={row['mainlyExplain']}
						onBlur={(e: any) => row['mainlyExplain'] = e.target.value}
						style={{
							lineHeight: 1.2,
							overflow: "hidden",
							padding: "9px 2px",
							textAlign: "center"
						}}
						
					/>
				}
				if (index === 0) {
					obj.props.rowSpan = 6
				} else if (index > 0 && index < 6) {
					obj.props.rowSpan = 0
				} else if (index === 7) {
					obj.props.rowSpan = 7
				} else if (index > 7 && index < 14) {
					obj.props.rowSpan = 0
				} else if (index === 15) {
					obj.props.rowSpan = 2
				} else if (index > 15 && index < 17) {
					obj.props.rowSpan = 0
				} else if (index === 17) {
					obj.props.rowSpan = 17
				}
				else if (index > 17 && index < 34) {
					obj.props.rowSpan = 0
				}
				else if (index === 34) {
					obj.props.rowSpan = 4
				}
				else if (index > 34 && index < 38) {
					obj.props.rowSpan = 0
				}
				return obj
			}
		},
		{
			title: "检查方法",
			dataIndex: "method",
			align: "center",
			width: 80,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: { rowSpan: 1 },
				};
				if (index === 0) {
					obj.props.rowSpan = 6
				} else if (index > 0 && index < 6) {
					obj.props.rowSpan = 0
				} else if (index === 7) {
					obj.props.rowSpan = 7
				} else if (index > 7 && index < 14) {
					obj.props.rowSpan = 0
				} else if (index === 15) {
					obj.props.rowSpan = 2
				} else if (index > 15 && index < 17) {
					obj.props.rowSpan = 0
				} else if (index === 17) {
					obj.props.rowSpan = 17
				}
				else if (index > 17 && index < 34) {
					obj.props.rowSpan = 0
				} else if (index === 34) {
					obj.props.rowSpan = 4
				}
				else if (index > 34 && index < 38) {
					obj.props.rowSpan = 0
				}
				return obj
			}
		},
		{
			title: "第一周",
			children: [
				{
					title: "Y",
					align: "center",
					dataIndex: "firstWeekY",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index, 'firstWeekY')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},
					width: 40,
				},
				{
					title: "N",
					align: "center",
					dataIndex: "firstWeekN",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index, 'firstWeekN')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},
					width: 40
				},
			]
		},
		{
			title: "第二周",
			children: [
				{
					title: "Y",
					align: "center",
					width: 40,
					dataIndex: "secondWeekY",
					render: (text: any, record: any, index: number) => {
						return weekChange(text, record, index, 'secondWeekY')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},

				},
				{
					title: "N",
					align: "center",
					dataIndex: "secondWeekN",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index, 'secondWeekN')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},
					width: 40
				},
			]
		},
		{
			title: "第三周",
			children: [
				{
					title: "Y",
					align: "center",
					dataIndex: "thirdWeekY",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index, 'thirdWeekY')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},
					width: 40,
				},
				{
					title: "N",
					align: "center",
					dataIndex: "thirdWeekN",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index, 'thirdWeekN')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},
					width: 40
				},
			]
		},
		{
			title: "第四周",
			children: [
				{
					title: "Y",
					align: "center",
					dataIndex: 'forthWeekY',
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index, 'forthWeekY')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},
					width: 40
				},
				{
					title: "N",
					align: "center",
					dataIndex: 'forthWeekN',
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index, 'forthWeekN')
					},
					onCell(record: any, rowIndex: any) {
						return cellFunc(record,rowIndex)
						
					},
					width: 40
				},
			]
		},
		{
			title: "合计",
			children: [
				{
					title: "Y",
					align: "center",
					key: 'totalY',
					dataIndex: 'totalY',
					width: 40,
					render(text: any, record: any, index: number) {
						if(index>39){
							return (
								<InputNumber
									className='bcy-input-number'
									min={0} max={100000}
									size="small"
									defaultValue={text}
									onChange={value => {
										record['totalY'] = value
									}}
									onBlur={() => {
										// 计算及格率
										if (record.totalY > 0 && record.totalN > 0) {
											// Math.floor(0.78655*10000)/10000  保留4位小数
											record.percentOfPass = Math.floor(record.totalY / (record.totalY + record.totalN) * 10000) / 10000
										} else if (record.totalY > 0 && (record.totalN === 0 || record.totalN == null)) {
											record.percentOfPass = 1
										} else if (record.totalY < 1) {
											// 全部是否定的
											record.percentOfPass = null
										}
										tempData = data2
										setData2([...tempData])
									}}
									step='0'
							onKeyUp={(e) => { sumData.focusNextIpt2(e) }}
								/>
							)
						}
						return <span>{text}</span>
					},
				},
				{
					title: "N",
					align: "center",
					key: 'totalN',
					dataIndex: 'totalN',
					width: 40,
					render(text: any, record: any, index: number) {
						if(index>39){
							return (
								<InputNumber
									className='bcy-input-number'
									min={0} max={100000}
									size="small"
									defaultValue={text}
									onChange={value => {
										record['totalN'] = value
									}}
									onBlur={() => {
										// 计算及格率
										if (record.totalY > 0 && record.totalN > 0) {
											// Math.floor(0.78655*10000)/10000  保留4位小数
											record.percentOfPass = Math.floor(record.totalY / (record.totalY + record.totalN) * 10000) / 10000
										} else if (record.totalY > 0 && (record.totalN === 0 || record.totalN == null)) {
											record.percentOfPass = 1
										} else if (record.totalY < 1) {
											// 全部是否定的
											record.percentOfPass = null
										}
										tempData = data2
										setData2([...tempData])
									}}
									step='0'
				onKeyUp={(e) => { sumData.focusNextIpt2(e) }}
								/>
							)
						}
						return <span>{text}</span>
					},
				},
				{
					title: "合格率",
					align: "center",
					dataIndex: "percentOfPass",
					render(text: any, record: any, index: number) {
						if (text > 0 && text < 1) {
							return (text * 100).toFixed(2) + '%'
						} else if (text === 1) {
							return '100%'
						}
						return ''
					},
					width: 60
				},
			]
		},
	]

	const cellFunc = (record: any, rowIndex: any)=>{
		if (rowIndex>39) {
			return {
				className: 'hua-line',
			}
		}
	}

	const weekChange = (text: any, record: any, index: number, key: string) => {
		if (index > 39) {
			return ''
		}
		return (
			<InputNumber
				className='bcy-input-number'
				min={0} max={100000}
				size="small"
				defaultValue={text}
				onChange={value => {
					record[key] = value
				}}
				onBlur={() => {
					let total = 0
					// let totalN = 0
					if (key.indexOf('WeekY') > -1) {
						for (let k in record) {
							if (k.indexOf('WeekY') > -1) {
								total += record[k]
							}
						}
						record.totalY = total
					} else {
						for (let k in record) {
							if (k.indexOf('WeekN') > -1) {
								total += record[k]
							}
						}
						record.totalN = total
					}
					// 计算及格率
					if (record.totalY > 0 && record.totalN > 0) {
						// Math.floor(0.78655*10000)/10000  保留4位小数
						record.percentOfPass = Math.floor(record.totalY / (record.totalY + record.totalN) * 10000) / 10000
					} else if (record.totalY > 0 && (record.totalN === 0 || record.totalN == null)) {
						record.percentOfPass = 1
					} else if (record.totalY < 1) {
						// 全部是否定的
						record.percentOfPass = null
					}
					tempData = data2
					setData2([...tempData])
				}}
				step='0'
				onKeyUp={(e) => { sumData.focusNextIpt(e) }}
			/>
		)
	}

	const freshSource = () => {
		console.log(Date.now())
	}


	useEffect(() => {
		setData2(dataSource as any)
	}, [])


	const initTableData = (itemList: any,master:any) => {
		// let findObj 
		setMaster({})
		setMaster(master)
		if (itemList.length > 0) {
			itemList.map((it:any) => {
				for (let i = 0; i < dataSource.length; i++) {
					if (it.mainKey == dataSource[i].mainKey) {
						dataSource[i] = { ...dataSource[i], ...it }
						break;
					}

				}
			})
		}
		setData2([])
		setData2([...dataSource])
		// console.log(dataSource)
	}

	// 保存数据
	const saveTableData = () => {
		// console.log('保存数据')
		setTableLoading(true)
		let params = {
			...sumData.postObj,
			deptName:sumData.deptNameChange,
			rowList: data2
		} as any
		if(master.id){
			params.master = master
		}else{
			params.master = {...sumData.postObj}
		}
		// console.log(params)
		// return 
		clinicalApi.saveTableData(params).then(res=>{
			setTableLoading(false)
			if(res.code=='200'){
				message.success('保存成功')
			}
		}).catch(err=>{
			setTableLoading(false)
		})
	}

	// 打印的表头
	const getTableColumns2 = ()=>{
		const columns2: ColumnProps<any>[] | any = [
			{
				title: "周数",
				dataIndex: "weekNum",
				align: "center",
				width: 50,
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: value,
						props: { rowSpan: 0 },
					};
					if (index === 0) {
						obj.props.rowSpan = 7
					} else if (index === 7) {
						obj.props.rowSpan = 10
					} else if (index === 17) {
						obj.props.rowSpan = 17
					} else if (index === 34) {
						obj.props.rowSpan = 4
					}
					else if (index === 38) {
						obj.props.rowSpan = 2
					}
					else if (index === 40 || index === 41) {
						obj.props.rowSpan = 1
					}
					return obj
				}
			},
			{
				title: "问题",
				dataIndex: "answer",
				align: "center",
				colSpan: 2,
				width: 120,
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: value,
						props: { rowSpan: 0 },
					};
	
					if (index === 0) {
						obj.props.rowSpan = 6
					} else if (index === 7) {
						obj.props.rowSpan = 7
					} else if (index === 15) {
						obj.props.rowSpan = 2
					} else if (index === 6 || index === 14 || index === 37 || index === 38 || index === 39 || index === 40 || index === 41) {
						obj.props.rowSpan = 1
					} else if (index === 17) {
						obj.props.rowSpan = 17
					} else if (index === 34) {
						obj.props.rowSpan = 3
					}
					return obj
				}
			},
			{
				title: "小问题",
				dataIndex: "answerSmall",
				align: "center",
				colSpan: 0,
				width: 120,
				render: (text: any, row: any, index: number) => {
					if (index > 38) {
						return <span>{row['indicatorsDetails']}</span>
					}
					return <span>{text}</span>
				}
			},
			{
				title: "重点说明",
				dataIndex: "tips",
				align: "center",
				width: 100,
				render: (text: any, row: any, index: number) => {
					const obj = {
						children: text,
						props: { rowSpan: 1 },
					};
					if (index === 38 || index === 40 || index === 41) {
						obj.children = <span>{row['mainlyExplain']}</span>
					}
					if (index === 0) {
						obj.props.rowSpan = 6
					} else if (index > 0 && index < 6) {
						obj.props.rowSpan = 0
					} else if (index === 7) {
						obj.props.rowSpan = 7
					} else if (index > 7 && index < 14) {
						obj.props.rowSpan = 0
					} else if (index === 15) {
						obj.props.rowSpan = 2
					} else if (index > 15 && index < 17) {
						obj.props.rowSpan = 0
					} else if (index === 17) {
						obj.props.rowSpan = 17
					}
					else if (index > 17 && index < 34) {
						obj.props.rowSpan = 0
					}
					else if (index === 34) {
						obj.props.rowSpan = 4
					}
					else if (index > 34 && index < 38) {
						obj.props.rowSpan = 0
					}
					return obj
				}
			},
			{
				title: "检查方法",
				dataIndex: "method",
				align: "center",
				width: 80,
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: value,
						props: { rowSpan: 1 },
					};
					if (index === 0) {
						obj.props.rowSpan = 6
					} else if (index > 0 && index < 6) {
						obj.props.rowSpan = 0
					} else if (index === 7) {
						obj.props.rowSpan = 7
					} else if (index > 7 && index < 14) {
						obj.props.rowSpan = 0
					} else if (index === 15) {
						obj.props.rowSpan = 2
					} else if (index > 15 && index < 17) {
						obj.props.rowSpan = 0
					} else if (index === 17) {
						obj.props.rowSpan = 17
					}
					else if (index > 17 && index < 34) {
						obj.props.rowSpan = 0
					} else if (index === 34) {
						obj.props.rowSpan = 4
					}
					else if (index > 34 && index < 38) {
						obj.props.rowSpan = 0
					}
					return obj
				}
			},
			{
				title: "第一周",
				children: [
					{
						title: "Y",
						align: "center",
						dataIndex: "firstWeekY",
						width: 40,
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
					},
					{
						title: "N",
						align: "center",
						dataIndex: "firstWeekN",
						width: 40,
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
					},
				]
			},
			{
				title: "第2周",
				children: [
					{
						title: "Y",
						align: "center",
						width: 40,
						dataIndex: "secondWeekY",
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
	
					},
					{
						title: "N",
						align: "center",
						dataIndex: "secondWeekN",
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
						width: 40
					},
				]
			},
			{
				title: "第3周",
				children: [
					{
						title: "Y",
						align: "center",
						dataIndex: "thirdWeekY",
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
						width: 40,
					},
					{
						title: "N",
						align: "center",
						dataIndex: "thirdWeekN",
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
						width: 40
					},
				]
			},
			{
				title: "第4周",
				children: [
					{
						title: "Y",
						align: "center",
						dataIndex: 'forthWeekY',
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
						width: 40
					},
					{
						title: "N",
						align: "center",
						dataIndex: 'forthWeekN',
						onCell(record: any, rowIndex: any) {
							return cellFunc(record,rowIndex)
							
						},
						width: 40
					},
				]
			},
			{
				title: "合计",
				children: [
					{
						title: "Y",
						align: "center",
						key: 'totalY',
						dataIndex: 'totalY',
						width: 40,
					},
					{
						title: "N",
						align: "center",
						key: 'totalN',
						dataIndex: 'totalN',
						width: 40,
					},
					{
						title: "合格率",
						align: "center",
						dataIndex: "percentOfPass",
						render(text: any, record: any, index: number) {
							if (text > 0 && text < 1) {
								return (text * 100).toFixed(2) + '%'
							} else if (text === 1) {
								return '100%'
							}
							return ''
						},
						width: 60
					},
				]
			},
		]
		return columns2
	}

	// 打印
	const onPrint = (isPrint: boolean) => {
		setIsPrint(isPrint)
		let printFun = isPrint ? printing : printing.preview
		setTimeout(() => {
		  printFun(pageRef.current, {
			// 插入所有link和style标签到打印，默认是false
			injectGlobalCss: true,
			// 指定扫描样式，默认是true（全部）
			scanStyles: false,
			css: `
				@page {
					size: auto;
					margin: 5mm 0mm;
				}
			   .ant-btn {
				 display: none;
			   }
			   .print-page {
				 box-shadow: none;
				 -webkit-print-color-adjust: exact;
				 margin: 0 auto;
			   }
			   .page-title {
				 min-height: 20px;
				 padding: 0px 30px 20px;
			   }
			   .page-title .title {
				 text-align: center;
				 margin-right: 0;
			   }
			   table, img {
				 page-break-inside: avoid;
			   }
			   pre {
				page-break-after: avoid;
			   }
			   * {
				 color: #000 !important;
			   }
			   .ant-spin-nested-loading{
				 height:auto;
			   }
			   .footer-title {
				 min-height: 0;
				 margin-bottom: 0;
			   }
			   table { page-break-inside:auto }
			   tr{ page-break-inside:avoid; page-break-after:auto }
			  .chart-con>div{
				display: none;
			  }
			  .chart-con .chart-con-img{
				max-width: 100%;
				display: inline!important;
			  }
			`
		  }).then(() => {
			setIsPrint(false)
		  })
		}, 500)
	
	}


	return (
		<Wrapper>
			<SumMonthHead title='科室临床护理质量指标年度汇总' tableLoading={false}
				setTableLoading={setTableLoading} initTableData={initTableData} 
				saveTable={saveTableData} onPrint={onPrint}/>
			
			<div>
			<ScrollCon>
				<BaseTable data-kkey={freshData}
					className="record-page-table"
					loading={tableLoading}
					dataSource={data2}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					title={() => {return (<span>{sumData.deptName}{sumData.postObj.year}年{Number(sumData.postObj.month)}月份护理工作质量/管理指标月度汇总</span>)}}
				/>

			</ScrollCon>
				</div>
			{isPrint && 
<PagePrint ref={pageRef} className='print-page'>
<div style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', lineHeight: '60px' }}>
	{sumData.deptName+sumData.postObj.year+'年'+Number(sumData.month)+'月份护理工作质量/管理指标月度汇总'}
	</div>
	<Table className='print-table' 
	bordered pagination={false} dataSource={data2} 
	columns={getTableColumns2()} />
</PagePrint>
}
		</Wrapper>
	);
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .hua-line {
		background: linear-gradient(
		to bottom right,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0) calc(50% - 1px),
		rgba(230,230,230, 1) 50%,
		rgba(0, 0, 0, 0) calc(50% + 1px),
		rgba(0, 0, 0, 0) 100%
	) !important;
		/* background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+) no-repeat 100% center;    */
		box-sizing: border-box;
	}
  .ant-table-tbody{
        > tr:hover:not(.ant-table-expanded-row) > td,.ant-table-row-hover,.ant-table-row-hover>td{
        background-color:#fff !important;
        //这里是将鼠标移入时的背景色取消掉了
        }
    }

  .record-page-table{
	
	.ml{
	float: left;
	padding-left: 10px;
	}
	.mr{
	float: right;
	padding-right: 10px;
	}
	/* 头部标题 */
	.ant-table-title{
		text-align: center;
		font-size: 20px;
		color: #333;
		font-weight: bold;
	}
  }
  .ant-select-disabled .ant-select-selection{
      background: rgba(0,0,0,0.0)!important;
  }
  .disabled-row{
    td.input-cell{
      background: rgba(0,0,0,0.03)!important;
    }
    .ant-input[disabled]{
      color: #000!important;
        background: rgba(0,0,0,0.0)!important;
    }
  }
  
  .ant-input[disabled]{
    color: #000!important;
    background: rgba(0,0,0,0.03)!important;
  }

  .color-red,
  .color-red *,
  .disabled-row .color-red[disabled],
  .disabled-row .color-red *[disabled] {
    color: red !important;
  }

  .color-orange,
  .color-orange *,
  .disabled-row .color-orange[disabled],
  .disabled-row .color-orange *[disabled] {
    color: orange !important;
  }




  .bcy-input-number{
	width: 100%;
	border:none;
	&:hover{
		border:none
	}
	&:focus{
		border: none;
		box-shadow: none;
	}
	.ant-input-number-handler-wrap{
		display: none;

	}
	input{
		padding:0;
		text-align: center;
	}
  }
  #baseTable .ant-table-row:hover{
	background: transparent;
  }



`;
const PagePrint = styled.div`
  width: 780px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
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
		/* background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+) no-repeat 100% center;    */
		box-sizing: border-box;
	}
  .ant-table-tbody{
        > tr:hover:not(.ant-table-expanded-row) > td,.ant-table-row-hover,.ant-table-row-hover>td{
        background-color:#fff !important;
        //这里是将鼠标移入时的背景色取消掉了
        }
    }
`

const ScrollCon = styled.div`
  /* flex: 1;
   */
`;
// const Wrapper = styled.div`
//   overflow: hidden;
//   height: calc(100vh - 50px);
//   display: flex;
//   align-items: stretch;
// `;

const LeftMenuCon = styled.div`
  width: 200px;
`;
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  width: 780px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
`