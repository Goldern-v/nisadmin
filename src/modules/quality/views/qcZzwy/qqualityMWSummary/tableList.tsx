import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import {
	ColumnProps,
	Select,
	DatePicker,
	Button,
  Popconfirm
} from "src/vendors/antd";
import moment from 'moment';
import BaseTable, { DoCon } from "src/components/BaseTable";
import { tableListData } from './tableListData';
import { quarterAndYear1 } from 'src/enums/date';
import TableAddModal from "./model/tableAdd"
import { api } from './api';
import { appStore } from 'src/stores'
import { message } from 'antd';

const Option = Select.Option;
// const { RangePicker } = DatePicker
export default observer(function TableList() {
	const [yearPickShow, setYearPickShow] = useState(false);
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
			dataIndex: "reportName",
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
			dataIndex: "reportQuarter",
			align: "center",
			width: 100,

		},
		{
			title: "创建人",
			dataIndex: "creatorName",
			align: "center",
			width: 100,

		},
		{
			title: "创建时间",
			dataIndex: "createTime",
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
              onClick={() => {
                onDoubleClick(row, '查看');
              }}
            >
              查看
            </span>
            <span
              onClick={() => {
                onDoubleClick(row, '编辑');
              }}
            >
              编辑
            </span>
            <Popconfirm title="确定要删除吗?" onConfirm={(event:any) => {event.stopPropagation(); onDoubleClick(row, '删除');}}>
              <a onClick={(event) => event.stopPropagation()}>删除</a>
            </Popconfirm>
          </DoCon>
        );
      },
    },
	]
  const onDoubleClick = async (row: any, status: string) => {
    if (status === '删除') {
      let res = await api.deleteQcReport({reportId: row.id})
      if (res.code === '200') message.success('删除成功')
      else message.error(res.desc || '删除失败')
      tableListData.getTableList()
      return 
    }

    let { data } = await api.getQcReport(row.id)
    if (status === '查看') {
      localStorage.setItem('detail_check', '0')
      appStore.history.push('/qqualityMWSummaryDetail')

    } else if(status === '编辑') {
      localStorage.setItem('detail_check', '1')
      appStore.history.push('/qqualityMWSummaryDetail')
    }
    localStorage.setItem('qqualityMWSummaryDetail', data && JSON.stringify(data))
  }

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
        <Button onClick={() => tableListData.getTableList() }>查询</Button>
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
  .mr-15:last-of-type{
    margin-right: 0;
  }
  
`
const ScrollCon = styled.div`
  flex: 1;
`;