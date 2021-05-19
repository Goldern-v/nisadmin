import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { PageHeader, Place } from "src/components/common"
import { DatePicker, Input, PaginationConfig, Select } from "src/vendors/antd"
import { globalModal } from "src/global/globalModal"
import { Button, message } from "antd"
import styled from "styled-components"
import DeptSelect from "src/components/DeptSelect"
import BaseTable from "src/components/BaseTable"
import EditModal from './components/editModal'
import { SearchForm, iModalForm } from './modal'
import config from './config'
import api from './api'

export default observer(() => {
  const [pageLoading, setPageLoading] = useState(false)
  const [form, setForm] = useState(new SearchForm())
  const setFormItem = (item: {}) => {
    setForm({ ...form, ...item })
  }
  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState(0)
  const [modalId, setModalId] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const columns = config.creatColumns((type: string, item: iModalForm) => {
    switch (type) {
      case 'edit':
        setModalId(item.id || '')
        setModalVisible(true)
        break
      case 'delete':
        globalModal.confirm("确认删除", "确认删除该套餐？").then(async res => {
          await api.deleteItem(item.id || '')
          message.success(`删除成功`)
          await getData()
        });
        break
    }
  })

  const getData = async () => {
    if (!form.deptCode) return

    setPageLoading(true)
    const { data } = await api.getList(form)
    setPageLoading(false)

    setTotal(data.totalCount)
    setTableData(data.list)
  }

  const handleCreate = () => {
    setModalId('')
    setModalVisible(true)
  }

  const handleModalUpdate = async () => {
    setModalVisible(false)
    await getData()
  }

  const exportData = () => {
  }

  useEffect(() => {
    const promise = getData()
  }, [form])

  return (
    <Wrapper>
      {/* 搜索栏 */}
      <PageHeader>
        <Place/>
        <span className="label">姓名</span>
        <Input
          value={form.empName}
          style={{ width: 120 }}
          onChange={e => setFormItem({ empName: e.target.value })}
        />
        <span className="label">科室</span>
        <DeptSelect hasAllDept onChange={deptCode => setFormItem({ 'deptCode': deptCode })}/>
        <span className="label">分娩日期</span>
        <DatePicker.RangePicker
          value={form.date}
          onChange={(dates) => setFormItem({ 'date': dates })}/>
        <span className="label">申请状态</span>
        <Select value={form.status} onChange={(value: string) => setFormItem({ 'status': value })}>
          {config.statusOption.map((item, index) => (
            <Select.Option value={item.value} key={index}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
        <span className="label">分娩方式</span>
        <Select value={form.deliveryMode} onChange={(value: string) => setFormItem({ 'deliveryMode': value })}>
          <Select.Option value={''}>全部</Select.Option>
          {config.typeOption.map((item, index) => (
            <Select.Option value={item.value} key={index}>
              {item.label}
            </Select.Option>
          ))}
        </Select>

        <Button onClick={() => getData()}>查询</Button>
        {/*<Button onClick={() => exportData()}>导出</Button>*/}
        <Button type="primary" onClick={handleCreate}>新增</Button>
      </PageHeader>
      {/* 表格 */}
      <BaseTable
        loading={pageLoading}
        dataSource={tableData}
        columns={columns}
        type={["index"]}
        surplusHeight={200}
        pagination={{
          current: form.pageIndex,
          pageSize: form.pageSize,
          total: total
        }}
        onChange={(pagination: PaginationConfig) => {
          setFormItem({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize
          })
        }}
      />
      {/* 新增修改弹窗 */}
      {
        modalVisible && <EditModal
          modalId={modalId}
          visible={modalVisible}
          onOk={handleModalUpdate}
          onCancel={() => setModalVisible(false)}
        />
      }

    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding: 0 15px;
  .input-cell {
    padding: 0 !important;
    input {
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      &:focus {
        background: ${p => p.theme.$mlc};
      }
    }
  }
`;