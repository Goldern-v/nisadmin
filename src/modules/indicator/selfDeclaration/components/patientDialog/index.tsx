import styled from "styled-components"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Input, Modal, Select } from "antd"
import DeptSelect from "src/components/DeptSelect"
import { DatePicker } from "src/vendors/antd"
import moment from "moment"
import { getCurrentMonth } from "src/utils/date/currentMonth"
import api from "./api"
import BaseTable from "src/components/BaseTable";
import { authStore } from "src/stores";
import { Obj } from "src/libs/types"


interface Props {
  visible: boolean
  onOk: Function
  onCancel: Function
  isMulti?: boolean
}

export default observer((props: Props) => {
  const { visible, onOk, onCancel, isMulti = false } = props
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
      title: '护理单元',
      dataIndex: 'wardName',
      align: 'left'
    },
    {
      title: '床号',
      dataIndex: 'bedLabel',
      align: 'center',
      width: 60
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 70,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      width: 50
    },
    {
      title: '住院号',
      dataIndex: 'inpNo',
      align: 'center',
      width: 110
    },
    {
      title: '病人ID',
      dataIndex: 'patientId',
      align: 'center',
      width: 110
    },
    {
      title: '次数',
      dataIndex: 'visitId',
      align: 'center',
      width: 50
    },
    {
      title: '入院日期',
      dataIndex: 'admissionDate',
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
    setLoading(true)
    const { data } = await api.getPatientList(params)
    setLoading(false)
    setTableData(data.list)
    setPages(data.page)
    setSelected([])
  }

  const handleChange = async (keys: any[]) => {
    console.log('test-', keys)
    if (!isMulti) {
      if (keys.length > 1) {
        setSelected([keys[keys.length - 1]])
        return
      }
    }
    setSelected(keys)
  }

  const handleOk = async () => {
    const arr = selected.map(v => tableData.find((v1: Obj) => v1.patientId === v))
    // const { data } = await api.getPatientItem(selected.patientId, selected.visitId)
    // const obj = {
    //   patientId: data.patientId,
    //   patientName: data.name,
    //   wardCode: data.wardCode,
    //   wardName: data.wardName,
    //   inpNo: data.inpNo,
    //   visitId: data.visitId,
    //   bedLabel: data.bedLabel,
    //   admissionDate: moment(data.admissionDate),
    //   sex: data.sex,
    //   birthday: data.birthday
    // }
    onOk(arr)
  }

  useEffect(() => {
    getData()
  }, [form, pagination])
  useLayoutEffect(() => {
    if (visible)
      setSelected([])
  }, [visible])

  return (
    <Modal
      title={`选择患者`}
      centered
      width={1100}
      visible={visible}
      onCancel={() => onCancel()}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => onCancel()}>
            取消
          </Button>
          <Button type='primary' disabled={!selected.length} onClick={handleOk}>
            确定
          </Button>
        </div>
      }
    >
      <Wrapper>
        <TableWrapper>
          <BaseTable
            loading={loading}
            columns={columns}
            dataSource={tableData}
            surplusHeight={200}
            wrapperStyle={{ padding: 0 }}
            rowKey="patientId"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selected,
              onChange: handleChange
            }}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: (pages * pagination.pageSize),
              showTotal: () => `共 ${pages || 1} 页`
            }}
            onChange={(page: any) => {
              setPagination({
                current: page.current,
                pageSize: page.pageSize
              })
            }}
          />
        </TableWrapper>
        <SearchWrapper>
          <div className='label'>护理单元:</div>
          <div className='item'>
            <DeptSelect hasAllDept deptCode={authStore.defaultDeptCode} style={{ width: '100%' }}
              onChange={deptCode => setFormItem({ 'wardCode': deptCode })} />
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
            onChange={(dates) => setFormItem({ 'time': dates })} />
          <div className='label'>病人信息:</div>
          <Input value={form.name} className='item' placeholder='姓名'
            onChange={(event => setFormItem({ 'name': event.target.value }))} />
          <Input value={form.patientId} className='item' placeholder='病人ID'
            onChange={(event => setFormItem({ 'patientId': event.target.value }))} />
          <Input value={form.inpNo} className='item' placeholder='住院号'
            onChange={(event => setFormItem({ 'inpNo': event.target.value }))} />
          <Input value={form.bedLabel} className='item' placeholder='床号'
            onChange={(event => setFormItem({ 'bedLabel': event.target.value }))} />

          <Button type='primary' className='item' onClick={() => getData()}>查询</Button>
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
              margin-bottom: 10px;
              }
              `