import styled from 'styled-components'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Modal, Button, Select, message } from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable"
import { ColumnProps } from 'antd/lib/table'

import createModal, { ModalComponentProps } from 'src/libs/createModal'
import RefresherAuditModal from './RefresherAuditModal'

import { nursingEduFilesApi } from '../api/NursingEduFilesApi'

const Option = Select.Option

export interface Props extends ModalComponentProps {
  closeCallback?: Function
}

export default function RefresherCheckModal(props: Props) {
  const { visible, onCancel, closeCallback } = props
  const [query, setQuery] = useState({
    status: '',
    pageIndex: 1,
    pageSize: 20,
  })

  const [tableData, setTableData] = useState([] as any[])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([] as any[])

  const traineeAuditModal = createModal(RefresherAuditModal)

  useLayoutEffect(() => {
    if (visible) {
      setSelectedRows([])

      setQuery({
        status: '',
        pageIndex: 1,
        pageSize: 20,
      })
    }
  }, [visible])

  useEffect(() => {
    getTableData()
  }, [query])

  const getTableData = () => {
    setLoading(true)
    nursingEduFilesApi
      .queryToAuditPageList(query)
      .then((res) => {
        if (res.data) {
          setLoading(false)
          setSelectedRows([])
          setTableData(res.data.list)
          setTotal(res.data.totalCount)
        }
      }, () => setLoading(false))
  }

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleDelete = (ids?: any[]) => {
    let deleteIds = selectedRows
    if (ids && ids.length) deleteIds = ids

    if (deleteIds.length <= 0)
      return message.warning('未勾选项目')

    Modal.confirm({
      title: '提示',
      content: '是否删除?',
      onOk: () => {
        setLoading(true)
        nursingEduFilesApi
          .deleteToAuditInfoByIds(deleteIds)
          .then(() => {
            message.success('删除成功')
            getTableData()
          })
      }
    })
  }

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'name',
      title: '姓名',
      align: 'center',
      width: 80,
    },
    {
      dataIndex: 'sex',
      title: '性别',
      align: 'center',
      width: 40,
    },
    {
      dataIndex: 'age',
      title: '年龄',
      align: 'center',
      width: 40,
    },
    {
      dataIndex: 'education',
      title: '学历',
      align: 'center',
      width: 40,
    },
    {
      dataIndex: 'idCardNo',
      title: '身份证号码',
      align: 'center',
      width: 150,
    },
    {
      dataIndex: 'status',
      title: '状态',
      align: 'center',
      width: 80,
      render: (text: any) => {
        return text ? <span>已保存</span> : <span style={{ color: 'red' }}>未保存</span>
      }
    },
    {
      dataIndex: 'operation',
      title: '操作',
      align: 'center',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <DoCon>
            <span
              onClick={() => traineeAuditModal.show({
                id: record.id,
                okCallback: () => getTableData()
              })}>
              检查
            </span>
            <span onClick={() => handleDelete([record.id])}>删除</span>
          </DoCon>
        )
      }
    }
  ]

  const handleCancel = () => {
    if (loading) return

    onCancel()
    closeCallback && closeCallback()
  }

  return (
    <React.Fragment>
      <Modal
        title="检查实习生资料"
        visible={visible}
        width={1000}
        centered
        onCancel={handleCancel}
        footer={null}>
        <Wrapper>
          <div className="top-bar">
            <Button onClick={() => handleDelete()} disabled={loading}>删除</Button>
            <span className="label">状态：</span>
            <Select
              value={query.status}
              style={{ width: '100px' }}
              onChange={(status: string) => setQuery({ ...query, status })}>
              <Option value="">全部</Option>
              <Option value="1">已保存</Option>
              <Option value="2">未保存</Option>
            </Select>
            <span className="label">
              <Button type="primary" onClick={handleSearch}>查询</Button>
            </span>
          </div>
          <div>
            <BaseTable
              rowKey="id"
              loading={loading}
              dataSource={tableData}
              surplusHeight={400}
              pagination={{
                current: query.pageIndex,
                pageSize: query.pageSize,
                total,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                onChange: (pageIndex) => setQuery({ ...query, pageIndex }),
                onShowSizeChange: (pageIndex, pageSize) => setQuery({ ...query, pageSize })
              }}
              columns={columns}
              rowSelection={{
                selectedRowKeys: selectedRows,
                onChange: (newRows: any[]) => setSelectedRows(newRows)
              }}
            />
          </div>
          <traineeAuditModal.Component />
        </Wrapper>
      </Modal>
    </React.Fragment>
  )
}
const Wrapper = styled.div`
  .top-bar{
    margin-bottom: 15px;
    .label{
      margin-left: 10px;
      margin-right: 5px;
    }
  }
  #baseTable{
    padding: 0!important;
  }
`