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
import BaseTable, { DoCon } from "src/components/BaseTable";
import { tableListData } from './tableListData';
import { quarterAndYear1 } from 'src/enums/date';

import TableAddModal from "./model/tableAdd"

const Option = Select.Option;
// const { RangePicker } = DatePicker
export default observer(function TableList() {
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
      key: 'idx',
      dataIndex: 'idx',
      title: '序号',
      width: 60,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
			title: "报告名称",
			dataIndex: "qcName",
			align: "center",
			width: 220,
		},
		{
			title: "科室",
			dataIndex: "wardName",
			align: "center",
			width: 160,
			// render: (value: any, row: any, index: number) => {
			// 	const obj = {
			// 		children: value,
			// 		props: {},
			// 	} as any;
			// 	obj.props.rowSpan = mergeCells(row.wardName, tableListData.tableList, 'wardName', index)
			// 	return obj
			// }
		},
		{
			title: "季度",
			dataIndex: "totalScore",
			align: "center",
			width: 100,

		},
		{
			title: "创建人",
			dataIndex: "realScore",
			align: "center",
			width: 100,

		},
		{
			title: "创建时间",
			dataIndex: "realGetScore",
			align: "center",
			width: 160,
		},
    {
      title: "操作",
      dataIndex: "",
      width: 80,
      align: "center",
      render: (text: any, row: any, index: any) => {
        return (
          <DoCon>
            <span
              // onClick={() => {
              //   onDoubleClick(row);
              // }}
            >
              查看
            </span>
            <span
              // onClick={() => {
              //   onDoubleClick(row);
              // }}
            >
              编辑
            </span>
            <span
              // onClick={() => {
              //   onDoubleClick(row);
              // }}
            >
              删除
            </span>
          </DoCon>
        );
      },
    },
	]

	useEffect(() => {
		tableListData.getTableList()
		tableListData.getNursingAll()
	}, [])
	
  return (
    <Wrapper>
      <PageHeader>
				<PageTitle>{'季度质量管理工作总结'}</PageTitle>
				<Place />
        <span>科室：</span>
				<Select className="mr-15"
					labelInValue
					style={{ width: 180 }}
					value={{ key: tableListData.deptCode }}
					onChange={(val: any) => {
						tableListData.deptCode = val.key
						tableListData.deptName = val.label
						tableListData.getTableList()
					}}
				>
					<Option value='全院'>全院</Option>
					{tableListData.deptList.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>

        <span>年份：</span>
        <DatePicker className="mr-15"
          open={yearPickShow}
          onOpenChange={status => {
            setYearPickShow(status)
          }}
          onPanelChange={(value, mode) => {
            tableListData.year = value
            tableListData.getTableList()
            setYearPickShow(false)
          }}
          mode="year"
          style={{ width: 120 }}
          value={tableListData.year}
          allowClear={true}
          placeholder='选择年份'
          format="YYYY"
        />

				<span>季度：</span>
				<Select className="mr-15"
					style={{ width: 100 }}
          defaultValue={moment().quarter()}
					onChange={(val: any) => {
						tableListData.selectQuarter = val
            tableListData.getTableList()
					}}
				>
          <Option value='全部'>全部</Option>
					{
            quarterAndYear1.map((v: any, i: number) => (
              <Option key={i} value={i}>{v}</Option>
            ))
          }
				</Select>
				<Button onClick={() => tableListData.tableAddVisible = true }>创建</Button>
			</PageHeader>

			<ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={tableListData.tableLoading}
					dataSource={tableListData.tableList}
					columns={columns.filter((item: any) => item)}
					surplusWidth={300}
					surplusHeight={220}
					pagination={{
				    current: tableListData.pageIndex,
				    total: tableListData.total,
				    pageSize: tableListData.pageSize,
				}}
				onChange={(pagination:any) => {
					tableListData.pageIndex = pagination.current;
					tableListData.total = pagination.total;
					tableListData.pageSize = pagination.pageSize;
				}}
				/>
			</ScrollCon>
      <TableAddModal />
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