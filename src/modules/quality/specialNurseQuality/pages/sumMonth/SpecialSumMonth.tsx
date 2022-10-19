import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRef } from 'src/types/react'
import BaseTable from "src/components/BaseTable";
import printing from 'printing'
import {
	ColumnProps,
	message,
	Input,
	Select,
	DatePicker,
	Button,
	InputNumber
} from "src/vendors/antd";
const TextArea = Input.TextArea
import { Table } from 'antd';
import { apiSpecialNurse } from '../../api/ApiSpecialNurse';
import { datasSumMonth } from './DatasSumMonth';
import { PageHeader, PageTitle, Place } from 'src/components/common'
export interface Props {
	payload: any;
}
const Option = Select.Option;

export default observer(function SpecialSumMonth(props: Props) {
	const [tableLoading, setTableLoading] = useState(false);
	const [data2, setData2] = useState([] as any);
	const [surplusHeight, setSurplusHeight]: any = useState(265);
	const [deucOption, setdeucOption] = useState([]); // 科室信息
	const [yearPickShow, setYearPickShow] = useState(false);
	const [master, setMaster] = useState({} as any);

	// 打印
	const [isPrint, setIsPrint] = useState(false)
	const pageRef: any = useRef<HTMLElement>()

	let tempData = []//临时存放数据，更新表格数据
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

	/**表头变量 */
	const columns: ColumnProps<any>[] | any = [
		{
			title: '周数',
			dataIndex: "belongWeek",
			align: "center",
			width: 50,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.belongWeek, data2, 'belongWeek', index)
				return obj
			}
		},
		{
			title: "检查条款",
			dataIndex: "parentMessage",
			align: "center",
			colSpan: 2,
			width: 120,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: {},
				} as any;
				
				obj.props.rowSpan = mergeCells(row.parentCode, data2, 'parentCode', index)
				return obj
			}
		},
		{
			title: "小问题",
			dataIndex: "mainMessage",
			align: "center",
			colSpan: 0,
			width: 120,
			render: (text: any, row: any, index: number) => {
				const obj = {
					children: text,
					props: { rowSpan: 1 },
				} as any;
				if(row.canEditMain=='1'){
					obj.children = <TextArea
					autosize={{ minRows: 1 }}
					key={row.id}
					className={'focus-allow'}
					defaultValue={row['mainMessage']}
					onBlur={(e: any) => row['mainMessage'] = e.target.value}
					
					style={{
						lineHeight: 1.2,
						overflow: "hidden",
						padding: "9px 2px",
						textAlign: "center"
					}}
				/>
				}
				// obj.props.rowSpan = mergeCells(row.combinedKey,data,'combinedKey',index)
				return obj
			}
		},
		{
			title: "重点说明",
			dataIndex: "mainlyExplain",
			align: "center",
			width: 100,
			render: (text: any, row: any, index: number) => {
				const obj = {
					children: text,
					props: {},
				} as any;
				if(row.mainlyExplainCode==''){
					obj.children = <TextArea
					autosize={{ minRows: 1 }}
					key={row.id}
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
				obj.props.rowSpan = mergeCells(row.mainlyExplainCode, data2, 'mainlyExplainCode', index)
				return obj
			}
		},
		{
			title: "检查方法",
			dataIndex: "checkMessage",
			align: "center",
			width: 80,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.checkMessageCode, data2, 'checkMessageCode', index)
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
						return cellFunc(record, rowIndex)

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
						return cellFunc(record, rowIndex)

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
						return cellFunc(record, rowIndex)

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
						return cellFunc(record, rowIndex)

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
						return cellFunc(record, rowIndex)

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
						return cellFunc(record, rowIndex)

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
						return cellFunc(record, rowIndex)

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
						return cellFunc(record, rowIndex)

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
						if (record.belongWeek=='每月' || record.belongWeek=='半年') {
							return (
								<InputNumber
									className='bcy-input-number'
									min={0} max={100000}
									size="small"
									defaultValue={text}
									onChange={value => {
										record['totalY'] = value
									}}
									step='0'
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
									onKeyUp={(e) => { datasSumMonth.focusNextIpt2(e) }}
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
						if (record.belongWeek=='每月' || record.belongWeek=='半年') {
							return (
								<InputNumber
								step='0'
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
									onKeyUp={(e) => { datasSumMonth.focusNextIpt2(e) }}
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

	/**添加斜线 */
	const cellFunc = (record: any, rowIndex: any) => {
		if (data2.length > 3) {
			if(record.belongWeek=='每月' || record.belongWeek=='半年'){
			// if (rowIndex > data2.length - 3) {
				return {
					className: 'hua-line',
				}
			}
		}
	}

	/**单元格输入框 */
	const weekChange = (text: any, record: any, index: number, key: string) => {
		if(record.belongWeek=='每月' || record.belongWeek=='半年') {
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
				key={record.id}
				step='0'
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
				onKeyUp={(e) => { datasSumMonth.focusNextIpt(e) }}
			/>
		)
	}

	/**12个月 */
	const getMonths = () => {
		let options = []
		for (let i = 1; i <= 12; i++) {
			options.push(<Option value={i.toString()} key={i.toString()}>{i.toString()}月</Option>)

		}
		return options
	}

	// 初始化数据
	useEffect(() => {
		getDeptList()
	}, [])

	/**获取特殊科室 */
	const getDeptList = ()=>{
		setTableLoading(true)
		apiSpecialNurse.getSpecialDeptList({type:'manageIndicators'}).then(res=>{
			if(res.code == '200'){
				setdeucOption(res.data.deptList || [])
				datasSumMonth.deptCode = res.data.defaultDept || ''
				datasSumMonth.deptName = res.data.deptName || ''
				// 有获取到科室再获取表格数据
				getTableList()
			}
		}).catch(err=>{
			setTableLoading(false)
		})
	}

	/**获取数据 */
	const getTableList = () => {
		setTableLoading(true)
		apiSpecialNurse.getTableData(datasSumMonth.postObj).then(res => {
			setTableLoading(false)
			setData2([...res.data.rowList] || [])
			setMaster(res.data.master)
		}).catch(err => {
			setTableLoading(false)
		})
	}

	/**保存数据 */
	const handelSave = () => {
		setTableLoading(true)
		let paramter = {
			...datasSumMonth.postObj,
			master: master,
			rowList: data2
		}
		// console.log(paramter)
		// return false
		apiSpecialNurse.saveTableData(paramter).then(res => {
			setTableLoading(false)
			if (res.code == '200') {
				message.success('保存成功')
			}
		}).catch(err => {
			setTableLoading(false)

		})
	}

	/**打印数据 */
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
			   .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
				padding:0 !important;
			   }
			   .ant-table{
				font-size:12px !important;
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
	// 打印的表头
	const getTableColumns2 = () => {
		const columns2: ColumnProps<any>[] | any = [
			{
				title: "周数",
				dataIndex: "belongWeek",
				align: "center",
				width: 50,
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: value,
						props: {},
					} as any;
					obj.props.rowSpan = mergeCells(row.belongWeek, data2, 'belongWeek', index)
					return obj
				}
			},
			{
				title: "检查条款",
				dataIndex: "parentMessage",
				align: "center",
				colSpan: 2,
				width: 120,
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: value,
						props: {},
					} as any;
					obj.props.rowSpan = mergeCells(row.parentCode, data2, 'parentCode', index)
					return obj
				}
			},
			{
				title: "小问题",
				dataIndex: "mainMessage",
				align: "center",
				colSpan: 0,
				width: 120,
				render: (text: any, row: any, index: number) => {
					const obj = {
						children: text,
						props: { rowSpan: 1 },
					} as any;
					// obj.props.rowSpan = mergeCells(row.combinedKey,data,'combinedKey',index)
					return obj
				}
			},
			{
				title: "重点说明",
				dataIndex: "mainlyExplain",
				align: "center",
				width: 100,
				render: (text: any, row: any, index: number) => {
					const obj = {
						children: text,
						props: {},
					} as any;
					obj.props.rowSpan = mergeCells(row.mainlyExplainCode, data2, 'mainlyExplainCode', index)
					return obj
				}
			},
			{
				title: "检查方法",
				dataIndex: "checkMessage",
				align: "center",
				width: 80,
				render: (value: any, row: any, index: number) => {
					const obj = {
						children: value,
						props: {},
					} as any;
					obj.props.rowSpan = mergeCells(row.checkMessageCode, data2, 'checkMessageCode', index)
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
							return cellFunc(record, rowIndex)

						},
					},
					{
						title: "N",
						align: "center",
						dataIndex: "firstWeekN",
						width: 40,
						onCell(record: any, rowIndex: any) {
							return cellFunc(record, rowIndex)

						},
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
						onCell(record: any, rowIndex: any) {
							return cellFunc(record, rowIndex)

						},

					},
					{
						title: "N",
						align: "center",
						dataIndex: "secondWeekN",
						onCell(record: any, rowIndex: any) {
							return cellFunc(record, rowIndex)

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
						onCell(record: any, rowIndex: any) {
							return cellFunc(record, rowIndex)

						},
						width: 40,
					},
					{
						title: "N",
						align: "center",
						dataIndex: "thirdWeekN",
						onCell(record: any, rowIndex: any) {
							return cellFunc(record, rowIndex)

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
						onCell(record: any, rowIndex: any) {
							return cellFunc(record, rowIndex)

						},
						width: 40
					},
					{
						title: "N",
						align: "center",
						dataIndex: 'forthWeekN',
						onCell(record: any, rowIndex: any) {
							return cellFunc(record, rowIndex)

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

	return (
		<Wrapper>
			<PageHeader>
				<PageTitle>{'护理工作质量/管理指标月度汇总'}</PageTitle>
				<Place />
				<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {

							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							datasSumMonth.year = value
							getTableList()
							setYearPickShow(false)
						}}
						mode="year"
						style={{ width: 120 }}
						value={datasSumMonth.year}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>
				<>
					<span>月份：</span>
					<Select className="mr-15"
						style={{ width: 120 }}
						value={datasSumMonth.month}
						onChange={(val: number) => {
							datasSumMonth.month = val
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
					value={{ key: datasSumMonth.deptCode }}
					onChange={(val: any) => {
						datasSumMonth.deptCode = val.key
						datasSumMonth.deptName = val.label
						getTableList()
					}}
				>
					{deucOption.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>

				<Button
					className="span"
					onClick={() => getTableList()}
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
					onClick={() => onPrint(true)}
				>
					打印
				</Button>
			</PageHeader>

			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={tableLoading}
					dataSource={data2}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					// footer={() => { return (<span style={{ fontSize: '12px' }}>{datasSumMonth.footerText}</span>) }}
					title={() => { return (<span>{datasSumMonth.deptName}{datasSumMonth.postObj.year}年{Number(datasSumMonth.postObj.month)}月份护理工作质量/管理指标月度汇总</span>) }}
				/>

			</ScrollCon>
			{/* ——————打印分割线—————— */}
			{isPrint &&
				<PagePrint ref={pageRef} className='print-page'>
					<div style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', lineHeight: '60px' }}>
						{datasSumMonth.deptName + datasSumMonth.postObj.year + '年' + Number(datasSumMonth.month) + '月份护理工作质量/管理指标月度汇总'}
					</div>
					<Table className='print-table'
						bordered pagination={false} dataSource={data2}
						columns={getTableColumns2()} />
				</PagePrint>
			}
		</Wrapper>
	)
})
const Wrapper = styled.div`
.ant-table-small.ant-table-bordered .ant-table-tbody > tr > td:last-child{
	border-right: 1px solid #e8e8e8
}
/* 文本换行 */
.ant-table-wrapper td{
	white-space: pre-wrap;
}
/* 斜杠线 */
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
.mr-15{
    margin-right: 15px;
  }
`
const ScrollCon = styled.div`
flex: 1;
`
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