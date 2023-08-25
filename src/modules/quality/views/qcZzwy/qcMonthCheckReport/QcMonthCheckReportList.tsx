import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import {
	Input,
	Select,
	DatePicker,
	Button,
} from "src/vendors/antd";
import moment from 'moment';
import BaseTable, {DoCon} from 'src/components/BaseTable'
import YearMonthRangePicker from 'src/components/YearMonthRangePicker';
import { qcMonthCheckData } from './qcMonthCheckData';
import CreateMonthCheckReport from './CreateMonthCheckReport';
import { appStore } from 'src/stores';
import qs from 'qs';
const Option = Select.Option;


export default observer(function QcMonthCheckReportList() {
  const [mode, setMode] = useState(['month', 'month']);

  const columns: any = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 40,
      render: (text: any, record: any, index: number) => index + 1
  },
		{
			title: "报告名称",
			dataIndex: "masterQcName",
			align: "center",
			width: 220,
			
		},
		{
			title: "科室",
			dataIndex: "firstLevelItemName",
			align: "center",
			width: 100,
     
		},
		{
			title: "报告年份",
			dataIndex: "firstLevelEvalRate",
			align: "center",
			width: 80,
     
		},
    {
			title: "报告月份",
			dataIndex: "firstLevelEvalRate2",
			align: "center",
			width: 80,
     
		},
    {
			title: "创建人",
			dataIndex: "firstLevelEvalRate3",
			align: "center",
			width: 80,
     
		},
    {
			title: "创建时间",
			dataIndex: "firstLevelEvalRate4",
			align: "center",
			width: 80,
     
		},
    {
      title: "操作",
      dataIndex: "cz",
      align: "center",
      width: 120,
      render: (value: any, record: any, index: number) => {
          return (<DoCon>
            <span onClick={() => { turnToDetail(record) }}>查看</span>
            <span onClick={() => console.log('111')}>编辑</span>
            <span onClick={() => console.log('111')}>删除</span>
            {/* <span key={row.id} onClick={() => handleSign(row, 'signName')}>{value || '签名'}</span> */}
        </DoCon>)
      }

  },
  ]
		
  const turnToDetail = (record: any) => {
		// ?${qs.stringify(record)}
		const { id, batch } = record
		qcMonthCheckData.currentItem = record
		// trainExamData.passScore = record.passScore || 60
		appStore.history.push(`/qcMonthCheckReportDetail?${qs.stringify({ id, batch, year: moment().format('YYYY') })}`)
	}

  const handleOk = () => {
		qcMonthCheckData.addConfirmVisible = false
	}
	const handleCancel = () => {
		qcMonthCheckData.addConfirmVisible = false

	}
		
  return (
    <Wrapper>
      <PageHeader>
				<PageTitle>{'月度质控检查总结报告'}</PageTitle>
				<Place />
        <span>科室：</span>
				<Select className="mr-15"
					labelInValue
					style={{ width: 180 }}
					value={{ key: qcMonthCheckData.deptCode }}
					onChange={(val: any) => {
						qcMonthCheckData.deptCode = val.key
						qcMonthCheckData.deptName = val.label
						// qcMonthCheckData.getTableList()
					}}
				>
					<Option value='全院'>全院</Option>
					{qcMonthCheckData.deptList.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>
       
        
        <><span>日期：</span>
        <YearMonthRangePicker className='mr-15' widthPx={180} value={qcMonthCheckData.monthRange} onChange={(val:any)=>{
					qcMonthCheckData.monthRange = val
					// qcMonthCheckData.getTableList()
        }} /></>
				<Button
					className="span"
					onClick={() => qcMonthCheckData.getTableList()}
				>
					查询
				</Button>
        <Button
					className="span" type='primary'
					onClick={() => qcMonthCheckData.addConfirmVisible=true}
				>
					创建
				</Button>
			</PageHeader>
      <ScrollCon>
				<BaseTable
					className="record-page-table"
					loading={qcMonthCheckData.tableLoading}
					dataSource={qcMonthCheckData.tableList}
					columns={columns.filter((item: any) => item)}
					surplusWidth={300}
					surplusHeight={200}
				// 	pagination={{
				//     current: qcMonthCheckData.pageIndex,
				//     total: qcMonthCheckData.total,
				//     pageSize: qcMonthCheckData.pageSize,
				// }}
				// onChange={(pagination:any) => {
				// 	qcMonthCheckData.pageIndex = pagination.current;
				// 	qcMonthCheckData.total = pagination.total;
				// 	qcMonthCheckData.pageSize = pagination.pageSize;
				// }}
				/>
			</ScrollCon>
      <CreateMonthCheckReport visible={qcMonthCheckData.addConfirmVisible} handleOk={handleOk} handleCancel={handleCancel} />

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