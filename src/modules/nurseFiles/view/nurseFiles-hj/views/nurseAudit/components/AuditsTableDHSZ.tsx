import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable from 'src/components/BaseTable'
import windowHeight from 'src/hooks/windowHeight'

import store from 'src/stores'
import AuditText from './auditText/AuditText'
import emitter from 'src/libs/ev'
import { Button } from 'antd'
import { globalModal } from 'src/global/globalModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
export interface Props {
  type: string
  needAudit: boolean
}

export default function AuditsTableDHSZ(props: Props) {
  let { type } = props
  let { empName, post, deptName, nurseHierarchy, nearImageUrl } = store.appStore.queryObj
  const [tableData, setTableData] = useState([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)

  const columns: any = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '档案类型',
      dataIndex: 'typeName',
      key: '档案类型',
      align: 'center',
      width: 100
    },
    {
      title: '当前状态',
      dataIndex: 'statusName',
      key: 'statusName',
      align: 'center',
      width: 120
    },
    {
      title: '提交人',
      dataIndex: 'empName',
      key: '提交人',
      align: 'center',
      width: 100
    },
    {
      title: '所在科室',
      dataIndex: 'deptName',
      key: '所在科室',
      align: 'center',
      width: 120
    },

    {
      title: '提交时间',
      dataIndex: 'createTime',
      key: '提交时间',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, c: any) => {
        const DoCon = styled.div`
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          color: ${(p) => p.theme.$mtc};
        `
        return (
          <DoCon>
            <AuditText
              needAudit={props.needAudit}
              row={row}
              getTableData={() => emitter.emit('refreshNurseAuditTable')}
            />
          </DoCon>
        )
      }
    }
  ]

  const onChange = (pagination: any) => {
    pagination.current && onload(pagination.current)
  }
  const onload = (current: any) => {
    setLoading(true)
    nurseFilesService.auditeStatusNurse(type, current).then((res) => {
      setLoading(false)
      setTableData(res.data.list)
      setTotal(res.data.totalCount)
      setCurrent(res.data.pageIndex)
    })
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRows(selectedRows)
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const openGroupModal = () => {
    globalModal.groupsAduitModal.show({
      selectedRows,
      getTableData: () => {
        setSelectedRows([])
        setSelectedRowKeys([])
        emitter.emit('refreshNurseAuditTable')
      }
    })
  }

  useEffect(() => {
    emitter.addListener('refreshNurseAuditTable', () => onload(current))
    onload(current)
    return () => {
      emitter.removeAllListeners('refreshNurseAuditTable')
    }
  }, [])
  return (
    <Wrapper>
      {props.needAudit && (
        <GroupPostBtn onClick={openGroupModal} style={{ right: 105 }}>
          批量审核
        </GroupPostBtn>
      )}
      <GroupPostBtn onClick={() => onload(current)}>刷新</GroupPostBtn>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={370}
        pagination={{
          total: total,
          current: current
        }}
        onChange={onChange}
        rowSelection={rowSelection}
        loading={loading}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div``
const GroupPostBtn = styled(Button)`
  position: fixed !important;
  top: 209px;
  right: 30px;
`
