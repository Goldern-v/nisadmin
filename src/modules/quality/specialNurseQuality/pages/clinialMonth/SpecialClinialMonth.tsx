import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseTable from "src/components/BaseTable";
import moment from "moment";
import { fileDownload } from "src/utils/file/file";
import { dataClinialMonth } from './DataClinialMonth';
import { PageHeader, PageTitle, Place } from 'src/components/common'
export interface Props {
	payload: any;
}
import SignColumnRender from "./SignModal";
import {
	ColumnProps,
	message,
	Select,
	DatePicker,
	Button,
	InputNumber
} from "src/vendors/antd";
import { apiSpecialNurse } from '../../api/ApiSpecialNurse';
const Option = Select.Option;
export default observer(function SpecialClinialMonth(props: Props) {
	const [surplusHeight, setSurplusHeight]: any = useState(220);
	let currMonthDays: any = moment(dataClinialMonth.postObj.year + '-' + Number(dataClinialMonth.postObj.month), 'YYYY-MM').daysInMonth() || moment().daysInMonth()//这个月的总天数
	const [columns3, setColumns3] = useState([] as any);
	const [data3, setData3] = useState([] as any);
	//用于保存最后一条数据，装载签名的code
	const [signCodeItem, setSignCodeItem] = useState({} as any);
	const [tableLoading, setTableLoading] = useState(false);

	let [dateList, setDateList]: any[] = useState((Array.from({ length: currMonthDays }, (_, index) => index + 1)))
	// let dayList = [] as any, columnDay = {}
	let tempData = []

	// 头部
	const [deucOption, setdeucOption] = useState([]); // 科室信息
	const [yearPickShow, setYearPickShow] = useState(false);
	// 头部end

	// 签名
	const updateDataSource = () => {
		// console.log('更新table数据')
	};
	const getPage = () => {
		// console.log('firstgetPage')
		// return 2
		// console.log(data3)
	}

	const columns: ColumnProps<any>[] | any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => {
				if (index < data3.length-1) {
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
				if (index < data3.length-1) {
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
			let currrentPrefix = dataClinialMonth.postObj.year?.toString() + '_' + dataClinialMonth.postObj.month
			// let lastMonth = Number(dataClinialMonth.postObj.month) - 1 > 9 ? Number(dataClinialMonth.postObj.month) - 1 : '0' + (Number(dataClinialMonth.postObj.month) - 1).toString()
			// let lastPrefix = dataClinialMonth.postObj.year?.toString() + '_' + lastMonth.toString()
			let tempDataIndex = ''
			let totalIndex = currrentPrefix + '_01_1'//合计的dataIndex是2022_08_01_1:32，固定每月的第一天，最后一位是1
			// 获取的是2022-07的数据
			// if (it > 25) {
			// 	// 上个月 dataIndex是2022_06_26_0，2022_06_27_0，...
			// 	tempDataIndex = lastPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'

			// } else {
			// 当前月 dataIndex是2022_07_01_0，2022_07_02_0，...
			tempDataIndex = currrentPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'
			// }
			return {
				title: (it > 9 ? it.toString() : '0' + it.toString()),
				dataIndex: tempDataIndex,
				key: tempDataIndex,
				align: "center",
				className: "input-cell",
				width: 50,
				render(text: any, record: any, index: number) {
					if (index < data3.length-1) {
						return (
							<InputNumber
								className='bcy-input-number'
								min={0} max={100000}
								size="small"
								value={text}
								onChange={value => {
									// if (it > 25) {
									// 	record[lastPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'] = value
									// } else {
									record[currrentPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'] = value
									// }

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
									// dataClinialMonth.tableList=[...tempData]
								}}
								step='0'
								onKeyUp={(e) => { dataClinialMonth.focusNextIpt(e) }}
							/>
						);
					}
					return (<SignColumnRender {
						...{
							cellDisabled: () => false,
							// recordKey:(it > 25?(lastPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0'):
							// (currrentPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0')
							// ),
							recordKey: currrentPrefix + '_' + (it > 9 ? it.toString() : '0' + it.toString()) + '_0',
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
			fixed: 'right',
		},
	]
	useEffect(() => {
		// 头部数据改变，就要重新计算数据
		// columnDayObj = []
		// console.log(dataClinialMonth.postObj.month)
		// currMonthDays = moment(dataClinialMonth.postObj.year + '-' + (Number(dataClinialMonth.postObj.month) - 1), 'YYYY-MM').daysInMonth() || moment().subtract(1, 'month').daysInMonth()
		currMonthDays = moment(dataClinialMonth.postObj.year + '-' + Number(dataClinialMonth.postObj.month), 'YYYY-MM').daysInMonth() || moment().daysInMonth()
		// let days = [...(Array.from({ length: (currMonthDays - 26 + 1) }, (_, index) => index + 26 - 1 + 1)), ...(Array.from({ length: 25 }, (_, index) => index + 1))]
		let days = Array.from({ length: currMonthDays }, (_, index) => index + 1)
		// let currCount = moment(dataClinialMonth.postObj.year + '-' + Number(dataClinialMonth.postObj.month), 'YYYY-MM').daysInMonth() || moment().daysInMonth()
		// console.log(currCount)
		setDateList(days)
		// console.log(columns)
		setColumns3([...columns])
		dataClinialMonth.currentMonthDays = currMonthDays
	}, [dataClinialMonth.postObj])

	const initTableData = (itemList: any, body: any) => {
		// if (itemList.length > 32) {
			setSignCodeItem(itemList[itemList.length - 1])
			// itemList.pop()
		// }
		setData3([])
		setData3([...itemList])

	}
	const getMonths = () => {
		let options = []
		for (let i = 1; i <= 12; i++) {
			options.push(<Option value={i.toString()} key={i.toString()}>{i.toString()}月</Option>)
		}
		return options
	}

	useEffect(() => {
		getDeptList()
		//   初始化数据
		
	}, [])
	/**获取特殊科室 */
	const getDeptList = ()=>{
		setTableLoading(true)
		apiSpecialNurse.getSpecialDeptList({type:'clinicalIndicators'}).then(res=>{
			setTableLoading(false)
			if(res.code == '200'){
				// setModalDeptCode(res.data.defaultDept || '')
				setdeucOption(res.data.deptList || [])
					dataClinialMonth.deptCode = res.data.defaultDept || ''
					dataClinialMonth.deptName = res.data.deptName || ''
				// 有获取到科室再获取表格数据
				getTableList()
			}
		}).catch(err=>{
			setTableLoading(false)
		})
	}
	
	/**获取表格数据 */
	const getTableList=()=>{
		setTableLoading(true)
		apiSpecialNurse.getMonthTable(dataClinialMonth.postObj).then(res=>{
			setTableLoading(false)
			let valueList = res.data.valueList || []
			if(valueList.length>0){
				initTableData(valueList,res.data)
			}
			// initTableData()
		}).catch(err=>{
			setTableLoading(false)

		})
	}

	/**保存数据 */
	const handelSave = () => {
		setTableLoading(true)
		let params = {
			...dataClinialMonth.postObj,
			quarter: Math.floor(Number(dataClinialMonth.month) % 3 === 0 ? Number(dataClinialMonth.month) / 3 : Number(dataClinialMonth.month) / 3 + 1),
			valueList: [...data3]
		}
		// console.log('保存',params)
		// return false
		apiSpecialNurse.saveMonthTable(params).then(res => {
			setTableLoading(false)
			if (res.code == '200') {
				message.success('保存成功')
			}
		}).catch(err => {
			setTableLoading(false)
		})
	}

	/**导出 */
	const handleExport = ()=>{
		apiSpecialNurse.exportMonthTable(dataClinialMonth.postObj).then(res=>{
			fileDownload(res);
		}).catch(err=>{

		})
	}
	

	return (
		<Wrapper>
			<PageHeader>
				<PageTitle>{'科室临床护理质量指标月度汇总'}</PageTitle>
				<Place />
				<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {

							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							dataClinialMonth.year = value
							getTableList()
							setYearPickShow(false)
						}}
						mode="year"
						style={{ width: 120 }}
						value={dataClinialMonth.year}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>
				<>
					<span>月份：</span>
					<Select className="mr-15"
						style={{ width: 120 }}
						value={dataClinialMonth.month}
						onChange={(val: number) => {
							dataClinialMonth.month = val
							getTableList()
						}}
					>
						{getMonths()}
					</Select>
				</>
				<span>科室：</span>
				<Select
					labelInValue
					style={{ width: 180 }}
					value={{ key: dataClinialMonth.deptCode }}
					onChange={(val: any) => {
						dataClinialMonth.deptCode = val.key
						dataClinialMonth.deptName = val.label
						getTableList()
					}}
				>
					{deucOption.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>

				<Button
					className="span"
					onClick={()=>getTableList()}
				>
					查询
				</Button>
				<Button
					className="span"
					type="primary"
					onClick={handelSave}
				>
					保存
				</Button>
				<Button
					className="span"
				onClick={() => handleExport()}
				>
					导出
				</Button>
			</PageHeader>
			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={tableLoading}
					columns={columns}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					dataSource={data3}
					title={() => { return (<span>{dataClinialMonth.deptName}{dataClinialMonth.postObj.year}年{Number(dataClinialMonth.postObj.month)}月份临床护理质量指标月度汇总</span>) }}
				/>
			</ScrollCon>
		</Wrapper>
	)
})
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
	.mr-15{
    margin-right: 15px;
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


`
const ScrollCon = styled.div`
  flex: 1;
`;