import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { globalModal } from 'src/global/globalModal'
import {
	Modal,
	Select,
	DatePicker,
	message,
	Button,
} from "src/vendors/antd";
import moment from 'moment';
import BaseTable, {DoCon} from 'src/components/BaseTable'
import YearMonthRangePicker from 'src/components/YearMonthRangePicker';
import { qcMonthCheckData } from './qcMonthCheckData';
import CreateMonthCheckReport from './CreateMonthCheckReport';
import { appStore } from 'src/stores';
import qs from 'qs';
import {qcYtllApi}  from '../qcYtllApi'

const Option = Select.Option;


export default observer(function QcMonthCheckReportList() {
  const [mode, setMode] = useState(['month', 'month']);
  const exatOne = appStore.queryObj.qcLevel != "1"
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
			dataIndex: "reportName",
			align: "center",
			width: 220,
			
		},
		...[!exatOne ? {
			title: "科室",
			dataIndex: "wardName",
			align: "center",
			width: 100,
		} : {}],
		{
			title: "质控表单",
			dataIndex: "summaryFormName",
			align: "center",
			width: 100,
		},
		{
			title: "报告年份",
			dataIndex: "reportYear",
			align: "center",
			width: 80,
     
		},
    {
			title: "报告月份",
			dataIndex: "reportMonth",
			align: "center",
			width: 80,
     
		},
    {
			title: "创建人",
			dataIndex: "creatorName",
			align: "center",
			width: 80,
     
		},
    {
			title: "创建时间",
			dataIndex: "createTime",
			align: "center",
			width: 160,
     
		},
    {
      title: "操作",
      dataIndex: "cz",
      align: "center",
      width: 120,
      render: (value: any, record: any, index: number) => {
          return (<DoCon>
            <span onClick={() => { turnToDetail(record) }}>查看</span>
            {is_creator(record) && <span onClick={() => {openModal('编辑',record)}}>编辑</span>}
            {is_creator(record) && <span style={{color:"red"}} onClick={() => {deleteItem(record,index)}}>删除</span>}
        </DoCon>)
      }

  },
  ]
		
	/**查看 */
  const turnToDetail = (record: any) => {
		// ?${qs.stringify(record)}
		const { id, batch } = record
		qcMonthCheckData.currentItem = record

		// trainExamData.passScore = record.passScore || 60 
		appStore.history.push(`/qcMonthCheckReportDetail?${qs.stringify({ id,qcLevel:appStore.queryObj?.qcLevel })}`)
	}

	const is_creator = (row:any)=>{
		return JSON.parse(sessionStorage.getItem('user') || "")?.empName === row.creatorName
	}

	/**删除 */
	const deleteItem = (record: any,index:number)=>{
		globalModal.confirm('删除确定', '你确定要删除该记录吗?').then((res) => {
			qcYtllApi.deleteQcReport({reportId:record.id}).then((res) => {
				// getTableData()
				message.success('删除成功！')
				qcMonthCheckData.tableList.splice(index,1)
			})
		}).catch(err=>{
			console.log(err)
		})
		
		// })
	}

	const openModal = (title:string,record?:any)=>{
		qcMonthCheckData.currentItem = record || {}
		qcMonthCheckData.modalTitle = title
		qcMonthCheckData.addConfirmVisible=true
	}

  const handleOk = () => {
		if(qcMonthCheckData.currentItem.id){
			// 有id,就保存数据
			qcYtllApi.updateQcReport({
				id:qcMonthCheckData.currentItem.id,
				reportName:qcMonthCheckData.createModalData.name
			}).then(res=>{
				qcMonthCheckData.getTableList()
				message.success('修改成功')
				qcMonthCheckData.addConfirmVisible = false
				qcMonthCheckData.currentItem = qcMonthCheckData.currentItemSource
			}).catch(err=>{

			})
		}else{

		// 新建数据
		appStore.history.push(`/qcMonthCheckReportDetail?${qs.stringify({qcLevel:appStore.queryObj?.qcLevel,...qcMonthCheckData.createModalData })}`)
		qcMonthCheckData.addConfirmVisible = false
	}
		
	}
	const handleCancel = () => {
		qcMonthCheckData.addConfirmVisible = false

	}
	
	useEffect(() => {
		qcMonthCheckData.getTableList()
		qcMonthCheckData.getNursingAll()
	}, [])
	
		
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
						qcMonthCheckData.getTableList()
					}}
				>
					<Option value="">全院</Option>
					{!exatOne && qcMonthCheckData.deptList.map((item: any) => {
						return <Option value={item.code} key={item.code}>{item.name}</Option>
					})}
				</Select>
       
        
        <><span>日期：</span>
        <YearMonthRangePicker className='mr-15' widthPx={180} value={qcMonthCheckData.monthRange} onChange={(val:any)=>{
					qcMonthCheckData.monthRange = val
					qcMonthCheckData.getTableList()
        }} /></>
				<Button
					className="span"
					onClick={() => qcMonthCheckData.getTableList()}
				>
					查询
				</Button>
        <Button
					className="span" type='primary'
					onClick={() => openModal('新建',qcMonthCheckData.currentItemSource)}
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