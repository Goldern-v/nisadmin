import React, { useEffect, useState } from 'react'
// import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
// import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { clinicalData } from "./ClinicalData";
import { PageTitle } from "src/components/common";
// import { quarterList } from 'src/enums/date'
import { clinicalApi } from "./ClinicalApi";
import { fileDownload } from "src/utils/file/file";


import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
// import { KeepAlive, Provider } from 'react-keep-alive'
// import { appStore } from 'src/stores'
// import ClinicalHeaderByVicky from './ClinicalHeaderByVicky';
// import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
// pimport { type } from 'os';
const Option = Select.Option;
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function SumYear(props: Props) {

	// 搬运start
	const [pageLoading, setPageLoading] = useState(false);
	const [surplusHeight, setSurplusHeight]: any = useState(220);

	const [yearPickShow, setYearPickShow] = useState(false);
	// const [selectQuarter, setSelectQuarter] = useState(moment().quarter() as unknown);
	// const [quartMms, setQuartMms] = useState([] as any);
	// end

	const [deucOption, setdeucOption] = useState([]); // 科室信息
	const [deptName, setDeptName] = useState('');
	const [selectDept, setSelectDept] = useState('');
	const [tableData, setTableData] = useState([] as any);
	useEffect(() => {
		// console.log('获取科室')
		// 获取科室
		clinicalApi.getnursingAll().then((res: any) => {
			// let deptListall = [];
			setdeucOption(res.data.deptList)
			setSelectDept(res.data.defaultDept)
			setDeptName(res.data.deptName)
			// 获取数据
			getTableList(res.data.defaultDept)
		}).catch((err: any) => {
			console.log(err);
		})

	}, [])

	const getTableList = (defaultDept?:string)=>{
		setPageLoading(true)
		let params = {
			deptCode:defaultDept || selectDept,
			year:clinicalData.yearSumChange
		}
		clinicalApi.getTableDataYear(params).then(res=>{
			setPageLoading(false)
			initTableList(res.data.valueList)
		}).catch(err=>{
			setPageLoading(false)

		})
	}
	const initTableList = (itemList:any)=>{
		if(itemList.length>0){
			itemList.map((it:any)=>{
				for (let j = 0; j < dataSource.length; j++) {
					if(it.combinedKey==dataSource[j].combinedKey){
						
						dataSource[j] = {...dataSource[j],...it}
						// console.log(dataSource[j])
						break;
					}
					
				}
			})
		}
		setTableData([])
		setTableData([...dataSource])
	}


	const dataSource = [
		{ "combinedKey": "GLZB01000_Y", classfiy: '查对制度落实', },
		{ "combinedKey": "GLZB01000_N", classfiy: '查对制度落实', },
		{ "combinedKey": "GLZB01000_rate", classfiy: '查对制度落实', },

		{ "combinedKey": "GLZB02000_Y", classfiy: '护理不良事件报告制度知晓', },
		{ "combinedKey": "GLZB02000_N", classfiy: '护理不良事件报告制度知晓', },
		{ "combinedKey": "GLZB02000_rate", classfiy: '护理不良事件报告制度知晓', },

		{ "combinedKey": "GLZB03000_Y", classfiy: '急救设备器材及药品完好', },
		{ "combinedKey": "GLZB03000_N", classfiy: '急救设备器材及药品完好', },
		{ "combinedKey": "GLZB03000_rate", classfiy: '急救设备器材及药品完好', },

		{ "combinedKey": "GLZB04000_Y", classfiy: '无菌物品', },
		{ "combinedKey": "GLZB04000_N", classfiy: '无菌物品', },
		{ "combinedKey": "GLZB04000_rate", classfiy: '无菌物品', },

		{ "combinedKey": "GLZB05000_Y", classfiy: '护士依法执业', },
		{ "combinedKey": "GLZB05000_N", classfiy: '护士依法执业', },
		{ "combinedKey": "GLZB05000_rate", classfiy: '护士依法执业', },

		{ "combinedKey": "GLZB06000_Y", classfiy: '核心护理制度、应急预案组织培训或演练护理人员知晓', },
		{ "combinedKey": "GLZB06000_N", classfiy: '核心护理制度、应急预案组织培训或演练护理人员知晓', },
		{ "combinedKey": "GLZB06000_rate", classfiy: '核心护理制度、应急预案组织培训或演练护理人员知晓', },
		
		{ "combinedKey": "GLZB07000_Y", classfiy: '高危药物/毒麻药物的存放区域/标识和储存方法', },
		{ "combinedKey": "GLZB07000_N", classfiy: '高危药物/毒麻药物的存放区域/标识和储存方法', },
		{ "combinedKey": "GLZB07000_rate", classfiy: '高危药物/毒麻药物的存放区域/标识和储存方法', },
		
		{ "combinedKey": "GLZB08000_Y", classfiy: '高危药物/毒麻药物警示标识', },
		{ "combinedKey": "GLZB08000_N", classfiy: '高危药物/毒麻药物警示标识', },
		{ "combinedKey": "GLZB08000_rate", classfiy: '高危药物/毒麻药物警示标识', },

		{ "combinedKey": "GLZB09000_Y", classfiy: '危急值报告处理流程护士知晓', },
		{ "combinedKey": "GLZB09000_N", classfiy: '危急值报告处理流程护士知晓', },
		{ "combinedKey": "GLZB09000_rate", classfiy: '危急值报告处理流程护士知晓', },

		{ "combinedKey": "GLZB10000_Y", classfiy: '危急值报告处理流程正确执行', },
		{ "combinedKey": "GLZB10000_N", classfiy: '危急值报告处理流程正确执行', },
		{ "combinedKey": "GLZB10000_rate", classfiy: '危急值报告处理流程正确执行', },

		{ "combinedKey": "GLZB11000_Y", classfiy: '护理人员三基考试合格', },
		{ "combinedKey": "GLZB11000_N", classfiy: '护理人员三基考试合格', },
		{ "combinedKey": "GLZB11000_rate", classfiy: '护理人员三基考试合格', },

		{ "combinedKey": "GLZB12000_Y", classfiy: '护士继续教育达标', },
		{ "combinedKey": "GLZB12000_N", classfiy: '护士继续教育达标', },
		{ "combinedKey": "GLZB12000_rate", classfiy: '护士继续教育达标', },

	] as any
	// console.log(dataSource)
	const columns: ColumnProps<any>[] | any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => {
				const obj = {
					children: index/3+1,
					props: { rowSpan: 0 },
				};
				if(index%3===0){
					obj.props.rowSpan = 3
				}
				return obj
			},
			align: "center",
			width: 30
		},
		{
			title: () => {
				return (
					<div className='table-hed-left'>
						<span className='ml'>项目</span>
						<span className='mr'>日期</span>
					</div>
				)
			},
			className: 'hua-line',
			dataIndex: "classfiy",
			align: "center",
			width: 100,
			colSpan: 2,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: { rowSpan: 0 },
				};
				if(index%3===0){
					obj.props.rowSpan = 3
				}
				return obj
			}
		},
		{
			title: "小问题",
			align: "center",
			colSpan: 0,
			width: 80,
			render: (value: any, row: any, index: number) => {
				if(index%3===0){
					return <span>检查总数</span>
				}
				if(index%3===1){
					return <span>不合格数</span>
				}
				if(index%3===2){
					return <span>合格率</span>
				}
			}
		},
		{
			title: "1月",
			align: "center",
			width: 60,
			dataIndex:'month01',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "2月",
			align: "center",
			width: 60,
			dataIndex:'month02',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "3月",
			align: "center",
			width: 60,
			dataIndex:'month03',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第一季度",
			align: "center",
			width: 60,
			dataIndex:'quarter1',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "4月",
			align: "center",
			width: 60,
			dataIndex:'month04',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "5月",
			align: "center",
			width: 60,
			dataIndex:'month05',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "6月",
			align: "center",
			width: 60,
			dataIndex:'month06',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第二季度",
			align: "center",
			width: 60,
			dataIndex:'quarter2',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "7月",
			align: "center",
			width: 60,
			dataIndex:'month07',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "8月",
			align: "center",
			width: 60,
			dataIndex:'month08',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "9月",
			align: "center",
			width: 60,
			dataIndex:'month09',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第三季度",
			align: "center",
			width: 60,
			dataIndex:'quarter3',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "10月",
			align: "center",
			width: 60,
			dataIndex:'month10',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "11月",
			align: "center",
			width: 60,
			dataIndex:'month11',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "12月",
			align: "center",
			width: 60,
			dataIndex:'month12',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第四季度",
			align: "center",
			width: 60,
			dataIndex:'quarter4',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: '合计', 
			align: "center", 
			width: 60,
			dataIndex: "total" ,
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
	]

	// 计算比率
	const countRatio = (text: any, record: any, index: number,)=>{
		if(index%3===2 && text>0){
			return <span>{Math.floor(text*10000)/100}%</span>
		}
		return <>{text>0?text:''}</>
	}

	const exportTable = ()=>{
		clinicalApi.exportSumYearTable({
			deptCode:selectDept,
			year:clinicalData.yearSumChange
		}).then(res => {
			fileDownload(res);
		});
	}





	return (
		<Wrapper>
			<div className='clinical-header'>
				<LeftIcon className='clinical-title'>
					<PageTitle>护理工作质量/管理指标年度汇总</PageTitle>
				</LeftIcon>
				<RightIcon className='clinical-head-right'>
					<>
						<span>年份：</span>
						<DatePicker className="mr-15"
							open={yearPickShow}
							onOpenChange={status => {
								setYearPickShow(status)
							}}
							onPanelChange={(value, mode) => {
								clinicalData.yearSum = value
								getTableList()
								setYearPickShow(false)
							}}
							mode="year"
							style={{ width: 120 }}
							value={clinicalData.yearSum}
							allowClear={true}
							placeholder='选择年份'
							format="YYYY"
						/>
					</>

					<span>科室：</span>
					<Select className="mr-15"
						style={{ width: 180 }}
						value={{key:selectDept}}
						labelInValue
						onChange={(val: any) => {
							setSelectDept(val.key)
							setDeptName(val.label)
							getTableList(val.key)
						}}
					>
						{deucOption.map((item: any) => {
							return <Option value={item.code} key={item.code}>{item.name}</Option>
						})}
					</Select>


					<Button
						className="span"
						onClick={()=>{getTableList()}}
					>
						查询
					</Button>
					<Button
						className="span"
						onClick={exportTable}
					>
						导出
					</Button>
				</RightIcon>
			</div>

			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={pageLoading}
					dataSource={tableData}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					title={() => {return (<span>{deptName}{clinicalData.yearSumChange}年护理工作质量/管理指标年度汇总</span>)}}
					
				/>
			</ScrollCon>

		</Wrapper>
	);
}
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .clinical-header{
	width: calc(100vw-200px);
	justify-content: space-between;
	height: 55px;
	font-size: 13px;
	color: #333;
	padding: 12px 15px 0 15px;
	.mr-15{
		margin-right: 15px;
	}
  }
  .ant-table-tbody{
        > tr:hover:not(.ant-table-expanded-row) > td,.ant-table-row-hover,.ant-table-row-hover>td{
        background:none !important;
        //这里是将鼠标移入时的背景色取消掉了
        }
    }

  .record-page-table{
	.ant-table-thead .hua-line {
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


const ScrollCon = styled.div`
  flex: 1;
`;

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
const LeftIcon = styled.div`
  padding: 0;
  float: left;
`;
const RightIcon = styled.div`
  padding: 0 0 0 15px;
  float: right;
  .span {
    font-size:13px;
    margin-left: 15px;
  }
`;