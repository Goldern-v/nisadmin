import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Modal, Select } from "antd"
import { DatePicker } from "src/vendors/antd"
import moment from "moment"
import { getCurrentMonth } from "src/utils/date/currentMonth"
import BaseTable from "src/components/BaseTable";
import { appStore, authStore } from "src/stores";
import { Obj } from "src/libs/types"
import { preJobListData } from './PreJobListData'
interface Props {
	visible: boolean
	handleOk: Function
	handleCancel: Function
	isMulti?: boolean
	// 可显示的搜索参数
	searchCodes?: string[]
  }
  const Option = Select.Option
export default observer(function AddNewNurseModal(props: Props) {
	const { visible, handleOk, handleCancel,} = props
	const [loading, setLoading] = useState(false)
	const [form, setForm]: any = useState({
		status: '1',
		time: getCurrentMonth()
	  })
	  const setFormItem = (item: {}) => {
		setForm({ ...form, ...item })
	  }
	  const [tableData, setTableData] = useState<Obj[]>([])
	  const [selected, setSelected] = useState<string[]>([])
	  const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 20
	  })
	  const [pages, setPages] = useState(1)
	  const columns: any = [
		{
		  title: '科室',
		  dataIndex: 'deptName',
		  align: 'left'
		},
		{
		  title: '工号',
		  dataIndex: 'empNo',
		  align: 'center',
		  width: 100
		},
		{
		  title: '姓名',
		  dataIndex: 'empName',
		  align: 'center',
		  width: 100,
		},
		{
		  title: '性别',
		  dataIndex: 'sex',
		  align: 'center',
		  width: 50,
		  render: (text: any, record: any, index: number)=>{
			return <span>{text=='1'?'男':'女'}</span>
		  }
		},
		{
		  title: '职称',
		  dataIndex: 'title',
		  align: 'center',
		  width: 80
		},
		{
		  title: '入院时间',
		  dataIndex: 'entryDate',
		  align: 'center'
		},
	  ]
	
	  const getData = async () => {
		const dateBegin = moment(form.time[0]).format('YYYY-MM-DD')
		const dateEnd = moment(form.time[1]).format('YYYY-MM-DD')
		const params = {
		  wardCode: form.wardCode,
		  name: form.name,
		  status: form.status,
		  patientId: form.patientId,
		  inpNo: form.inpNo,
		  bedLabel: form.bedLabel,
		  admissionDateBegin: form.status === '1' ? dateBegin : '',
		  admissionDateEnd: form.status === '1' ? dateEnd : '',
		  dischargeDateBegin: form.status === '2' ? dateBegin : '',
		  dischargeDateEnd: form.status === '2' ? dateEnd : '',
		  pageIndex: pagination.current,
		  pageNum: pagination.pageSize
		}
		params.wardCode === '全院' && delete params.wardCode
		
	  }
	
	  const handleChange = async (keys: any[]) => {
		
		preJobListData.selectedKey = keys
	  }
	
	  const handleOk2 = async () => {
		preJobListData.batchModal = true
	  }
	  /**是否搜索添加 */
	  const isSearchCondition = (text: string) => {
	  }
	
	  useEffect(() => {
		getData()
	  }, [form, pagination])

	  useEffect(() => {
		if (visible)
		  setSelected([])
	  }, [visible])
	return (
		<Modal
		title={`添新员工`}
		centered
		width={1100}
		visible={visible}
		onCancel={() => handleCancel()}
		footer={
			<div style={{ textAlign: "center" }}>
			<Button onClick={() => handleCancel()}>
				取消
			</Button>
			{/*  */}
			<Button type='primary' disabled={!preJobListData.selectedKey.length} onClick={handleOk2}>
				确定
			</Button>
			</div>
		}
		>
		<Wrapper>
			<TableWrapper> 
			<BaseTable
				loading={preJobListData.tableModalLoading}
				columns={columns}
				dataSource={preJobListData.tableModalList}
				surplusHeight={300}
				wrapperStyle={{ padding: 0 }}
				rowKey="empNo"
				rowSelection={{
				type: 'checkbox',
				selectedRowKeys: preJobListData.selectedKey,
				onChange: handleChange
				}}
				pagination={false}
				
			/>
			</TableWrapper>
			<SearchWrapper>
			<div className='label'>来院时间:</div>
				<DatePicker.RangePicker
				className='item'
				value={[moment(preJobListData.startDate),moment(preJobListData.endDate)]}
				onChange={(dates) => {
					preJobListData.startDate = dates[0]
					preJobListData.endDate = dates[1]
					preJobListData.getNurseList()
				}} format={'YYYY-MM-DD'} />

				<div className='label'>科室:</div>
				<div className='item'>
				<Select
					style={{ width: '100%' }}
					value={preJobListData.modalDept}
					onChange={(val: string) => {
						preJobListData.modalDept = val
						preJobListData.getNurseList()
						// preJobListData.getTableList()
					}}
					>
						<Option value="">全院</Option>
					{preJobListData.deptList.map((item:any,index:number)=>{
						return <Option value={item.code} key={index}>{item.name}</Option>
					})}
					</Select>
				</div>
			
				<div className='label'>职称:</div>
				<div className='item'>
					<Select
					style={{ width: '100%' }}
					value={preJobListData.workName}
					onChange={(val: string) => {
						preJobListData.workName = val
						preJobListData.getNurseList()
					}}
					>
						<Option value="">全部</Option>
					{preJobListData.workNameList.map((item:string,index:number)=>{
						return <Option value={item} key={index}>{item}</Option>
					})}
					</Select>
					</div>
			<div className='label'>护士信息:</div>
				<Input className='item' placeholder='请输入姓名关键字'
				onBlur={(e: any) =>{
					preJobListData.nurseInfo = e.target.value
					preJobListData.getNurseList()
				}}
				 />

				
			
			<Button type='primary' className='item' onClick={() => preJobListData.getNurseList()}>查询</Button>
			</SearchWrapper>
		</Wrapper>
    </Modal>
	)
})
const Wrapper = styled.div`
              height: 500px;
              display: flex;
              `

const TableWrapper = styled.div`
              width: 80%;
              height: 100%;
              `
const SearchWrapper = styled.div`
              width: 20%;
              padding-left: 10px;

              .label{
              height: 32px;
              line-height: 32px;
              font-size: 14px;
              }
              .item{
              width: 100%;
              margin-bottom: 25px;
              }
              `