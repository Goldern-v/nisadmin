import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { fileDownload } from "src/utils/file/file";
export interface Props {
	payload: any;
}
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import { datasSumYear } from './DatasSumYear';
import BaseTable from "src/components/BaseTable";
import { apiSpecialNurse } from '../../api/ApiSpecialNurse';
const Option = Select.Option;
export default observer(function SpecialSumYear(props: Props) {
	// 头部
	const [deucOption, setdeucOption] = useState([]); // 科室信息
	// 头部end

	const [pageLoading, setPageLoading] = useState(false);
	const [surplusHeight, setSurplusHeight]: any = useState(220);

	const [yearPickShow, setYearPickShow] = useState(false);
	const [tableData, setTableData] = useState([] as any);


	const columns: ColumnProps<any>[] | any = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => {
				const obj = {
					children: index / 3 + 1,
					props: { rowSpan: 0 },
				};
				if (index % 3 === 0) {
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
			dataIndex: "itemName",
			align: "center",
			width: 100,
			colSpan: 2,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: { rowSpan: 0 },
				};
				if (index % 3 === 0) {
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
				if (index % 3 === 0) {
					return <span>检查总数</span>
				}
				if (index % 3 === 1) {
					return <span>不合格数</span>
				}
				if (index % 3 === 2) {
					return <span>合格率</span>
				}
			}
		},
		{
			title: "1月",
			align: "center",
			width: 60,
			dataIndex: 'month01',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "2月",
			align: "center",
			width: 60,
			dataIndex: 'month02',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "3月",
			align: "center",
			width: 60,
			dataIndex: 'month03',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第一季度",
			align: "center",
			width: 60,
			dataIndex: 'quarter1',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "4月",
			align: "center",
			width: 60,
			dataIndex: 'month04',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "5月",
			align: "center",
			width: 60,
			dataIndex: 'month05',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "6月",
			align: "center",
			width: 60,
			dataIndex: 'month06',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第二季度",
			align: "center",
			width: 60,
			dataIndex: 'quarter2',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "7月",
			align: "center",
			width: 60,
			dataIndex: 'month07',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "8月",
			align: "center",
			width: 60,
			dataIndex: 'month08',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "9月",
			align: "center",
			width: 60,
			dataIndex: 'month09',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第三季度",
			align: "center",
			width: 60,
			dataIndex: 'quarter3',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "10月",
			align: "center",
			width: 60,
			dataIndex: 'month10',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "11月",
			align: "center",
			width: 60,
			dataIndex: 'month11',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "12月",
			align: "center",
			width: 60,
			dataIndex: 'month12',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: "第四季度",
			align: "center",
			width: 60,
			dataIndex: 'quarter4',
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
		{
			title: '合计',
			align: "center",
			width: 60,
			dataIndex: "total",
			render: (text: any, record: any, index: number) => {
				return countRatio(text, record, index)
			},
		},
	]
	const countRatio = (text: any, record: any, index: number,) => {
		if (index % 3 === 2 && text > 0) {
			return <span>{Math.floor(text * 10000) / 100}%</span>
		}
		return <>{text > 0 ? text : ''}</>
	}

	useEffect(() => {
		getDeptList()
	}, [])

	/**获取特殊科室 */
	const getDeptList = () => {
		setPageLoading(true)
		apiSpecialNurse.getSpecialDeptList({ type: 'manageIndicators' }).then(res => {
			setPageLoading(false)
			if (res.code == '200') {
				setdeucOption(res.data.deptList || [])
				datasSumYear.deptCode = res.data.defaultDept || ''
				datasSumYear.deptName = res.data.deptName || ''
				// 有获取到科室再获取表格数据
				getTableList()
			}
		}).catch(err => {
			setPageLoading(false)
		})
	}

	/**获取表格数据 */
	const getTableList = () => {
		setPageLoading(true)
		apiSpecialNurse.getTableDataYear(datasSumYear.postObj).then(res => {
			setPageLoading(false)
			setTableData(res.data.valueList || [])
		}).catch(err => {
			setPageLoading(false)
		})
	}

	/**导出表格 */
	const handlerExport = () => {
		apiSpecialNurse.exportSumYearTable(datasSumYear.postObj).then(res => {
			fileDownload(res);
		}).catch(err => {

		})
	}


	return (
		<Wrapper>
			<PageHeader>
				<PageTitle>{'护理工作质量/管理指标年度汇总'}</PageTitle>
				<Place />
				<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {

							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							datasSumYear.year = value
							// onload()
							getTableList()
							setYearPickShow(false)
						}}
						mode="year"
						style={{ width: 120 }}
						value={datasSumYear.year}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>

				<span>科室：</span>
				<Select
					labelInValue
					style={{ width: 180 }}
					value={{ key: datasSumYear.deptCode }}
					onChange={(val: any) => {
						datasSumYear.deptCode = val.key
						datasSumYear.deptName = val.label
						getTableList()
						// onload()
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
					onClick={handlerExport}
				>
					导出
				</Button>
			</PageHeader>
			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={pageLoading}
					dataSource={tableData}
					columns={columns.filter((item: any) => item)}
					surplusHeight={surplusHeight}
					surplusWidth={300}
					title={() => { return (<span>{datasSumYear.deptName}{datasSumYear.postObj.year}年护理工作质量/管理指标年度汇总</span>) }}
				/>
			</ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div`
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
`
const ScrollCon = styled.div`
  flex: 1;
`;