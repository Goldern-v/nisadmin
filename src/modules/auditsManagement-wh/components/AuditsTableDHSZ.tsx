import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import windowHeight from 'src/hooks/windowHeight'

import store, { appStore } from 'src/stores'
import AuditText from 'src/modules/nurseFiles/views/nurseAudit/components/auditText/AuditText'
import emitter from 'src/libs/ev'
import { Button } from 'antd'
import { globalModal } from 'src/global/globalModal'
import { aMServices } from '../services/AMServices'
import { openAuditModal } from 'src/modules/nurseFiles-wh/views/nurseFileDetail/config/auditModalConfig'
import { getTitle } from 'src/modules/nurseFiles-wh/views/nurseFileDetail/config/title'
import service from 'src/services/api'
import qs from 'qs'
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
  const [pageSize, setPageSize] = useState(20)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState(false)

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
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 100,
      render(text: string, record: any) {
        return text == 'nurseFile' ? '护士档案' : text == 'qc' ? '质控单' : ''
      }
    },
    {
      title: '内容',
      dataIndex: 'message',
      key: 'message',
      align: 'center',
      width: 300
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      key: 'wardName',
      align: 'center',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      align: 'center',
      width: 120
    },

    {
      title: '提交人',
      dataIndex: 'commiterName',
      key: 'commiterName',
      width: 100,
      align: 'center'
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
      key: '8',
      width: 100,
      align: 'center',
      render: (text: any, row: any, c: any) => {
        return (
          <DoCon>
            <span
              onClick={
                () => {
                  service.commonApiService.getNurseInformation(row.othersMessage.empNo).then((res) => {
                    appStore.history.push(`/nurseAudit?${qs.stringify(res.data)}`)
                  })
                }
                // openAuditModal(
                //   getTitle(row.othersMessage.entityName),
                //   { ...row.othersMessage, id: row.othersMessage.fileId },
                //   () => emitter.emit('refreshNurseAuditTable')
                // )
              }
            >
              {props.needAudit ? '审核' : '查看'}
            </span>
            {/* <AuditText
              needAudit={props.needAudit}
              row={row}
              getTableData={() => emitter.emit('refreshNurseAuditTable')}
            /> */}
          </DoCon>
        )
      }
    }
  ]

  const onChange = (pagination: any) => {
    setSelectedRows([])
    setSelectedRowKeys([])
    pagination.current && onload(pagination.current, searchText, pagination.pageSize)
  }
  const onload = (current: any, searchText: any, pageSize = 20) => {
    setLoading(true)
    let getDataFun = props.needAudit
      ? aMServices.pendingPage(current, pageSize)
      : aMServices.solvedPage(current, pageSize)
    getDataFun.then((res) => {
      setLoading(false)
      setTableData(res.data.list)
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
    globalModal.groupsAduitModal.show({
      selectedRows,
      getTableData: () => {
        setSelectedRows([])
        setSelectedRowKeys([])
        emitter.emit('refreshNurseAuditTable')
      }
    })
  }
  emitter.removeAllListeners('refreshNurseAuditTable')
  emitter.addListener('refreshNurseAuditTable', (searchText: any) => {
    setSearchText(searchText)
    onload(current, searchText)
  })

  useEffect(() => {
    onload(current, searchText, pageSize)
  }, [])

  return (
    <Wrapper>
      {/* <GroupPostBtn onClick={() => onload(current)} style={{ right: 120 }}>
        刷新
      </GroupPostBtn>*/}
      {/* {props.needAudit && <GroupPostBtn onClick={openGroupModal}>批量审核</GroupPostBtn>} */}
      <BaseTable
        dataSource={tableData}
        columns={columns}
        surplusHeight={280}
        // spaceRowNumber={10}
        // type={['spaceRow']}
        pagination={{
          total: total,
          current: current,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '15', '20'],
          pageSize: pageSize
        }}
        onChange={onChange}
        // rowSelection={rowSelection}
        loading={loading}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div``
const GroupPostBtn = styled(Button)`
  position: fixed !important;
  top: 121px;
  right: 33px;
`
