import React, { useEffect, useState, useLayoutEffect } from 'react'
import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import moment from "moment";
import { RouteComponentProps } from 'src/components/RouterView'
import BaseTable, { DoCon } from "src/components/BaseTable";
import SignColumnRender from "./SignModal";
import { clinicalMonthTableData } from './ClinicalMonthTableData';
import { clinicalApi } from './ClinicalApi';
import { throttle } from "src/utils/throttle/throttle";

import InputRender from './InputRender';

import {
	ColumnProps,
	message,
	Input,
	Select,
	DatePicker,
	Popover,
	Button,
	Spin,
	InputNumber
} from "src/vendors/antd";
import { KeepAlive, Provider } from 'react-keep-alive'
import { appStore } from 'src/stores'
import ClinicalHeaderByVicky from './ClinicalHeaderByVicky';
import { truncate } from 'fs';
import { clinicalData } from './ClinicalData';
// import { ReactComponent as CFJL } from "./images/icon/CFJL.svg";
// pimport { type } from 'os';
export interface Props {
	payload: any;
}
const throttler2 = throttle();

export interface Props extends RouteComponentProps<{ name?: string }> { }
export default function ClinicalMonth(props: Props) {

	// 搬运start
	const [pageLoading, setPageLoading] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
	const [surplusHeight, setSurplusHeight]: any = useState(220);
	const [pageOptions, setPageOptions]: any = useState({
		pageIndex: 1,
		pageSize: 20,
		total: 0
	});
	let lastMonthDays: any = moment().subtract(1, 'month').daysInMonth()//上个月的总天数
	const [total, setTotal] = useState(0);
	const [columns3, setColumns3] = useState([] as any);
	const [data3, setData3] = useState([] as any);

	//用于保存最后一条数据，装载签名的code
	const [signCodeItem, setSignCodeItem] = useState({} as any);

	const [spinning, setSpinning] = useState(true);
	const [tableLoading, setTableLoading] = useState(false);
	const [bodyData, setBodyData] = useState({} as any);
	// 时间从上个月的26号开始到这个月的25号
	let [dateList, setDateList]: any[] = useState([...(Array.from({ length: (lastMonthDays - 26 + 1) }, (_, index) => index + 26 - 1 + 1)), ...(Array.from({ length: 25 }, (_, index) => index + 1))])

	let dayList = [] as any, columnDay = {}
	let tempData = []
	let columnDayObj: ColumnProps<any>[] | any = []

	// 签名
	const updateDataSource = () => {
		// console.log('更新table数据')
	};
	const getPage = () => {
		// console.log('firstgetPage')
		// return 2
		// console.log(data3)
	}

	let dataSource = [
		{ recordDate: 0, classfiy: '入院患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '住院患者总数', ...columnDay },
		{ recordDate: 0, classfiy: '留陪人数', ...columnDay },
		{ recordDate: 0, classfiy: '给药错误发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '使用高危药物患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '高危药物外渗发生例次', ...columnDay },
		{ recordDate: 0, classfiy: '输血患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '发生输血反应例次', ...columnDay },
		{ recordDate: 0, classfiy: '留有胃管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '胃管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '留有尿管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '尿管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '尿道插管中泌尿道感染人数', ...columnDay },
		{ recordDate: 0, classfiy: '留有中心静脉导管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '中心静脉导管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '中心静脉插管中血流感染人数', ...columnDay },
		{ recordDate: 0, classfiy: '留有引流管患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '引流管非计划性拔管例次', ...columnDay },
		{ recordDate: 0, classfiy: '带入压疮总例数', ...columnDay },
		{ recordDate: 0, classfiy: '新发压疮例数', ...columnDay },
		{ recordDate: 0, classfiy: '需压疮高风险评估患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '压疮高风险评估阳性例数', ...columnDay },
		{ recordDate: 0, classfiy: '排便失禁患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '失禁性皮炎发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '需跌倒/坠床高风险评估患者人数', ...columnDay },
		{ recordDate: 0, classfiy: '跌倒/坠床高风险评估阳性例数', ...columnDay },
		{ recordDate: 0, classfiy: '跌倒发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '坠床发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '患者误吸发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '患者走失发生例数', ...columnDay },
		{ recordDate: 0, classfiy: '护士锐器损伤人数', ...columnDay },
		{ recordDate: 0, classfiy: '', ...columnDay },
	]


	const columns: ColumnProps<any>[] | any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => {
				if (index < 31) {
					return index + 1
				}
				return {
					children: <span>填报人</span>,
					props: {
						colSpan: 2,
					},
				};

			},
			align: "center",
			width: 50
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
		...dateList.map((it: any, col: any) => {
			let currrentPrefix = clinicalData.postObj.year?.toString() + '_' + clinicalData.postObj.month
			let lastMonth = Number(clinicalData.postObj.month) - 1 > 9 ? Number(clinicalData.postObj.month) - 1 : '0' + (Number(clinicalData.postObj.month) - 1).toString()
			let lastPrefix = clinicalData.postObj.year?.toString() + '_' + lastMonth.toString()
			let tempDataIndex = ''
			let totalIndex = currrentPrefix + '_01_1'//合计的dataIndex是2022_08_01_1:32，固定每月的第一天，最后一位是1
			// 获取的是2022-07的数据
			if (it > 25) {
				// 上个月 dataIndex是2022_06_26_0，2022_06_27_0，...
				tempDataIndex = lastPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'

			} else {
				// 当前月 dataIndex是2022_07_01_0，2022_07_02_0，...
				tempDataIndex = currrentPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'
			}
			return {
				title: (it > 9 ? it.toString() : '0' + it.toString()),
				dataIndex: tempDataIndex,
				key: tempDataIndex,
				align: "center",
				className: "input-cell",
				width: 50,
				render(text: any, record: any, index: number) {
					if (index < 31) {
						return (
							<InputNumber
								className='bcy-input-number'
								min={0} max={100000}
								size="small"
								value={text}
								onChange={value => {
									if (it > 25) {
										record[lastPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'] = value
									} else {
										record[currrentPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'] = value
									}

								}}
								onBlur={() => {
									let total = 0
									for (let k in record) {
										if (k.split('_')[3] == '0') {
											total += record[k]
										}
									}
									record["total"] = total
									tempData = data3
									tempData[index] = record
									setData3([...tempData])
									// console.log(data3)
									// clinicalData.tableList=[...tempData]
								}}
							/>
						);
					}
					return (<SignColumnRender {
						...{
							cellDisabled: () => false,
							recordKey:(it > 25?(lastPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'):
							(currrentPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0')
							),
							record,
							index,
							data3,
							setData3,
							signCodeItem, 
							setSignCodeItem,
							setTableLoading,
							itemCfg: {},
							updateDataSource,
							registerCode: '5678',
							selectedBlockId: null,
							getPage,
						}
					} />)

				}
			};
		}),
		{
			title: "合计",
			key: "total",
			dataIndex: "total",
			align: "center",
			width: 50,
		},
	]
	useEffect(() => {
		// 头部数据改变，就要重新计算数据
		// columnDayObj = []
		// console.log(clinicalData.postObj.month)
		lastMonthDays = moment(clinicalData.postObj.year + '-' + (Number(clinicalData.postObj.month) - 1), 'YYYY-MM').daysInMonth() || moment().subtract(1, 'month').daysInMonth()
		let days = [...(Array.from({ length: (lastMonthDays - 26 + 1) }, (_, index) => index + 26 - 1 + 1)), ...(Array.from({ length: 25 }, (_, index) => index + 1))]
		setDateList(days)
		// console.log(columns)
		setColumns3([...columns])
	}, [clinicalData.postObj])


	const initTableData = (itemList: any, body: any) => {
		if(itemList.length>32){
			setSignCodeItem(itemList[itemList.length-1])
			itemList.pop()
		}
		setData3([])
		setData3([...itemList])

	}




	const saveTableData = () => {
		setTableLoading(true)
		let params = {
			...clinicalData.postObj,
			quarter: Math.floor(Number(clinicalData.month) % 3 === 0 ? Number(clinicalData.month) / 3 : Number(clinicalData.month) / 3 + 1),
			valueList: [...data3,signCodeItem]
		}
		// console.log('保存',params)
		// return
		clinicalApi.saveMonthTable(params).then(res => {
			setTableLoading(false)
			if (res.code == '200') {
				message.success('保存成功')
			}
		}).catch(err => {
			setTableLoading(false)
		})
	}



	return (
		<Wrapper>
			<ClinicalHeaderByVicky title='科室临床护理质量指标月度汇总' tableLoading={tableLoading} setTableLoading={setTableLoading} initTableData={initTableData} saveTableData={saveTableData} />
			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={tableLoading}
					columns={columns}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					dataSource={data3}
					title={() => {return (<span>{clinicalData.deptName}{clinicalData.postObj.year}年{Number(clinicalData.postObj.month)}月份临床护理质量指标月度汇总</span>)}}
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