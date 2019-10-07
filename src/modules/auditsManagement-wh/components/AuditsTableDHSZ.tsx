import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import windowHeight from 'src/hooks/windowHeight'

import store, { appStore, authStore } from 'src/stores'

import emitter from 'src/libs/ev'
import { Button } from 'antd'
import { globalModal } from 'src/global/globalModal'
import { aMServices } from '../services/AMServices'

import service from 'src/services/api'
import qs from 'qs'
import { observer } from 'src/vendors/mobx-react-lite'
import createModal from 'src/libs/createModal'
import GroupsEmpNoAduitModal from '../modal/GroupsEmpNoAduitModal'
import { type } from 'os'
import GroupsHlbModal from '../modal/GroupsHlbModal'
import { message } from 'src/vendors/antd'
import { statisticsViewModal } from 'src/modules/nurseFiles/view/statistics/StatisticsViewModal'
export interface Props {
  showType: string
  keyword: string
  needAudit: boolean
  active: boolean
}

export default observer(function AuditsTableDHSZ(props: Props) {
  let { showType, needAudit, active, keyword } = props
  let { empName, post, deptName, nurseHierarchy, nearImageUrl } = store.appStore.queryObj
  const [tableData, setTableData] = useState([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState(false)

  const groupsEmpNoAduitModal = createModal(GroupsEmpNoAduitModal)
  const groupsHlbModal = createModal(GroupsHlbModal)

  const toDetails = (row: any) => {
    if (showType == 'qc') {
      window.open(`/crNursing/manage/#/qualityControlRecordDetail/${row.othersMessage.id}`)
    } else if (showType == 'nurseFile') {
      service.commonApiService.getNurseInformation(row.commiterNo).then((res) => {
        // appStore.history.push(`/nurseAudit?${qs.stringify(res.data)}`)
        window.open(`/crNursing/manage/#/nurseAudit?empNo=${res.data.empNo}`)
      })
    }
  }
  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
      key: '',
      render: (text: any, record: any, index: number) => (current - 1) * pageSize + index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 90,
      render(text: string, record: any) {
        return text == 'nurseFile' ? '护士档案' : text == 'qc' ? '质量检查' : ''
      }
    },
    {
      title: '内容',
      dataIndex: 'message',
      key: 'message',
      align: 'left',
      width: 250
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      key: 'wardName',
      align: 'left',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      align: 'center',
      width: 100
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
      width: 130,
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
            <span onClick={() => toDetails(row)}>{props.needAudit ? '审核' : '查看'}</span>
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
    setCurrent(current)
    setLoading(true)
    let getDataFun = props.needAudit
      ? aMServices.pendingPage(current, pageSize, showType, keyword)
      : aMServices.solvedPage(current, pageSize, showType, keyword)
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
      if (
        selectedRows.find((item: any) => {
          return item.othersMessage.nextNodePendingName == '待病区处理'
        })
      ) {
        message.warning('待病区处理的质量检查不能批量审核')
      }
      setSelectedRows(
        selectedRows.filter((item: any) => {
          return item.othersMessage.nextNodePendingName != '待病区处理'
        })
      )
      setSelectedRowKeys(
        selectedRows
          .filter((item: any) => {
            return item.othersMessage.nextNodePendingName != '待病区处理'
          })
          .map((item: any) => item.key)
      )
    }
    // }
  }

  const openGroupModal = () => {
    if (selectedRows.length == 0) {
      return message.warning('请至少勾选一条记录')
    }
    if (showType == 'nurseFile') {
      groupsEmpNoAduitModal.show({
        selectedRows,
        getTableData: () => {
          setSelectedRows([])
          setSelectedRowKeys([])
          emitter.emit('refreshNurseAuditTable')
        }
      })
    } else if (showType == 'qc') {
      groupsHlbModal.show({
        selectedRows,
        getTableData: () => {
          setSelectedRows([])
          setSelectedRowKeys([])
          emitter.emit('refreshNurseAuditTable')
        }
      })
    }
  }

  emitter.removeAllListeners('refreshNurseAuditTable')
  emitter.addListener('refreshNurseAuditTable', () => {
    onload(current, searchText)
  })

  useEffect(() => {
    showType && onload(current, searchText, pageSize)
  }, [active, authStore.selectedDeptCode, showType, statisticsViewModal.selectedDeptCode])

  return (
    <Wrapper>
      <GroupPostBtn onClick={() => onload(current, searchText, pageSize)}>刷新</GroupPostBtn>
      {props.needAudit && (
        <GroupPostBtn style={{ right: 110 }} onClick={openGroupModal}>
          批量审核
        </GroupPostBtn>
      )}
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
          pageSizeOptions: ['20', '40', '80', '100'],
          pageSize: pageSize
        }}
        onChange={onChange}
        rowSelection={rowSelection}
        loading={loading}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => toDetails(record)
          }
        }}
      />
      <groupsEmpNoAduitModal.Component />
      <groupsHlbModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div``
const GroupPostBtn = styled(Button)`
  position: fixed !important;
  top: 121px;
  right: 33px;
`
