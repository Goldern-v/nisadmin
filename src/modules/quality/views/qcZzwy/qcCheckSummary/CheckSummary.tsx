import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import moment from 'moment';
import BaseTable from "src/components/BaseTable";
import { checkSummaryData } from './checkSummaryData';
import { quarterList,quarterTimes } from 'src/enums/date';
import YearMonthRangePicker from 'src/components/YearMonthRangePicker';
const Option = Select.Option;
// const { RangePicker } = DatePicker
export default observer(function CheckSummary() {
	const [yearPickShow, setYearPickShow] = useState(false);
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
  const columns: any = [
		{
			title: "科室",
			dataIndex: "wardName",
			align: "center",
			width: 160,
			render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.wardName, checkSummaryData.tableList, 'wardName', index)
				return obj
			}
		},
		{
			title: "项目标准",
			dataIndex: "qcName",
			align: "center",
			width: 220,
		},
		{
			title: "总分值",
			dataIndex: "totalScore",
			align: "center",
			width: 80,

		},
		{
			title: "实际分值",
			dataIndex: "realScore",
			align: "center",
			width: 80,

		},
		{
			title: "实际得分",
			dataIndex: "realGetScore",
			align: "center",
			width: 80,

		},
		{
			title: "合格率",
			dataIndex: "passRate",
			align: "center",
			width: 100,
			// render(text: any, record: any, index: number) {
			// 	if (text > 0 && text < 1) {
			// 		return (text * 100).toFixed(2) + '%'
			// 	} else if (text === 1) {
			// 		return '100%'
			// 	}
			// 	return ''
			// },
		},
	]

	useEffect(() => {
		checkSummaryData.getTableList()
		checkSummaryData.getNursingAll()
	}, [])
	
  return (
    <Wrapper>
      <PageHeader>
				<PageTitle>{'护理部质量检查汇总表'}</PageTitle>
				<Place />
        <span>科室：</span>
				<Select className="mr-15"
					labelInValue
					style={{ width: 180 }}
					value={{ key: checkSummaryData.deptCode }}
					onChange={(val: any) => {
						checkSummaryData.deptCode = val.key
						checkSummaryData.deptName = val.label
						checkSummaryData.getTableList()
					}}
				>
					<Option value='全院'>全院</Option>
					{checkSummaryData.deptList.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>
        <span>类型：</span>
				<Select className="mr-15"
					style={{ width: 100 }}
					value={checkSummaryData.selectType}
					onChange={(val: any) => {
						checkSummaryData.selectType = val
						checkSummaryData.getTableList()
					}}
				>
					{checkSummaryData.typeList.map((item: any) => {
						return <Option value={item.type} key={item.type}>{item.title}</Option>
					})}
				</Select>
        
        {checkSummaryData.selectType=='4'&&<><span>日期：</span>
        <DatePicker.RangePicker
        allowClear={false}
				format={'YYYY-MM-DD'}
				value={checkSummaryData.filterDate}
        onChange={(value) => {
					checkSummaryData.filterDate = value 
					checkSummaryData.getTableList()
        }}
        style={{ width: 220 }}
      /></>}
      {checkSummaryData.selectType=='1' && <>
        <span>月份：</span>
        <YearMonthRangePicker widthPx={180} value={checkSummaryData.monthRange} onChange={(val:any)=>{
					checkSummaryData.monthRange = val
					checkSummaryData.getTableList()
        }} />
      </>}
				{(checkSummaryData.selectType=='3'||checkSummaryData.selectType=='2')&&<>
					<span>年份：</span>
					<DatePicker className="mr-15"
						open={yearPickShow}
						onOpenChange={status => {
							setYearPickShow(status)
						}}
						onPanelChange={(value, mode) => {
							checkSummaryData.year = value
							setYearPickShow(false)
							checkSummaryData.getTableList()
						}}
						mode="year"
						style={{ width: 120 }}
						value={checkSummaryData.year}
						allowClear={true}
						placeholder='选择年份'
						format="YYYY"
					/>
				</>}
        {checkSummaryData.selectType=='2' && <>
					<span>季度：</span>
					<Select className="mr-15"
					style={{ width: 100 }}
          defaultValue={moment().quarter()}
					onChange={(val: any) => {
						checkSummaryData.selectQuarter = val
						checkSummaryData.getTableList()
            	}}
				>
					{
          
          quarterList.map((v: any, i: number) => (
            <Option key={i} value={i + 1}>{v}</Option>
          ))
          }
				</Select>
				</>}

				<Button
					className="span" type='primary'
					onClick={() => checkSummaryData.getTableList()}
				>
					查询
				</Button>
			</PageHeader>
			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={checkSummaryData.tableLoading}
					dataSource={checkSummaryData.tableList}
					columns={columns.filter((item: any) => item)}
					surplusWidth={300}
					surplusHeight={200}
				// 	pagination={{
				//     current: checkSummaryData.pageIndex,
				//     total: checkSummaryData.total,
				//     pageSize: checkSummaryData.pageSize,
				// }}
				// onChange={(pagination:any) => {
				// 	checkSummaryData.pageIndex = pagination.current;
				// 	checkSummaryData.total = pagination.total;
				// 	checkSummaryData.pageSize = pagination.pageSize;
				// }}
				/>
			</ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  .mr-15{
    margin-right: 15px;
  }
`
const ScrollCon = styled.div`
  flex: 1;
`;