import React, { useEffect, useState } from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import debounce from 'lodash/debounce';
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import SignColumnRender from "./SignModal";
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
import { KeepAlive, Provider } from 'react-keep-alive'
import { appStore } from 'src/stores'
import ClinicalHeaderByVicky from './ClinicalHeaderByVicky';
// import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
// pimport { type } from 'os';
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function SumMonth(props: Props) {

	// 搬运start
	const [pageLoading, setPageLoading] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
	const [surplusHeight, setSurplusHeight]: any = useState(220);

	const [total, setTotal] = useState(0);
	// 搬运end
	const [tableLoading, setTableLoading] = useState(false);
	const [data2, setData2] = useState([] as any);
	let tempData=[]//临时存放数据，更新表格数据
	let dayList = [], columnDay = {}

	let columnDayObj: ColumnProps<any>[] | any = []
	 
	const [freshData, setFreshData] = useState(Date.now());


	let dataSource = [
		{ rowTotalY:null,weekNum: '第一周', answer: '1.查对制度落实合格率', answerSmall: '1.1医嘱查对制度(共5条款）', tips: '1.使用手腕带核对身份；2.至少同时使用姓名、住院号两项核对患者身份；3.依据《护理管理工作规范》《患者安全》查对制度4.不符合“查对制度，识别患者身份”要求或漏项；5.查对制度是否执行到位', method: '跟查护士执行情况' },
		{ rowTotalY:null,weekNum: '', answer: '', answerSmall: '1.2服药/注射/输液查对制度(共7条）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第一周', answer: '', answerSmall: '1.3手术患者查对制度(共5条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '', answer: '', answerSmall: '1.4配血查对制度(共5条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '', answer: '', answerSmall: '1.5输血查对制度(共5条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '', answer: '', answerSmall: '1.6饮食查对制度(共5条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '', answer: '2.护理不良事件报告制度知晓率',answerSmall: '《非惩罚性护理不良事件报告制度》（共9条款）', tips: '护理不良事件上报率100%', method: '抽查提问' },
		{ rowTotalY:null,
			weekNum: '第二周', answer: '3.急救设备器材及药品完好合格率', answerSmall: '5.1无证护士',
			tips: '1.根据《急救设备器材管理制度》、《急救药品管理制度》要求；2.设备能正常运行；3.急救物品数量或功能完好；4.急救药品数量无缺失、失效、标识不清楚',
			method: '所有急救物品及药品均检查'
		},
		{ rowTotalY:null,weekNum: '第一周', answer: '', answerSmall: '3.2吸痰机', tips: '', method: '所有急救物品及药品均检查' },
		{ rowTotalY:null,weekNum: '第一周', answer: '', answerSmall: '3.3气管插管', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '3.4喉镜', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '3.5其他（如呼吸机、呼吸囊、心电监护仪等）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '3.6急救车、急救箱内固定物品', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '3.7急救车、急救箱内固定药品', tips: '', method: '' },

		{ rowTotalY:null,
			weekNum: '第周', answer: '4.无菌物品合格率', answerSmall: '各科无菌物品(10件以上)',
			tips: '1.储存符合要求；2.包装清洁，无污渍，包装完好，无破损；3.标签有效期准确,字迹清晰',
			method: '范围：工作车/治疗室/换药室/小手术室等'
		},
		{ rowTotalY:null,
			weekNum: '第周', answer: '5.依法执业合格率', answerSmall: '5.1无证护士',
			tips: '查无执业证护士/实习生有无独立完成有创护理技术操作/单独签名/独立上岗（查排班表）',
			method: '全体无证护士、实习生均检查'
		},
		{ rowTotalY:null,
			weekNum: '第周', answer: '', answerSmall: '5.3实习生',
			tips: '',
			method: ''
		},

		{ rowTotalY:null,
			weekNum: '第三周', answer: '6.核心护理制度、应急预案组织培训或演练护理人员知晓率', answerSmall: '6.1.1医嘱执行制度(共7条款）',
			tips: '病区护士知晓提问内容', method: '抽查提问'
		},
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.1.2护嘱执行制度(共6条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.2交接班制度(共10条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.3.1医嘱查对制度(共5条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.3.2服药/注射/输液查对制度(7条', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.3.3手术患者查对制度制度(共5条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.3.4配血与输血查对制度(共12条）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.3.5饮食查对制度(共5条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.4.1护理行政查房制度(共4条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.4.2三级护理业务查房制度（5条）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.4.3护理教学查房制度（共3条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.5护理会诊制度(共6条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.6危重患者抢救制度(共11条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.7分级护理制度(共4条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.8护理不良事件报告处理制度(13条)', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.9患者告知制度(共13条款）', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '第周', answer: '', answerSmall: '6.10护理文书书写制度(共9条款）', tips: '', method: '' },

		{ rowTotalY:null,
			weekNum: '第四周', answer: '7.高危药物/毒麻药物的存放区域/标识和储存方法符合率',
			answerSmall: '7.1存放区域（整个科室药品数量）', tips: '1.按照《麻醉精神药品管理制度》、《危害药物及高危药物管理制度》要求；2.高危药物指我院公布的高危药物',
			method: '检查治疗室/冰箱/急救车/急救盒等'
		},
		{ rowTotalY:null,weekNum: '', answer: '', answerSmall: '7.2标识', tips: '', method: '' },
		{ rowTotalY:null,weekNum: '', answer: '', answerSmall: '7.3储存方法', tips: '', method: '' },

		{ rowTotalY:null,weekNum: '', answer: '8.高危药物/毒麻药物警示标识符合率', answerSmall: '警示标识（护士长抽查基数）', tips: '', method: '' },

		{ rowTotalY:null,weekNum: '第五周', answer: '9.危急值报告处理流程护士知晓率', answerSmall: '《临床实验室“危急值”报告制度》（共7条款）', tips: '', method: '抽查提问' },

		{ rowTotalY:null,weekNum: '', answer: '10.危急值报告处理流程正确执行率', answerSmall: '', tips: '检查危急值登记本，查看医嘱，无医嘱时查护理记录', method: '' },

		{ rowTotalY:null,weekNum: '每季', answer: '11.护理人员三基考试合格率', answerSmall: '', tips: '', method: '每季科室护士考核' },

		{ rowTotalY:null,weekNum: '一年', answer: '12.护士继续教育达标率', answerSmall: '', tips: '', method: '科教管理平台导出' ,rowClassName:'hua-line'},

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
				} else if (index === 7 ) {
					obj.props.rowSpan = 10
				} else if (index === 17) {
					obj.props.rowSpan = 17
				} else if (index === 34) {
					obj.props.rowSpan = 4
				} 
				else if (index === 38) {
					obj.props.rowSpan = 2
				} 
				else if (index === 40||index === 41) {
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
				}  else if (index === 7) {
					obj.props.rowSpan = 7
				} else if (index === 15) {
					obj.props.rowSpan = 2
				} else if(index === 6 || index === 14 || index === 37 ||index === 38|| index === 39|| index === 40||index === 41){
					obj.props.rowSpan = 1
				}else if (index === 17) {
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
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: { rowSpan: 1 },
				};
				// if(index ===0){
				//   obj.props.rowSpan=6
				// }else if(index>0 && index<6){
				//   obj.props.rowSpan=0
				// }else if(index===8){
				//   obj.props.rowSpan=7
				// }else if(index>8 && index<15){
				//   obj.props.rowSpan=0
				// }
				return obj
			}
		},
		{
			title: "重点说明",
			dataIndex: "tips",
			align: "center",
			width: 100,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: { rowSpan: 1 },
				};
				if (index === 0) {
					obj.props.rowSpan = 6
				} else if (index > 0 && index < 6) {
					obj.props.rowSpan = 0
				}else if (index === 7) {
					obj.props.rowSpan = 7
				} else if (index > 7 && index < 14) {
					obj.props.rowSpan = 0
				}else if (index === 15) {
					obj.props.rowSpan = 2
				} else if (index > 15 && index < 17) {
					obj.props.rowSpan = 0
				}else if (index === 17) {
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
				}else if (index === 7) {
					obj.props.rowSpan = 7
				} else if (index > 7 && index < 14) {
					obj.props.rowSpan = 0
				}else if (index === 15) {
					obj.props.rowSpan = 2
				} else if (index > 15 && index < 17) {
					obj.props.rowSpan = 0
				}else if (index === 17) {
					obj.props.rowSpan = 17
				}
				else if (index > 17 && index < 34) {
					obj.props.rowSpan = 0
				}else if (index === 34) {
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
					render(text: any, record: any, index: number) {
						if(index===40){
							return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#ccc" stroke-width="0.5"/></svg>
						}
						return (
							<InputNumber
							className='bcy-input-number'
							min={0} max={100000}
							size="small"
							onChange={value => {
								record.firstWeekY = value
								let total = 0
								for (let k in record) {
									if (k.indexOf('WeekY') > -1) {
										total += record[k]
									}
								}
								record.rowTotalY = total
								tempData = data2
								setData2([...tempData])
							}}
						/>
						)
					},
					width: 40,
				},
				{
					title: "N",
					align: "center",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index,'firstWeekN')
					},
					width: 40
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
					render:(text: any, record: any, index: number)=>{
						return weekChange(text, record, index,'secondWeekY')
					}

				},
				{
					title: "N",
					align: "center",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index,'secondWeekN')
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
					// dataIndex: '',
					render(text: any, record: any, index: number) {
							return weekChange(text, record, index,'thirdWeekY')
					},
					width: 40,
				},
				{
					title: "N",
					align: "center",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index,'thirdWeekN')
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
					// dataIndex: '',
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index,'thourthWeekY')
					},
					width: 40
				},
				{
					title: "N",
					align: "center",
					render(text: any, record: any, index: number) {
						return weekChange(text, record, index,'thourthWeekN')
					},
					width: 40
				},
			]
		},
		{
			title: "合计",
			dataIndex:"key",
			children: [
				{
					title: "Y",
					align: "center",
					key:'rowTotalY',
					dataIndex: 'rowTotalY',
					width: 40
				},
				{
					title: "N",
					align: "center",
					key:'rrowTotalN',
					dataIndex:'rowTotalN',
					width: 40
				},
				{
					title: "合格率",
					align: "center",
					render(text: any, record: any, index: number) {
						let fit = null
						if(record.rowTotalY>0 && (record.rowTotalN===0 || record.rowTotalN==null)){
							fit = 100
						}else{
							fit = record.rowTotalY/(record.rowTotalY+record.rowTotalN)*100
						}
						
							if(fit>0){
								return parseInt(fit.toString())+'%'
							}
							return ''
					},
					width: 50
				},
			]
		},
	]

	const weekChange=(text: any, record: any, index: number,key:string)=>{
		if(index===40){
			return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="100%" y1="0" x2="0" y2="100%" stroke="#ccc" stroke-width="0.5"/></svg>
		}
		return (
			<InputNumber
			className='bcy-input-number'
			min={0} max={100000}
			size="small"
			onChange={value => {
				record[key] = value
				let total = 0
				// let totalN = 0
				if(key.indexOf('WeekY')>-1){
					for (let k in record) {
						if (k.indexOf('WeekY') > -1) {
							total += record[k]
						}
					}
					record.rowTotalY = total
				}else{
					for (let k in record) {
						if (k.indexOf('WeekN') > -1) {
							total += record[k]
						}
					}
					record.rowTotalN = total
				}
				console.log(record)
				tempData = data2
				setData2([...tempData])
			}}
		/>
		)
	}

	const freshSource=()=>{
		console.log(Date.now())
	}

	// const funt = (text: any, record: any, index: number,)=>{
	// 	if(index===40){
	// 		return <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#ccc" stroke-width="0.5"/></svg>
	// 	}
	// 	return (
	// 		<InputNumber
	// 		className='bcy-input-number'
	// 		min={0} max={100000}
	// 		size="small"
	// 		onChange={value => {
	// 			record.secondWeekY = value

	// 			let total = 0
	// 			for (let k in record) {
	// 				if (k.indexOf('WeekY') > -1) {
	// 					total += record[k]
	// 				}
	// 			}
	// 			record.rowTotalY = total
	// 			console.log(record)
	// 		}}
	// 	/>
	// 	)
	// }

	useEffect(() => {
		setData2(dataSource as any)
	}, [])
	

	const initTableData=(itemList:any)=>{
		
	}
	
	const saveTableData = ()=>{
	
	}


	return (
		<Wrapper>
			<ClinicalHeaderByVicky title='科室临床护理质量指标年度汇总' tableLoading={false} 
			setTableLoading={setTableLoading} initTableData={initTableData} saveTableData={saveTableData}/>
			<ScrollCon>
				<BaseTable data-kkey={freshData}
					className="record-page-table"
					loading={pageLoading}
					dataSource={data2}
					// dataSource={dataSource}
					// rowSelection={{
					//   selectedRowKeys,
					//   onChange: handleSelectedChange,
					// }}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
				// useOuterPagination
				// pagination={{
				//   onChange: (pageIndex: number) => {
				// 	setPageOptions({ ...pageOptions, pageIndex })
				//   },
				//   onShowSizeChange: (pageIndex: number, pageSize: number) => {
				// 	setPageOptions({ ...pageOptions, pageSize, pageIndex: 1 })
				//   },
				//   pageSizeOptions: ['20', '30', '40', '50', '100'],
				//   current: pageOptions.pageIndex,
				//   pageSize: pageOptions.pageSize,
				//   total: total
				// }}
				// rowClassName={(record: any, idx: number) => {
				//   if (cellDisabled(record)) return 'disabled-row'

				//   return ''
				// }}

				/>
			</ScrollCon>

		</Wrapper>
	);
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-table-tbody{
        > tr:hover:not(.ant-table-expanded-row) > td,.ant-table-row-hover,.ant-table-row-hover>td{
        background:none !important;
        //这里是将鼠标移入时的背景色取消掉了
        }
    }

  .record-page-table{
	.hua-line {
		background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+) no-repeat 100% center;   
		box-sizing: border-box;
	}
	.ml{
	float: left;
	padding-left: 10px;
	}
	.mr{
	float: right;
	padding-right: 10px;
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


const ScrollCon = styled.div`
  flex: 1;
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