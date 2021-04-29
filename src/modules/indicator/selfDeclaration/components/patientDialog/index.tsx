import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Input, Modal, Select, Steps, Table } from "antd"
import DeptSelect from "src/components/DeptSelect"
import { DatePicker } from "src/vendors/antd"
import moment from "moment"
import { getCurrentMonth } from "src/utils/date/currentMonth"
import api from "./api"


interface Props {
  visible: boolean
  onOk: Function
  onCancel: Function
}

export default observer((props: Props) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm]: any = useState({
    status: '1',
    time: getCurrentMonth()
  })
  const setFormItem = (item: {}) => {
    setForm({ ...form, ...item })
  }
  const [tableData, setTableData] = useState([])
  const [selected, setSelected]: any = useState({})

  const { visible, onOk, onCancel } = props

  const columns = [
    {
      title: '护理单元',
      dataIndex: 'wardName'
    },
    {
      title: '床号',
      dataIndex: 'bedLabel'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex'
    },
    {
      title: '住院号',
      dataIndex: 'patientId'
    },
  ]

  const getData = async () => {
    const dateBegin = moment(form.time[0]).format('YYYY-MM-DD')
    const dateEnd = moment(form.time[1]).format('YYYY-MM-DD')
    const params = {
      wardCode: form.wardCode,
      name: form.name,
      status: form.status,
      admissionDateBegin: form.status === '1' ? dateBegin : '',
      admissionDateEnd: form.status === '1' ? dateEnd : '',
      dischargeDateBegin: form.status === '2' ? dateBegin : '',
      dischargeDateEnd: form.status === '2' ? dateEnd : '',
      pageIndex: 1,
      pageNum: 20
    }
    params.wardCode === '全院' && delete params.wardCode
    setLoading(true)
    const { data } = await api.getPatientList(params)
    setLoading(false)
    setTableData(data.list)
  }

  const tableSelected = async (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    const [item] = selectedRows
    const { data } = await api.getPatientItem(item.patientId, item.visitId)
    const obj = {
      patientId: data.patientId,
      patientName: data.name,
      wardCode: data.wardCode,
      wardName: data.wardName,
      inpNo: data.inpNo,
      visitId: data.visitId,
      bedLabel: data.bedLabel,
      admissionDate: moment(data.admissionDate),
      sex: data.sex,
      birthday: data.birthday
    }
    setSelected(obj)
  }

  useEffect(() => {
    const promise = getData()
  }, [form])

  return (
    <Modal
      title={`选择患者`}
      centered
      width={1500}
      visible={visible}
      onCancel={() => onCancel()}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => onCancel()}>
            取消
          </Button>
          <Button disabled={!selected.patientId} onClick={() => onOk(selected)}>
            确定
          </Button>
        </div>
      }
    >
      <Wrapper>
        <TableWrapper>
          <Table
            loading={loading}
            columns={columns}
            dataSource={tableData}
            rowKey="patientId"
            rowSelection={{
              type: 'radio',
              onChange: tableSelected
            }}
          />
        </TableWrapper>
        <SearchWrapper>
          <div className='label'>护理单元:</div>
          <div className='item'>
            <DeptSelect hasAllDept style={{ width: '100%' }} onChange={deptCode => setFormItem({ 'wardCode': deptCode })}/>
          </div>
          <div className='label'>出入院:</div>
          <Select value={form.status} className='item'
                  onChange={(val: string) => setFormItem({ 'status': val })}>
            <Select.Option value="1">在院</Select.Option>
            <Select.Option value="2">出院</Select.Option>
          </Select>
          <div className='label'>时间:</div>
          <DatePicker.RangePicker
            className='item'
            value={form.time}
            onChange={(dates) => setFormItem({ 'time': dates })}/>
          <div className='label'>病人信息:</div>
          <Input value={form.name} className='item' placeholder='姓名'
                 onChange={(event => setFormItem({ 'name': event.target.value }))}/>
          <Input value={form.patientId} className='item' placeholder='病人ID'
                 onChange={(event => setFormItem({ 'patientId': event.target.value }))}/>
          <Input value={form.inpNo} className='item' placeholder='住院号'
                 onChange={(event => setFormItem({ 'inpNo': event.target.value }))}/>
          <Input value={form.bedLabel} className='item' placeholder='床号'
                 onChange={(event => setFormItem({ 'bedLabel': event.target.value }))}/>

          <Button type='primary' size='large' className='item' onClick={() => getData()}>查询</Button>
        </SearchWrapper>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
  min-height: 600px;
  display: flex;
`

const TableWrapper = styled.div`
  height: 100%;
  width: 80%;
  border: 1px solid #aaa;
  min-height: 600px;
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
    margin-bottom: 10px;
  }
`