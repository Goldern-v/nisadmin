import React, { useEffect, useState } from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { clinicalData } from "./ClinicalData";
import { PageTitle } from "src/components/common";
import { quarterList } from 'src/enums/date';
import { clinicalApi } from './ClinicalApi';
import { fileDownload } from "src/utils/file/file";

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
const Option = Select.Option;
export interface Props {
	payload: any;
}
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function ClinicalQuarter(props: Props) {

	// 搬运start

	const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
	const [surplusHeight, setSurplusHeight]: any = useState(220);
	const [pageOptions, setPageOptions]: any = useState({
		pageIndex: 1,
		pageSize: 20,
		total: 0
	});
	const [total, setTotal] = useState(0);
	// 搬运end
	const [pageLoading, setPageLoading] = useState(false);
	const [deptList, setDeptList] = useState([] as any);
	const [yearPickShow, setYearPickShow] = useState(false);
	const [selectQuarter, setSelectQuarter] = useState(moment().quarter() as any);
	const [selectYear, setSelectYear] = useState(moment().year()); //年份);
	const [quartMms, setQuartMms] = useState([] as any);
	const [column3, setColumn3] = useState([] as any);
	const [tableList, setTableList] = useState([] as any);
	const [quarterNames, setQuarterNames] = useState(['一','二','三','四']);
	// 科室-表头
	let columnDayObj: ColumnProps<any>[] | any = []
	// end

	const columns: ColumnProps<any>[] | any = [
		{
			title: "",
			children: [
				{
					title: "序号",
					dataIndex: "",
					render: (text: any, record: any, index: number) => index + 1,
					align: "center",
					width: 50
				},

			]
		},
		{
			title: '',
			children: [
				{
					title: () => {
						return (
							<div className='table-hed-left'>
								<span className='ml'>项目</span>
								<span className='mr'>日期</span>
							</div>
						)
					},
					render: (text: any, record: any, index: number) => {
						if (index < 31) {
							return <span>{text}</span>
						}
						return {
							props: {
								colSpan: 0,
							},
						};

					},
					className: 'hua-line',
					dataIndex: "name",
					align: "center",
					width: 100,
				},
			]
		},
	]

	// 挂载
	useEffect(() => {
		setPageLoading(true)
		let params = {
			year: clinicalData.yearQuarter?.year(),
			quarter: selectQuarter
		}
		clinicalApi.getQuarterTable(params).then(res => {
			// 科室设置

			setDeptList(res.data.deptList)
			setPageLoading(false)
			// initColumn()
			setTableList(res.data.valueList)
		}).catch(err => {
			setPageLoading(false)
		});
	}, [])

	// 获取表格数据
	const getTableList = () => {
		setPageLoading(true)
		let params = {
			year: selectYear,
			quarter: selectQuarter
		}
		clinicalApi.getQuarterTable(params).then(res => {
			setPageLoading(false)
			setTableList(res.data.valueList.slice(0,31))
		}).catch(err => {
			setPageLoading(false)
		});
	}

	useEffect(() => {
		// 有变化
		// console.log('有变化')
		initColumn()
		getTableList()
	}, [selectQuarter, clinicalData.yearQuarter])

	useEffect(() => {
		initColumn()
	}, [deptList])



	const initColumn = () => {
		setColumn3([])
		// 如果没有科室，不计算
		if (deptList.length < 1) return

		let monthArr = [(Number(selectQuarter) - 1) * 3 + 1, (Number(selectQuarter) - 1) * 3 + 2, (Number(selectQuarter) - 1) * 3 + 3]
		deptList.map((ii: any) => {
			columnDayObj.push({
				title: ii.name,
				children: [
					{
						title: monthArr[0].toString() + '月',
						align: "center",
						width: 50,
						dataIndex: clinicalData.yearQuarter?.year() + '_' + (monthArr[0] > 9 ? monthArr[0].toString() : '0' + monthArr[0].toString()) + '_01_1_' + ii.code,
					},
					{
						title: monthArr[1].toString() + '月',
						align: "center",
						width: 50,
						dataIndex: clinicalData.yearQuarter?.year() + '_' + (monthArr[1] > 9 ? monthArr[1].toString() : '0' + monthArr[1].toString()) + '_01_1_' + ii.code,
					},
					{
						title: monthArr[2].toString() + '月',
						align: "center",
						width: 50,
						dataIndex: clinicalData.yearQuarter?.year() + '_' + (monthArr[2] > 9 ? monthArr[2].toString() : '0' + monthArr[2].toString()) + '_01_1_' + ii.code,
					}
				]
			})
		})
		columnDayObj.push(
			{
				title: "",
				fixed:'right',
				children: [{ title: '合计', align: "center", width: 50, dataIndex: "total" }]
			}
		)
		setColumn3([...columns, ...columnDayObj])

	}


	const dataSource = [
		{ recordDate: 0, classfiy: '入院患者人数' },
		{ recordDate: 0, classfiy: '住院患者总数', },
		{ recordDate: 0, classfiy: '留陪人数', },
		{ recordDate: 0, classfiy: '给药错误发生例数', },
		{ recordDate: 0, classfiy: '使用高危药物患者人数', },
		{ recordDate: 0, classfiy: '高危药物外渗发生例次', },
		{ recordDate: 0, classfiy: '输血患者人数', },
		{ recordDate: 0, classfiy: '发生输血反应例次', },
		{ recordDate: 0, classfiy: '留有胃管患者人数', },
		{ recordDate: 0, classfiy: '胃管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '留有尿管患者人数', },
		{ recordDate: 0, classfiy: '尿管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '尿道插管中泌尿道感染人数', },
		{ recordDate: 0, classfiy: '留有中心静脉导管患者人数', },
		{ recordDate: 0, classfiy: '中心静脉导管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '中心静脉插管中血流感染人数', },
		{ recordDate: 0, classfiy: '留有引流管患者人数', },
		{ recordDate: 0, classfiy: '引流管非计划性拔管例次', },
		{ recordDate: 0, classfiy: '带入压疮总例数', },
		{ recordDate: 0, classfiy: '新发压疮例数', },
		{ recordDate: 0, classfiy: '需压疮高风险评估患者人数', },
		{ recordDate: 0, classfiy: '压疮高风险评估阳性例数', },
		{ recordDate: 0, classfiy: '排便失禁患者人数', },
		{ recordDate: 0, classfiy: '失禁性皮炎发生例数', },
		{ recordDate: 0, classfiy: '需跌倒/坠床高风险评估患者人数', },
		{ recordDate: 0, classfiy: '跌倒/坠床高风险评估阳性例数', },
		{ recordDate: 0, classfiy: '跌倒发生例数', },
		{ recordDate: 0, classfiy: '坠床发生例数', },
		{ recordDate: 0, classfiy: '患者误吸发生例数', },
		{ recordDate: 0, classfiy: '患者走失发生例数', },
		{ recordDate: 0, classfiy: '护士锐器损伤人数', },
		// { recordDate: 0, classfiy: '',   },
	]

	// 查询
	const handelInquire = () => {
		getTableList()
	}
	// 导出
	const handlerExport = () => {
		let params = {
			year: clinicalData.yearQuarter?.year(),
			quarter: selectQuarter
		}
		clinicalApi.exportQuarterTable(params).then(res => {
			fileDownload(res);
		});
	}

	return (
		<Wrapper>
			<HeaderTop className='clinical-header'>
				<LeftIcon className='clinical-title'>
					<PageTitle>科室临床护理质量指标季度汇总</PageTitle>
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
								clinicalData.yearQuarter = value
								// setSelectYear(value)
								setYearPickShow(false)
							}}
							mode="year"
							style={{ width: 120 }}
							value={clinicalData.yearQuarter}
							// value={selectYear}
							allowClear={true}
							placeholder='选择年份'
							format="YYYY"
						// onChange={date => {
						// 	clinicalData.year = date

						// }} 
						/>
					</>

					<>
						<span>季度：</span>
						<Select className="mr-15"
							style={{ width: 120 }}
							value={selectQuarter}
							onChange={(val: any) => {
								setSelectQuarter(val)
								// clinicalData.onload()
							}}
						>
							{
								quarterList.map((v: any, i: number) => (
									<Option key={i} value={i + 1}>{v}</Option>
								))
							}
						</Select>
					</>


					<Button
						className="span"
						onClick={handelInquire}
					>
						查询
					</Button>
					<Button
						className="span"
						onClick={handlerExport}
					>
						导出
					</Button>
				</RightIcon>
			</HeaderTop>

			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={pageLoading}
					dataSource={tableList}
					columns={column3}
					// columns={columns.filter((item: any) => item)}
					surplusHeight={255}
					surplusWidth={300}
					title={() => {return (<span>{clinicalData.yearQuarter?.year()}年第{quarterNames[Number(selectQuarter)-1]}季度临床护理质量指标季度汇总</span>)}}
				/>
			</ScrollCon>

		</Wrapper>
	);
}
const HeaderTop=styled.div`
	width: calc(100vw-200px);
	justify-content: space-between;
	height: 55px;
	font-size: 13px;
	color: #333;
	padding: 12px 15px 0 15px;
	box-sizing: border-box;
	.mr-15{
		margin-right: 15px;
	}
`
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