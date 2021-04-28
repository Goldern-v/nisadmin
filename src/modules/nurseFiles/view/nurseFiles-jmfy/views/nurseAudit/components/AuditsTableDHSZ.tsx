import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
// import windowHeight from 'src/hooks/windowHeight'
import { nurseFilesService } from '../../../services/NurseFilesService'
import store, { appStore } from 'src/stores'
// import AuditText from './auditText/AuditText'
import emitter from 'src/libs/ev'
import { Button } from 'antd'
import { globalModal } from 'src/global/globalModal'
import { getTitle } from '../../nurseFileDetail/config/title'
import { openAuditModal } from '../../nurseFileDetail/config/auditModalConfig'
import { message } from 'src/vendors/antd'
export interface Props {
  type: string
  needAudit: boolean
  active: boolean
}

export default function AuditsTableDHSZ(props: Props) {
  let { type, needAudit } = props
  let { empName, post, deptName, nurseHierarchy, nearImageUrl } = store.appStore.queryObj
  const [tableData, setTableData] = useState([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)

  const toDetails = (row: any) => {
    openAuditModal(
      getTitle(row.othersMessage.auditedEntityName),
      { ...row.othersMessage, id: row.othersMessage.fileId, empNo: appStore.queryObj.empNo, saveStatus: row.othersMessage.auditedEntityName },
      () => emitter.emit('refreshNurseAuditTable')
    )
  }

  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '档案类型',
      dataIndex: 'message',
      key: 'message',
      align: 'center',
      width: 100
    },
    {
      title: '当前状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      align: 'center',
      width: 120
    },
    {
      title: '提交人',
      dataIndex: 'commiterName',
      key: 'commiterName',
      align: 'center',
      width: 100
    },
    {
      title: '所在科室',
      dataIndex: 'wardName',
      key: 'wardName',
      align: 'center',
      width: 120
    },

    {
      title: '提交时间',
      dataIndex: 'commitTime',
      key: 'commitTime',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'cz',
      width: 100,
      align: 'center',
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span onClick={() => {
              toDetails(row)
            }}>{needAudit ? '审核' : '查看'}</span>
          </DoCon>
        )
      }
    }
  ]

  const onChange = (pagination: any) => {
    pagination.current && onload(pagination.current, pagination.pageSize)
  }
  const onload = (current: any, pageSize: any) => {
    setLoading(true)
    let getDateFun = props.needAudit
      ? nurseFilesService.findNurseFilePendingFlow(appStore.queryObj.empNo, current, pageSize)
      : nurseFilesService.findNurseFileProcessedFlow(appStore.queryObj.empNo, current, pageSize)
    getDateFun.then((res) => {
      setLoading(false)
      setTableData(res.data)
      setTotal(res.data.totalCount)
      setCurrent(res.data.pageIndex)
      setPageSize(res.data.pageSize)
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
    if (selectedRows.length == 0) {
      return message.warning('请至少勾选一条记录')
    }
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
    if (props.active) {
      emitter.addListener('refreshNurseAuditTable', () => onload(current, pageSize))
      onload(current, pageSize)
    }
    return () => {
      emitter.removeAllListeners('refreshNurseAuditTable')
    }
  }, [props.active])
  return (
    <Wrapper>
      <GroupPostBtn onClick={() => onload(current, pageSize)}>刷新</GroupPostBtn>
      {props.needAudit && (
        <GroupPostBtn style={{ right: 110 }} onClick={openGroupModal}>
          批量审核
        </GroupPostBtn>
      )}

      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={320}
        type={[]}
        // pagination={{
        //   current: current,
        //   total: total,
        //   pageSize: pageSize,
        //   pageSizeOptions: ['10', '20', '30'],
        //   showSizeChanger: true
        // }}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => toDetails(record)
          }
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
  top: 189px;
  right: 30px;
`
